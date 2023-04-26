import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import client from "./gql/client";
import MyStack from "./components/MyStack";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
      <StatusBar style={"auto"} />
    </ApolloProvider>
  );
}
