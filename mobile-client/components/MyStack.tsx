import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import ShowBonsai from "../screen/ShowBonsai";
import Login from "../screen/Login";
import MyDrawer from "./MyDrawer";
import { useGetCurrentUserQuery } from "../gql/generated/schema";
import { View, StyleSheet } from "react-native";
import Loader from "./Loader";

const Stack = createStackNavigator();

export default function MyStack() {
  const { data: CurentUser, loading } = useGetCurrentUserQuery({
    errorPolicy: "ignore",
  });

  if (loading)
    return (
      <View style={styles.container}>
        <Loader />
      </View>
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#fff",
        headerBackTitle: "Retour",
        animationTypeForReplace: CurentUser ? "push" : "pop",
        headerStyle: {
          backgroundColor: "#7100FE",
        },
      }}
    >
      {CurentUser ? (
        <>
          <Stack.Screen
            name="Home_stack"
            component={MyDrawer}
            options={{ headerShown: false }}
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
