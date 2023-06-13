import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Bonsai } from "../gql/generated/schema";

interface BonsaiCardProps {
  bonsai: Bonsai;
  navigation: any;
}
export default function BonsaiCard({ bonsai, navigation }: BonsaiCardProps) {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("ShowBonsai", {
            bonsaiId: bonsai.id,
            name: bonsai.name,
          })
        }
      >
        <Text style={styles.name}>{bonsai.name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 200,
    backgroundColor: "#B57CFC",
    borderRadius: 10,
    marginVertical: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
});
