import React, { useState } from 'react';
import { Modal, View, StyleSheet, Image, FlatList,TouchableOpacity, Text, StatusBar,} from 'react-native';
import FullScreenContainerImage from './FullScreenImage';
import ImageViewerHeader from './ImageViewerHeader';

export default function Imageshow({ images: propImages, goToHomePage, handleChooseNewFolder }) {
  const [showFlatList, setShowFlatList] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = propImages && propImages.length > 0 ? propImages : [];
  console.log("imageShow component rendered");
  return (
    <Modal
      visible={true}
      transparent={false}
      onRequestClose={goToHomePage}
    >
      <StatusBar hidden />
      <View style={styles.modalContainer}>
        {images.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>No Image Found...!</Text>
          </View>
        ) : (
          <>
            <View style={styles.imageViewer}>
              <FullScreenContainerImage source={{ uri: images[currentIndex].uri }} />
              {/* Header overlay */}
              <View style={styles.headerOverlay}>
                <ImageViewerHeader
                  imageName={images[currentIndex]?.filename}
                  goToHomePage={goToHomePage}
                  handleChooseNewFolder={handleChooseNewFolder}
                  setShowFlatList={setShowFlatList}
                  showFlatList={showFlatList}
                />
              </View>
            </View>
            {showFlatList && (
              <View style={styles.thumbnailContainer}>
                <FlatList
                  data={images}
                  horizontal
                  renderItem={({ item, index }) => (
                    <TouchableOpacity 
                      onPress={() => setCurrentIndex(index)}
                      style={[
                        styles.thumbnailWrapper,
                        currentIndex === index && styles.activeThumbnail,
                      ]}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.thumbnailImage}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    padding: 0,
    margin: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageViewer: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  thumbnailContainer: {
    height: 100,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  thumbnailWrapper: {
    borderWidth: 2,
    borderColor: 'transparent',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeThumbnail: {
    borderColor: 'white',
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 6,
  },
});
