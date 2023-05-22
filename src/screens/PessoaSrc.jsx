import { View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-web";
import { db } from "../config/Firebase";

export default function PessoaSrc() {
  const [Pessoa, setPessoa] = useState([]);
  const [nomePessoa, setNomePessoa] = useState("");

  async function queryPessoa(nomePessoa = null) {
    try {
      const pessoaRef = collection(db, "Pessoa");
      const queryPessoa = query(
        pessoaRef,
        where("NomePessoa", "==", nomePessoa)
      );
      const querySnapshot = await getDocs(queryPessoa);

      const pessoas = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        pessoas.push(data);
      });
      
      setPessoa(pessoas);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    queryPessoa(nomePessoa);
  }, [nomePessoa]);

  return (
    <View style={{
      padding: 30,
    }}>
      <Text style={{
        fontSize: 20,
        marginBottom: 20
      }}>Pessoa</Text>
      
      <TextInput
        label="Nome da Pessoa"
        value={nomePessoa}
        onChangeText={setNomePessoa}
        style={{
          marginBottom: 20
        }}
      />
      <FlatList
        data={Pessoa}
        renderItem={({ item }) => <Text>{item.NomePessoa}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
