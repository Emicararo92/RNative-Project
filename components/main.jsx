import { useEffect, useState } from "react";
import { View, Text } from "react-native"; // Importar View desde React Native
import { GetLatestPokemon } from "../lib/pokeapi";
import GameCard from "../components/gameCard";

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetLatestPokemon()
      .then((pokemon) => {
        setPokemonList(pokemon);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los Pokémon:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <GameCard pokemonList={pokemonList} />
    </View>
  );
}

export default Main;
