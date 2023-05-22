import { View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { db } from "../config/Firebase";

export default function CorSrc() {
  const [Cor, setCor] = useState([]);
  const [nomeCor, setNomeCor] = useState("");

  async function queryCor(nomeCor = null) {
    try {
      const corRef = collection(db, "Cor");
      const queryCor = query(
        corRef,
        where("NomeCor", "==", nomeCor)
      );
      const querySnapshot = await getDocs(queryCor);
      
      const cores = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        cores.push(data);
      });
      
      setCor(cores);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    queryCor(nomeCor);
  }, [nomeCor]);

  return (
    <View style={{
      padding: 30,
    }}>
      <Text style={{
        fontSize: 20,
        marginBottom: 20
      }}>Cor</Text>

      <TextInput
        label="Nome da Cor"
        value={nomeCor}
        onChangeText={setNomeCor}
        style={{
          marginBottom: 20
        }}
      />
      <FlatList
        data={Cor}
        renderItem={({ item }) => <Text>{item.NomeCor}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
