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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import ButtonComponent from "../components/ButtonComponent";
import Axios from "axios";
const { width } = Dimensions.get("window");
import Snackbar from "react-native-snackbar-component";
import color from "../../env";

const RelativeReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [doctorReviewDetails, setDoctorReviewDetails] =
    useState("No review found.");
  const [relReview, setRelativeReview] = useState("");
  const patient = useSelector((state) => state.userData.user);
  const patientId = patient.uuid;
  console.log("PATIENT ID", patientId);
  const [token, setToken] = useState();

  //get review
  const getReviews = async () => {
    const user = await AsyncStorage.getItem("USER");
    let token = JSON.parse(user).token;
    setToken(token);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${token} `);
    myHeaders.append("Content-Type", "application/json");

    var rawDoc = JSON.stringify({
      patient_uuid: patientId,
      role: "doctor",
    });

    var requestOptionsDoc = {
      method: "POST",
      headers: myHeaders,
      body: rawDoc,
    };

    var rawRel = JSON.stringify({
      patient_uuid: patientId,
      role: "caretaker",
    });

    var requestOptionsRel = {
      method: "POST",
      headers: myHeaders,
      body: rawRel,
    };

    Promise.all([
      fetch(
        "https://digital-menschen.herokuapp.com/reviews/review/",
        requestOptionsDoc
      ).then((res1) => res1.json()),
      fetch(
        "https://digital-menschen.herokuapp.com/reviews/review/",
        requestOptionsRel
      ).then((res2) => res2.json()),
    ])
      .then(([result1, result2]) => {
        if (result1.detail) {
          setDoctorReviewDetails("No review found.");
        } else {
          setDoctorReviewDetails(result1.data.comment);
        }
        if (result2.detail) {
          setRelativeReview("No review found.");
        } else {
          setRelativeReview(result2.data.comment);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getReviews();
  }, []);

  //write a review
  const giveReview = async () => {
    setIsLoading(true);

    Axios.post(
      "https://digital-menschen.herokuapp.com/reviews/create-review/",
      {
        patient: patientId,
        comment: relReview,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    )
      .then((res) => {
        setShowAlert(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log(e);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={25}>
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
          value={relReview}
          style={styles.input}
          value={relReview}
          placeholderTextColor="#888"
          placeholder="Write your review"
          onChangeText={(text) => setRelativeReview(text)}
        />
        <Text style={styles.line}> </Text>
      </KeyboardAvoidingView>
      <Text style={styles.subHeading}> Doctor's Review </Text>
      <View style={styles.card}>
        <Text style={styles.gameText}>{doctorReviewDetails}</Text>
      </View>
      <ButtonComponent
        text="Done"
        isLoading={isLoading}
        clickHandler={giveReview}
        width={width / 1.2}
      />
      <Snackbar
        visible={showAlert}
        textMessage={"You review has been recorded"}
        backgroundColor={color.primaryColor}
        messageColor={color.secondaryColor}
        actionText="Okay"
        accentColor={color.secondaryColor}
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
