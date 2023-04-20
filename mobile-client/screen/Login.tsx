import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from "react-native";

export default function Login({ navigation }: any) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO: login
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={setIdentifier}
        value={identifier}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <Button title="Login" onPress={() => navigation.navigate("Home")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
