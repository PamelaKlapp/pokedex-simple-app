let pokemonRepository = (function(){
    let pokemonList = [
        { name: "Pidgeotto", height: 1.1, typeList: ["flying", "normal"] },
        { name: "Persian", height: 1, typeList: ["normal"] },
        { name: "Jynx", height: 1.4, typeList: ["psychic", "ice"] },
        { name: "Umbreon", height: 1, typeList: ["dark"] },
      ];

    function getALL(){
      return pokemonList;
    }  

    function add(item){
      if(typeof item === "object"){ 
        let itemProperties = Object.keys(item);

          if(
            itemProperties.includes("name") &&
            itemProperties.includes("height") &&
            itemProperties.includes("typeList")
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
        })
      }

        function showDetails(pokemon){
          console.log(pokemon);
        }

    return {
      getALL: getALL,
      add: add,
      addListItem: addListItem,
      showDetails:showDetails
    }


})();

console.log(pokemonRepository.getALL());
pokemonRepository.add({name: "Pikachu", height: 1, typeList: ["electric"]})
console.log(pokemonRepository.getALL());

let pokemonList = pokemonRepository.getALL();

// for (let i = 0; i < pokemonList.length; i++) {
//   if (pokemonList[i].height > 1.2) {
//     document.write(
//       '<p class="biggest_pokemon">' +
//         pokemonList[i].name +
//         " (height: " +
//         pokemonList[i].height +
//         ") " +
//         " THIS IS THE BIGGEST ONE " +
//         "</p>"
//     );
//   } else {
//     document.write(
//       '<p class="pokemon">' +
//         pokemonList[i].name +
//         " (height: " +
//         pokemonList[i].height +
//         ") " +
//         "</p>"
//     );
//   }
// }

pokemonList.forEach(function (pokemon){
  // if (pokemon.height > 1.2 ){
  // document.write(
  //   '<p class="biggest_pokemon">' +
  //   pokemon.name + " (height: " + 
  //   pokemon.height + ") " +
  //   " THIS IS THE BIGGEST ONEee " + '</p>'
  //   );
  // }
  // else {
  //   document.write(
  //     '<p class="pokemon">' + pokemon.name + 
  //     " (height: " + pokemon.height + 
  //     " )" +'</p>')
  // }
  
  // let pokemonList = document.querySelector('.pokemon-list');
  // let listItem = document.createElement('li');
  // let button = document.createElement('button');
  // button.innerText = pokemon.name;
  // button.classList.add('pokemon-button'); 
  // listItem.appendChild(button);
  // pokemonList.appendChild(listItem);

  pokemonRepository.addListItem(pokemon);

});

