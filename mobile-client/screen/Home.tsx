import { View, Button, Text, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Button
        title="Bonsai 1"
        onPress={() =>
          navigation.navigate("ShowBonsai", { bonsaiId: 1, name: "Bonsai 1" })
        }
      />
      <Button
        title="Bonsai 2"
        onPress={() =>
          navigation.navigate("ShowBonsai", { bonsaiId: 2, name: "Bonsai 2" })
        }
      />
      <Button
        title="Bonsai 3"
        onPress={() =>
          navigation.navigate("ShowBonsai", { bonsaiId: 3, name: "Bonsai 3" })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
