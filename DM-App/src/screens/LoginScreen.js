import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import Snackbar from "react-native-snackbar-component";
import ButtonComponent from "../components/ButtonComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { RFPercentage } from "react-native-responsive-fontsize";
import color from "../../env";
import { useDispatch, useSelector } from "react-redux";

export default LoginScreen = ({
  navigation,
  userStateHandler,
  doctorsStateHandler,
  relativesStateHandler,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [detectedWidth, setDetectedWidth] = useState(
    Dimensions.get("window").width
  );
  const [detectedHeight, setDetectedHeight] = useState(
    Dimensions.get("window").height
  );

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  //get user details
  const getUserDetails = async (token) => {
    console.log("TOKEN", token);

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
        if (res.data.data.role === "caretaker") {
          relativesStateHandler(true);
          let userData = res.data.data;
          setUserLogin({ ...userData, token: token });
        }
        if (res.data.data.role === "doctor") {
          console.log("REACHED DOCTOR");
          doctorsStateHandler(true);
          let userData = res.data.data;
          setUserLogin({ ...userData, token: token });
        }

        if (res.data.data.role === "patient") {
          userStateHandler(true);
          let userData = res.data.data;
          setUserLogin({ ...userData, token: token });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginHandler = () => {
    Keyboard.dismiss();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let validEmail = false;
    let validPassword = false;
    if (email == "") {
      setEmailError("Email is required");
      validEmail = false;
    } else if (reg.test(email) === false) {
      setEmailError("Email is not valid");
      validEmail = false;
    } else {
      setEmailError(null);
      validEmail = true;
    }

    if (password == "") {
      setPasswordError("Password is required");
      validPassword = false;
    } else if (password.length < 3) {
      setPasswordError("Password is weak");
      validPassword = false;
    } else {
      setPasswordError(null);
      validPassword = true;
    }

    if (validEmail && validPassword) {
      setIsLoading(true);
      console.log(email.toLowerCase(), password);
      Axios.post("https://digital-menschen.herokuapp.com/accounts/token/", {
        email: email.toLowerCase(),
        password: password,
      })
        .then((response) => {
          setIsLoading(false);
          console.log("LOGIN -> ", response.data);

          const { token } = response.data;

          if (token) {
            getUserDetails(token);
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

  const registerHandler = () => {
    navigation.navigate("Register");
  };

  const forgetPasswordHandler = () => {
    navigation.navigate("ForgetPassword");
  };

  const setUserLogin = async (data) => {
    await AsyncStorage.setItem("USER", JSON.stringify(data));
  };

  //  change layout on the basis of height and width
  useEffect(() => {
    const updateLayout = () => {
      setDetectedWidth(Dimensions.get("window").width);
      setDetectedHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          paddingBottom: 40,
        }}
      >
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

        <View>
          <TextInput
            style={[
              styles.emailInput,
              {
                width: detectedWidth / 1.3,
                height:
                  detectedHeight < 500
                    ? detectedHeight / 8
                    : detectedHeight / 15,
              },
            ]}
            placeholder="Enter email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {emailError == null ? null : (
            <Text style={{ color: "red" }}>{emailError}</Text>
          )}
        </View>

        <View>
          <TextInput
            style={[
              styles.emailInput,
              {
                width: detectedWidth / 1.3,
                height:
                  detectedHeight < 500
                    ? detectedHeight / 8
                    : detectedHeight / 15,
              },
            ]}
            placeholder="Enter password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {passwordError == null ? null : (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          )}
        </View>
        <Text style={styles.forgetText} onPress={forgetPasswordHandler}>
          Forget password?
        </Text>

        <ButtonComponent
          text="Login"
          isLoading={false}
          clickHandler={loginHandler}
          width={detectedWidth / 1.3}
        />

        <Text style={styles.registerText} onPress={registerHandler}>
          Don't have an account?{" "}
          <Text style={{ color: color.primaryColor }}> Register Now! </Text>
        </Text>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    width: Dimensions.get("window").width / 3.5,
    height: Dimensions.get("window").width / 3.5,
    marginTop: 70,
    marginBottom: 30,
  },
  emailInput: {
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").width / 7.6,
    fontSize: RFPercentage(2),
    borderWidth: 1,
    color: color.primaryColor,
    borderColor: color.primaryColor,
    marginVertical: 10,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  registerText: {
    marginTop: Dimensions.get("window").width / 7,
    fontWeight: "bold",
    fontSize: RFPercentage(2),
  },
  forgetText: {
    fontWeight: "bold",
    marginTop: Dimensions.get("window").width / 30,
    marginBottom: Dimensions.get("window").width / 15,
    fontSize: RFPercentage(2),
  },
});
