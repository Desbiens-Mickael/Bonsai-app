import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import ShowBonsai from "../screen/ShowBonsai";
import HomeScreen from "../screen/Home";
import Login from "../screen/Login";

const Stack = createStackNavigator();

export default function MyStack() {
  const isSignedIn = true;
  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ShowBonsai"
            component={ShowBonsai}
            options={({ route }: any) => ({ title: route.params.name })}
          />

          {/* <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} /> */}
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="SignUp" component={SignUpScreen} /> */}
        </>
      )}
    </Stack.Navigator>
  );
}
