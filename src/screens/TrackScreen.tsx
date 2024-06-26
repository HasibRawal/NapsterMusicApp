import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import Sound from 'react-native-sound';
import PlayerControls from '../components/PlayerControl';
import { TrackDetailScreenNavigationProp, TrackDetailScreenRouteProp } from '../navigation/MainNavigator';
import { Track } from '../types';

type TrackDetailScreenProps = {
  navigation: TrackDetailScreenNavigationProp;
  route: TrackDetailScreenRouteProp;
};

const TrackDetailScreen: React.FC<TrackDetailScreenProps> = ({ route, navigation }) => {
  const { tracks } = route.params;
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (sound) {
      sound.stop();
      sound.release();
    }
    if (tracks && tracks.length > 0 && tracks[currentTrackIndex]?.previewUrl) {
      const newSound = new Sound(tracks[currentTrackIndex].previewUrl, '', (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        setSound(newSound);
        newSound.getDuration((seconds) => setDuration(seconds));
        newSound.play(() => {
          setIsPlaying(false); // Callback after playback completes (optional)
        });
        setIsPlaying(true); // Start playing when new sound is loaded
      });
    }
    return () => {
      if (sound) {
        sound.stop();
        sound.release();
      }
    };
  }, [currentTrackIndex]);

  const handleBackPress = () => {
    if (sound) {
      sound.stop();
      sound.release();
    }
    return false; // Prevent default behavior (exit the app)
  };

  const playPauseHandler = () => {
    if (!sound) return;
    if (isPlaying) {
      sound.pause();
    } else {
      sound.play(() => {
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrackHandler = () => {
    if (!sound) return;
    sound.stop();
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrackHandler = () => {
    if (!sound) return;
    sound.stop();
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  const forward5SecondsHandler = () => {
    if (!sound) return;
    sound.getCurrentTime((seconds) => {
      sound.setCurrentTime(seconds + 5);
    });
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <View style={styles.container}>
      {currentTrack && (
        <>
          <Text style={styles.trackName}>{currentTrack.name}</Text>
          <Text style={styles.trackArtists}>{currentTrack.artistName?.join(', ')}</Text>
          <Text style={styles.duration}>{formatDuration(duration)}</Text>
          <PlayerControls
            isPlaying={isPlaying}
            onPlayPause={playPauseHandler}
            onNext={nextTrackHandler}
            onPrevious={prevTrackHandler}
            onForward5Seconds={forward5SecondsHandler}
          />
        </>
      )}
    </View>
  );
};

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'black',
  },
  trackName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  trackArtists: {
    fontSize: 18,
    color: 'lightgrey',
    marginBottom: 22,
  },
  duration: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 10,
  },
});

export default TrackDetailScreen;
