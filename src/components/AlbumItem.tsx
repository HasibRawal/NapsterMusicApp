import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Album } from '../types';

type AlbumItemProps = {
  album: Album;
  onPress: () => void;
};

const AlbumItem: React.FC<AlbumItemProps> = ({ album, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.coverContainer}>
        <View style={styles.cover}>
        <Text style={styles.titleCover}>{album.name}</Text>


        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{album.name}</Text>
        <Text style={styles.artist}>{album.artistNames.join(', ')}</Text>
        <Text style={styles.releaseDate}>{album.releaseDate}</Text>
        <Text style={styles.trackCount}>{album.trackCount} Tracks</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  coverContainer: {
    marginRight: 16,
  },
  cover: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#ccc', // Placeholder background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  titleCover: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  artist: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  releaseDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  trackCount: {
    fontSize: 12,
    color: '#999',
  },
});

export default AlbumItem;
