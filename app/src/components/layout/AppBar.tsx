import { StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";

import { Feather } from "@expo/vector-icons";
import { darkTheme } from "@/const/theme";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const AppBar = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.menuBtn} onPress={handlePress}>
        <Feather name="menu" size={24} color={darkTheme.iconColor} />
      </TouchableOpacity>

      <Text style={styles.title}>LLM Chat</Text>
      <Text />
      {/* <AntDesign name="search1" size={24} color="#fff" /> */}
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  bar: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    width: "100%",
    // height: 54,
    // backgroundColor: darkTheme.primaryBackgroundColor,
  },
  menuBtn: {
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: darkTheme.primaryTextColor,
  },
});
