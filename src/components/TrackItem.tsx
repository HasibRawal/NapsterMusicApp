import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Track } from '../types';

type TrackItemProps = {
  track: Track;
  onPress: () => void;
};

const TrackItem: React.FC<TrackItemProps> = ({ track, onPress }) => {
  const trackLength = Math.ceil(track.playbackSeconds / 60); // Length in minutes

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.info}>
        <Text style={styles.name}>{track.name}</Text>
        <Text style={styles.details}>
          {trackLength} minutes • {track.artistName.join(', ')}
        </Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={onPress}>
      <Image style={styles.playImage} resizeMode='cover' source={{uri:'https://cdn.icon-icons.com/icons2/3251/PNG/512/play_circle_regular_icon_203365.png'}} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row',borderRadius:15, alignItems: 'center', padding: 10, borderWidth: 1, borderBottomColor: '#ddd',marginVertical:5,backgroundColor:'white',
    overflow: 'hidden',
    shadowColor: 'grey',
    shadowRadius: 10,
    shadowOpacity: 1, },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold' },
  details: { fontSize: 14, color: '#555' },
  playButton: {padding: 10,alignSelf:'flex-start'},
  playImage:{height:50,width:50,marginTop:5}
});

export default TrackItem;
