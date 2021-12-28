import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import Snackbar from "react-native-snackbar-component";
import ButtonComponent from "../components/ButtonComponent";
import Axios from "axios";
import Modal from "../shared/modal";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";

const questions = [
  { id: 0, value: "Favorite color?" },
  { id: 1, value: "Name of first pet?" },
  { id: 2, value: "City in which you were born?" },
];

export default ForgetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  const submitHandler = () => {
    Keyboard.dismiss();

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email == "") {
      alertHandler("Fill all fields");
    } else if (reg.test(email) === false) {
      alertHandler("Email is not valid");
    } else {
      setIsLoading(true);
      Axios.post(
        "https://digital-menschen.herokuapp.com/accounts/resend-verification-code/",
        {
          email: email.toLowerCase(),
        }
      )
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          const { status, message } = response.data;
          if (status) {
            alertHandler("Verification code has been sent to your email.");
            let timer = setTimeout(() => {
              clearTimeout(timer);
              setShowAlert(false);
              navigation.navigate("ChangePassword", {
                email,
              });
            }, 3000);
          } else {
            alertHandler(message);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          console.log("Error", e);
        });
    }
  };

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color.secondaryColor,
        }}
      >
        <ActivityIndicator size={24} color={color.primaryColor} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Snackbar
          visible={showAlert}
          textMessage={alertMessage}
          backgroundColor={color.primaryColor}
          messageColor={color.secondaryColor}
          actionText="Okay"
          accentColor={color.secondaryColor}
          actionHandler={() => setShowAlert(false)}
        />

        <Image
          style={styles.logo}
          source={require("../assets/images/logo2.png")}
        />

        <TextInput
          style={styles.emailInput}
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <ButtonComponent
          text="Submit"
          isLoading={false}
          clickHandler={submitHandler}
          width={Dimensions.get("window").width / 1.3}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondaryColor,
    alignItems: "center",
  },
  logo: {
    width: Dimensions.get("window").width / 3.5,
    height: Dimensions.get("window").width / 3.5,
    marginTop: 70,
    marginBottom: 30,
  },
  emailInput: {
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").width / 8,
    fontSize: RFPercentage(2),
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 10,
    borderRadius: 5,
    color: color.primaryColor,
    paddingHorizontal: 20,
  },
  picker: {
    width: 250,
  },
  modalView: {
    backgroundColor: "white",
    padding: 10,
  },
  item: {
    marginHorizontal: 6,
    paddingVertical: 6,
    width: "100%",
  },
});
