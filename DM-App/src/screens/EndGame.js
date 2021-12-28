import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import color from "../../env";

const EndGame = (props) => {
  // get tries from the param
  const { tries } = props.route.params;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: RFPercentage(3) }}>
        Hurray! you have finished the game!
      </Text>

      {/* Show tries conditionally */}
      {tries == 0 ? (
        <Text style={{ fontSize: RFPercentage(2.3), marginTop: 20 }}>
          Great! no re-attempts. Keep it up!
        </Text>
      ) : (
        <Text style={{ fontSize: RFPercentage(2.3), marginTop: 20 }}>
          You have completed in {tries} attempts .
        </Text>
      )}

      <Image
        source={require("../assets/images/kids-vector5.jpg")}
        style={styles.vectorImage}
      />

      <View style={{ marginTop: 40 }}>
        <ButtonComponent
          text="Play More"
          isLoading={false}
          clickHandler={() => props.navigation.navigate("games")}
          width={Dimensions.get("window").width / 2.5}
        />
      </View>
    </View>
  );
};

export default EndGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.secondaryColor,
  },
  vectorImage: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").width / 1.4,
    alignSelf: "center",
    marginTop: 30,
  },
});
