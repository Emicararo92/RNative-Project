/* eslint-disable prettier/prettier */
import {
  View,
  FlatList,
  StatusBar,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import logo from "../assets/logo.png"; // Logo importado

// Asegúrate de recibir pokemonList como prop
function GameCard({ pokemonList }) {
  const insets = useSafeAreaInsets();

  // Verificamos si pokemonList está vacío
  if (!pokemonList || pokemonList.length === 0) {
    return <Text style={styles.errorText}>No se encontraron Pokémon.</Text>;
  }

  return (
    <View
      style={{ flex: 1, paddingBottom: insets.bottom, paddingTop: insets.top }}
    >
      {/* Logo en la parte superior */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>

      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  // Contenedor para el logo
  logoContainer: {
    alignItems: "center",
    marginBottom: 20, // Espacio entre el logo y los Pokémon
  },
  // Estilo para el logo
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain", // Esto asegura que el logo mantenga su aspecto original
  },
  // Estilo de cada tarjeta de Pokémon
  card: {
    width: 150, // Aumentamos el tamaño de la tarjeta
    height: 180, // Aumentamos la altura para darle espacio a la imagen y el nombre
    borderRadius: 10,
    marginBottom: 20, // Espacio entre las tarjetas
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333", // Fondo para las tarjetas
  },
  // Estilo de la imagen del Pokémon
  image: {
    width: 100, // Tamaño ajustado para que las imágenes se vean bien dentro de la tarjeta
    height: 100,
    borderRadius: 10,
    backgroundColor: "white",
  },
  // Estilo del nombre del Pokémon
  name: {
    fontSize: 18,
    color: "white",
    marginTop: 10, // Espacio entre la imagen y el nombre
  },
  // Estilo de texto de error
  errorText: {
    fontSize: 20,
    color: "red",
    textAlign: "center",
  },
});

export default GameCard;
