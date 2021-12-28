import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
  const [question, setQuestion] = useState("Favorite color?");
  const [answer, setAnswer] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);

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
    if (email == "" || answer == "") {
      alertHandler("Fill all fields");
    } else if (reg.test(email) === false) {
      alertHandler("Email is not valid");
    } else {
      setIsLoading(true);
      console.log(email, question, answer);
      Axios.post("https://minhalapp.herokuapp.com/index/forget_pass/", {
        email: email.toLowerCase(),
        security_question: question,
        security_answer: answer.toLowerCase(),
      })
        .then((response) => {
          setIsLoading(false);
          console.log(response.data);
          const { status, message, data } = response.data;
          if (status) {
            navigation.navigate("ChangePassword", {
              email,
            });
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

  //get user details
  const getDetails = () => {
    Axios.get("https://digital-menschen.herokuapp.com/accounts/user-details/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token 9f14ff08aa6cead06c0b9bc7dd63297569491326`,
      },
    })
      .then((res) => {
        console.log("RESPONSE ", res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const questionPressHandler = (_value) => {
    setQuestion(_value);
    setQuestionModalVisible(false);
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
          placeholder="Enter email"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TouchableOpacity
          style={[
            styles.emailInput,
            { alignItems: "center", justifyContent: "center" },
          ]}
          activeOpacity={0.6}
          onPress={setQuestionModalVisible.bind(this, true)}
        >
          <Text
            style={{
              fontSize: RFPercentage(1.8),
              color: color.primaryColor,
            }}
          >
            {question ? question : "Favorite Question"}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={styles.emailInput}
          placeholder="Enter answer"
          value={answer}
          onChangeText={(text) => setAnswer(text)}
        />

        <ButtonComponent
          text="Submit"
          isLoading={false}
          clickHandler={submitHandler}
          width={Dimensions.get("window").width / 1.3}
        />

        <Modal
          visible={questionModalVisible}
          setVisible={setQuestionModalVisible}
        >
          <View style={styles.modalView}>
            {questions.map((item, index) => (
              <TouchableOpacity
                key={`question${index}`}
                style={styles.item}
                activeOpacity={0.8}
                onPress={questionPressHandler.bind(this, item.value)}
              >
                <Text
                  style={{
                    fontSize: RFPercentage(1.8),
                    marginTop: 5,
                    color: color.primaryColor,
                  }}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
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
