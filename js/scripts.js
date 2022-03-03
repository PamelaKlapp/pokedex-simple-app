let pokemonList = [
  { name: "Pidgeotto", height: 1.1, typeList: ["flying", "normal"] },
  { name: "Persian", height: 1, typeList: ["normal"] },
  { name: "Jynx", height: 1.4, typeList: ["psychic", "ice"] },
  { name: "Umbreon", height: 1, typeList: ["dark"] },
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 1.2) {
    document.write(
      '<p class="biggest_pokemon">' +
        pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        ") " +
        " THIS IS THE BIGGEST ONE " +
        "</p>"
    );
  } else {
    '<p class="pokemon">' +
      document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") " + "</p>");
  }
}
