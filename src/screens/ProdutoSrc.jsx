import { View } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { db } from "../config/Firebase";

export default function ProdutoSrc() {
  const [Produto, setProduto] = useState([]);
  const [nomeProduto, setNomeProduto] = useState("");

  async function queryProdutos(nomeProduto = null) {
    try {
      const produtosRef = collection(db, "Produto");
      const queryProdutos = query(
        produtosRef,
        where("NomeProduto", "==", nomeProduto)
      );
      const querySnapshot = await getDocs(queryProdutos);

      const produtos = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        produtos.push(data);
      });
      
      setProduto(produtos);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    queryProdutos(nomeProduto);
  }, [nomeProduto]);

  return (
    <View style={{
      padding: 30,
    }}>
      <Text style={{
        fontSize: 20,
        marginBottom: 20
      }}>Produto</Text>

      <TextInput
        label="Nome do Produto"
        value={nomeProduto}
        onChangeText={setNomeProduto}
        style={{
          marginBottom: 20
        }}
      />
      <FlatList
        data={Produto}
        renderItem={({ item }) => <Text>{item.NomeProduto}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
