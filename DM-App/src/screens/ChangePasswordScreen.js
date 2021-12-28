import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Snackbar from "react-native-snackbar-component";
import ButtonComponent from "../components/ButtonComponent";
import Axios from "axios";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";

export default ChangePasswordScreen = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { email } = route.params;
  console.log("EMAIL", {
    email,
    code,
    password,
    confirmPassword,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  const updateHandler = () => {
    Keyboard.dismiss();

    let passwordRegex = /^([a-zA-Z0-9@*#]{8,15})$/;

    if (password == "" || confirmPassword == "" || code == "") {
      alertHandler("Fill all the fields");
    } else if (!passwordRegex.test(password)) {
      alertHandler("Enter a strong password i.e. Password@123");
    } else if (password != confirmPassword) {
      alertHandler("Password and confirm password should be same.");
    } else {
      setIsLoading(true);
      Axios.post(
        "https://digital-menschen.herokuapp.com/accounts/reset-password/",
        {
          email: email.toLowerCase(),
          new_password: password,
          confirm_password: confirmPassword,
          verification_code: code,
        }
      )
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          const { status, message } = response.data;
          if (status) {
            alertHandler("Password has been changed successfully!");
            let timer = setTimeout(() => {
              clearTimeout(timer);
              setShowAlert(false);
              navigation.navigate("Login");
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

        <TextInput
          style={styles.emailInput}
          placeholder="Enter verification code"
          secureTextEntry={true}
          keyboardType="phone-pad"
          value={code}
          onChangeText={(text) => setCode(text)}
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
