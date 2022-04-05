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
            console.log(pokemon);
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

    return {
      getALL: getALL,
      add: add,
      addListItem: addListItem,
      showDetails:showDetails,
      loadList:loadList,
      loadDetails:loadDetails
    }


})();




// pokemonRepository.add({name: "Pikachu", height: 1, typeList: ["electric"]})
// console.log(pokemonRepository.getALL());




  pokemonRepository.loadList().then(function(){
    pokemonRepository.getALL().forEach(function (pokemon){
      pokemonRepository.addListItem(pokemon);
    });
});
