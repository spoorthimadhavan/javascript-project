import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import RelativeHomeScreen from "./screens/RelativeHomeScreen";
import DoctorHomeScreen from "./screens/DoctorHomeScreen";
import PatientProfile from "./screens/PatientProfile";

import { ActivityIndicator, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import VerifyScreen from "./screens/VerifyScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";
import GameOne from "./screens/GameOne";
import GameTwo from "./screens/GameTwo";
import GamesScreen from "./screens/GamesScreen";
import EndGame from "./screens/EndGame";
import GameOneUpload from "./screens/GameOneUpload";
import GameTwoUpload from "./screens//GameTwoUpload";
import Statistics from "./screens/Statistics";
import RelativeReview from "./screens/RelativeReview";
import StatisticsGraph from "./screens/StatisticsGraph";
import PatientDetails from "./screens/PatientDetails";
import DoctorsReview from "./screens/DoctorsReview";
import DoctorPatientProfile from "./screens/DoctorPatientProfile";
import PatientRelativeProfile from "./screens/RelativePatientProfile";
import RelativeMainHomeScreen from "./screens/RelativeMainHomeScreen";
import EditProfileScreen from "./screens/EditProfileScreen";

const Stack = createNativeStackNavigator();

const Route = () => {
  const [user, setUser] = useState(false);
  const [relative, setRelative] = useState(false);
  const [doctor, setDoctor] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const userData = await AsyncStorage.getItem("USER");
    const parsedData = JSON.parse(userData);

    if (userData != null && parsedData.role === "patient") {
      setUser(true);
    }

    if (userData != null && parsedData.role === "caretaker") {
      setRelative(true);
    }
    if (userData != null && parsedData.role === "doctor") {
      setDoctor(true);
    }
    setIsLoading(false);
  };

  const userStateHandler = (userState) => {
    setUser(userState);
  };

  const relativeStateHandler = (userState) => {
    setRelative(userState);
  };

  const doctorStateHandler = (userState) => {
    setDoctor(userState);
  };

  const defaultStylingForHeaders = {
    headerShown: true,
    headerTitleAlign: "center",
  };

  //routes for relatives
  function relativeRoutes() {
    return (
      <Stack.Navigator screenOptions={defaultStylingForHeaders}>
        <Stack.Screen
          name="RelativeHomes"
          options={{ title: "Relative's Home" }}
        >
          {(props) => (
            <RelativeMainHomeScreen
              {...props}
              relativesStateHandler={relativeStateHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="relativedashhomes"
          component={RelativeHomeScreen}
          options={{ title: "Patient's Details" }}
        />
        <Stack.Screen
          name="gameoneupload"
          component={GameOneUpload}
          options={{ title: "Upload Image" }}
        />
        <Stack.Screen
          name="gametwoupload"
          component={GameTwoUpload}
          options={{ title: "Upload Image" }}
        />
        <Stack.Screen
          name="statistics"
          component={Statistics}
          options={{ title: "Patient's Statisitics" }}
        />
        <Stack.Screen
          name="statisticsgraph"
          component={StatisticsGraph}
          options={{ title: "Patient's Graph" }}
        />
        <Stack.Screen
          name="relativereview"
          component={RelativeReview}
          options={{ title: "Write a review" }}
        />
        <Stack.Screen
          name="patientrelativeprofile"
          options={{ title: "Patient's Profile " }}
          component={PatientRelativeProfile}
        />
        <Stack.Screen
          name="editprofile"
          options={{ title: "Edit Details" }}
          component={EditProfileScreen}
        />
      </Stack.Navigator>
    );
  }

  //routes for doctors
  function doctorRoutes() {
    return (
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="DoctorHomes" options={{ title: "Doctor's Home" }}>
          {(props) => (
            <DoctorHomeScreen
              {...props}
              doctorsStateHandler={doctorStateHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="patientdetails"
          options={{ title: "Patient's Details" }}
          component={PatientDetails}
        />
        <Stack.Screen
          name="relativereview"
          options={{ title: "Relative's Review" }}
          component={DoctorsReview}
        />
        <Stack.Screen
          name="patientdoctorprofile"
          options={{ title: "Patient's Profile " }}
          component={DoctorPatientProfile}
        />
      </Stack.Navigator>
    );
  }

  // route for home
  function homeRoutes() {
    return (
      <Stack.Navigator screenOptions={defaultStylingForHeaders}>
        <Stack.Screen name="Homes" options={{ title: "Patient's Home" }}>
          {(props) => (
            <HomeScreen {...props} userStateHandler={userStateHandler} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="games"
          options={{ title: "Games" }}
          component={GamesScreen}
        />
        <Stack.Screen
          name="patientprofile"
          options={{ title: "Patient's Profile " }}
          component={PatientProfile}
        />
        <Stack.Screen
          name="game1"
          options={{ title: "Game One" }}
          component={GameOne}
        />
        <Stack.Screen
          name="game2"
          options={{ title: "Game Two" }}
          component={GameTwo}
        />
        <Stack.Screen
          name="endgame"
          options={{ headerShown: false }}
          component={EndGame}
        />
      </Stack.Navigator>
    );
  }

  //Routing before login
  function authRoutes() {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => (
            <LoginScreen
              {...props}
              userStateHandler={userStateHandler}
              doctorsStateHandler={doctorStateHandler}
              relativesStateHandler={relativeStateHandler}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Verify"
          component={VerifyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  const SplashLoader = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator style={{ width: 50, height: 50 }} color="#005d00" />
      </View>
    );
  };

  //Top level routing
  if (!isLoading) {
    return (
      <NavigationContainer>
        {user
          ? homeRoutes()
          : relative
          ? relativeRoutes()
          : doctor
          ? doctorRoutes()
          : authRoutes()}
        {/* {!user ? relativeRoutes() : authRoutes()} */}
      </NavigationContainer>
    );
  } else {
    return <SplashLoader />;
  }
};

export default Route;
