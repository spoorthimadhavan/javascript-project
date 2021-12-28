import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Image,
  ScrollView,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import colors from "../../env";
import ButtonComponent from "../components/ButtonComponent";
import Snackbar from "react-native-snackbar-component";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";

const { width } = Dimensions.get("window");

const RelativeReview = ({ route }) => {
  const [relativeReview, setRelativeReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const patient = useSelector((state) => state.userData.user);
  const patientId = patient.uuid;
  const [token, setToken] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const { presMedication, docReview } = route.params;
  const [medication, setMedication] = useState(presMedication);
  const [doctorReview, setDoctorReview] = useState(docReview);

  //get review
  const getRelativeReview = async () => {
    const user = await AsyncStorage.getItem("USER");
    let token = JSON.parse(user).token;
    setToken(token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token} `);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      patient_uuid: patientId,
      role: "caretaker",
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
          setRelativeReview({
            data: {
              comment: "No review found.",
            },
          });
        } else {
          setRelativeReview(result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  //write a review
  const giveReviewAndMedication = async () => {
    if (doctorReview === "") {
      setShowAlert(true);
      setMessage("Review can't be empty. Please write a review");
      return;
    }

    if (medication === "") {
      setShowAlert(true);
      setMessage("Medication can't be empty. Please write a prescription");
      return;
    }

    setIsLoading(true);

    Axios.all([
      Axios.post(
        "https://digital-menschen.herokuapp.com/reviews/create-review/",
        {
          patient: patientId,
          comment: doctorReview,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      ),
      Axios.post(
        "https://digital-menschen.herokuapp.com/accounts/prescribed-medication/",
        {
          patient_uuid: patientId,
          doctors_prescribtion: {
            prescribed_medication: medication,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      ),
    ])
      .then(
        Axios.spread((data1, data2) => {
          console.log(data1.data);
          console.log(data2.data);
          setMessage("Your review and medication has been recorded");
          setShowAlert(true);
          setIsLoading(false);
        })
      )
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    getRelativeReview();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.image}
        source={{
          uri: "https://www.2nd.md/assets/images/corporate/frontpage/DIAGNOSIS_icon.png",
        }}
      />
      <Text style={styles.subHeading}> Your Review </Text>
      <TextInput
        numberOfLines={6}
        maxLength={250}
        style={styles.input}
        value={doctorReview}
        placeholderTextColor="#888"
        onChangeText={(text) => setDoctorReview(text)}
        placeholder="Write your review"
      />
      <Text style={styles.line}> </Text>
      <Text style={styles.subHeading}> Prescribed Medication</Text>
      <TextInput
        numberOfLines={6}
        maxLength={250}
        style={styles.input}
        value={medication}
        placeholderTextColor="#888"
        onChangeText={(text) => setMedication(text)}
        placeholder="Write a prescription"
      />
      <Text style={styles.line}> </Text>

      <Text style={styles.subHeading}> Relative's Review</Text>
      <View style={styles.card}>
        <Text style={styles.gameText}>
          {relativeReview?.data?.comment
            ? relativeReview?.data?.comment
            : "No review yet"}
        </Text>
      </View>

      <ButtonComponent
        text="Done"
        isLoading={isLoading}
        clickHandler={giveReviewAndMedication}
        width={width / 1.2}
      />

      <Snackbar
        visible={showAlert}
        textMessage={message}
        backgroundColor={colors.primaryColor}
        messageColor={colors.secondaryColor}
        actionText="Okay"
        accentColor={colors.secondaryColor}
        actionHandler={() => setShowAlert(false)}
      />
    </ScrollView>
  );
};

export default RelativeReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexGrow: 1,
    paddingVertical: 20,
    alignItems: "center",
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
    marginBottom: 25,
    borderRadius: 5,
  },
  subHeading: {
    marginTop: Dimensions.get("window").width / 35,
    fontWeight: "700",
    fontSize: RFPercentage(2.4),
    alignSelf: "center",
  },
  input: {
    width: Dimensions.get("window").width / 1.2,
    padding: 10,
    borderColor: colors.primaryColor,
    borderWidth: 1,
    textAlignVertical: "top",
    marginTop: Dimensions.get("window").width / 20,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: RFPercentage(1.7),
  },
  line: {
    width: Dimensions.get("window").width / 1.2,
    borderBottomColor: colors.primaryColor,
    borderBottomWidth: 0.7,
  },
  image: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").width / 1.5,
  },
});
