import React, { useState, useEffect, useRef } from 'react';
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
  const [duration, setDuration] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.release();
      }
    };
  }, []);

  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
    }
    if (tracks && tracks.length > 0 && tracks[currentTrackIndex]?.previewUrl) {
      const newSound = new Sound(tracks[currentTrackIndex].previewUrl, '', (error) => {
        if (error) {
          console.log('Failed to load the sound', error);
          return;
        }
        soundRef.current = newSound;
        newSound.getDuration((seconds) => setDuration(Math.ceil(seconds)));
        newSound.play(() => {
          setIsPlaying(false); // Callback after playback completes (optional)
          setCurrentTime(0); // Reset current time when playback completes
        });
        setIsPlaying(true); // Start playing when new sound is loaded
        newSound.setCurrentTime(currentTime);
      });
    }
    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
        soundRef.current.release();
      }
    };
  }, [currentTrackIndex]);

  const handleBackPress = () => {
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
    }
    return false; // Prevent default behavior (exit the app)
  };

  const playPauseHandler = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play(() => {
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrackHandler = () => {
    if (!soundRef.current) return;
    soundRef.current.stop();
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrackHandler = () => {
    if (!soundRef.current) return;
    soundRef.current.stop();
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  const forward5SecondsHandler = () => {
    if (!soundRef.current) return;
    soundRef.current.getCurrentTime((seconds) => {
      soundRef.current?.setCurrentTime(seconds + 5);
      setCurrentTime(seconds + 5);
    });
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <View style={styles.container}>
      {currentTrack && (
        <>
          <Text style={styles.trackName}>{currentTrack.name}</Text>
          <Text style={styles.trackArtists}>{currentTrack.artistName?.join(', ')}</Text>
          <Text style={styles.duration}>{formatDuration(currentTime)} / {formatDuration(duration ?? 0)}</Text>
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
