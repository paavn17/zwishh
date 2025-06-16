import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, ImageStyle } from 'react-native';
import { Video } from 'expo-av';
import type { AVPlaybackStatusSuccess } from 'expo-av';

export default function App() {
  const [play, setPlay] = useState(false);
  const videoRef = useRef<Video>(null);

  const VIDEO_URL = 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041709/freakins_pxvqzp.mp4';
  const THUMBNAIL_URL = 'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041709/freakins_pxvqzp.jpg';

  return (
    <View style={styles.container}>
      <Text>Video Player Test</Text>

      {play ? (
        <Video
          ref={videoRef}
          source={{ uri: VIDEO_URL }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            const s = status as AVPlaybackStatusSuccess;
            if (s.didJustFinish) setPlay(false);
          }}
        />
      ) : (
        <TouchableOpacity onPress={() => setPlay(true)} style={styles.thumbWrapper}>
          <Image source={{ uri: THUMBNAIL_URL }} style={styles.video as ImageStyle} />
          <Text style={styles.playButton}>▶</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 200,
    backgroundColor: 'black',
  },
  thumbWrapper: {
    position: 'relative',
  },
  playButton: {
    position: 'absolute',
    top: 90,
    left: 135,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
