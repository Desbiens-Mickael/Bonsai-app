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

const Drawer = createDrawerNavigator();

export default function MyDrawer({ setIsSignedIn }: any) {
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
                await SecureStore.deleteItemAsync("token");
                setIsSignedIn(false);
                client.resetStore();
                console.log(
                  "tokenHome",
                  await SecureStore.getItemAsync("token")
                );
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
      >
        {(props) => <MyTab {...props} setIsSignedIn={setIsSignedIn} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
