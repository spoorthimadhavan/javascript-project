import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import color from "../../env";

const Statistics = ({ route, navigation }) => {
  const { width } = Dimensions.get("screen");

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.text,
          {
            color: "black",
            fontSize: RFPercentage(2.5),
            marginTop: width / 10,
            fontWeight: "700",
          },
        ]}
      >
        Statistics
      </Text>
      <Image
        resizeMode="contain"
        source={require("../assets/images/vector-statistics-icon.jpg")}
        style={styles.image}
      />

      <Text style={styles.line}> </Text>
      <Text style={[styles.subHeading]}>
        See your patient's statistics or write a review
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("statisticsgraph")}
          style={styles.card}
        >
          <Text style={styles.gameText}> Statistics </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("relativereview")}
          style={[styles.card, { marginLeft: 10 }]}
        >
          <Text style={styles.gameText}> Write a review </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.line}> </Text>
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  gameIdOutline: {
    padding: 8,
    borderColor: color.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: color.primaryColor,
    marginTop: Dimensions.get("window").width / 3,
  },
  text: {
    color: color.secondaryColor,
  },
  image: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").width / 1.5,
    marginTop: Dimensions.get("window").width / 20,
  },
  input: {
    width: Dimensions.get("window").width / 1.3,
    padding: 10,
    borderColor: color.primaryColor,
    borderWidth: 1,
    textAlignVertical: "top",
    marginTop: Dimensions.get("window").width / 15,
    borderRadius: 5,
  },

  line: {
    width: Dimensions.get("window").width / 1.15,
    borderBottomColor: color.primaryColor,
    borderBottomWidth: 0.7,
  },
  subHeading: {
    marginTop: Dimensions.get("window").width / 15,
    padding: 15,
    fontSize: RFPercentage(2.2),
  },
  gameText: {
    fontSize: RFPercentage(2.3),
    color: color.primaryColor,
  },
  card: {
    width: Dimensions.get("window").width / 2.3,
    height: Dimensions.get("window").width / 2.5,
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
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
  },
});
