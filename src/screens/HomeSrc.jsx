import { View, Text } from "react-native";

export default function HomeSrc({ navigation }) {
  return(
    <View style={{
      textAlign: "center",
      paddingTop: 100,
    }}>
      <Text style={{
        fontSize: 30,
      }}>Home</Text>

      <Text style={{
        fontSize: 20,
      }}> Navegue pelas páginas de busca: </Text>
    </View>
  )
}