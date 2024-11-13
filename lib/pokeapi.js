/* eslint-disable prettier/prettier */

export async function GetLatestPokemon() {
  const LATEST_POKEMON = "https://pokeapi.co/api/v2/pokemon?limit=24"; // Obtiene los primeros 24 Pokémon

  const rawData = await fetch(LATEST_POKEMON);
  const json = await rawData.json();

  const { results } = json; // "results" contiene la lista de Pokémon

  // Hacemos otra llamada para obtener detalles de cada Pokémon
  const PokemonDetails = await Promise.all(
    results.map(async (pokemon) => {
      const { name, url } = pokemon;

      // Obtener detalles de cada Pokémon
      const pokemonData = await fetch(url);
      const data = await pokemonData.json();

      const { sprites, types, abilities } = data;

      return {
        name,
        image: sprites.front_default, // Imagen del Pokémon
        types: types.map((type) => type.type.name), // Tipos del Pokémon
        abilities: abilities.map((ability) => ability.ability.name), // Habilidades del Pokémon
      };
    })
  );

  return PokemonDetails;
}

export async function GetPokemonDetails(name) {
  const POKEMON_DETAILS = `https://pokeapi.co/api/v2/pokemon/${name}`; // Detalles de un Pokémon específico

  const rawData = await fetch(POKEMON_DETAILS);
  const json = await rawData.json();

  const { namepk, sprites, types, abilities, stats, moves } = json;

  return {
    namepk,
    image: sprites.front_default, // Imagen del Pokémon
    types: types.map((type) => type.type.name), // Tipos del Pokémon
    abilities: abilities.map((ability) => ability.ability.name), // Habilidades
    stats, // Estadísticas del Pokémon
    moves: moves.slice(0, 5).map((move) => move.move.name), // Primeras 5 habilidades/movimientos
  };
}
