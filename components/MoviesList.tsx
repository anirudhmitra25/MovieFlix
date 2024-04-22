import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Movie from "./Movie";
import { connect } from "react-redux";
import { getMoviesList } from "../api";
import { isArray } from "lodash";
import { setLoading } from "../store/actions";
interface IMovie {
  id: number;
  title: string;
  rating: string;
  image: string;
}
interface IMovieList {
  year: number;
  selectedGenres?: Array<number>;
  setLoading?: any;
  isLoading?: boolean;
}
function MoviesList({
  year,
  selectedGenres,
}: IMovieList) {
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  useEffect(() => {
    if (isArray(selectedGenres)) {
      getMoviesList({ selectedGenres, year }).then((movies) => {
        setMovies(movies);
      });
    }
  }, [selectedGenres]);
  return (
    <View style={styles.childContainer}>
      <Text style={styles.year}>{year}</Text>
      <ScrollView
        style={styles.movieList}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {movies.map((movie) => (
          <View style={styles.movieContainer}>
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
}

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
    paddingHorizontal:10,
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
    paddingHorizontal:10,
  },
});

const mapStateToProps = (state: any) => ({
  selectedGenres: state.selectedGenres,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps, { setLoading })(React.memo(MoviesList));
