import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import BonsaiList from "../screen/BonsaiList";
import MyTab from "./MyTab";
import * as SecureStore from "expo-secure-store";
import client from "../gql/client";
import { useLogoutMutation } from "../gql/generated/schema";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  const [Logout] = useLogoutMutation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Déconnexion"
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
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="Home_Drawer"
        options={{
          headerTitle: "Accueil",
        }}
        component={MyTab}
      />
    </Drawer.Navigator>
  );
}
