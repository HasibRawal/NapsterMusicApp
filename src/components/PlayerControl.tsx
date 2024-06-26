import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type PlayerControlsProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onForward5Seconds: () => void;
};

const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onForward5Seconds,
}) => {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity onPress={onPrevious} style={styles.touchable}>
        <Text style={styles.iconText}>«</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPlayPause} style={styles.touchable}>
        <Text style={styles.iconText}>{isPlaying? '||' : '►'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext} style={styles.touchable}>
        <Text style={styles.iconText}>»</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onForward5Seconds} style={styles.touchable}>
        <Text style={styles.iconText}>›5›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  touchable: {
    opacity:1,
    borderWidth:1,
    padding:10,
    alignSelf:'center',
    borderRadius:20,
    backgroundColor:'black'
  },
  iconText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PlayerControls;