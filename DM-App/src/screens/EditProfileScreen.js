import Axios from "axios";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import color from "../../env";
import ButtonComponent from "../components/ButtonComponent";
const { width } = Dimensions.get("window");
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/action";

const EditProfileScreen = ({ route, navigation }) => {
  const { patient } = route.params;
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const patientData = useSelector((state) => state.userData.user);
  console.log(userData);

  const [fname, setFname] = useState(patient.first_name);
  const [lname, setLname] = useState(patient.last_name);
  const [age, setAge] = useState(patient.patient_age);
  const [gender, setGender] = useState(patient.gender);
  const [relFname, setRelFname] = useState(patient.caretaker.first_name);
  const [relLname, setRelLname] = useState(patient.caretaker.last_name);
  const [email, setEmail] = useState(patient.caretaker.email);

  console.log("fname", fname);
  console.log("lname", lname);
  console.log("age", age);
  console.log("gender", gender);
  console.log("relname", relFname);
  console.log("relLname", relLname);
  console.log("email", email);
  console.log("patient uuid", patient.uuid);
  console.log("token", userData?.token);

  const [isLoading, setIsLoading] = useState(false);

  // get user data
  useEffect(() => {
    getUserData();
  }, []);

  // get user data
  const getUserData = async () => {
    const user = await AsyncStorage.getItem("USER");
    setUserData(JSON.parse(user));
  };

  const updatePatientDetailsHandler = () => {
    setIsLoading(true);
    Axios.patch(
      "https://digital-menschen.herokuapp.com/accounts/user-update/",
      {
        patient_uuid: patient.uuid,
        first_name: fname,
        last_name: lname,
        date_of_birth: patient.date_of_birth,
        patient_age: age,
        gender: gender.toLowerCase(),
        caretaker: {
          email: email,
          first_name: relFname,
          last_name: relLname,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userData?.token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        dispatch(
          actions.storeUserDetails({
            ...patientData,
            first_name: fname,
            last_name: lname,
            patient_age: age,
            gender: gender.toLowerCase(),
            caretaker: {
              first_name: relFname,
              last_name: relLname,
              email: email,
            },
          })
        );
        navigation.goBack();
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("ERROR ", e);
      });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={24} color={color.primaryColor} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        paddingHorizontal: width / 10,
        backgroundColor: "#fff",
      }}
    >
      <View>
        <TextInput
          style={[styles.input, { marginTop: 15 }]}
          placeholder="First Name"
          onChangeText={(text) => setFname(text)}
          value={fname}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(text) => setLname(text)}
          value={lname}
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          onChangeText={(text) => setAge(text)}
          value={age}
        />
        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={(text) => setGender(text)}
          value={gender}
        />
        <TextInput
          style={styles.input}
          placeholder="Relative's First Name"
          onChangeText={(text) => setRelFname(text)}
          value={relFname}
        />
        <TextInput
          style={styles.input}
          placeholder="Relative's Last Name"
          onChangeText={(text) => setRelLname(text)}
          value={relLname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <ButtonComponent
          text="Update Details"
          isLoading={false}
          clickHandler={updatePatientDetailsHandler}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  input: {
    padding: 12,
    borderColor: color.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    fontSize: RFPercentage(2),
  },
});
