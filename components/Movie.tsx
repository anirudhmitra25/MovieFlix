import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { setSelectedMovie } from "../store/actions";

interface IMovie {
  id: number;
  title: string;
  rating: string;
  image: string;
  setSelectedMovie: (data: number) => void;
}

const Movie = ({ id, title, rating, image, setSelectedMovie }: IMovie) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setSelectedMovie(id)}
      >
        <Image source={{ uri: image }} style={styles.image}></Image>
        <View style={styles.overlay}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
          <View style={styles.ratingContainer}>
            <Icon
              style={styles.ratingIcon}
              name="star"
              size={18}
              color="#FFD700"
            />
            <Text style={styles.rating}>{rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 180,
    resizeMode: "cover",
    position: "relative",
    borderRadius: 10,
  },
  ratingIcon: {
    marginTop: 4,
    marginRight: 3,
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  rating: {
    fontSize: 12,
    marginTop: 4,
    color: "white",
  },
});

export default connect(null, { setSelectedMovie })(React.memo(Movie));
