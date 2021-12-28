import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import Snackbar from "react-native-snackbar-component";
import ButtonComponent from "../components/ButtonComponent";
import Axios from "axios";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";

export default ChangePasswordScreen = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { email } = route.params;

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  const updateHandler = () => {
    Keyboard.dismiss();

    if (password == "" || confirmPassword == "") {
      alertHandler("Fill all the fields");
    } else if (password != confirmPassword) {
      alertHandler("Password does not match");
    } else {
      setIsLoading(true);
      Axios.post("https://minhalapp.herokuapp.com/index/reset_pass/", {
        email: email.toLowerCase(),
        new_pass: password,
        confirm_pass: confirmPassword,
      })
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          const { status, message, data } = response.data;
          if (status) {
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
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={styles.emailInput}
          placeholder="Enter confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <ButtonComponent
          text="Update"
          isLoading={false}
          clickHandler={updateHandler}
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
    color: color.primaryColor,
    borderColor: "grey",
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});
