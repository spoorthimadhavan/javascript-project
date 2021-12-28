import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import Snackbar from "react-native-snackbar-component";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";

export default VerifyScreen = ({ route, navigation }) => {
  const { username } = route.params;

  console.log("USER", username);

  const [code, setCode] = useState("");
  console.log(code);

  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  const verifyHandler = () => {
    Keyboard.dismiss();
    if (code == "") {
      alertHandler("Verify code is empty");
    } else {
      setIsLoading(true);
      Axios.post(
        "https://digital-menschen.herokuapp.com/accounts/verify/",
        {
          code: code,
          email: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setIsLoading(false);
          const { status, message } = response.data;
          if (status) {
            alert("Successfully registered!");
            navigation.navigate("Login");
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

  const setUserLogin = async (data) => {
    await AsyncStorage.setItem("USER", JSON.stringify(data));
  };

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

        <Text
          style={{
            marginBottom: 20,
            paddingHorizontal: 40,
            fontSize: RFPercentage(2),
          }}
        >
          Please enter your verification code sent to your email.
        </Text>

        <TextInput
          style={styles.emailInput}
          placeholder="Enter code"
          keyboardType="number-pad"
          value={code}
          onChangeText={(text) => setCode(text)}
        />

        <ButtonComponent
          text="Verify"
          isLoading={false}
          clickHandler={verifyHandler}
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
    color: color.primaryColor,
    fontSize: RFPercentage(2),
    borderWidth: 1,
    borderColor: color.primaryColor,
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});
