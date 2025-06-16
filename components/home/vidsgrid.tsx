import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageStyle,
  ScrollView,
} from 'react-native';
import { Video } from 'expo-av';
import type { AVPlaybackStatusSuccess } from 'expo-av';

export default function App() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [readyIndices, setReadyIndices] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(Video | null)[]>([]);

  const VIDEO_DATA = [
    {
      url: 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041709/freakins_pxvqzp.mp4',
      thumbnail:
        'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041709/freakins_pxvqzp.jpg',
    },
    {
      url: 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041710/nike_ux3c7r.mp4',
      thumbnail:
        'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041710/nike_ux3c7r.jpg',
    },
    {
      url: 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041712/snitch_ebkgcb.mp4',
      thumbnail:
        'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041712/snitch_ebkgcb.jpg',
    },
    {
      url: 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041712/allensolley_jyh2xe.mp4',
      thumbnail:
        'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041712/allensolley_jyh2xe.jpg',
    },
  ];

  const handlePlayback = async (index: number) => {
    if (playingIndex === index) {
      await videoRefs.current[index]?.pauseAsync();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null) {
        await videoRefs.current[playingIndex]?.pauseAsync();
      }
      setPlayingIndex(index);
    }
  };

  const handleReady = async (index: number) => {
    setReadyIndices((prev) => ({ ...prev, [index]: true }));
    if (playingIndex === index) {
      await videoRefs.current[index]?.playAsync();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Video Player Test</Text>

      {VIDEO_DATA.map((video, index) => (
        <View key={index} style={styles.videoContainer}>
          {playingIndex === index ? (
            <TouchableOpacity
              onPress={() => handlePlayback(index)}
              activeOpacity={1}
              style={{ flex: 1 }}
            >
              <Video
                ref={(ref) => (videoRefs.current[index] = ref)}
                source={{ uri: video.url }}
                style={styles.video}
                resizeMode="cover"
                isLooping
                onReadyForDisplay={() => handleReady(index)}
                onPlaybackStatusUpdate={(status) => {
                  const s = status as AVPlaybackStatusSuccess;
                  if (s.didJustFinish) setPlayingIndex(null);
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handlePlayback(index)}
              style={styles.thumbWrapper}
            >
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.video as ImageStyle}
              />
              <Text style={styles.playButton}>▶</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  title: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  videoContainer: {
    width: '48%',
    aspectRatio: 9 / 16,
    marginBottom: 25,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  thumbWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    position: 'absolute',
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
});
