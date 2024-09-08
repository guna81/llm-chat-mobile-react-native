import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "@/screens/main/Home";
import Sidebar from "@/components/layout/Sidebar";
import CameraView from "@/components/common/CameraView";
const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={Sidebar}
      >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Camera" component={CameraView} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
