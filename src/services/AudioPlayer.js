import { Audio, AVPlaybackStatus, AVPlaybackNativeSource } from "expo-av";
import { Platform } from "react-native";
import { getXFromPercentageOf } from "../shared/helpers/general";

class AudioPlayer {
  isPlaying = false;
  audioInstance = null;
  url = "";
  info = {
    title: "",
    artist: "",
    album: "",
    artwork: "",
  };
  statusUpdate = null;

  constructor() {
    this.isPlaying = false;
    this.audioInstance = null;
    Audio.requestPermissionsAsync();
  }

  enable = async () => {
    if (!this.audioInstance) {
      this.audioInstance = new Audio.Sound();
      await Audio.setAudioModeAsync(
        Platform.OS === "ios"
          ? {
              interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            }
          : {
              // allowsRecordingIOS: true,
              staysActiveInBackground: true,
            }
      );
      this.audioInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    }
  };
  disable = async () => {
    if (this.audioInstance) {
      await this.audioInstance.unloadAsync();
      await this.audioInstance.setOnPlaybackStatusUpdate(null);
      this.audioInstance = null;
    }
  };
  getStatusUpdate = (cb = () => {}) => {
    this.statusUpdate = cb;
  };
  onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded && this.audioInstance) {
      this.isPlaying = status.isPlaying;
      this.audioInstance.playAsync();
      if (this.statusUpdate) {
        this.statusUpdate(status);
      }
    }
  };

  reload = async () => {
    await this.disable();
    await this.enable();
  };
  start = async (url) => {
    if (this.audioInstance && url) {
      const source = {
        uri: url,
      };
      this.url = source.uri;
      await this.audioInstance.loadAsync(
        source,
        {
          shouldPlay: true,
          volume: 1.0,
        },
        false
      );
    } else {
      console.log("AudioPlayer: start: no audio instance or url");
    }
  };
  play = async () => {
    if (this.audioInstance) {
      await this.audioInstance.playAsync();
    }
  };
  pause = async () => {
    if (this.audioInstance) {
      await this.audioInstance.pauseAsync();
    }
  };
  stop = async () => {
    if (this.audioInstance) {
      await this.audioInstance.stopAsync();
    }
  };
  toggle = async () => {
    const aud = (await this.getStatus()) || {};
    if (aud) {
      if (aud.isPlaying) {
        await this.pause();
      } else {
        await this.play();
      }
    }
  };
  getStatus = async () => {
    if (this.audioInstance) {
      return this.audioInstance.getStatusAsync();
    }
    return null;
  };
  getInstance = async () => {
    return this.audioInstance;
  };
  isPlayingAudio = async () => {
    return this.isPlaying;
  };
  infoAsync = (info) => {
    this.info = info;
  };

  seekTo = (position) => {
    if (this.audioInstance) {
      this.audioInstance.getStatusAsync().then((status) => {
        if (status && this.audioInstance) {
          this.audioInstance.setPositionAsync(
            getXFromPercentageOf(position, status.durationMillis)
          );
        }
      });
    }
  };
}
const audio = new AudioPlayer();
audio.enable().then(() => {
  console.log("AudioPlayer: enabled");
});
export default audio;
