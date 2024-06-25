import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbums } from '../redux/actions/albumAction';
import { AppState } from '../redux/store/rootReducer';
import AlbumItem from '../components/AlbumItem';
import { AlbumListScreenNavigationProp } from '../navigation/MainNavigator';

type AlbumListScreenProps = {
  navigation: AlbumListScreenNavigationProp;
};

const AlbumListScreen: React.FC<AlbumListScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { albums, loading, error } = useSelector((state: AppState) => state.albums);
  const [loadingMore, setLoadingMore] = useState(false); 
  const [page, setPage] = useState(1); 

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);



  const handleEndReached = () => {
    if (!loadingMore && !loading && !error) {
      setLoadingMore(true);
      dispatch(fetchAlbums(page + 1))
        .then(() => {
          setPage(prevPage => prevPage + 1);
        })
        .catch(() => {
          // Handle error if needed
        })
        .finally(() => {
          setLoadingMore(false);
        });
    }
  };
  const renderFooter = () => {
    if (!loadingMore) return null;
    return <ActivityIndicator size="small" color="#000" />;
  };
  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <FlatList
      data={albums}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AlbumItem
          album={item}
          onPress={() => navigation.navigate('AlbumDetail', { albumId: item.id })}
        />
      )}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}

    />
  );
};

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { color: 'red', fontSize: 16 },
});

export default AlbumListScreen;
