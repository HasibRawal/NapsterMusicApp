import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumTracks } from '../redux/actions/trackAction';
import { AppState } from '../redux/store/rootReducer';
import TrackItem from '../components/TrackItem';
import { AlbumDetailScreenNavigationProp, AlbumDetailScreenRouteProp } from '../navigation/MainNavigator';
import { Track } from '../types'; 

type AlbumDetailScreenProps = {
  navigation: AlbumDetailScreenNavigationProp;
  route: AlbumDetailScreenRouteProp;
};

const AlbumDetailScreen: React.FC<AlbumDetailScreenProps> = ({ route, navigation }) => {
  const { albumId } = route.params;
  const dispatch = useDispatch();
  const { tracks, loading, error } = useSelector((state: AppState) => state.tracks);

  useEffect(() => {
    dispatch(fetchAlbumTracks(albumId));
  }, [dispatch, albumId]);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  const albumCoverUrl = tracks.length ? tracks[0].albumCoverUrl : '';

  return (
    <View style={styles.container}>
      {albumCoverUrl ? <Image source={{ uri: albumCoverUrl }} style={styles.cover} /> : null}
      <Text style={styles.trackCount}>{tracks.length} tracks</Text>
      <FlatList
      showsVerticalScrollIndicator={false}
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrackItem
            track={item}
            onPress={() => navigation.navigate('TrackDetail', { tracks })}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  cover: { width: '100%', height: 200, marginBottom: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { flex: 1, justifyContent: 'center', alignItems: 'center', color: 'red' },
  trackCount: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
});

export default AlbumDetailScreen;
