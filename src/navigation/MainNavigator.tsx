import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator,NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import AlbumListScreen from '../screens/AlbumListScreen';
import AlbumDetailScreen from '../screens/AlbumDetailScreen';
import TrackScreen from '../screens/TrackScreen';

type RootStackParamList = {
  AlbumList: undefined;
  AlbumDetail: { albumId: string };
  TrackDetail: { previewUrl: string; trackName: string; trackArtists: string };
};

export type AlbumListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AlbumList'>;
export type AlbumDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AlbumDetail'>;
export type TrackDetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TrackDetail'>;

export type AlbumDetailScreenRouteProp = RouteProp<RootStackParamList, 'AlbumDetail'>;
export type TrackDetailScreenRouteProp = RouteProp<RootStackParamList, 'TrackDetail'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:'grey'}}} initialRouteName="AlbumList">
        <Stack.Screen  name="AlbumList" component={AlbumListScreen} options={{ title: 'Albums' }} />
        <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} options={{ title: 'Album Details' }} />
        <Stack.Screen name="TrackDetail" component={TrackScreen} options={{ title: 'Track Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
