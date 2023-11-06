const  menu = [{
  image:  "./images/item-1.jpeg",
  name: 'Buttermilk Pancakes',
  price: '$15.99',
  description: "I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed.",
  category:'breakfast'
  },
  {
    image:  "./images/item-2.jpeg",
    name: 'Diner Double',
    price: '$13.99',
    description: "vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats",
    category:'lunch'
  },
  {
    image:  "./images/item-3.jpeg",
    name: 'Godzilla Milkshake',
    price: '$6.99',
    description: "ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.",
    category:'shakes'
  },
  {
    image:  "./images/item-4.jpeg",
    name: 'Country Delight',
    price: '$20.99',
    description: "Shabby chic keffiyeh neutra snackwave pork belly shoreditch. Prism austin mlkshk truffaut,",
    category:'breakfast'
  },
  {
    image:  "./images/item-5.jpeg",
    name: 'Egg Attack',
    price: '$22.99',
    description: "franzen vegan pabst bicycle rights kickstarter pinterest meditation farm-to-table 90's pop-up",
    category:'lunch'
  },
  {
    image:  "./images/item-6.jpeg",
    name: 'Oreo Dream',
    price: '$18.99',
    description: "Portland chicharrones ethical edison bulb, palo santo craft beer chia heirloom iPhone everyday",
    category:'shakes'
  },
  {
    image:  "./images/item-7.jpeg",
    name: 'Bacon Overflow',
    price: '$8.99',
    description: "carry jianbing normcore freegan. Viral single-origin coffee live-edge, pork belly cloud bread iceland put a bird.",
    category:'breakfast'
  },
  {
    image:  "./images/item-8.jpeg",
    name: 'Americal Classic',
    price: '$12.99',
    description: "on it tumblr kickstarter thundercats migas everyday carry squid palo santo leggings. Food truck truffaut.",
    category:'lunch'
  },
  {
    image:  "./images/item-9.jpeg",
    name: 'Quarantine Buddy',
    price: '$16.99',
    description: "skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.",
    category:'shakes'
  },
  {
    image:  "./images/item-10.jpeg",
    name: 'Steak Dinner',
    price: '$39.99',
    description: "skateboard fam synth authentic semiotics. Live-edge lyft af, edison bulb yuccie crucifix microdosing.",
    category:'dinner'
  }
];



function produceHTML(menu){
  let producedHTML='';
  menu.forEach((item) => {
    producedHTML += 
    ` <div class="item-container">
        <div class="image-container">
          <img src="${item.image}" alt="${item.image}" class="menu-image">
        </div>
        <div class="description-container">
          <div class="price-container">
            <p class="item-name">
              ${item.name}
            </p>
            <p class="price">
            ${item.price}
            </p>
          </div>
          <hr>
          <div class="information">
            ${item.description}
          </div>
        </div>
      </div>`
  });
  return producedHTML;
}


const menuElement = document.querySelector('.menu-container');
  menuElement.innerHTML = produceHTML(menu);


const btnElement = document.querySelectorAll('.js-choices-btn');
  btnElement.forEach((button) => {
    button.addEventListener('click', (e) => {
      let menuClone = [];
      const id = e.currentTarget.dataset.id;
      menu.forEach((item) => {
        if(id === item.category){
          menuClone.push(item);
        }
      });
     menuElement.innerHTML = produceHTML(menuClone);

     if(!id){
      menuElement.innerHTML = produceHTML(menu);
     }
    });
  });







