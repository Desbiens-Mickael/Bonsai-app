import { View, Text, StyleSheet, Button } from "react-native";
import { useGetBonsaiByIdQuery } from "../gql/generated/schema";

export default function ShowBonsai({ route, navigation }: any) {
  const { bonsaiId } = route.params;
  const { loading, error, data } = useGetBonsaiByIdQuery({
    variables: { bonsaiId: bonsaiId },
  });
  const bonsai = data?.getBonsaiById || "";

  return (
    <View style={styles.container}>
      {bonsai ? (
        <>
          <Text style={styles.text}>{bonsai?.name}</Text>
        </>
      ) : (
        <>
          <Text style={styles.text}>Aucun bonsai 😥</Text>
        </>
      )}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
