import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import colors from "../../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

const DoctorPatientProfile = ({ route, navigation }) => {
  //store userData
  const { patient } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 5,
        flexGrow: 1,
      }}
    >
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        {patient?.gender === "male" ? (
          <Image
            source={require("../assets/images/profile-vector-male.jpg")}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../assets/images/profile-vector-female.jpg")}
            style={styles.image}
          />
        )}

        <Text
          style={[
            styles.labelText,
            { marginBottom: 10, fontSize: RFPercentage(2.8) },
          ]}
        >
          {patient?.first_name + " " + patient?.last_name}
        </Text>
        <Text
          style={{
            color: "#000",
            fontSize: RFPercentage(2),
            marginBottom: 20,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          Patient ID: {patient?.uuid.slice(0, 8)}
        </Text>
      </View>

      <View style={styles.line} />

      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          First Name:{" "}
          <Text style={styles.textBack}> {patient?.first_name} </Text>
        </Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Last Name: <Text style={styles.textBack}> {patient?.last_name} </Text>
        </Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Date of birth:{" "}
          <Text style={styles.textBack}> {patient?.date_of_birth} </Text>
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Age: <Text style={styles.textBack}> {patient?.patient_age} </Text>{" "}
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Gender: <Text style={styles.textBack}> {patient?.gender} </Text>{" "}
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Patient Since:{" "}
          <Text style={styles.textBack}>
            {moment(patient?.created_at).format("DD-MM-YYYY")}{" "}
          </Text>
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Doctor:{" "}
          <Text style={styles.textBack}>
            {" "}
            {patient?.doctor.first_name + " " + patient?.doctor.last_name}{" "}
          </Text>{" "}
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Doctor ID:{" "}
          <Text style={styles.textBack}>
            {patient?.doctor.uuid.slice(0, 8)}
          </Text>
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Relative's Name:{" "}
          <Text style={styles.textBack}>
            {" "}
            {patient?.caretaker.first_name +
              " " +
              patient?.caretaker.last_name}{" "}
          </Text>
        </Text>
      </View>
      <View style={styles.detailsRow}>
        <Text style={styles.labelText}>
          Relative's Email:{" "}
          <Text style={[styles.textBack, { textTransform: "none" }]}>
            {" "}
            {patient?.caretaker.email}{" "}
          </Text>
        </Text>
      </View>
      <View style={[styles.line, { marginTop: 10 }]} />
    </ScrollView>
  );
};

export default DoctorPatientProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2,
  },
  detailsRow: {
    backgroundColor: "#eee",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  labelText: {
    fontSize: RFPercentage(2),
    fontWeight: "600",
    color: colors.primaryColor,
  },
  line: {
    width: "100%",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  textBack: {
    backgroundColor: "#fff",
    textTransform: "capitalize",
  },
});
