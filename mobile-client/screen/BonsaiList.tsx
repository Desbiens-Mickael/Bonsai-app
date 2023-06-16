import { Button, View, Text, StyleSheet } from "react-native";
import {
  User,
  useGetBonsaisByUserQuery,
  useGetCurrentUserQuery,
} from "../gql/generated/schema";
import BonsaiCard from "../components/BonsaiCard";
import Loader from "../components/Loader";
import { ScrollView } from "react-native-gesture-handler";

export default function BonsaiList({ navigation }: any) {
  const {
    data: currentUser,
    loading: currentUserLoading,
    error: currentUserError,
  } = useGetCurrentUserQuery();
  const id = currentUser?.getCurrentUser.id || 0;
  const {
    data: bonsaiList,
    loading: bonsaisLoading,
    error: bonsaisError,
  } = useGetBonsaisByUserQuery({
    variables: {
      userId: id,
    },
  });
  const bonsais = bonsaiList?.getBonsaisByUser || [];
  if (bonsaisLoading || currentUserLoading) return <Loader />;
  if (bonsaisError || currentUserError) return <Text>Error:</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Bonsais</Text>
      <ScrollView
        style={styles.containerCard}
        contentContainerStyle={styles.contentContainer}
      >
        {bonsais.map((bonsai) => (
          <BonsaiCard
            key={bonsai.id}
            bonsai={{ ...bonsai, owner: currentUser?.getCurrentUser as User }}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "auto",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerCard: {
    flex: 1,
    width: "100%",
    marginTop: 20,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
