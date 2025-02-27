import React, { useState } from 'react';
import { Modal, View, StyleSheet, Image, FlatList, TouchableOpacity, Text, StatusBar,Dimensions } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageViewerHeader from './ImageViewerHeader';

export default function Imageshow({ images, goToHomePage, handleChooseNewFolder }) {

  const [showFlatList, setShowFlatList] = useState(true);

  const [initialIndex, setInitialIndex] = useState(0)
  const [resizeMode, setResizeMode] = useState("cover");
  
  // Get screen dimensions
  const { width, height } = Dimensions.get('window');

  const formattedImages = images.map((obj) => ({
    url: obj.uri,
    fileName: obj.filename,
    width,
    height,
  }));
console.log("imageShow component rendered");
  const toggleResizeMode = () => {
    setResizeMode(resizeMode === "cover" ? "contain" : "cover");
  };
  
  return (
    <Modal
      visible={true}
      transparent={false}
      onRequestClose={goToHomePage}
    >
      <StatusBar hidden />
      <View style={styles.modalContainer}>
        {formattedImages.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>No Image Found...!</Text>
          </View>
        ) : (
          <>
            <ImageViewer
              index={initialIndex}
              imageUrls={formattedImages}
              style={styles.imageViewer}
              backgroundColor="black"
              onChange={(index) => setInitialIndex(index)}
              saveToLocalByLongPress={false}
              enableSwipeDown={false}
              useNativeDriver={true}
              renderImage={(props) => (
                <Image
                  {...props}
                  style={{
                    width,
                    height: showFlatList ? height - 100 : height,
                    resizeMode: resizeMode, 
                  }}
                />
              )}
              renderHeader={(index) => (
                <ImageViewerHeader
                  imageName={formattedImages[index]?.fileName}
                  goToHomePage={goToHomePage}
                  handleChooseNewFolder={handleChooseNewFolder}
                  setShowFlatList={setShowFlatList}
                  showFlatList={showFlatList}
                />
              )}
            />
            
            {/* Resize Mode Toggle Button */}
            <TouchableOpacity 
              style={styles.resizeModeButton} 
              onPress={toggleResizeMode}
            >
              <Text style={styles.resizeModeIcon}>
                {resizeMode === "cover" ? "[ ]" : "[ + ]"}
              </Text>
              <Text style={styles.resizeModeText}>
                {resizeMode === "cover" ? "Fit" : "Fill"}
              </Text>
            </TouchableOpacity>
            
            {showFlatList && (
              <View style={styles.thumbnailContainer}>
                <FlatList
                  data={formattedImages}
                  horizontal
                  renderItem={({ item, index }) => (
                    <TouchableOpacity 
                      onPress={() => setInitialIndex(index)}
                      style={[
                        styles.thumbnailWrapper,
                        initialIndex === index && styles.activeThumbnail
                      ]}
                    >
                      <Image
                        source={{ uri: item.url }}
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
  resizeModeButton: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  resizeModeIcon: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resizeModeText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
});
