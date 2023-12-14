class ColorPalette {
    constructor() {
        this.paletteGeneratorBtn = document.querySelector(".palette-generator-btn");
        this.allColors = document.querySelectorAll(".color");
        this.allHexCodes = document.querySelectorAll(".color-code");
        this.colorAdjustBtns = document.querySelectorAll(".color-adjust");
        this.colorAdjustSliderCloseBtns = document.querySelectorAll(".color-adjust-slider-close-btn");
        this.colorLockBtns = document.querySelectorAll(".color-lock");
        this.allSliders = document.querySelectorAll(".slider");
        this.copyModalContainer = document.querySelector(".copy-modal-container");
        this.initialGeneratedColors;
        this.paletteNameBundle;

        //SELECTORS FOR LIBRARY MODAL
        this.paletteLibraryBtn = document.querySelector(".palette-library-btn");
        this.paletteLibraryModalContainer = document.querySelector(".palette-library-modal-container");
        this.paletteLibraryModalBody = document.querySelector(".palette-library-modal-body");
        this.paletteLibraryCloseBtn = document.querySelector(".library-close-btn");

        //SELECTORS FOR SAVE MODAL
        this.savePaletteBtn = document.querySelector(".save-palette-btn");
        this.savePaletteModalContainer = document.querySelector(".save-palette-modal-container");
        this.savedPaletteName = document.querySelector(".saved-palette-name");
        this.emptyNameError = document.querySelector(".empty-name-error");
        this.savePaletteCloseBtn = document.querySelector(".save-palette-close-btn");
        this.savePaletteSubmitBtn = document.querySelector(".save-palette-submit-btn");
    }

    PaletteGenerator() {
        this.initialGeneratedColors = [];
        this.allColors.forEach(color => {
            //SELECTION OF NECESSARY NODES
            const generatedColor = chroma.random();
            const colorCode = color.children[0];
            const sliderContainer = color.children[2];
            const adjustIcon = color.querySelector(".color-adjust");
            const lockIcon = color.querySelector(".color-lock");
            const colorAdjustSliders = sliderContainer.querySelectorAll("input");
            const saturationSlider = colorAdjustSliders[1];
            const brightnessSlider = colorAdjustSliders[2];
            //ADDING INITALLY GENERATED COLORS INTO AN ARRAY
            if (color.classList.contains("locked")) {
                this.initialGeneratedColors.push(colorCode.innerText);
                return;
            } else {
                this.initialGeneratedColors.push(generatedColor.hex());
            }
            //UPDATING BACKGROUND COLOR AND HEXCODE
            color.style.backgroundColor = generatedColor;
            colorCode.innerText = generatedColor;

            //INVOKING METHODS TO GENERATE NECESSARY CONTRAST AND SLIDER COLOR
            this.TextColorContrastCheck(generatedColor, colorCode);
            this.AdjustBtnColorContrastCheck(generatedColor, adjustIcon);
            this.LockBtnColorContrastCheck(generatedColor, lockIcon);
            this.ColorizeSliders(generatedColor, saturationSlider, brightnessSlider);
        })
        //MAKING SLIDERS VALUES TO CORRESPONDING COLORS
        this.CorrespondSliderValueForGeneration();
    }

    TextColorContrastCheck(hexcodeOfcolor, textOfHexcode) {
        //CHECKING CONTRAST RATIO FOR HEXTEXT TO COLOR
        const luminanceOfColor = chroma(hexcodeOfcolor).luminance();
        textOfHexcode.style.color = luminanceOfColor > 0.5 ? "#000000" : "#ffffff";
    }

    AdjustBtnColorContrastCheck(hexcodeOfcolor, icon) {
        const luminanceOfColor = chroma(hexcodeOfcolor).luminance();
        const circles = icon.querySelectorAll("circle");
        const lines = icon.querySelectorAll("line");
        //CHECKING CONTRAST RATIO FOR ADJUST BUTTON TO COLOR
        if (luminanceOfColor > 0.5) {
            circles.forEach(circle => {
                circle.style.stroke = "#000000";
            })
            lines.forEach(line => {
                line.style.stroke = "#000000";
            })
        } else {
            circles.forEach(circle => {
                circle.style.stroke = "#ffffff";
            })
            lines.forEach(line => {
                line.style.stroke = "#ffffff";
            })
        }
    }

    LockBtnColorContrastCheck(hexcodeOfcolor, icon) {
        const luminanceOfColor = chroma(hexcodeOfcolor).luminance();
        const lockToggle = icon.querySelector(".lock-toggle");
        //CHECKING CONTRAST RATIO FOR lOCK BUTTON TO COLOR
        lockToggle.style.fill = luminanceOfColor > 0.5 ? "#000000" : "#ffffff";
    }

    ColorizeSliders(generatedColor, saturationSlider, brightnessSlider) {
        //ADJUSTING SATURATION SLIDER COLOR
        const lowestSaturation = generatedColor.set("hsl.s", 0);
        const highestSaturation = generatedColor.set("hsl.s", 1);
        saturationSlider.style.backgroundImage = `linear-gradient(to right, ${lowestSaturation}, ${highestSaturation})`;
        //ADJUSTING BRIGHTNESS SLIDER COLOR
        const midBrightness = generatedColor.set("hsl.l", 0.5);
        brightnessSlider.style.backgroundImage = `linear-gradient(to right, #000000, ${midBrightness}, #ffffff)`;
    }

    BgManipualtion(event) {
        //LIVE MANIPULATING COLOR ACCORDING TO INPUT

        //SELECTION OF ELEMENTS
        const currentSliderIndex = event.target.getAttribute("data-hue") || event.target.getAttribute("data-saturation") || event.target.getAttribute("data-brightness");
        const sliderParent = event.target.parentElement.querySelectorAll(".slider");
        const currentHue = sliderParent[0];
        const currentSaturation = sliderParent[1];
        const currentBrightness = sliderParent[2];
        const currentColorDiv = this.allColors[currentSliderIndex];

        //BG MANIPULATION
        let currentColorHexText = this.initialGeneratedColors[currentSliderIndex];
        const changedColor = chroma(currentColorHexText).set("hsl.h", currentHue.value).set("hsl.s", currentSaturation.value).set("hsl.l", currentBrightness.value);
        currentColorDiv.style.backgroundColor = changedColor;

        //UPDATING MAIN COLOR ARRAY DATA
        this.initialGeneratedColors[currentSliderIndex] = changedColor.hex();

        //SLIDER CORRESPONDING COLORATION
        this.ColorizeSliders(changedColor, currentSaturation, currentBrightness);
    }

    BgTextIconUpdate(index) {
        //LIVE MANIPULATING HEXCODE ACCORDING TO INPUT
        const selectedColor = this.allColors[index];
        const bgColor = chroma(selectedColor.style.backgroundColor);
        const hexText = selectedColor.querySelector(".color-code");
        const colorToggleIcons = selectedColor.querySelectorAll(".toggle-options button");
        const sliderBtn = colorToggleIcons[0];
        const lockBtn = colorToggleIcons[1];

        hexText.innerText = bgColor.hex();

        this.TextColorContrastCheck(hexText.innerText, hexText);
        this.AdjustBtnColorContrastCheck(hexText.innerText, sliderBtn);
        this.LockBtnColorContrastCheck(hexText.innerText, lockBtn);
    }


    //METHOD TO CORRESPOND SLIDER VALUES WHEN PALETTE IS GENERATED
    CorrespondSliderValueForGeneration() {
        this.allSliders.forEach(eachSlider => {
            //UPDATING HUE VALUE IN HUE SLIDER
            if (eachSlider.classList.contains("hue-slider")) {
                const hueIndex = eachSlider.getAttribute("data-hue");
                const currentColor = this.initialGeneratedColors[hueIndex];
                const hueValueOfColor = chroma(currentColor).hsl()[0];
                eachSlider.value = hueValueOfColor;
            }
            //UPDATING SATURATION VALUE SATURATION SLIDER
            if (eachSlider.classList.contains("saturation-slider")) {
                const saturationIndex = eachSlider.getAttribute("data-saturation");
                const currentColor = this.initialGeneratedColors[saturationIndex];
                const saturationValueOfColor = chroma(currentColor).hsl()[1];
                eachSlider.value = saturationValueOfColor;
            }
            //UPDATING BRIGHTNESS VALUE BRIGHTNESS SLIDER
            if (eachSlider.classList.contains("brightness-slider")) {
                const brightnessIndex = eachSlider.getAttribute("data-brightness");
                const currentColor = this.initialGeneratedColors[brightnessIndex];
                const brightnessValueOfColor = chroma(currentColor).hsl()[2];
                eachSlider.value = brightnessValueOfColor;
            }
        })
    }

    //METHOD TO CORRESPOND SLIDER VALUES WHEN PALETTE IS PREVIEWED FROM LIBRARY
    CorrespondSliderValueForLibraryPreview(colorArray) {
        this.allSliders.forEach(eachSlider => {
            //UPDATING HUE VALUE IN HUE SLIDER
            if (eachSlider.classList.contains("hue-slider")) {
                const hueIndex = eachSlider.getAttribute("data-hue");
                const currentColor = colorArray[hueIndex];
                const hueValueOfColor = chroma(currentColor).hsl()[0];
                eachSlider.value = hueValueOfColor;
            }
            //UPDATING SATURATION VALUE SATURATION SLIDER
            if (eachSlider.classList.contains("saturation-slider")) {
                const saturationIndex = eachSlider.getAttribute("data-saturation");
                const currentColor = colorArray[saturationIndex];
                const saturationValueOfColor = chroma(currentColor).hsl()[1];
                eachSlider.value = saturationValueOfColor;
            }
            //UPDATING BRIGHTNESS VALUE BRIGHTNESS SLIDER
            if (eachSlider.classList.contains("brightness-slider")) {
                const brightnessIndex = eachSlider.getAttribute("data-brightness");
                const currentColor = colorArray[brightnessIndex];
                const brightnessValueOfColor = chroma(currentColor).hsl()[2];
                eachSlider.value = brightnessValueOfColor;
            }
        })
    }

    //METHOD TO DISPLAY ADJUST MENU FOR COLORS
    SliderPopup(event) {
        const btnContainer = event.target.parentElement;
        const sliderBox = btnContainer.parentElement.children[2];
        sliderBox.classList.toggle("visible-slider");
    }

    //METHOD TO HIDE ADJUST MENU FOR COLORS
    CloseSliderPopup(event) {
        const sliderBox = event.target.parentElement;
        sliderBox.classList.toggle("visible-slider");
    }

    //METHOD TO DISPLAY CORRECT SVG FOR LOCK BUTTON
    ColorSectionLock(event) {
        const eventParent = event.target.parentElement;
        const colorSection = eventParent.parentElement;
        const lockSVG = event.target.querySelector(".lock-toggle");
        colorSection.classList.toggle("locked");
        lockSVG.innerHTML = colorSection.classList.contains("locked") ? `<path d="M16,21.9146472 L16,24.5089948 C16,24.7801695 16.2319336,25 16.5,25 C16.7761424,25 17,24.7721195 17,24.5089948 L17,21.9146472 C17.5825962,21.708729 18,21.1531095 18,20.5 C18,19.6715728 17.3284272,19 16.5,19 C15.6715728,19 15,19.6715728 15,20.5 C15,21.1531095 15.4174038,21.708729 16,21.9146472 L16,21.9146472 Z M9,14.0000125 L9,10.499235 C9,6.35670485 12.3578644,3 16.5,3 C20.6337072,3 24,6.35752188 24,10.499235 L24,14.0000125 C25.6591471,14.0047488 27,15.3503174 27,17.0094776 L27,26.9905224 C27,28.6633689 25.6529197,30 23.991212,30 L9.00878799,30 C7.34559019,30 6,28.652611 6,26.9905224 L6,17.0094776 C6,15.339581 7.34233349,14.0047152 9,14.0000125 L9,14.0000125 L9,14.0000125 Z M12,14 L12,10.5008537 C12,8.0092478 14.0147186,6 16.5,6 C18.9802243,6 21,8.01510082 21,10.5008537 L21,14 L12,14 L12,14 L12,14 Z" />` : `<path d="M16,23.9146472 L16,26.5089948 C16,26.7801695 16.2319336,27 16.5,27 C16.7761424,27 17,26.7721195 17,26.5089948 L17,23.9146472 C17.5825962,23.708729 18,23.1531095 18,22.5 C18,21.6715728 17.3284272,21 16.5,21 C15.6715728,21 15,21.6715728 15,22.5 C15,23.1531095 15.4174038,23.708729 16,23.9146472 L16,23.9146472 L16,23.9146472 Z M24,9.5 L24,8.499235 C24,4.35752188 20.6337072,1 16.5,1 C12.3578644,1 9,4.35670485 9,8.499235 L9,16.0000125 L9,16.0000125 C7.34233349,16.0047152 6,17.339581 6,19.0094776 L6,28.9905224 C6,30.652611 7.34559019,32 9.00878799,32 L23.991212,32 C25.6529197,32 27,30.6633689 27,28.9905224 L27,19.0094776 C27,17.3503174 25.6591471,16.0047488 24,16 L22.4819415,16 L12.0274777,16 C12.0093222,15.8360041 12,15.6693524 12,15.5005291 L12,8.49947095 C12,6.01021019 14.0147186,4 16.5,4 C18.9802243,4 21,6.01448176 21,8.49947095 L21,9.5 L21,12.1239591 C21,13.1600679 21.6657972,14 22.5,14 C23.3284271,14 24,13.1518182 24,12.1239591 L24,9.5 L24,9.5 L24,9.5 Z" />`;
    }

    //METHOD TO COPY HEXCODE TO DEVICE'S CLIPBOARD
    CopyToClipboard(hexCode) {
        const tempHtmlElement = document.createElement("textarea");
        tempHtmlElement.value = hexCode.innerText;
        document.body.appendChild(tempHtmlElement);
        tempHtmlElement.select();
        document.execCommand("copy");
        document.body.removeChild(tempHtmlElement);
        this.copyModalContainer.classList.add("active");
        this.copyModalContainer.children[0].classList.add("active");
    }

    //REMOVING COPIED TO CLIPBOARD! MESSAGE AFTER 0.7 SEC
    RemoveCopyModal() {
        this.copyModalContainer.classList.remove("active");
        this.copyModalContainer.children[0].classList.remove("active");
    }

    //TO OPEN PALETTE LIBRARY IN THE APP
    PaletteLibraryOpen() {
        this.paletteLibraryModalContainer.classList.add("active");
        this.paletteNameBundle = JSON.parse(localStorage.getItem("palette-keys"));
        if (this.paletteNameBundle === null || this.paletteNameBundle.length < 1) {
            this.paletteLibraryModalBody.innerHTML = `<span class="create-palette-message">Create and Save to View your Palettes</span>`;
            return;
        } else {
            this.paletteLibraryModalBody.innerHTML = "";
            this.paletteNameBundle.forEach((bundleName, serialNumber) => {
                //CREATING ROWS FOR LIBRARY
                const savedPaletteLibraryRow = document.createElement("div");
                savedPaletteLibraryRow.classList.add("saved-palette-library-row");
                this.paletteLibraryModalBody.appendChild(savedPaletteLibraryRow);

                //CREATING PALETTE NAME AND ITS SERIAL NUMBER
                const subjectName = document.createElement("div");
                subjectName.innerText = `${serialNumber + 1}. ${bundleName}`;
                subjectName.classList.add("name-of-palette");
                savedPaletteLibraryRow.appendChild(subjectName);

                //CREATING CONTAINER FOR 5 COLOR COLUMNS
                const colorBand = document.createElement("div");
                colorBand.classList.add("color-band");
                savedPaletteLibraryRow.appendChild(colorBand);

                //FECTCHING PALETTE ARRAY WITH THE HELP OF KEY
                const colorBundle = JSON.parse(localStorage.getItem(bundleName));

                colorBundle.forEach(singleColor => {
                    //CREATING EACH COLOR COLUMN IN THE PALETTE
                    const singleColorDiv = document.createElement("div");
                    singleColorDiv.classList.add("color-column");
                    singleColorDiv.style.backgroundColor = singleColor;
                    colorBand.appendChild(singleColorDiv);
                })

                //CREATING PREVIEW BTN FOR THE PALETTE
                const previewPalette = document.createElement("button");
                previewPalette.classList.add("preview-btn");
                previewPalette.innerText = "Preview";
                savedPaletteLibraryRow.appendChild(previewPalette);
                previewPalette.addEventListener("click", () => {
                    this.LibraryPalettePreviewer(colorBundle);
                    this.PaletteLibraryClose();
                })

                //CREATING DELETE BTN FOR THE PALETTE
                const deletePalette = document.createElement("button");
                deletePalette.classList.add("delete-btn");
                deletePalette.innerText = "Delete";
                savedPaletteLibraryRow.appendChild(deletePalette);

                deletePalette.addEventListener("click", () => {
                    const bundleIndex = this.paletteNameBundle.indexOf(bundleName);
                    this.paletteNameBundle.splice(bundleIndex, 1);
                    //DELETING DATA FROM LOCAL STORAGE
                    localStorage.removeItem(bundleName);
                    localStorage.setItem("palette-keys", JSON.stringify(this.paletteNameBundle));
                    //DELETING HTML ELEMENTS
                    savedPaletteLibraryRow.remove();
                    //UPDATING SERIAL NUMBERS FOR REMAINING DATA
                    this.PaletteLibraryOpen();
                })
            })
        }
    }

    //CLOSING LIBRARY MENU
    PaletteLibraryClose() {
        this.paletteLibraryModalContainer.classList.remove("active");
    }

    LibraryPalettePreviewer(colorArray) {
        this.initialGeneratedColors = [];
        for (let colorIndex = 0; colorIndex < colorArray.length; colorIndex++) {
            //SELECTING AFFECTED NODES WHEN PREVIEWED
            const colorHexcode = colorArray[colorIndex];
            const colorBackground = this.allColors[colorIndex];
            const colorText = this.allHexCodes[colorIndex];
            const adjustShape = this.colorAdjustBtns[colorIndex];
            const lockShape = this.colorLockBtns[colorIndex];
            const sliderContainer = colorBackground.children[2];
            const colorAdjustSliders = sliderContainer.querySelectorAll("input");
            const saturationSlider = colorAdjustSliders[1];
            const brightnessSlider = colorAdjustSliders[2];

            //PUSHING CORRECT COLOR DATA IN THE ARRAY FOR SAVE MODAL
            this.initialGeneratedColors.push(colorHexcode);

            //UPDATING BACKGOUND COLOR AND HEXCODE TEXT
            colorBackground.style.backgroundColor = colorHexcode;
            colorText.innerText = colorHexcode;

            //INVOKING METHODS TO GENERATE NECESSARY CONTRAST AND SLIDER COLOR
            this.TextColorContrastCheck(colorHexcode, colorText);
            this.AdjustBtnColorContrastCheck(colorHexcode, adjustShape);
            this.LockBtnColorContrastCheck(colorHexcode, lockShape);

            //ADJUSTING SATURATION SLIDER COLOR
            const lowestSaturation = chroma(colorHexcode).set("hsl.s", 0);
            const highestSaturation = chroma(colorHexcode).set("hsl.s", 1);
            saturationSlider.style.backgroundImage = `linear-gradient(to right, ${lowestSaturation}, ${highestSaturation})`;
            //ADJUSTING BRIGHTNESS SLIDER COLOR
            const midBrightness = chroma(colorHexcode).set("hsl.l", 0.5);
            brightnessSlider.style.backgroundImage = `linear-gradient(to right, #000000, ${midBrightness}, #ffffff)`;
        }
        this.CorrespondSliderValueForLibraryPreview(colorArray);
    }

    // TO OPEN SAVE PALETTE MENU IN THE APP
    SavePaletteOpen() {
        this.savePaletteModalContainer.classList.toggle("active");
        const saveColorColumns = document.querySelectorAll(".save-color-column");
        //PASSING CORRECT PALETTE COLORS TO THE SAVE MENU
        for (let i = 0; i < saveColorColumns.length; i++) {
            saveColorColumns[i].style.backgroundColor = this.initialGeneratedColors[i];
        }
        //VACATING INPUT MENU WHEN SAVE MENU IS OPENED
        this.savedPaletteName.value = "";
    }

    //CLOSING SAVE MENU
    SavePaletteClose() {
        this.savePaletteModalContainer.classList.toggle("active");
    }

    SavePaletteToLibrary() {
        const paletteName = this.savedPaletteName.value;
        //CHECKING NAME IS EMPTY OR NOT
        if (paletteName !== "") {
            //PUSHING DATA IN LOCAL STORAGE
            localStorage.setItem(paletteName, JSON.stringify(this.initialGeneratedColors));

            //ADDING ARRAYS OF KEYS IN LOCAL STORAGE AS A SEPERATE KEY
            this.paletteNameBundle = JSON.parse(localStorage.getItem("palette-keys"));
            if (this.paletteNameBundle !== null) {
                this.paletteNameBundle.push(paletteName);

            } else {
                this.paletteNameBundle = [paletteName];
            }
            localStorage.setItem("palette-keys", JSON.stringify(this.paletteNameBundle));
            this.SavePaletteClose();
        } else {
            //DISPLAYING EMPTY INPUT ERROR MESSAGE
            this.emptyNameError.classList.add("visible-error");
            setTimeout(() => {
                this.emptyNameError.classList.remove("visible-error");
            }, 1500);
        }
    }

    //CLOSE BTNS FIX FOR SAVE AND LIBRARY MENUS
    closeBtnFix(event) {
        const crossContainer = event.target;
        crossContainer.classList.toggle("white-cross");
    }
}

//CREATING NEW PALETTE
const presentColorPalette = new ColorPalette();
presentColorPalette.PaletteGenerator();

//INVOKING PALETTE GENERATION WHEN GENERATE BTN IS CLICKED
presentColorPalette.paletteGeneratorBtn.addEventListener("click", () => {
    presentColorPalette.PaletteGenerator();
})

//ADDING ADJUST MENU TO DISPLAY FOR ALL ADJUST BTNS
presentColorPalette.colorAdjustBtns.forEach(colorAdjustBtn => {
    colorAdjustBtn.addEventListener("click", (e) => {
        presentColorPalette.SliderPopup(e);
    })
})

//ADDING CLOSE FUNCTIONALITY TO ALL CLOSE BTNS ON ADJUST MENU
presentColorPalette.colorAdjustSliderCloseBtns.forEach(closeBtn => {
    closeBtn.addEventListener("click", (e) => {
        presentColorPalette.CloseSliderPopup(e);
    })
})

//LIVE COLOR MANIPULATION ON SLIDER INPUTS
presentColorPalette.allSliders.forEach(everySlider => {
    everySlider.addEventListener("input", e => {
        presentColorPalette.BgManipualtion(e);
    })
})

//LIVE HEXCODE UPDATE ON SLIDER INPUTS
presentColorPalette.allColors.forEach((eachColor, currentSliderIndex) => {
    eachColor.addEventListener("input", () => {
        presentColorPalette.BgTextIconUpdate(currentSliderIndex);
    })
})

//ADDING LOCK SVG UPDATE TO ALL LOCK BTNS
presentColorPalette.colorLockBtns.forEach(colorLockBtn => {
    colorLockBtn.addEventListener("click", (e) => {
        presentColorPalette.ColorSectionLock(e);
    })
})

//INVOKING COPY TO CLIPBOARD FUNCTION
presentColorPalette.allHexCodes.forEach(hexCombination => {
    hexCombination.addEventListener("click", () => {
        presentColorPalette.CopyToClipboard(hexCombination);
        setTimeout(() => {
            presentColorPalette.RemoveCopyModal();
        }, 700);
    })
})

//OPENING LIBRARY MODAL
presentColorPalette.paletteLibraryBtn.addEventListener("click", () => {
    presentColorPalette.PaletteLibraryOpen();
})

//CLOSING LIBRARY MODAL
presentColorPalette.paletteLibraryCloseBtn.addEventListener("click", () => {
    presentColorPalette.PaletteLibraryClose();
})

//FIX FOR CROSS BTN ON LIBRARY MENU
presentColorPalette.paletteLibraryCloseBtn.addEventListener("mouseenter", (e) => {
    presentColorPalette.closeBtnFix(e);
})

//FIX FOR CROSS BTN ON LIBRARY MENU
presentColorPalette.paletteLibraryCloseBtn.addEventListener("mouseleave", (e) => {
    presentColorPalette.closeBtnFix(e);
})

//OPENING SAVE MODAL
presentColorPalette.savePaletteBtn.addEventListener("click", () => {
    presentColorPalette.SavePaletteOpen();
})

//CLOSING SAVE MODAL
presentColorPalette.savePaletteCloseBtn.addEventListener("click", () => {
    presentColorPalette.SavePaletteClose();
})

//FIX FOR CROSS BTN ON SAVE MENU
presentColorPalette.savePaletteCloseBtn.addEventListener("mouseenter", (e) => {
    presentColorPalette.closeBtnFix(e);
})

//FIX FOR CROSS BTN ON SAVE MENU
presentColorPalette.savePaletteCloseBtn.addEventListener("mouseleave", (e) => {
    presentColorPalette.closeBtnFix(e);
})

//INVOKING METHOD TO SAVE PALETTE IN LOCAL STORAGE
presentColorPalette.savePaletteSubmitBtn.addEventListener("click", () => {
    presentColorPalette.SavePaletteToLibrary();
})

//OPTIMIZABLE FEATURES:
//NAV-BAR BIX SHADOW
//PALETTE NAME EDIT OPTION IN LIBRARY
//HEXCODE COPY IN LIBRARY
//UPDATING EXISTING PALETTES
//BLACK AND WHITE COLOR ADJUST MENU BUG