import React, { useState, useEffect, useCallback } from "react";
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
  ActivityIndicator,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";
import { Table, Row, Rows } from "react-native-table-component";
import colors from "../../env";
import { useDispatch } from "react-redux";
import * as actions from "../store/action";
import Axios from "axios";

const { width } = Dimensions.get("window");

export default DoctorHomeScreen = ({ navigation, doctorsStateHandler }) => {
  //store userData
  const [userData, setUserData] = useState(null);

  //patient data
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // get user data
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    const listen = navigation.addListener("focus", getUserData);
    () => {
      listen.remove();
    };
  }, [getUserData]);

  // get user data
  const getUserData = useCallback(async () => {
    setIsLoading(true);
    const user = await AsyncStorage.getItem("USER");
    let token = JSON.parse(user).token;

    Axios.post(
      "https://digital-menschen.herokuapp.com/accounts/user-details/",
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        setUserData(res.data.data);
        setPatientList(res.data.data.patients);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  //get/filter patient
  const getPatientHandler = (id) => {
    const selectedPatient = patientList.filter(
      (patient) => patient.uuid === id
    );
    console.log("PATIENT", selectedPatient);
    let patient = selectedPatient[0];
    dispatch(actions.storeUserDetails(patient));
    navigation.navigate("patientdetails");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("USER");
              doctorsStateHandler(false);
            }}
          >
            <Image
              style={styles.menuIcon}
              source={require("../assets/images/logout.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <Text style={styles.greeting}>
            Hello, {userData != null ? userData.username : ""} Doctor
          </Text>
          <Text style={styles.line}> </Text>
        </View>

        <View style={{ marginRight: 5 }}>
          <Text style={styles.heading}> Patients List </Text>
          <View style={styles.searchBar}>
            <TextInput placeholder="Search Patients" style={styles.input} />
            <Ionicons name="search" size={24} color="black" />
          </View>

          <View style={{ width: width / 1.1 }}>
            <View style={styles.patientList}>
              <Text style={{ fontSize: RFPercentage(2), fontWeight: "700" }}>
                Patient ID
              </Text>
              <Text style={styles.vertical}> </Text>
              <Text style={{ fontSize: RFPercentage(2), fontWeight: "700" }}>
                Patient Name
              </Text>
              <Text style={styles.vertical}> </Text>
              <Text style={{ fontSize: RFPercentage(2), fontWeight: "700" }}>
                Last Active
              </Text>
            </View>

            {patientList.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: width / 2,
                }}
              >
                <Text style={{ fontSize: RFPercentage(2) }}>
                  No patient list found.
                </Text>
              </View>
            ) : isLoading ? (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator size={24} color={color.primaryColor} />
              </View>
            ) : (
              patientList?.map((patient) => (
                <View style={styles.patientRecord} key={patient.uuid}>
                  <TouchableOpacity
                    onPress={getPatientHandler.bind(this, patient.uuid)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ textTransform: "uppercase" }}>
                        {" "}
                        {patient.uuid.slice(0, 8)}{" "}
                      </Text>
                      <Text style={styles.vertical}> </Text>
                      <Text numberOfLines={1}>
                        {patient.first_name + " " + patient.last_name}{" "}
                      </Text>
                      <Text style={styles.vertical}> </Text>
                      <Text numberOfLines={1}> 30 minutes </Text>
                    </View>
                    <Text style={[styles.line, { marginTop: -20 }]}> </Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  searchBar: {
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  heading: {
    fontSize: RFPercentage(2.2),
    fontWeight: "700",
    alignSelf: "center",
    marginBottom: 10,
  },
  input: {
    fontSize: RFPercentage(2),
    width: width / 1.3,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    width: "100%",
  },
  text: { margin: 6 },
  line: {
    width: Dimensions.get("window").width / 1.15,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 0.7,
  },
  patientList: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 10,
    marginLeft: width / 70,
    width: width / 1.1,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 6,
    shadowRadius: 6,
    borderRadius: 5,
  },
  patientRecord: {
    backgroundColor: "#fff",
    padding: 10,
    marginLeft: width / 70,
    width: width / 1.1,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 6,
    shadowRadius: 6,
    borderRadius: 5,
    marginVertical: 5,
  },
  vertical: {
    height: Dimensions.get("window").width / 15,
    borderRightColor: color.primaryColor,
    borderRightWidth: 1,
  },
});
