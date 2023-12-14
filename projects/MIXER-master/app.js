class BeatMix {
    //CONTRUCTING CLASS
    constructor() {
        this.allPads = document.querySelectorAll(".pad");
        this.clapSound = document.querySelector(".clap-sound");
        this.hihatSound = document.querySelector(".hihat-sound");
        this.kickSound = document.querySelector(".kick-sound");
        this.snareSound = document.querySelector(".snare-sound");
        this.playBtn = document.querySelector(".play-btn");
        this.clear = document.querySelector(".clear");
        this.volumeBtns = document.querySelectorAll(".volume");
        this.soundSelectors = document.querySelectorAll("select");
        this.tempoInput = document.querySelector(".tempo-slider");
        this.tempoInput.value = 120;
        this.indexPointer = 0;
        this.tracksArePlaying = null;
    }

    playBeat() {
        const timeInterval = (60 / this.tempoInput.value) * 1000;
        if (this.tracksArePlaying === null) {
            this.tracksArePlaying = setInterval(() => {
                this.soundLoop();
            }, timeInterval);
        } else {
            clearInterval(this.tracksArePlaying);
            this.tracksArePlaying = null;
        }
    }

    soundLoop() {
        //TO MOVE OVER ALL THE PADS
        let step = this.indexPointer % 12;
        const activePads = document.querySelectorAll(`.pad${step}`);
        activePads.forEach(eachActivePad => {
            //ADDING ANIMATION
            eachActivePad.children[0].classList.add("tracker-part");
            eachActivePad.children[0].style.animation = `loopTracker ${(60 / this.tempoInput.value)}s linear`;

            //FOR CONTINUOUS SMOOTH ANIMATION
            eachActivePad.children[0].addEventListener("animationend", () => {
                eachActivePad.children[0].classList.remove("tracker-part");
                eachActivePad.children[0].style.animation = "";
            })

            if (eachActivePad.classList.contains("pad-selected")) {
                //PLAYING CLAP SOUND
                if (eachActivePad.classList.contains("clap-pad")) {
                    this.clapSound.currentTime = "0";
                    this.clapSound.play();
                }
                //PLAYING HI-HAT SOUND
                if (eachActivePad.classList.contains("hihat-pad")) {
                    this.hihatSound.currentTime = "0";
                    this.hihatSound.play();
                }
                //PLAYING KICK SOUND
                if (eachActivePad.classList.contains("kick-pad")) {
                    this.kickSound.currentTime = "0";
                    this.kickSound.play();
                }
                //PLAYING SNARE SOUND
                if (eachActivePad.classList.contains("snare-pad")) {
                    this.snareSound.currentTime = "0";
                    this.snareSound.play();
                }
            }
        })
        this.indexPointer++;
    }

    playBtnToggle() {
        //TOGGLING THE ICON OF PLAY BUTTON
        this.playBtn.classList.toggle("pause");
        if (this.playBtn.classList.contains("pause")) {
            this.playBtn.innerHTML = `<svg viewBox="0 0 11 14" class="play-icon" style ="margin-left: 3px;">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-753, -955)">
                                                <g transform="translate(100, 852)">
                                                    <g transform="translate(646, 98)">
                                                        <g>
                                                            <rect x="0" y="0" width="24" height="24" />
                                                            <path
                                                                d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z"
                                                            fill="#1d1d1d" />
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>`;
        } else {
            this.playBtn.innerHTML = `<svg viewBox="0 0 6 8" class="play-icon">
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-227, -3765)" fill="#1d1d1d">
                                                <g transform="translate(56, 160)">
                                                    <path
                                                        d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>`;
        }
    }

    clearTracks() {
        userBeatMix.allPads.forEach(individualPad => {
            individualPad.classList.remove("pad-selected");
        })
    }

    toggleVolume(event) {
        const selectedVolumeCategory = event.target;
        const volumeClass = selectedVolumeCategory.classList[1];
        selectedVolumeCategory.classList.toggle("muted");
        if (selectedVolumeCategory.classList.contains("muted")) {
            //TOGGLING THE VOLUME ICON TO MUTE
            selectedVolumeCategory.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round" class="volume-icon">
                                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                                    <line x1 = "23" y1 = "9" x2 = "17" y2 = "15" />
                                                    <line x1="17" y1="9" x2="23" y2="15" />
                                                </svg>`;
            //MUTING THE SOUND TRACKS                                    
            switch (volumeClass) {
                case "clap-volume":
                    this.clapSound.volume = 0;
                    break;
                case "hihat-volume":
                    this.hihatSound.volume = 0;
                    break;
                case "kick-volume":
                    this.kickSound.volume = 0;
                    break;
                case "snare-volume":
                    this.snareSound.volume = 0;
                    break;
            }
        } else {
            //TOGGLING THE VOLUME ICON TO UNMUTE
            selectedVolumeCategory.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round" class="volume-icon">
                                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                                                </svg>`;
            //UMUTING THE SOUND TRACKS                                    
            switch (volumeClass) {
                case "clap-volume":
                    this.clapSound.volume = 1;
                    break;
                case "hihat-volume":
                    this.hihatSound.volume = 1;
                    break;
                case "kick-volume":
                    this.kickSound.volume = 1;
                    break;
                case "snare-volume":
                    this.snareSound.volume = 1;
                    break;
            }
        }
    }

    toggleSound(event) {
        const selectedSoundCategory = event.target.name;
        const selectedSoundType = event.target.value;
        switch (selectedSoundCategory) {
            //CHANGING CLAP AUDIO FILE
            case "clap-select":
                this.clapSound.src = selectedSoundType;
                break;
            //CHANGING HI-HAT AUDIO FILE
            case "hihat-select":
                this.hihatSound.src = selectedSoundType;
                break;
            //CHANGING KICK AUDIO FILE
            case "kick-select":
                this.kickSound.src = selectedSoundType;
                break;
            //CHANGING SNARE AUDIO FILE
            case "snare-select":
                this.snareSound.src = selectedSoundType;
                break;
        }

    }

    toggleTempo(event) {
        const speedNum = document.querySelector(".speed-num");
        this.tempoInput.value = event.target.value;
        speedNum.innerText = event.target.value;
    }

    updateTempoToTrack() {
        clearInterval(this.tracksArePlaying);
        this.tracksArePlaying = null;
        if (!this.playBtn.classList.contains("pause")) {
            this.playBeat();
        }
    }
}

//CREATING OBJECT
const userBeatMix = new BeatMix();

//INVOKING METHODS ON PLAY
userBeatMix.playBtn.addEventListener("click", () => {
    userBeatMix.playBtnToggle();
    userBeatMix.playBeat();
})

//INVOKING METHOD TO CLEAR THE AUDIO TRACKS
userBeatMix.clear.addEventListener("click", () => {
    userBeatMix.clearTracks();
})

//PAD SELECTION MODIFICATION
userBeatMix.allPads.forEach(singlePad => {
    singlePad.addEventListener("click", () => {
        singlePad.classList.toggle("pad-selected");
    })
})

//INVOKING METHOD TO TOGGLE VOLUME
userBeatMix.volumeBtns.forEach(volume => {
    volume.addEventListener("click", (e) => {
        userBeatMix.toggleVolume(e);
    })
})

//INVOKING METHOD TO TOGGLE AUDIO FILE
userBeatMix.soundSelectors.forEach(unitSelect => {
    unitSelect.addEventListener("change", e => {
        userBeatMix.toggleSound(e);
    })
})

//INVOKING METHOD TO TOGGLE THE AUDIO SPEED
userBeatMix.tempoInput.addEventListener("input", (e) => {
    userBeatMix.toggleTempo(e);
})

//INVOKING METHOD TO UPDATE THE AUDIO SPEED TO THE TRACK
userBeatMix.tempoInput.addEventListener("change", () => {
    userBeatMix.updateTempoToTrack();
})
