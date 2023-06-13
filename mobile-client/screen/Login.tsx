import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as SecureStore from "expo-secure-store";
import { useLoginMutation } from "../gql/generated/schema";
import client from "../gql/client";

export default function Login() {
  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("test1234");
  const [error, setError] = useState("");
  const [hide, setHide] = useState(true);

  const [login] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const token = await login({
        variables: {
          data: {
            email,
            password,
          },
        },
      });
      if (token)
        SecureStore.setItemAsync("token", JSON.stringify(token?.data?.login));
      console.log("tokenLogin", token?.data?.login);
      setError("");
    } catch (error) {
      setError("Identifiant ou mot de passe incorrect");
    } finally {
      client.resetStore();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        inputMode="email"
      />
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.inputPassword}
          onChangeText={setPassword}
          value={password}
          placeholder="Mot de passe"
          inputMode="text"
          secureTextEntry={hide}
          inputAccessoryViewID="password"
        />
        {hide ? (
          <Ionicons
            name="eye-off-outline"
            size={30}
            onPress={() => setHide(!hide)}
            style={styles.hideIcon}
          />
        ) : (
          <Ionicons
            name="eye-outline"
            size={30}
            onPress={() => setHide(!hide)}
            style={styles.hideIcon}
          />
        )}
      </View>
      <Text style={styles.textError}>{error}</Text>
      <View style={styles.boxButton}>
        <TouchableOpacity
          onPress={() => handleLogin()}
          activeOpacity={0.5}
          style={styles.loginBtn}
        >
          <LinearGradient
            colors={["#B57CFC", "#7100FE"]}
            start={{ y: 1.5, x: 0.0 }}
            end={{ y: 0.0, x: 0.0 }}
            style={styles.loginBtn}
          >
            <Text style={styles.buttonSubmit}>Connexion</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  passwordBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 12,
    marginBottom: 80,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputPassword: {
    flex: 3,
    height: 40,
    padding: 10,
  },
  hideIcon: {
    marginRight: 10,
    color: "#7100FE",
  },
  textError: {
    color: "red",
    textAlign: "center",
  },
  boxButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonSubmit: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
