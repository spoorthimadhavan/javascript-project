import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import color from "../../env";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import { Table, Row, Rows } from "react-native-table-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import moment from "moment";

const { width } = Dimensions.get("window");

const PatientDetails = ({ route, navigation }) => {
  //patient data
  const [doctorReview, setDoctorReview] = useState("");
  const [reviewUpdated, setReviewUpdated] = useState("");
  console.log("update", reviewUpdated);
  const [medication, setMedication] = useState("");
  const [medicationUpdated, setMedicationUpdated] = useState("");
  console.log("MED", typeof medicationUpdated);
  const patient = useSelector((state) => state.userData.user);
  const patientId = patient.uuid;

  let tables = {
    tableHead: ["Games", "Re-attempts", "Avg Duration"],
    tableData: [
      ["Game one", "2", "7 min"],
      ["Game Two", "4", "9 min"],
    ],
  };

  const [table, setTable] = React.useState(tables);

  //get prescribed medicine
  const getMedicine = useCallback(async () => {
    const user = await AsyncStorage.getItem("USER");
    let token = JSON.parse(user).token;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `https://digital-menschen.herokuapp.com/accounts/get-prescribed-medication/${patientId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        let medication = result.data;
        if (medication.doctors_prescribtion === null) {
          setMedication("No prescription found.");
        } else {
          setMedication(medication.doctors_prescribtion.prescribed_medication);
          setMedicationUpdated(medication.doctors_prescribtion.updated_at);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  //get review
  const getDocReview = useCallback(async () => {
    const user = await AsyncStorage.getItem("USER");
    let token = JSON.parse(user).token;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token}`);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      patient_uuid: patientId,
      role: "doctor",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(
      "https://digital-menschen.herokuapp.com/reviews/review/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.detail) {
          setReviewUpdated("");
          setDoctorReview("No review found.");
        } else {
          setDoctorReview(result.data.comment);
          setReviewUpdated(result.data.updated_at);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    getDocReview();
  }, []);

  useEffect(() => {
    getMedicine();
  }, []);

  useEffect(() => {
    const listen = navigation.addListener("focus", getDocReview);
    () => {
      listen.remove();
    };
  }, [getDocReview]);

  useEffect(() => {
    const listen = navigation.addListener("focus", getMedicine);
    () => {
      listen.remove();
    };
  }, [getMedicine]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
      }}
    >
      <View style={[styles.intro, { marginTop: width / 40 }]}>
        <View style={{ width: width / 2 }}>
          <Text
            style={{ fontWeight: "700", fontSize: RFPercentage(2) }}
            numberOfLines={1}
          >
            {patient?.first_name + " " + patient?.last_name}
          </Text>
        </View>
        <Text style={styles.vertical}> </Text>
        <Text
          style={{
            fontWeight: "700",
            fontSize: RFPercentage(2),
            textTransform: "uppercase",
          }}
        >
          ID: {patient.uuid.slice(0, 8)}
        </Text>
      </View>

      <View
        style={[styles.intro, { alignItems: "center", marginTop: width / 20 }]}
      >
        <View style={{ width: width / 2 }}>
          <Text
            style={{ fontWeight: "700", fontSize: RFPercentage(2) }}
            numberOfLines={1}
          >
            Patient Since
          </Text>
          <Text>23-11-2021 </Text>
        </View>
        <Text style={[styles.vertical, { height: width / 8 }]}> </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("patientdoctorprofile", {
              patient: patient,
            })
          }
        >
          {patient?.gender === "male" ? (
            <Image
              source={require("../assets/images/profile-vector-male.jpg")}
              style={styles.profile}
            />
          ) : (
            <Image
              source={require("../assets/images/profile-vector-female.jpg")}
              style={styles.profile}
            />
          )}
        </TouchableOpacity>
      </View>

      <BarChart
        data={{
          labels: ["Game One", "Game Two"],
          datasets: [
            {
              data: [6, 4],
            },
          ],
        }}
        width={Dimensions.get("window").width / 1.12} // from react-native
        height={250}
        chartConfig={{
          backgroundColor: color.primaryColor,
          backgroundGradientFrom: color.primaryColor,
          backgroundGradientTo: color.primaryColor,
          height: 5000,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            borderWidth: 1,
          },
          labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,
        }}
        style={{
          marginTop: 25,
          borderRadius: 16,
          borderColor: color.primaryColor,
        }}
      />
      <Text style={styles.line}> </Text>
      <Text
        style={[
          styles.subHeading,
          { marginBottom: Dimensions.get("window").width / 20 },
        ]}
      >
        Tabular View
      </Text>

      <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
        <Row
          data={table.tableHead}
          style={styles.head}
          textStyle={styles.text}
        />
        <Rows data={table.tableData} textStyle={styles.text} />
      </Table>
      <Text style={styles.line}> </Text>

      <Text style={styles.subHeading}> Doctor's Review </Text>

      <View style={styles.card}>
        <Text style={styles.gameText}>{doctorReview}</Text>
      </View>
      <Text
        style={{
          color: color.primaryColor,
          marginTop: 15,
          marginLeft: width / 30,
        }}
      >
        {reviewUpdated === ""
          ? "No updates"
          : `Last precribed on ${moment(reviewUpdated).format("MMMM Do YYYY")}`}
      </Text>
      <Text style={styles.line}> </Text>
      <Text style={styles.subHeading}> Prescribed Medication </Text>

      <View
        style={[styles.card, { height: Dimensions.get("window").width / 4 }]}
      >
        <Text style={styles.gameText}>{medication}</Text>
      </View>
      <Text
        style={{
          color: color.primaryColor,
          marginTop: 10,
          marginLeft: width / 30,
        }}
      >
        {medicationUpdated === ""
          ? "No updates"
          : `Last precribed on ${moment(medicationUpdated).format(
              "MMMM Do YYYY"
            )}`}
      </Text>

      <Text style={styles.line}> </Text>

      <TouchableOpacity
        style={{ alignSelf: "center", marginTop: 20 }}
        onPress={() =>
          navigation.navigate("relativereview", {
            presMedication: medication,
            docReview: doctorReview,
          })
        }
      >
        <Text
          style={{
            color: color.primaryColor,
            fontSize: RFPercentage(2),
            textDecorationLine: "underline",
          }}
        >
          See Guardian's Review
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PatientDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  intro: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 10,
    width: width / 1.13,
    elevation: 6,
    shadowColor: "black",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 6,
    shadowRadius: 6,
    borderRadius: 5,
    marginTop: width / 10,
  },
  vertical: {
    height: Dimensions.get("window").width / 15,
    borderRightColor: color.primaryColor,
    borderRightWidth: 1,
  },
  profile: {
    width: width / 7,
    height: width / 7,
    borderRadius: width / 7,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    width: "100%",
  },
  text: { margin: 6 },
  subHeading: {
    marginVertical: Dimensions.get("window").width / 30,
    marginBottom: width / 200,
    fontWeight: "700",
    fontSize: RFPercentage(2.4),
  },
  card: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").width / 2.5,
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: color.secondaryColor,
    borderColor: color.primaryColor,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  line: {
    width: Dimensions.get("window").width / 1.1,
    borderBottomColor: color.primaryColor,
    borderBottomWidth: 0.7,
  },
});
