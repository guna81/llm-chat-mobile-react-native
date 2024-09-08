// useSpeechToText.js

import { useState, useEffect, useCallback } from "react";
import Voice from "@react-native-voice/voice";

const useSpeechToText = () => {
  const [result, setResult] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    setIsListening(true);
  };

  const onSpeechEnd = (e) => {
    setIsListening(false);
  };

  const onSpeechResults = (e) => {
    setResult(e.value[0]);
  };

  const onSpeechError = (e) => {
    setError(e.error);
    setIsListening(false);
  };

  const startListening = useCallback(async () => {
    try {
      setError(null);
      await Voice.start("en-US");
    } catch (e) {
      setError(e);
    }
  }, []);

  const stopListening = useCallback(async () => {
    try {
      await Voice.stop();
    } catch (e) {
      setError(e);
    }
  }, []);

  return {
    result,
    isListening,
    error,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
