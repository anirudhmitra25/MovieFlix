import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Movie from "./Movie";
import { connect } from "react-redux";
import { getMoviesList } from "../api";
import { isArray } from "lodash";

interface IMovie {
  id: number;
  title: string;
  rating: string;
  image: string;
}

interface IMovieList {
  year: number;
  selectedGenres?: Array<number>;
}

const MoviesList = ({ year, selectedGenres }: IMovieList) => {
  const [movies, setMovies] = useState<Array<IMovie>>([]);

  useEffect(() => {
    const loadMovies = async () => {
      if (isArray(selectedGenres)) {
        try {
          if (selectedGenres.length > 0 && selectedGenres[0] === 0) {
            selectedGenres = [];
          }
          const moviesData = await getMoviesList({ selectedGenres, year });
          setMovies(moviesData);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      }
    };

    loadMovies();
  }, [year, selectedGenres]);

  return (
    <View key={year} style={styles.container}>
      <Text style={styles.year}>{year}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.movieList}
      >
        {movies.map((movie) => (
          <View style={styles.movieContainer} key={movie.id}>
            <Movie
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              image={movie.image}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 0,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  movieList: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  movieContainer: {
    marginRight: 8,
  },
  year: {
    color: "white",
    fontWeight: "500",
    fontSize: 25,
    marginTop: 5,
    paddingHorizontal: 10,
  },
});

const mapStateToProps = (state: any) => ({
  isLoading: state.isLoading,
  selectedGenres: state.selectedGenres,
});

export default connect(mapStateToProps)(React.memo(MoviesList));
