import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import SingleMovieData from "./SingleMovieData";
import Icon from "react-native-vector-icons/FontAwesome";

interface IMovie {
  id: number;
  title: string;
  rating: string;
  image: string;
}

const Movie = ({ id, title, rating, image }: IMovie) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={toggleModal}>
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
      <SingleMovieData id={id} isVisible={modalVisible} onClose={toggleModal} />
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
    marginRight:3
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

export default Movie;
