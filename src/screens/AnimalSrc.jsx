import { View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-web";
import { db } from "../config/Firebase";

export default function AnimalSrc() {
  const [Animal, setAnimal] = useState([]);
  const [nomeAnimal, setNomeAnimal] = useState("");

  async function queryAnimal(nomeAnimal = null) {
    try {
      const animalRef = collection(db, "Animal");
      const queryAnimal = query(
        animalRef,
        where("NomeAnimal", "==", nomeAnimal)
      );
      const querySnapshot = await getDocs(queryAnimal);
      
      const animais = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        animais.push(data);
      });
      
      setAnimal(animais);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    queryAnimal(nomeAnimal);
  }, [nomeAnimal]);

  return (
    <View style={{
      padding: 30,
    }}>
      <Text style={{
        fontSize: 20,
        marginBottom: 20
      }}>Animal</Text>

      <TextInput
        label="Nome do Animal"
        value={nomeAnimal}
        onChangeText={setNomeAnimal}
        style={{
          marginBottom: 20
        }}
      />
      <FlatList
        data={Animal}
        renderItem={({ item }) => <Text>{item.NomeAnimal}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
