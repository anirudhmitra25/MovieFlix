import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { getSingleMovieData, getCreditsData } from "../api";
import Icon from "react-native-vector-icons/FontAwesome";

interface IMovie {
  id: number;
  title: string;
  image: string;
  rating: number;
  budget: number;
  revenue: number;
  genres: Array<{
    id: number;
    name: string;
  }>;
  originCountry: string;
  productionCompanies: any;
  overview: string;
  releaseDate: string;
  runTime: number;
  language: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  tagline: string;
}

interface ICredits {
  cast: Array<{
    id: number;
    actorName: string;
    characterName: string;
    image: string;
  }>;
  crew: Array<{
    id: number;
    crewName: string;
    job: string;
    image: string;
  }>;
}

interface MovieModalProps {
  id: number;
  isVisible: boolean;
  onClose: () => void;
}

const SingleMovieData: React.FC<MovieModalProps> = ({
  id,
  isVisible,
  onClose,
}) => {
  const [movie, setMovie] = useState<IMovie>();
  const [credits, setCredits] = useState<ICredits>();
  const [showAllOverview, setShowAllOverview] = useState<boolean>(false);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    if (isVisible) {
      getSingleMovieData(id).then((data) => {
        setMovie(data);
      });
      getCreditsData(id).then((data) => {
        setCredits(data);
      });
    }
  }, [id, isVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {movie && credits && (
          <View
            style={[
              styles.modalContent,
              { width: width * 0.95, height: height * 0.8 },
            ]}
          >
            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={1}
              onPress={onClose}
            >
              <Icon
                style={styles.closeButton}
                name="close"
                size={25}
                color="white"
              />
            </TouchableOpacity>
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={styles.title}>{movie.title}</Text>
              </View>
              <View style={styles.headerRight}>
                <Icon
                  style={styles.ratingIcon}
                  name="star"
                  size={20}
                  color="#FFD700"
                />
                <View>
                  <Text style={styles.rating}>{movie.rating}/10</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomHeader}>
              <Text style={styles.bottomHeaderText}>Movie</Text>
              <Text style={styles.bottomHeaderText}>{movie.releaseDate}</Text>
              <Text style={styles.bottomHeaderText}>{movie.runTime}m</Text>
            </View>
            <Image source={{ uri: movie.image }} style={styles.image}></Image>
            <ScrollView style={styles.scrollView}>
              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.genreButtonContainer}
                >
                  {movie.genres.map((genre: any) => (
                    <TouchableOpacity key={genre.id} style={styles.genreButton}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              {movie.tagline && (
                <Text style={styles.overview}>"{movie.tagline}"</Text>
              )}
              <Text
                style={styles.overview}
                numberOfLines={showAllOverview ? undefined : 3}
              >
                {movie.overview}
              </Text>
              {!showAllOverview && (
                <TouchableOpacity
                  onPress={() => setShowAllOverview(true)}
                  style={styles.showMoreButton}
                >
                  <Text style={styles.showMoreText}>Show More</Text>
                </TouchableOpacity>
              )}
              {showAllOverview && (
                <TouchableOpacity
                  onPress={() => setShowAllOverview(false)}
                  style={styles.showMoreButton}
                >
                  <Text style={styles.showMoreText}>Show Less</Text>
                </TouchableOpacity>
              )}

              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  fontSize: 15,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Cast
              </Text>
              <ScrollView horizontal contentContainerStyle={styles.castView}>
                {credits.cast.map((cast, key) => (
                  <View key={key} style={styles.castContainer}>
                    <Image
                      source={{ uri: cast.image }}
                      style={styles.castImage}
                    ></Image>
                    <Text style={styles.castText}>{cast.actorName}</Text>
                    <Text style={styles.jobText}>{cast.characterName}</Text>
                  </View>
                ))}
              </ScrollView>
              <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  fontSize: 15,
                  fontWeight: "600",
                  marginBottom: 10,
                }}
              >
                Crew
              </Text>
              <ScrollView horizontal contentContainerStyle={styles.castView}>
                {credits.crew.map((crew, key) => (
                  <View key={key} style={styles.castContainer}>
                    <Image
                      source={{ uri: crew.image }}
                      style={styles.castImage}
                    ></Image>
                    <Text style={styles.castText}>{crew.crewName}</Text>
                    <Text style={styles.jobText}>{crew.job}</Text>
                  </View>
                ))}
              </ScrollView>
              {/* <Text
                style={{
                  color: "white",
                  marginTop: 10,
                  fontSize: 15,
                  fontWeight: "600",
                }}
              >
                Production Houses:
              </Text>
              <View style={styles.productionContainer}>
                {movie.productionCompanies.map((item: any) => (
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    <Text style={styles.productionText}>{item.name}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.financials}>
                <Text style={styles.budget}>Budget: ${movie.budget}</Text>
                <Text style={styles.budget}>Revenue: ${movie.revenue}</Text>
              </View> */}
            </ScrollView>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.85)",
  },
  castView: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  castContainer: {
    marginRight: 10,
    width: 80,
  },
  castText: {
    color: "white",
    paddingRight: 5,
    marginTop: 3,
    fontSize: 13,
  },
  jobText: {
    color: "white",
    paddingRight: 5,
    marginTop: 3,
    opacity: 0.8,
  },
  productionContainer: {},
  financials: {
    marginTop: 10,
  },
  budget: {
    color: "white",
  },
  productionImage: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
  productionText: {
    color: "white",
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 5,
    color: "white",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    overflow: "scroll",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomHeader: {
    flexDirection: "row",
  },
  bottomHeaderText: {
    color: "gray",
    fontWeight: "600",
    marginRight: 8,
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    marginTop: 35,
  },
  headerLeft: {
    width: "65%",
  },
  headerRight: {},

  genreButtonContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
  },

  title: {
    color: "white",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 5,
  },
  rating: {
    color: "white",
    fontWeight: "800",
    alignSelf: "center",
    fontSize: 15,
  },
  ratingIcon: {
    fontWeight: "800",
    alignSelf: "center",
  },

  image: {
    width: "100%",
    height: "30%",
    resizeMode: "cover",
    position: "relative",
    borderRadius: 10,
    marginVertical: 10,
  },
  castImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  overview: {
    color: "white",
    marginVertical: 10,
    fontWeight: "600",
    opacity: 0.8,
  },
  showMoreButton: {
    alignSelf: "flex-start",
  },
  showMoreText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.8,
  },
  genreButton: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#ec2d01",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  genreText: {
    color: "white",
    fontWeight: "400",
  },
});

export default SingleMovieData;
