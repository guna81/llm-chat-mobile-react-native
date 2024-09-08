import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";
import { darkTheme } from "@/const/theme";
import { store } from "@/store";
import DrawerNav from "@/navigations/RootNav";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <DrawerNav />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.primaryBackgroundColor,
  },
});
