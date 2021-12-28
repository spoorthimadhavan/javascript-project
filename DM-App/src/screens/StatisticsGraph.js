import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
} from "react-native-chart-kit";
import colors from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Table, Row, Rows } from "react-native-table-component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import moment from "moment";
const { width } = Dimensions.get("window");

const StatisticsGraph = ({ route, navigation }) => {
  const [doctorReview, setDoctorReview] = useState("");
  const [reviewUpdated, setReviewUpdated] = useState("");
  const [medicationUpdated, setMedicationUpdated] = useState("");
  const [medication, setMedication] = useState();

  let tables = {
    tableHead: ["Games", "Re-attempts", "Avg Duration"],
    tableData: [
      ["Game one", "2", "7 min"],
      ["Game Two", "4", "9 min"],
    ],
  };

  const patient = useSelector((state) => state.userData.user);
  const patientId = patient.uuid;

  console.log("patient ID", patientId);

  const [table] = React.useState(tables);

  //get prescribed medicine
  const getMedicine = async () => {
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
  };

  //get review
  const getDocReview = async () => {
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
        if (result.detail) {
          setDoctorReview("No review found.");
        } else {
          setDoctorReview(result.data.comment);
          setReviewUpdated(result.data.updated_at);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getDocReview();
  }, []);

  useEffect(() => {
    getMedicine();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <View
        style={[
          styles.intro,
          {
            alignItems: "center",
            marginTop: width / 40,
            marginBottom: width / 20,
          },
        ]}
      >
        <View style={{ width: width / 2 }}>
          <Text
            style={{ fontWeight: "700", fontSize: RFPercentage(1.8) }}
            numberOfLines={1}
          >
            {patient?.first_name + " " + patient?.last_name}
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: RFPercentage(1.8),
              textTransform: "uppercase",
            }}
            numberOfLines={1}
          >
            Patient ID: {patient?.uuid.slice(0, 8)}
          </Text>
        </View>
        <Text style={[styles.vertical, { height: width / 8 }]}> </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("patientrelativeprofile")}
        >
          <Image
            source={require("../assets/images/profile-vector-male.jpg")}
            style={styles.profile}
          />
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
        width={Dimensions.get("window").width / 1.2} // from react-native
        height={250}
        chartConfig={{
          backgroundColor: colors.primaryColor,
          backgroundGradientFrom: colors.primaryColor,
          backgroundGradientTo: colors.primaryColor,
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
          marginVertical: 8,
          borderRadius: 16,
          borderColor: colors.primaryColor,
        }}
      />
      <Text style={styles.line}> </Text>
      <Text
        style={[
          styles.subHeading,
          { marginBottom: Dimensions.get("window").width / 12 },
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
      <Text style={{ color: colors.primaryColor, marginTop: 10 }}>
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
      <Text style={{ color: colors.primaryColor, marginTop: 10 }}>
        {medicationUpdated === ""
          ? "No updates"
          : `Last precribed on ${moment(medicationUpdated).format(
              "MMMM Do YYYY"
            )}`}
      </Text>
    </ScrollView>
  );
};

export default StatisticsGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  line: {
    width: Dimensions.get("window").width / 1.15,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 0.7,
  },
  subHeading: {
    marginVertical: Dimensions.get("window").width / 30,
    fontWeight: "700",
    fontSize: RFPercentage(2.4),
  },
  gameText: {
    fontSize: RFPercentage(1.7),
    color: "#000",
  },
  card: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").width / 2.5,
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: colors.secondaryColor,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 5,
  },
  head: {
    height: 40,
    backgroundColor: "#f1f8ff",
    width: Dimensions.get("window").width / 1.2,
  },
  text: { margin: 6 },
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
  profile: {
    width: width / 7,
    height: width / 7,
    borderRadius: width / 7,
  },
});
