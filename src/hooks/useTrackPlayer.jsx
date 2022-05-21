import React from 'react';
import TrackPlayer, {
  RepeatMode,
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import {
  _getHHMMSSFromMillis,
  getPercentageOf,
  toTrackFormat,
} from '../shared/helpers/general';
import SoundPlayer from 'react-native-sound-player';
import env from '../services/environment';
import { Platform } from 'react-native';
// Creates the player
const setup = async (num = 0) => {
  try {
    try {
      try {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
          return;
        }
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(env.initAudio);
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
      } catch (error) {
        if (error.code !== 'player_already_initialized') {
          await TrackPlayer.setupPlayer();
          await setup(num + 1);
          console.warn('Init Player Error:', error.message, { num });
        }
      }
    } catch (e) {
      console.warn(e.message);
    }
  } catch (e) {}
};

const togglePlayback = playbackState => async () => {
  const currentTrack = await TrackPlayer.getCurrentTrack();
  if (currentTrack == null) {
    const tracks = await TrackPlayer.getQueue();
    if (tracks.length > 0) {
      await TrackPlayer.play();
    }
  } else {
    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    if (position === duration) {
      await TrackPlayer.seekTo(0);
    }
    if (playbackState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const add = async musics => {
  try {
    const tracks = toTrackFormat(musics);
    try {
      await TrackPlayer.add(tracks);
    } catch (error) {
      // await setup();
      await TrackPlayer.add(tracks);
      // @ts-ignore
      console.error(error.message);
    }
    await TrackPlayer.play();
  } catch (e) {}
};
export function useTrackPlayer() {
  const state = usePlaybackState();
  const progress = useProgress();

  const [track, setTrack] = React.useState(null);
  const [info, setInfo] = React.useState({ percent: 0, duration: 0 });

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const currentTrack = await TrackPlayer.getTrack(event.nextTrack);
      setTrack(currentTrack);
    }
  });

  React.useEffect(() => {
    const percent = getPercentageOf(progress.position, progress.duration) / 100;
    const currentTime = _getHHMMSSFromMillis(progress.position * 1000);
    const duration = _getHHMMSSFromMillis(progress.duration * 1000);
    const timeLeft = _getHHMMSSFromMillis(
      progress.duration * 1000 - progress.position * 1000,
    );
    setInfo({
      percent,
      currentTime,
      duration,
      timeLeft,
    });
    (async () => {
      const currentTrack = await TrackPlayer.getCurrentTrack();
      if (currentTrack !== null) {
        const track = await TrackPlayer.getTrack(currentTrack);
        setTrack(track);
      }
    })();
  }, [progress.position]);

  return {
    state: {
      isPlaying: state === State.Playing,
      isPaused: state === State.Paused,
      ...progress,
      ...info,
    },
    setup,
    toggle: togglePlayback(state),
    progress,
    track,
    getCurrentTrack: () => {
      return track;
    },
    play: TrackPlayer.play,
    add,
    next: async () => {
      await TrackPlayer.skipToNext();
    },
    previous: async () => {
      await TrackPlayer.skipToPrevious();
    },
    seekTo: async position => {
      await TrackPlayer.seekTo(position);
    },
    resetAndPlay: async (musics, reset = false) => {
      try {
        if (Platform.OS === 'ios') {
          await TrackPlayer.removeUpcomingTracks();
        } else {
          await TrackPlayer.reset();
        }
        // console.log(TrackPlayer)
        // return;
        const tracks = toTrackFormat(musics);
        await TrackPlayer.add(tracks);
        await TrackPlayer.skipToNext();
        await TrackPlayer.play();
      } catch (e) {
        console.warn(e);
      }
    },
    addPlaylist: async musics => {
      try {
        // check currently playing track
        const id = await TrackPlayer.getCurrentTrack();
        if (id !== null) {
          const currentTrack = await TrackPlayer.getTrack(id);
          const queue = await TrackPlayer.getQueue();
          // remove current track from playlist
          const tracks = toTrackFormat(musics).reduce((arr, track) => {
            if (track.id !== currentTrack.id) {
              const index = queue.findIndex(t => t.id === track.id);
              if (index === -1) {
                arr.push(track);
              } else {
                queue.splice(index, 1);
              }
            }
            return arr;
          }, []);
          // add to playlist
          await TrackPlayer.add(tracks);
        }
      } catch (e) {}
    },
  };
}

export default useTrackPlayer;
