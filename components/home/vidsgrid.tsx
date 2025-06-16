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
      thumbnail: 'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041709/freakins_pxvqzp.jpg',
      brandName: 'Freakins',
      brandIcon: 'https://instagram.fvtz1-2.fna.fbcdn.net/v/t51.2885-19/357844811_588877669995825_318639382017409275_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fvtz1-2.fna.fbcdn.net&_nc_cat=109&_nc_oc=Q6cZ2QGH17LeflSAr7ee9AnvfMPaWtsbXwON9EQ7Pt3PTpaVQTzPlDNLIHTkLHm7pHlrPCc6grsUnpFbKJMc7yBz0W5Q&_nc_ohc=n7_kWr24g5MQ7kNvwG5Z3ko&_nc_gid=aKJ8lWPGj-6pSCTqjzYMNQ&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfMRkho1CS4-ENMWpvIsBfhWji-lWMyIlWFJwUSwwbirHA&oe=685598F9&_nc_sid=10d13b',
    },
    {
      url: 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041710/nike_ux3c7r.mp4',
      thumbnail: 'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041710/nike_ux3c7r.jpg',
      brandName: 'Nike',
      brandIcon: 'https://imgs.search.brave.com/FlV7Mi2X-Dk2wPAkaBg7HJRgB405SrWpLHOgbOQ53O8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjAv/MzM2LzcxOS9zbWFs/bC9uaWtlLWxvZ28t/bmlrZS1pY29uLWZy/ZWUtZnJlZS12ZWN0/b3IuanBn',
    },
    {
      url: 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041712/snitch_ebkgcb.mp4',
      thumbnail: 'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041712/snitch_ebkgcb.jpg',
      brandName: 'Snitch',
      brandIcon: 'https://instagram.fvtz1-2.fna.fbcdn.net/v/t51.2885-19/471663290_9107056706017241_8267776863884129932_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=instagram.fvtz1-2.fna.fbcdn.net&_nc_cat=105&_nc_oc=Q6cZ2QHWUJifeIr25XXxgu3owGoY9C3KsKB6LHldRMMYs3s-IRafJ0Q60zHq7ZBcZzkTaPQzc9gbUHx6QeaLh0584sH1&_nc_ohc=5GHcHk9nH-IQ7kNvwEAMx-Y&_nc_gid=vS9L5dFVnh-z3pElOJlzng&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfPJH9Z3k8sInZ2tz5I0kbX3vi9iVJT6pP-OzYGjLAYOmg&oe=6855B3EB&_nc_sid=10d13b',
    },
    {
      url: 'https://res.cloudinary.com/dedxapqdy/video/upload/v1750041712/allensolley_jyh2xe.mp4',
      thumbnail: 'https://res.cloudinary.com/dedxapqdy/video/upload/so_1/v1750041712/allensolley_jyh2xe.jpg',
      brandName: 'Allen Solly',
      brandIcon: 'https://i.pinimg.com/736x/c9/35/b8/c935b80be66a18497b473b997439a7e0.jpg',
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
          {/* Brand Overlay */}
          <View style={styles.brandOverlay}>
            <Image source={{ uri: video.brandIcon }} style={styles.brandIcon} />
            <Text style={styles.brandName}>{video.brandName}</Text>
          </View>

          {playingIndex === index ? (
            <TouchableOpacity onPress={() => handlePlayback(index)} activeOpacity={1} style={{ flex: 1 }}>
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
            <TouchableOpacity onPress={() => handlePlayback(index)} style={styles.thumbWrapper}>
              <Image source={{ uri: video.thumbnail }} style={styles.video as ImageStyle} />
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
    position: 'relative',
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
brandOverlay: {
  position: 'absolute',
  top: 15,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 14,
  zIndex: 1,
},
brandIcon: {
  width: 28,
  height: 28,
  borderRadius: 14,
  marginRight: 8,
},
brandName: {
  color: '#fff',
  fontSize: 14,
  fontWeight: '700',
},

});
