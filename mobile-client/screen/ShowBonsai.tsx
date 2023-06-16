import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import DateFormated from "../components/DateFormated";

import { useGetBonsaiByIdQuery } from "../gql/generated/schema";
import Loader from "../components/Loader";

export default function ShowBonsai({ route, navigation }: any) {
  const { bonsaiId } = route.params;
  const { loading, error, data } = useGetBonsaiByIdQuery({
    variables: { bonsaiId: bonsaiId },
  });
  const bonsai = data?.getBonsaiById || "";

  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      {!bonsai ? (
        <>
          <Text style={styles.text}>Aucun bonsai 😥</Text>
        </>
      ) : (
        <>
          <Image
            source={
              bonsai.photo
                ? { uri: bonsai.photo }
                : require("../assets/bonsai-default.jpg")
            }
            style={styles.photo}
          />
          <Text style={styles.title}>{bonsai?.name}</Text>
          <View style={styles.content}>
            <ScrollView style={styles.scrollView} indicatorStyle={"white"}>
              <Text style={styles.text}>Espèce : {bonsai?.species}</Text>
              <Text style={styles.text}>Age : {bonsai?.age} ans</Text>
              <Text style={styles.text}>
                Ligaturer le : {DateFormated(bonsai?.ligaturing as Date)}
              </Text>
              <Text style={styles.text}>
                A déligature le : {DateFormated(bonsai?.deligaturing)}
              </Text>
              <Text style={styles.text}>
                Rempoter le : {DateFormated(bonsai?.repotting)}
              </Text>
              <Text style={styles.text}>
                A rempoter le : {DateFormated(bonsai?.nextRepotting)}
              </Text>
              <Text style={styles.text}>Espèce : {bonsai?.species}</Text>
              <Text style={styles.text}>Age : {bonsai?.age} ans</Text>
              <Text style={styles.text}>
                Ligaturer le : {DateFormated(bonsai?.ligaturing as Date)}
              </Text>
              <Text style={styles.text}>
                A déligature le : {DateFormated(bonsai?.deligaturing)}
              </Text>
              <Text style={styles.text}>
                Rempoter le : {DateFormated(bonsai?.repotting)}
              </Text>
              <Text style={styles.text}>
                A rempoter le : {DateFormated(bonsai?.nextRepotting)}
              </Text>
            </ScrollView>
          </View>
          {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
  },
  photo: {
    width: "100%",
    height: 300,
  },
});
