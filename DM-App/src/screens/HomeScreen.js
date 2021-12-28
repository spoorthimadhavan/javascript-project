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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SimpleLineIcons } from "@expo/vector-icons";
import Axios from "axios";

export default HomeScreen = ({ navigation, userStateHandler }) => {
  //store userData
  const [userData, setUserData] = useState(null);

  // get user data
  useEffect(() => {
    getUserData();
  }, []);

  // get user data
  const getUserData = async () => {
    const user = await AsyncStorage.getItem("USER");
    console.log("USER", user);
    setUserData(JSON.parse(user));
  };

  // remove logged in user data from async storage
  const removeFromAsync = async () => {
    console.log("Logout");
    await AsyncStorage.removeItem("USER");
    userStateHandler(false);
  };

  //logout handler
  const logoutHandler = async () => {
    Axios.post(
      "https://digital-menschen.herokuapp.com/accounts/logout/",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userData.token}`,
        },
      }
    )
      .then((res) => {
        console.log("RES", res.data);
        if (res.data.status) {
          removeFromAsync();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={logoutHandler}>
          <SimpleLineIcons name="logout" size={28} color={color.primaryColor} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.greeting}>
          Hello, {userData != null ? userData.username : ""}
        </Text>
        <Text
          style={{
            fontSize: RFPercentage(2),

            textTransform: "uppercase",
          }}
        >
          Patient ID: {userData != null ? userData.uuid.slice(0, 8) : ""}{" "}
        </Text>
        <Text style={styles.line}> </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("games")}
          style={styles.card}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("patientprofile")}
          >
            <Text
              style={{
                alignSelf: "center",
                padding: 5,
                fontSize: RFPercentage(2),
              }}
            >
              Profile 🌐
            </Text>
          </TouchableOpacity>
          <Text style={styles.gameText}> Games 🎮 </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.secondaryColor,
    padding: 10,
  },
  header: {
    marginTop: 10,
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
    width: Dimensions.get("window").width / 1.3,
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
    fontSize: RFPercentage(3),
    color: color.primaryColor,
  },
  line: {
    width: Dimensions.get("window").width / 1.15,
    borderBottomColor: color.primaryColor,
    borderBottomWidth: 0.7,
  },
});
