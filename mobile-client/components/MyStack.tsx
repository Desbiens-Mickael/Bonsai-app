import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import ShowBonsai from "../screen/ShowBonsai";
import Login from "../screen/Login";
import MyDrawer from "./MyDrawer";
import { useGetCurrentUserQuery } from "../gql/generated/schema";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Stack = createStackNavigator();

export default function MyStack() {
  const { data: getCurentUser, loading } = useGetCurrentUserQuery({
    errorPolicy: "ignore",
  });

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#7100FE" />
      </View>
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerBackTitle: "Retour",
        animationTypeForReplace: getCurentUser ? "push" : "pop",
        headerStyle: {
          backgroundColor: "#7100FE",
        },
      }}
    >
      {getCurentUser ? (
        <>
          <Stack.Screen
            name="Home_stack"
            component={MyDrawer}
            options={{ headerShown: false, title: "Accueil2" }}
          />
          <Stack.Screen
            name="ShowBonsai"
            component={ShowBonsai}
            options={({ route }: any) => ({ title: route.params.name })}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
