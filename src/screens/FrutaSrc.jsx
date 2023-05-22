import { View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { db } from "../config/Firebase";

export default function FrutaSrc() {
  const [Fruta, setFruta] = useState([]);
  const [nomeFruta, setNomeFruta] = useState("");

  async function queryFruta(nomeFruta = null) {
    try {
      const frutaRef = collection(db, "Fruta");
      const queryFruta = query(
        frutaRef,
        where("NomeFruta", "==", nomeFruta)
      );
      const querySnapshot = await getDocs(queryFruta);
      
      const frutas = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        frutas.push(data);
      });
      
      setFruta(frutas);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    queryFruta(nomeFruta);
  }, [nomeFruta]);

  return (
    <View style={{
      padding: 30,
    }}>
      <Text style={{
        fontSize: 20,
        marginBottom: 20
      }}>Fruta</Text>

      <TextInput
        label="Nome da Fruta"
        value={nomeFruta}
        onChangeText={setNomeFruta}
        style={{
          marginBottom: 20
        }}
      />
      <FlatList
        data={Fruta}
        renderItem={({ item }) => <Text>{item.NomeFruta}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
