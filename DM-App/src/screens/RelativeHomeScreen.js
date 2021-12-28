import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";
import ButtonComponent from "../components/ButtonComponent";

export default RelativeHomeScreen = ({
  navigation,
  relativesStateHandler,
  route,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.body}>
        <Text style={[styles.subHeading, { marginBottom: 5, marginTop: 10 }]}>
          Upload an image and write some description for each game, So that your
          patient recognizes its you!
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("gameoneupload")}
            style={styles.card}
          >
            <Text style={styles.gameText}> Game One </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("gametwoupload")}
            style={[styles.card, { marginLeft: 10 }]}
          >
            <Text style={styles.gameText}> Game Two </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.line}> </Text>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.subHeading}>
            Keep yourself upto date with your patient's progress!
          </Text>
          <Image
            source={require("../assets/images/relative-vector1.jpg")}
            style={styles.image}
          />
          <ButtonComponent
            text="Patient's Statistics"
            isLoading={false}
            clickHandler={() => navigation.navigate("statistics")}
            width={Dimensions.get("window").width / 2.2}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondaryColor,
    padding: 10,
  },
  header: {
    marginTop: 20,
    height: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  menuIcon: {
    width: 33,
    height: 33,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  greeting: {
    fontSize: 22,
    marginBottom: 15,
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
    marginTop: 30,
    borderRadius: 5,
  },
  gameText: {
    fontSize: RFPercentage(2.8),
    color: color.primaryColor,
  },
  line: {
    width: Dimensions.get("window").width / 1.15,
    borderBottomColor: color.primaryColor,
    borderBottomWidth: 0.7,
  },
  image: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").width / 1.5,
    marginBottom: 20,
  },
  subHeading: {
    marginTop: 25,
    marginBottom: 30,
    fontSize: RFPercentage(2.2),
  },
});
