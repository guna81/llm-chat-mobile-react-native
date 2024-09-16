import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { darkTheme } from "@/const/theme";
import { selectMessages } from "@/store/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-native-markdown-display";
import markdownStyles from "@/const/markdownStyles";

const Conversation = ({}) => {
  const messages = useSelector(selectMessages);

  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  console.log({ messages });

  return (
    <ScrollView style={styles.conversationContainer} ref={scrollViewRef}>
      <View style={styles.conversation}>
        {messages.map((item: any) => (
          <Message key={item.time} message={item} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Conversation;

const Message = ({ message }) => {
  return (
    <View style={styles.messageItem}>
      {message.sender === "user" ? (
        <View style={styles.messageQuestionContainer}>
          <Text style={[styles.messageText, styles.messageQuestion]}>
            {message.content}
          </Text>
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
      ) : (
        <View style={styles.messageAnswerContainer}>
          {/* <Text style={[styles.messageText, styles.messageAnswer]}> */}
          <Markdown style={markdownStyles}>{message.content}</Markdown>
          {/* </Text> */}
          <Text style={styles.messageTime}>{message.time}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  conversationContainer: {
    width: "100%",
    marginBottom: 100,
  },
  conversation: {
    flex: 1,
  },
  messageItem: {
    marginBottom: 16,
  },
  messageText: {
    marginBottom: 4,
    fontSize: 16,
  },
  messageTime: {
    fontSize: 10,
    color: "#ccc",
    alignSelf: "flex-end",
  },

  messageQuestionContainer: {
    backgroundColor: darkTheme.questionBackground,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-end",
    maxWidth: "100%",
  },
  messageAnswerContainer: {
    backgroundColor: darkTheme.answerBackground,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    width: "100%",
  },
  messageQuestion: {
    color: darkTheme.primaryTextColor,
  },
  // messageAnswer: {
  //   color: darkTheme.primaryTextColor,
  // },
});
