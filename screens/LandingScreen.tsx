import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import Genre from "../components/Genre";
import _ from "lodash";
import MoviesList from "../components/MoviesList";
import { getGenres } from "../api";
import { setLoading } from "../store/actions";
import { connect } from "react-redux";
interface ILandingScreen {
  isLoading?: boolean;
  setLoading?: any;
  navigation: any;
}

const LandingScreen = ({
  setLoading,
  isLoading,
  navigation,
}: ILandingScreen) => {
  const [genres, setGenres] = useState<any>([]);
  const [yearsData, setYearsData] = useState([2012, 2013, 2014]);

  useEffect(() => {
    getGenres()
      .then((genreData) => {
        setGenres(genreData);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  const handleYearScroll = (direction: "up" | "down") => {
    if (direction === "up") {
      const firstYear = yearsData[0];
      if (firstYear > 1800) {
        const newYears = Array.from({ length: 5 }, (_, index) =>
          Math.max(1980, firstYear - index - 1)
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
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 5,
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
});

export default connect(mapStateToProps, { setLoading })(
  React.memo(LandingScreen)
);
