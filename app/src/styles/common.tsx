import { darkTheme } from "@/const/theme";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    // marginRight: 8,
    // color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderColor: darkTheme.secondaryTextColor,
    borderWidth: 1,
    borderRadius: 40,
    padding: 8,
  },
  buttonText: {
    color: "#fff",
  },
});
