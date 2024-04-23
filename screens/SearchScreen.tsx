import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { getSearchMovies } from "../api";
import { setSearch } from "../store/actions";
import _ from "lodash";
import { SingleMovieData } from "../components";

const SearchScreen = ({ navigation, searchTerm, setSearch }: any) => {
  const [movies, setMovies] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      setSearch("");
    };
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setPage(1);
      setHasMore(true);
      const debouncedSearch = _.debounce((term: string) => {
        fetchMovies(term, 1);
      }, 800);
      debouncedSearch(searchTerm);
    }
  }, [searchTerm]);

  const fetchMovies = async (searchTerm: string, pageNum: number) => {
    try {
      setLoading(true);
      const data = await getSearchMovies(searchTerm, pageNum);
      if (pageNum === 1) {
        setMovies(data);
      } else {
        setMovies((prevMovies: any) => [...prevMovies, ...data]);
      }
      setLoading(false);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      fetchMovies(searchTerm, page + 1);
    }
  };

  const throttledHandleEndReached = _.throttle(handleEndReached, 1000);

  const handleInputChange = (text: string) => {
    setSearch(text);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-left"
            size={30}
            color="white"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movie"
            placeholderTextColor="#D3D3D3"
            value={searchTerm}
            onChangeText={handleInputChange}
          />
        </View>
      </View>
      {searchTerm === "" ? (
        <View style={styles.centeredTextContainer}>
          <Text style={styles.centeredText}>Enter Movie Name...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                setSelectedMovie(item.id);
              }}
              style={styles.movieItem}
            >
              <Image source={{ uri: item.image }} style={styles.image}></Image>
              <Text style={styles.movieTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          onEndReached={throttledHandleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
              </View>
            ) : null
          }
        />
      )}
      {selectedMovie && (
        <SingleMovieData
          id={selectedMovie}
          isVisible={modalVisible}
          onClose={toggleModal}
        />
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state: any) => ({
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = {
  setSearch,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal:20,
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: "cover",
    position: "relative",
    borderRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop:30
  },
  searchContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight:20,
    marginLeft: 10,
    width:"100%",
    height:40,
    backgroundColor:"rgba(88,88,88,0.75)"
  },
  searchInput: {
    flex: 1,
    color: "white",
  },
  backIcon: {
    marginRight: 10,
    marginLeft:15
  },
  movieItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  movieTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: 15,
    marginLeft: 10,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  centeredTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
