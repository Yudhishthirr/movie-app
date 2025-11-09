import type { CastMember, Movie } from '@/utils/moviesdata'
import moviesData from '@/utils/moviesdata'
import { post1, post2, post3, post4, poster1, poster2, poster3, poster4 } from '@/utils/myposter'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

// Map image string names to actual image imports
const imageMap: Record<string, ImageSourcePropType> = {
  'poster1.jpg': poster1,
  'poster2.jpg': poster2,
  'poster3.jpg': poster3,
  'poster4.jpg': poster4,
  'post1.jpg': post1,
  'post2.jpg': post2,
  'post3.jpg': post3,
  'post4.jpg': post4,
}

// Helper function to get image from string name
const getImageFromString = (imageString: string): ImageSourcePropType => {
  return imageMap[imageString] || poster1 // Default to poster1 if not found
}

// Extended types with ImageSourcePropType for poster and cast images
interface MovieWithImages extends Omit<Movie, 'poster' | 'cast'> {
  poster: ImageSourcePropType
  cast: Array<Omit<CastMember, 'image'> & { image: ImageSourcePropType }>
}

// Get movie data from moviesData and map image strings to actual images
const getMovieData = (id: string): MovieWithImages => {
  const movieId = parseInt(id)
  const movie = moviesData.moviesdaat.find(m => m.id === movieId)
  
  if (!movie) {
    // Default movie data if ID not found
    return {
      id: movieId,
      title: 'MOVIE',
      subtitle: 'TITLE',
      poster: poster1,
      match: 85,
      year: 2023,
      duration: '2h 00m',
      rating: 'R',
      quality: 'HD',
      synopsis: 'A thrilling movie that will keep you on the edge of your seat with its gripping storyline and amazing performances.',
      cast: [
        { name: 'Actor One', character: 'Character One', image: poster1 },
        { name: 'Actor Two', character: 'Character Two', image: poster2 },
        { name: 'Actor Three', character: 'Character Three', image: poster3 },
      ]
    }
  }
  
  // Map the movie data and convert image strings to actual image objects
  return {
    ...movie,
    poster: getImageFromString(movie.poster),
    cast: movie.cast.map(castMember => ({
      ...castMember,
      image: getImageFromString(castMember.image)
    }))
  }
}

const Details = () => {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const movie = getMovieData(id as string)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Video Preview Section */}
        <View style={styles.videoPreviewContainer}>
          <Image
            source={movie.poster}
            style={styles.videoPreview}
            resizeMode="cover"
          />
          
          {/* Gradient overlay for better text visibility */}
          <View style={styles.gradientOverlay} />
          
          {/* Top buttons */}
          <View style={styles.topButtons}>
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Preview label */}
          <View style={styles.previewLabel}>
            <Text style={styles.previewLabelText}>Preview</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Title and Action Buttons */}
          <View style={styles.titleSection}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>{movie.title}</Text>
              {movie.subtitle ? (
                <Text style={styles.subtitle}>{movie.subtitle}</Text>
              ) : null}
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Ionicons name="add" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Ionicons name="cloud-download-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Metadata */}
          <View style={styles.metadata}>
            <Text style={styles.matchText}>{movie.match}% match</Text>
            <Text style={styles.metadataText}>{movie.year}</Text>
            <Text style={styles.metadataText}>{movie.duration}</Text>
            <Text style={styles.metadataText}>{movie.rating}</Text>
            <Text style={styles.metadataText}>{movie.quality}</Text>
          </View>

          {/* Most Liked badge */}
          <View style={styles.likedBadge}>
            <Ionicons name="thumbs-up" size={16} color="#E50914" />
            <Text style={styles.likedText}>Most Liked</Text>
          </View>

          {/* Play Button */}
          <TouchableOpacity style={styles.playButton} activeOpacity={0.8}>
            <Ionicons name="play" size={24} color="#FFFFFF" />
            <Text style={styles.playButtonText}>Play</Text>
          </TouchableOpacity>

          {/* Synopsis Section */}
          <View style={styles.synopsisSection}>
            <Text style={styles.sectionTitle}>Prolog</Text>
            <Text style={styles.synopsisText}>{movie.synopsis}</Text>
          </View>

          {/* Top Cast Section */}
          <View style={styles.castSection}>
            <Text style={styles.sectionTitle}>Top Cast</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.castList}
            >
              {movie.cast.map((actor, index: number) => (
                <View key={index} style={styles.castItem}>
                  <View style={styles.castImageContainer}>
                    <Image
                      source={actor.image}
                      style={styles.castImage}
                      resizeMode="cover"
                    />
                  </View>
                  <Text style={styles.castName} numberOfLines={1}>
                    {actor.name}
                  </Text>
                  <Text style={styles.castCharacter} numberOfLines={1}>
                    {actor.character}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  videoPreviewContainer: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topButtons: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    zIndex: 10,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewLabel: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  previewLabelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF8C42',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
  matchText: {
    color: '#46D369',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  metadataText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.85,
  },
  likedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 6,
  },
  likedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a2a2a',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 24,
    gap: 10,
  },
  playButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  synopsisSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  synopsisText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.9,
  },
  castSection: {
    marginBottom: 24,
  },
  castList: {
    paddingRight: 16,
  },
  castItem: {
    marginRight: 16,
    width: 80,
    alignItems: 'center',
  },
  castImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  castImage: {
    width: '100%',
    height: '100%',
  },
  castName: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 2,
  },
  castCharacter: {
    color: '#FFFFFF',
    fontSize: 11,
    opacity: 0.6,
    textAlign: 'center',
  },
})
