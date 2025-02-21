import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

export default function ImageViewerHeader({ imageName, goToHomePage, handleChooseNewFolder, setShowFlatList, showFlatList }) {
  const toggleFlatList = () => setShowFlatList(!showFlatList);

  return (
    <View style={styles.headerContainer}>
      {/* <TouchableOpacity onPress={goToHomePage} style={styles.iconContainer}>
        <Image source={require('../assets/left-arrow.png')} style={styles.icon} />
        <Text style={styles.imageName}>{imageName}</Text>
      </TouchableOpacity> */}
      <View>
        <Text style={styles.imageName}>{imageName}</Text>
      </View>

      <View style={styles.iconRow}>
        <TouchableOpacity onPress={handleChooseNewFolder} style={styles.iconContainer}>
          <Image source={require('../assets/new-folder.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlatList} style={styles.iconContainer}>
          <Image source={showFlatList ? require('../assets/Hide.png') : require('../assets/Show.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  imageName: {
    color: 'white',
    fontSize: 16,
  },
  iconRow: {
    flexDirection: 'row',
  },
});
