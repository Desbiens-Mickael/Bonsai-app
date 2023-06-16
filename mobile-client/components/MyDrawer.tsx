import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";

import MyTab from "./MyTab";
import client from "../gql/client";

import { useLogoutMutation } from "../gql/generated/schema";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const [Logout] = useLogoutMutation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerActiveBackgroundColor: "#243E36",
        drawerActiveTintColor: "#ffffff",
        drawerInactiveTintColor: "#243E36",
        drawerLabelStyle: {
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: -20,
        },
      }}
      drawerContent={(props) => {
        return (
          <View style={styles.container}>
            <DrawerContentScrollView {...props}>
              <View style={styles.container}>
                <LinearGradient
                  colors={["#243E36", "#E8E5DA"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradient}
                >
                  <Image
                    source={require("../assets/avatar.png")}
                    style={styles.avatar}
                  />
                  <Text style={styles.name}>UserName</Text>
                </LinearGradient>
              </View>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await Logout();
                    SecureStore.deleteItemAsync("token");
                  } catch (error) {
                    console.log(error);
                  } finally {
                    client.resetStore();
                    props.navigation.closeDrawer();
                  }
                }}
              >
                <View style={styles.logoutButton}>
                  <Ionicons name="log-out-outline" size={30} color="#243E36" />
                  <Text style={styles.textButtonLogout}>Déconnexion</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
    >
      <Drawer.Screen
        name="Home_Drawer"
        options={{
          headerTitle: "Accueil",
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
        component={MyTab}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    height: 150,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginTop: 8,
  },
  footer: {
    height: 100,
    borderTopColor: "#243E36",
    borderTopWidth: 1,
    padding: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  textButtonLogout: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#243E36",
    marginLeft: 10,
  },
});
