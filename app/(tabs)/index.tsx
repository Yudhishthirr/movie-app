import { icons } from "@/constants/icons";
import {
  korean1, korean2, korean3, korean4, korean5, post1, post2, post3,
  post4, poster1, poster2, poster3, poster4
} from "@/utils/myposter";
import { useRouter } from "expo-router";
import { Dimensions, FlatList, Image, ImageSourcePropType, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.35;
const CARD_MARGIN = 12;

// Sample data for movies/shows - replace with real data later
const trendingMovies = [
  { id: 1, title: "The Glory", poster: poster1 },
  { id: 2, title: "Arcane", poster:poster4 },
  { id: 3, title: "Peaky Blinders", poster:poster2 },
  { id: 4, title: "Movie 4", poster:poster3  },
  { id: 5, title: "Movie 5", poster:poster4  },
];

const series = [
  { id: 1, title: "Breaking Bad", poster:post1, },
  { id: 2, title: "You", poster:post4, },
  { id: 3, title: "Narcos", poster: post3, },
  { id: 4, title: "Series 4", poster: post2, },
  { id: 5, title: "Series 5", poster: post1, },
];

const koreanDramas = [
  { id: 1, title: "Drama 1", poster: korean1 },
  { id: 2, title: "Drama 2", poster: korean2 },
  { id: 3, title: "Drama 3", poster: korean3 },
  { id: 4, title: "Drama 4", poster: korean4 },
  { id: 5, title: "Drama 5", poster: korean5 },
];

interface MovieCardProps {
  item: { id: number; title: string; poster: string | ImageSourcePropType };
}

const MovieCard = ({ item }: MovieCardProps) => {
  const router = useRouter();
  
  // Handle both local images (ImageSourcePropType) and remote URLs (string)
  const imageSource = typeof item.poster === "string" 
    ? { uri: item.poster } 
    : item.poster;

  const handlePress = () => {
    router.push(`/movies/${item.id}`);
  };

  return (
    <TouchableOpacity 
      style={[styles.movieCard, { width: CARD_WIDTH, marginRight: CARD_MARGIN }]}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image
        source={imageSource}
        style={styles.posterImage}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

interface SectionProps {
  title: string;
  data: Array<{ id: number; title: string; poster: string | ImageSourcePropType }>;
  onSeeAll?: () => void;
}

const Section = ({ title, data, onSeeAll }: SectionProps) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <MovieCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
};

export default function Index() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.profileIcon}>
            <Image 
              source={icons.person} 
              style={styles.headerIcon}
              tintColor="#FFFFFF"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <Image 
            source={icons.search} 
            style={styles.headerIcon}
            tintColor="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Section 
          title="Trending Now" 
          data={trendingMovies}
        />
        <Section 
          title="Series" 
          data={series}
        />
        <Section 
          title="Korean TV Drama" 
          data={koreanDramas}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000000",
  },
  profileIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  headerIcon: {
    width: 24,
    height: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
  },
  seeAllText: {
    color: "#FFFFFF",
    fontSize: 14,
    opacity: 0.8,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
  movieCard: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  posterImage: {
    width: "100%",
    height: CARD_WIDTH * 1.5,
    borderRadius: 8,
  },
});