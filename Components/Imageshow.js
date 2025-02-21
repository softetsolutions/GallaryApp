import React, { useState } from 'react';
import { Modal, View, StyleSheet, Image, FlatList, TouchableOpacity, Text, StatusBar } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageViewerHeader from './ImageViewerHeader';

export default function Imageshow({ images, goToHomePage, handleChooseNewFolder }) {

  const [showFlatList, setShowFlatList] = useState(true);

  const [initialIndex, setInitialIndex] = useState(0)
  images = images.map((obj) => {
    return {
      url: obj.uri,
      fileName: obj.filename
    }
  })

  console.log("imageShow component rendered")

  return (
    <Modal
      visible={true}
      transparent={false}
      style={{ flex: 1, backgroundColor: 'black' }}
      onRequestClose={() => {
        goToHomePage();
      }}
    >
     
      {(images.length == 0) ? <View
        style={styles.container}
      >
        <Text>No Image Found...!</Text>
      </View> : <>
        <ImageViewer
          index={initialIndex}
          imageUrls={images}
          style={(showFlatList) ? { flex: 8 } : { flex: 1 }}
          onChange={(index) => setInitialIndex(index)}
          renderHeader={(index) => { return <ImageViewerHeader imageName={images[index]?.fileName} goToHomePage={goToHomePage} handleChooseNewFolder={handleChooseNewFolder} setShowFlatList={setShowFlatList} showFlatList={showFlatList} /> }}
        />
        {showFlatList && <View style={styles.flatListContainer}>
          <FlatList
            data={images}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setInitialIndex(index)
                }}
              >
                <Image
                  source={{ uri: item.url }}
                  style={styles.flatListImage}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>}


      </>}

    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flatListImage: {
    width: 100,
    height: '100%',
    margin: 5,
    borderRadius: 10,
  },
});
