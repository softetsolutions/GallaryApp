import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const FullScreenContainerImage = ({ source }) => {
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Retrieve the intrinsic dimensions of the image
  useEffect(() => {
    if (source.uri) {
      Image.getSize(
        source.uri,
        (w, h) => setImageSize({ width: w, height: h }),
        error => console.error('Failed to get image dimensions', error)
      );
    }
  }, [source]);

  // onLayout gives us the container's dimensions
  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerDimensions({ width, height });
  };

  const calculateImageStyle = () => {
    const { width: cw, height: ch } = containerDimensions;
    const { width: iw, height: ih } = imageSize;
    if (!cw || !iw) return {};

    const scale = Math.max(cw / iw, ch / ih);
    const scaledWidth = iw * scale;
    const scaledHeight = ih * scale;
    const offsetX = (cw - scaledWidth) / 2;
    const offsetY = (ch - scaledHeight) / 2;
    return {
      width: scaledWidth,
      height: scaledHeight,
      marginLeft: offsetX,
      marginTop: offsetY,
    };
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      {containerDimensions.width > 0 && imageSize.width > 0 && (
        <Image source={source} style={[styles.image, calculateImageStyle()]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
  },
});

export default FullScreenContainerImage;
