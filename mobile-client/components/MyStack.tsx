import "react-native-gesture-handler";
import { useCallback, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import ShowBonsai from "../screen/ShowBonsai";
import HomeScreen from "../screen/Home";
import Login from "../screen/Login";
import Home from "../screen/Home";
import BonsaiList from "../screen/BonsaiList";
import MyTab from "./MyTab";
import MyDrawer from "./MyDrawer";

const Stack = createStackNavigator();

export default function MyStack() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useFocusEffect(
    useCallback(() => {
      SecureStore.getItemAsync("token").then((token) => {
        if (token) {
          setIsSignedIn(true);
          console.log("tokenStack", token);
        } else {
          setIsSignedIn(false);
        }
      });
    }, [])
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerBackTitle: "Retour",
        animationTypeForReplace: isSignedIn ? "push" : "pop",
        headerStyle: {
          backgroundColor: "#7100FE",
        },
      }}
    >
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home_stack" options={{ headerShown: false }}>
            {(props) => <MyDrawer {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>

          <Stack.Screen
            name="ShowBonsai"
            component={ShowBonsai}
            options={({ route }: any) => ({ title: route.params.name })}
          />

          <Stack.Screen name="Mes bonsais" component={BonsaiList} />

          {/* <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} /> */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login">
            {(props) => <Login {...props} setIsSignedIn={setIsSignedIn} />}
          </Stack.Screen>

          {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
        </>
      )}
    </Stack.Navigator>
  );
}
