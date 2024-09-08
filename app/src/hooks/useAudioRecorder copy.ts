import AudioRecorderPlayer from "react-native-audio-recorder-player";

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function useAudioRecorder() {
  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log(e);
      // setState({
      //   recordSecs: e.currentPosition,
      //   recordTime: audioRecorderPlayer.mmssss(
      //     Math.floor(e.currentPosition)
      //   ),
      // });
      return;
    });
    console.log(result);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    // setState({
    //   recordSecs: 0,
    // });
    console.log(result);
  };

  const onStartPlay = async () => {
    console.log("onStartPlay");
    const msg = await audioRecorderPlayer.startPlayer();
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener((e) => {
      // setState({
      //   currentPositionSec: e.currentPosition,
      //   currentDurationSec: e.duration,
      //   playTime: audioRecorderPlayer.mmssss(
      //     Math.floor(e.currentPosition)
      //   ),
      //   duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      // });
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    console.log("onStopPlay");
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  return {
    onStartRecord,
    onStopRecord,
    onStartPlay,
    onStopPlay,
    onPausePlay,
  };
}
