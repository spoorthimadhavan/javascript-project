import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";

const GamesScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/kids-vector6.jpg")}
        style={styles.vectorImage}
      />
      <Text style={styles.line}> </Text>
      <Text style={styles.actionText}>Let's Play Games </Text>
      <Text style={styles.gamesText}>Games</Text>
      <View style={styles.cardView}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => props.navigation.navigate("game1")}
        >
          <Text style={styles.gameText}> Game One </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => props.navigation.navigate("game2")}
        >
          <Text style={styles.gameText}> Game Two </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.line}> </Text>
    </View>
  );
};

export default GamesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondaryColor,
    padding: 20,
  },
  vectorImage: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").width / 1.4,
    alignSelf: "center",
    marginTop: 50,
  },
  gamesText: {
    color: color.primaryColor,
    fontSize: RFPercentage(3),
    marginTop: 30,
  },
  line: {
    width: Dimensions.get("window").width / 1.1,
    borderBottomColor: color.primaryColor,
    borderBottomWidth: 0.7,
  },
  actionText: {
    marginTop: 30,
    color: "black",
    fontWeight: "700",
    fontSize: RFPercentage(2),
  },
  card: {
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").width / 2.8,
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: color.secondaryColor,
    borderColor: color.primaryColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 5,
  },
  gameText: {
    color: color.primaryColor,
    fontSize: RFPercentage(2),
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
