import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface IHeader {
  navigation: any;
}

const Header = ({ navigation }: IHeader) => {
  const goToSearchScreen = () => {
    navigation.navigate("Search");
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>MovieFlix</Text>
      <TouchableOpacity onPress={goToSearchScreen}>
        <Icon style={styles.searchIcon} name="search" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "rgba(0,0,0,0)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 0,
    paddingLeft: 10,
  },
  searchIcon: {
    paddingRight: 15,
  },
});

export default Header;
