import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screen/Home";
import BonsaiList from "../screen/BonsaiList";

const Tab = createBottomTabNavigator();

export default function MyTab({ isLogin }: any) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarLabel: () => {
          return null;
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Mes bonsais") {
            iconName = focused ? "list" : "list-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#7100FE",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} isLogin={isLogin} />}
      </Tab.Screen>
      <Tab.Screen name="Mes bonsais" component={BonsaiList} />
    </Tab.Navigator>
  );
}