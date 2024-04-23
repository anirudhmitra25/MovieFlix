import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import _ from "lodash";
import { getGenres } from "../api";
import { setLoading } from "../store/actions";
import { connect } from "react-redux";
import { Header, SingleMovieData, MoviesList, Genre } from "../components";
interface ILandingScreen {
  isLoading?: boolean;
  setLoading?: any;
  navigation: any;
  selectedMovie: number;
}

const LandingScreen = ({
  isLoading,
  navigation,
  selectedMovie,
}: ILandingScreen) => {
  const [genres, setGenres] = useState<any>([]);
  const [yearsData, setYearsData] = useState([2012, 2013, 2014]);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getGenres()
      .then((genreData) => {
        setGenres(genreData);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      toggleModal();
    }
  }, [selectedMovie]);

  const handleYearScroll = (direction: "up" | "down") => {
    if (direction === "up") {
      const firstYear = yearsData[0];
      if (firstYear > 1800) {
        const newYears = Array.from({ length: 5 }, (_, index) =>
          Math.max(1800, firstYear - index - 1)
        ).reverse();
        setYearsData((prevYears) => [...newYears, ...prevYears]);
      }
    } else {
      const lastYear = yearsData[yearsData.length - 1];
      if (lastYear < 2024) {
        const newYears = Array.from({ length: 5 }, (_, index) =>
          Math.min(2024, lastYear + index + 1)
        );
        setYearsData((prevYears) => [...prevYears, ...newYears]);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar backgroundColor="black" barStyle="light-content" />
      )}
      <Header navigation={navigation} />
      <Genre genres={genres} />
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          data={yearsData}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <MoviesList year={item} />}
          onEndReached={() => handleYearScroll("down")}
          onEndReachedThreshold={0.1}
          onRefresh={yearsData[0] > 1800 ? () => handleYearScroll("up") : null}
          refreshing={false}
          showsVerticalScrollIndicator={false}
        />
      )}
      <SingleMovieData
        id={selectedMovie}
        isVisible={modalVisible}
        onClose={toggleModal}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    color: "white",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  childContainer: {},
  movieList: {
    paddingTop: 15,
  },
  movieContainer: {
    marginRight: 8,
  },
  yearsContainer: {},
  year: {
    color: "white",
    fontWeight: "600",
    fontSize: 30,
    marginTop: 10,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
const mapStateToProps = (state: any) => ({
  isLoading: state.isLoading,
  selectedMovie: state.selectedMovie,
});

export default connect(mapStateToProps, { setLoading })(
  React.memo(LandingScreen)
);
