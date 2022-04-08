let pokemonRepository = (function(){
    
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getALL(){
    return pokemonList;
  }  

  function add(item){
    if(
      typeof item === "object"){ 
      let itemProperties = Object.keys(item);

      if(
        itemProperties.includes("name") &&
        itemProperties.includes("detailsUrl")
      ) {
        pokemonList.push(item);
      }
    }
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button'); 
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //addEventListener
    button.addEventListener('click', function(event){
      showDetails(pokemon);
    });
  }
      
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      
        showModal(pokemon.name, pokemon.imageUrl,  "Height: " + pokemon.height) 
    });
  }
      
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
      
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }
      
  let modalContainer = document.querySelector('#modal-container');
  
  function showModal(title, image, text) {

    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let imageElement = document.createElement('img');
    imageElement.classList.add('pokemon-img');
    imageElement.src = image;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text; 

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
  
    modalContainer.classList.add('is-visible');
    
  }
      
  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    getALL: getALL,
    add: add,
    addListItem: addListItem,
    showDetails:showDetails,
    loadList:loadList,
    loadDetails:loadDetails,
    showModal:showModal,
    hideModal:hideModal
  }


})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getALL().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
