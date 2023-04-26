import { View, Button, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import client from "../gql/client";

interface isLoginProps {
  navigation: any;
  isLogin: (isLogin: boolean) => void;
}

export default function HomeScreen({ navigation, isLogin }: isLoginProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World!</Text>
      <Button
        title="Mes Bonsais"
        onPress={() => navigation.navigate("Mes bonsais")}
      />
      <Button
        title="Déconnexion"
        onPress={async () => {
          await SecureStore.deleteItemAsync("token");
          isLogin(false);
          client.resetStore();
          console.log("tokenHome", await SecureStore.getItemAsync("token"));

          // navigation.navigate("Login");
        }}
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
