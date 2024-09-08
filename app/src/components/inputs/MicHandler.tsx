import React from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { darkTheme } from "@/const/theme";
import { commonStyles } from "@/styles/common";
import { ICON_SIZE } from "@/const/const";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import useSpeechToText from "@/hooks/useSpeechToText";

const MicHandler = () => {
  // const { startRecording, stopRecording, isRecording } = useAudioRecorder();
  const { result, isListening, error, startListening, stopListening } =
    useSpeechToText();

  console.log({ result });

  const handleStartRecording = () => {
    try {
      if (isListening) {
        stopListening();
      } else {
        startListening();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleStartRecording}
        style={[styles.micButton, commonStyles.buttonIcon]}
      >
        <Feather
          styles={{ marginRight: 8 }}
          name={isListening ? "mic-off" : "mic"}
          size={ICON_SIZE.MEDIUM}
          color={darkTheme.iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default MicHandler;

const styles = StyleSheet.create({
  micButton: {
    marginRight: 16,
  },
});
