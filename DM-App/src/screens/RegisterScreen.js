import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import ButtonComponent from "../components/ButtonComponent";
import Snackbar from "react-native-snackbar-component";
import Axios from "axios";
import Modal from "../shared/modal";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";
import DatePicker from "react-native-modern-datepicker";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const roles = [
  { id: 0, value: "User" },
  { id: 1, value: "Doctor" },
  { id: 2, value: "Patient" },
  { id: 3, value: "Relative" },
];

const genders = [
  { id: 0, value: "Male" },
  { id: 1, value: "Female" },
];

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState("Your Role?");
  const [isLoading, setIsLoading] = useState(false);
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [securityQuestions, setSecurityQuestions] = useState([]);

  //set current date in the calendar
  const [selectedDate, setSelectedDate] = useState("");
  const [datePick, setDatePick] = useState(false);

  //get security questions
  const getSecurityQuestions = async () => {
    Axios.get(
      "https://digital-menschen.herokuapp.com/accounts/security-questions/"
    )
      .then((res) => {
        console.log(res.data.security_questions);
        setSecurityQuestions(res.data.security_questions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSecurityQuestions();
  }, []);

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  const registerHandler = () => {
    Keyboard.dismiss();
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (
      username == "" ||
      firstName == "" ||
      lastName == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == "" ||
      (role === "Patient" && selectedDate == "") ||
      gender == "" ||
      role == "" ||
      answer == ""
    ) {
      alertHandler("Fill all the fields");
    } else if (reg.test(email) === false) {
      alertHandler("Email is not valid");
    } else if (password != confirmPassword) {
      alertHandler("Password does not match");
    } else {
      setIsLoading(true);
      Axios.post(
        "https://digital-menschen.herokuapp.com/accounts/register/",
        {
          email: email.toLowerCase(),
          username: username,
          first_name: firstName,
          date_of_birth: selectedDate,
          last_name: lastName,
          password: password,
          password2: confirmPassword,
          security_question: question,
          security_answer: answer.toLowerCase(),
          role: role.toLowerCase(),
          gender: gender.toLowerCase(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          setIsLoading(false);
          const { data } = response;
          console.log(data);
          if (data.status) {
            navigation.navigate("Verify", {
              username: data.data.email,
            });
          } else {
            alertHandler(data.message);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          console.log("Error", e);
        });
    }
  };

  const questionPressHandler = (_value) => {
    setQuestion(_value);
    setQuestionModalVisible(false);
  };

  const rolePressHandler = (_value) => {
    setRole(_value);
    setRoleModalVisible(false);
  };

  const genderPressHandler = (_value) => {
    setGender(_value);
    setGenderModalVisible(false);
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
    <SafeAreaView style={{ flex: 1, backgroundColor: color.secondaryColor }}>
      <ScrollView keyboardShouldPersistTaps="handled">
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
              placeholder="Enter username"
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <TextInput
              style={styles.emailInput}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.emailInput}
              placeholder="Enter last name"
              keyboardType="email-address"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={styles.emailInput}
              placeholder="Enter email"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
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

            {role === "Patient" ? (
              <>
                {datePick ? (
                  <DatePicker
                    options={{
                      backgroundColor: color.secondaryColor,
                      textHeaderColor: color.primaryColor,
                      textDefaultColor: color.primaryColor,
                      selectedTextColor: color.secondaryColor,
                      mainColor: color.primaryColor,
                      textSecondaryColor: "#888",
                    }}
                    mode="calendar"
                    maximumDate="2018-12-31"
                    minimumDate="2000-12-31"
                    minuteInterval={30}
                    onDateChange={(date) => {
                      let formattedDate = moment(new Date(date)).format(
                        "DD-MM-YYYY"
                      );
                      console.log(formattedDate);
                      setSelectedDate(formattedDate);
                      const timeout = setTimeout(() => {
                        clearTimeout(timeout);
                        setDatePick(false);
                      }, 500);
                    }}
                    selected={selectedDate}
                    current="2018-12-31"
                    style={{
                      borderRadius: 10,
                      width: Dimensions.get("window").width / 1.2,
                      height: Dimensions.get("window").height / 4,
                    }}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => setDatePick(true)}
                    style={[
                      styles.emailInput,
                      { justifyContent: "center", alignItems: "center" },
                    ]}
                  >
                    <Text
                      style={{
                        color: color.primaryColor,
                        fontSize: RFPercentage(1.8),
                      }}
                    >
                      {selectedDate ? selectedDate : "Choose Date of birth"}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View />
            )}

            <TouchableOpacity
              style={[
                styles.emailInput,
                { alignItems: "center", justifyContent: "center" },
              ]}
              activeOpacity={0.6}
              onPress={setGenderModalVisible.bind(this, true)}
            >
              <Text
                style={{
                  fontSize: RFPercentage(1.8),
                  color: color.primaryColor,
                }}
              >
                {gender ? gender : "Gender"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.emailInput,
                { alignItems: "center", justifyContent: "center" },
              ]}
              activeOpacity={0.6}
              onPress={setRoleModalVisible.bind(this, true)}
            >
              <Text
                style={{
                  fontSize: RFPercentage(1.8),
                  color: color.primaryColor,
                }}
              >
                {role ? role : "User"}
              </Text>
            </TouchableOpacity>

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
              placeholder="Answer"
              value={answer}
              onChangeText={(text) => setAnswer(text)}
            />

            <ButtonComponent
              text="Register"
              isLoading={false}
              clickHandler={registerHandler}
              width={Dimensions.get("window").width / 1.3}
            />
          </View>
        </TouchableWithoutFeedback>

        <Modal
          visible={questionModalVisible}
          setVisible={setQuestionModalVisible}
        >
          <View style={styles.modalView}>
            {securityQuestions?.map((item, index) => (
              <TouchableOpacity
                key={`question${index}`}
                style={styles.item}
                activeOpacity={0.8}
                onPress={questionPressHandler.bind(this, item.question)}
              >
                <Text
                  style={{
                    fontSize: RFPercentage(1.8),
                    marginTop: 5,
                    color: color.primaryColor,
                  }}
                >
                  {item.question}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
        <Modal visible={roleModalVisible} setVisible={setRoleModalVisible}>
          <View style={styles.modalView}>
            {roles.slice(1, 4).map((item, index) => (
              <TouchableOpacity
                key={`role${index}`}
                style={styles.item}
                activeOpacity={0.8}
                onPress={rolePressHandler.bind(this, item.value)}
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
        <Modal visible={genderModalVisible} setVisible={setGenderModalVisible}>
          <View style={styles.modalView}>
            {genders.map((item, index) => (
              <TouchableOpacity
                key={`gender${index}`}
                style={styles.item}
                activeOpacity={0.8}
                onPress={genderPressHandler.bind(this, item.value)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 4,
    marginTop: 70,
    marginBottom: 20,
  },
  emailInput: {
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").width / 8,
    borderWidth: 1,
    fontSize: RFPercentage(2),
    color: color.primaryColor,
    borderColor: "grey",
    marginVertical: 10,
    borderRadius: 5,
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
    fontSize: RFPercentage(2),
  },
});

export default RegisterScreen;
