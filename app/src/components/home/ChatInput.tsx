import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { darkTheme } from "@/const/theme";
import { useChatMutation } from "@/store/services/chat";
import NoData from "@/components/common/NoData";
import { commonStyles } from "@/styles/common";
import * as DocumentPicker from "expo-document-picker";
import { ICON_SIZE, SUPPORTED_TYPES } from "@/const/const";
import MicHandler from "../inputs/MicHandler";
import CameraHandler from "../inputs/CameraHandler";
import MediaInput from "../inputs/MediaInputs";
import { useDispatch } from "react-redux";
import chatSlice, { addMessage, setMessages } from "@/store/slices/chatSlice";

const ChatInput = () => {
  const dispath = useDispatch();

  const [message, setMessage] = useState("");
  const [trigger, { isLoading }] = useChatMutation();

  const sendMessage = async () => {
    try {
      dispath(
        addMessage({
          content: message,
          sender: "user",
          time: new Date().toLocaleTimeString(),
        })
      );
      setMessage("");

      const payload = {
        message: message,
      };

      const result = await trigger(payload).unwrap();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View style={styles.chatInput}>
      <View style={styles.textInputContainer}>
        <TextInput
          // editable={doc ? true : false}
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={darkTheme.primaryTextColor}
        />
        <TouchableOpacity
          style={[styles.sendButton, commonStyles.buttonIcon]}
          onPress={sendMessage}
        >
          {isLoading ? (
            <Feather
              name="loader"
              size={ICON_SIZE.MEDIUM}
              color={darkTheme.iconColor}
            />
          ) : (
            <Feather
              name="send"
              size={ICON_SIZE.MEDIUM}
              color={darkTheme.iconColor}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* <MediaInput /> */}
    </View>
  );
};

export default ChatInput;

const styles = StyleSheet.create({
  chatInput: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: darkTheme.primaryBackgroundColor,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textInputContainer: {
    marginBottom: 24,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: darkTheme.primaryBackgroundColor,
    borderRadius: 8,
    padding: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: darkTheme.secondaryTextColor,
    borderRadius: 8,
    padding: 8,
    color: darkTheme.primaryTextColor,
  },
  sendButton: {
    marginLeft: 8,
  },
});
