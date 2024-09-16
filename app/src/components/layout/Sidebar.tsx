import { View, Text, StyleSheet } from "react-native";
import { darkTheme } from "@/const/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import History from "@/components/sidebar/History";

const Sidebar = (props) => {
  console.log({ props });
  return (
    <View style={styles.drawerContent}>
      <View style={styles.avatar}>
        <MaterialCommunityIcons
          name="face-man-profile"
          size={80}
          color={darkTheme.secondaryTextColor}
        />
      </View>
      <View style={styles.historyContainer}>{/* <History /> */}</View>
      <Text style={styles.developed}>Developed By Guna</Text>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: darkTheme.secondaryBackgroundColor,
  },
  avatar: {
    marginBottom: 24,
  },
  historyContainer: {
    flex: 1,
    width: "100%",
  },
  developed: {
    fontSize: 14,
    fontWeight: "400",
    color: darkTheme.primaryTextColor,
    textAlign: "center",
  },
});
