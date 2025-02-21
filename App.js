import React, { useState, useEffect } from "react";
import { StatusBar, StyleSheet, View, Button } from "react-native";
import * as MediaLibrary from "expo-media-library";
import Imageshow from "./Components/Imageshow";
import SplashScreen from "./Components/Splashscreen";
import * as ScreenOrientation from "expo-screen-orientation";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [albums, setAlbums] = useState([]);
  const [images, setImages] = useState([]);
  const [imageShowComponentActive, setImageShowComponentActive] = useState(false);
  const [showSplashScreen, setShowSplashScreen] = useState(true);

  const openAlbum = async (albumId) => {
    try {
      await AsyncStorage.setItem("albumId", albumId);
      const assets = await MediaLibrary.getAssetsAsync({ album: albumId });
      setImages(assets.assets);
      setImageShowComponentActive(true);
    } catch (error) {
      alert("Error fetching images. Please try again later.");
    }
  };

  const handleChooseNewFolder = async () => {
    try {
      await AsyncStorage.removeItem("albumId");
      setImageShowComponentActive(false);
    } catch (error) {
      alert("Error on selecting new folder.");
    }
  };

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const { granted } = await MediaLibrary.getPermissionsAsync();
        if (!granted) await MediaLibrary.requestPermissionsAsync();

        const previousAlbumId = await AsyncStorage.getItem("albumId");
        if (previousAlbumId) openAlbum(previousAlbumId);
        else setAlbums(await MediaLibrary.getAlbumsAsync());
      } catch {
        alert("Error fetching albums.");
      }
    };

    fetchAlbums();
  }, [imageShowComponentActive]);

  useEffect(() => {
    const initApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setShowSplashScreen(false);
    };

    initApp();
  }, []);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    return ScreenOrientation.addOrientationChangeListener((event) => {
      StatusBar.setHidden(imageShowComponentActive);
    }).remove;
  }, [imageShowComponentActive]);

  if (showSplashScreen) return <SplashScreen />;

  return (
    <>
      <StatusBar hidden={imageShowComponentActive} />
      {!imageShowComponentActive && (
        <View style={styles.container}>
          {albums.map((album, index) => (
            <View key={index} style={styles.folder}>
              <Button title={album.title} onPress={() => openAlbum(album.id)} />
            </View>
          ))}
        </View>
      )}
      {imageShowComponentActive && (
        <Imageshow images={images} goToHomePage={() => setImageShowComponentActive(false)} handleChooseNewFolder={handleChooseNewFolder} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
  },
  folder: {
    height: 100,
    width: 100,
  },
});
