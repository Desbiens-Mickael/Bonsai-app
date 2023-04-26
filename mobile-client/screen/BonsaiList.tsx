import { Button, View, Text, StyleSheet } from "react-native";
import { useGetBonsaisByUserQuery, useGetCurrentUserQuery } from "../gql/generated/schema";

export default function BonsaiList({ navigation }: any) {
    const {data: currentUser, loading: currentUserLoading, error: currentUserError} = useGetCurrentUserQuery();
    const id = currentUser?.getCurrentUser.id || 0;
    const { data: bonsaiList, loading: bonsaisLoading, error: bonsaisError } = useGetBonsaisByUserQuery({
        variables: {
            userId: id
        }
    })
  const bonsais = bonsaiList?.getBonsaisByUser || [];
    if (bonsaisLoading) return <Text>Loading...</Text>;
    if (bonsaisError) return <Text>Error :</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Liste des Bonsais</Text>
      {bonsais.map((bonsai) => (
        <Button
          key={bonsai.id}
          title={bonsai.name}
          onPress={() =>
            navigation.navigate("ShowBonsai", {
              bonsaiId: bonsai.id,
              name: bonsai.name,
            })
          }
        />
      ))}
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
