import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import AppBar from "@/components/layout/AppBar";
import NoData from "@/components/common/NoData";
import { commonStyles } from "@/styles/common";
import { darkTheme } from "@/const/theme";
import ChatInput from "@/components/home/ChatInput";
import Conversation from "@/components/home/Conversation";
import WelcomeNote from "@/components/home/WelcomeNote";
import SamplePrompts from "@/components/home/SamplePrompts";

const Home = () => {
  return (
    <View style={styles.home}>
      <AppBar />
      <View style={styles.container}>
        <WelcomeNote />

        {/* <SamplePrompts /> */}

        <Conversation />

        <ChatInput />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    backgroundColor: darkTheme.primaryBackgroundColor,
  },
  container: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: darkTheme.secondaryBackgroundColor,
  },
});
