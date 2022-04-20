let pokemonRepository = (function(){
    
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getALL(){
    return pokemonList;
  }  

  function add(item){
    if(
      typeof item === 'object'){ 
      let itemProperties = Object.keys(item);

      if(
        itemProperties.includes('name') &&
        itemProperties.includes('detailsUrl')
      ) {
        pokemonList.push(item);
      }
    }
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button', 'btn', 'btn-light', 'pokedex-btn'); 
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#exampleModal');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);

    //addEventListener
    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }
      
  function showDetails(pokemon){
    loadDetails(pokemon).then(function(){
      showModal(pokemon)
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

      
  function showModal(pokemon){
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    // Access to types of each Pokemon
    let typesNamesOnly = pokemon.types.map(typeObject =>{
      return typeObject.type.name
    });

    let nameElement = $('<h1 class="sr-only-focusable">'+ pokemon.name +'</h1>');
    let imageElement = $('<img class="modal-img" style= "width:30%">');
    imageElement.attr("src", pokemon.imageUrl);
    let heightElement = $('<p class="sr-only-focusable">'+ 'Height: ' + pokemon.height + '</p>');
    let typeElement = $('<p class="sr-only-focusable">' + 'Type: ' + typesNamesOnly+ '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
  }
  

  return {
    getALL: getALL,
    add: add,
    addListItem: addListItem,
    showDetails:showDetails,
    loadList:loadList,
    loadDetails:loadDetails,
    showModal:showModal
  }


})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getALL().forEach(function (pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});