import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import color from "../../env";

export default ButtonComponent = ({ text, isLoading, clickHandler, width }) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.btn, { width: width }]}
        onPress={clickHandler}
      >
        {isLoading ? (
          <ActivityIndicator animating={isLoading} color="#fff" />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    // padding: 12,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width / 1.3,
    height: Dimensions.get("window").width / 8,
    backgroundColor: color.primaryColor,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  text: {
    color: color.secondaryColor,
    fontSize: RFPercentage(2),
    fontWeight: "700",
  },
});
