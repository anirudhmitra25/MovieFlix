import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { selectGenre, unselectGenre } from "../store/actions";

interface IGenres {
  genres: Array<IGenre>;
  selectGenre: (genre:number)=>void;
  selectedGenres: Array<number>;
  unselectGenre: (genre:number)=>void;
}
interface IGenre {
  id: number;
  name: string;
}

const Genre = ({
  genres,
  selectGenre,
  selectedGenres,
  unselectGenre,
}: IGenres) => {
  const handleGenrePress = (genre: IGenre) => {
    if (selectedGenres.includes(genre.id)) {
      unselectGenre(genre.id);
    } else {
      selectGenre(genre.id);
    }
  };

  useEffect(() => {
    if (selectedGenres.length === 0 && genres.length > 0) {
      selectGenre(0);
    }
  }, [selectedGenres, genres]);

  const handleRemoveGenre = (genreId: number) => {
    unselectGenre(genreId);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {genres &&
        genres.map((genre: IGenre) => (
          <TouchableOpacity
            onPress={() => handleGenrePress(genre)}
            key={genre.id}
            style={[
              styles.genreButton,
              selectedGenres.includes(genre.id) && styles.selectedGenre,
            ]}
          >
            <Text
              style={[
                styles.genreText,
                selectedGenres.includes(genre.id) && styles.selectedGenreText,
              ]}
            >
              {genre.name}
            </Text>
            {selectedGenres.includes(genre.id) && genre.id !== 0 && (
              <TouchableOpacity
                onPress={() => handleRemoveGenre(genre.id)}
                style={styles.crossButton}
              >
                <Text style={styles.crossButtonText}>x</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 36,
    paddingVertical: 20,
    marginBottom: 20,
  },
  genreButton: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "#333",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 36,
  },
  genreText: {
    color: "white",
    fontWeight: "500",
    marginHorizontal: 4,
  },
  selectedGenre: {
    backgroundColor: "#ec2d01",
  },
  selectedGenreText: {
    color: "white",
    fontWeight: "900",
  },
  crossButton: {
    marginLeft: 8,
  },
  crossButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const mapStateToProps = (state: any) => ({
  selectedGenres: state.selectedGenres,
});

export default connect(mapStateToProps, { selectGenre, unselectGenre })(Genre);
