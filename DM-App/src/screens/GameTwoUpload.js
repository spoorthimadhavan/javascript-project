import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import color from "../../env";
import ButtonComponent from "../components/ButtonComponent";
import * as ImagePicker from "expo-image-picker";

const GameTwoUpload = () => {
  const { width } = Dimensions.get("screen");

  const [image, setImage] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gameIdOutline}>
        <Text style={styles.text}>Game ID: 2232123121243</Text>
      </View>
      <Text
        style={[
          styles.text,
          { color: "black", fontSize: RFPercentage(2.2), marginTop: width / 8 },
        ]}
      >
        Upload your image.
      </Text>
      {image ? (
        <TouchableOpacity onPress={pickImageHandler}>
          <Image source={{ uri: image }} style={styles.image} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={pickImageHandler}>
          <Image
            source={require("../assets/images/profile-image.jpg")}
            style={styles.image}
          />
        </TouchableOpacity>
      )}

      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
        <TextInput
          numberOfLines={6}
          maxLength={250}
          style={styles.input}
          placeholderTextColor="#888"
          placeholder="Enter some description"
        />
      </KeyboardAvoidingView>

      <View style={{ marginTop: 20 }}>
        <ButtonComponent
          text="Save"
          isLoading={false}
          clickHandler={() => {}}
          width={Dimensions.get("window").width / 2.2}
        />
      </View>
    </View>
  );
};

export default GameTwoUpload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  gameIdOutline: {
    padding: 8,
    borderColor: color.primaryColor,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: color.primaryColor,
    marginTop: Dimensions.get("window").width / 8,
  },
  text: {
    color: color.secondaryColor,
  },
  image: {
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").width / 1.5,
    marginTop: Dimensions.get("window").width / 20,
    borderRadius: Dimensions.get("window").width / 1.5,
  },
  input: {
    width: Dimensions.get("window").width / 1.3,
    padding: 10,
    borderColor: color.primaryColor,
    borderWidth: 1,
    textAlignVertical: "top",
    marginTop: Dimensions.get("window").width / 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: RFPercentage(2),
  },
});
