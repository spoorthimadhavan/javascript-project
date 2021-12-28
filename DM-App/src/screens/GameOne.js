import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import color from "../../env";
import { RFPercentage } from "react-native-responsive-fontsize";
import Snackbar from "react-native-snackbar-component";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GamesOne = (props) => {
  // data i.e. questions coming from backend
  const questionsArray = [
    {
      questionId: "1",
      question: "Who is the animal in the image?",
      questionImage:
        "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { correctAnswer: "Elephant" },
      ],
    },
    {
      questionId: "2",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { correctAnswer: "Lion" },
      ],
    },
    {
      questionId: "3",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://live.staticflickr.com/1751/42562233012_9068d479ce_b.jpg",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Giraffe" },

        { correctAnswer: "Giraffe" },
      ],
    },
    {
      questionId: "4",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://live.staticflickr.com/2834/11310313296_85f22ccc93.jpg",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Tiger" },

        { correctAnswer: "Tiger" },
      ],
    },
    {
      questionId: "5",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://th.bing.com/th/id/R.e69f96a46fb72bb2ddfc16aa25bdbc8e?rik=jBys%2fstfssGHGw&pid=ImgRaw&r=0",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Zebra" },

        { correctAnswer: "Zebra" },
      ],
    },
    {
      questionId: "6",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://petshoods.com/wp-content/uploads/2020/07/Howler-Monkey-Diet.jpg",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Monkey" },
        { correctAnswer: "Monkey" },
      ],
    },
    {
      questionId: "7",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://2.bp.blogspot.com/-LiYVxoTK9SU/VDVhlTuAPQI/AAAAAAAAAc8/YWwZgdG1PLU/s1600/Wolf%2BWallpapers%2B(1).jpg",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Wolf" },
        { correctAnswer: "Wolf" },
      ],
    },
    {
      questionId: "8",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://th.bing.com/th/id/OIP.dnEAv3e1UDBNtpZ2NvTcxwHaEK?pid=ImgDet&rs=1",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Cat" },
        { correctAnswer: "Cat" },
      ],
    },
    {
      questionId: "9",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://www.bluedogrescue.com/wp-content/uploads/2015/08/Pugsley-vet.jpg",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Dog" },
        { correctAnswer: "Dog" },
      ],
    },
    {
      question: "10",
      question: "Can you recognize the animal in the image?",
      questionImage:
        "https://th.bing.com/th/id/OIP.uk0hDbMUBFnRL74CHk0vDwHaE7?pid=ImgDet&rs=1",
      options: [
        { id: 1, answerText: "Elephant" },
        { id: 2, answerText: "Lion" },
        { id: 3, answerText: "Deer" },
        { id: 4, answerText: "Squirrel" },
        { correctAnswer: "Squirrel" },
      ],
    },
  ];

  //questions
  const [questions] = React.useState(questionsArray);

  //question count
  const [count, setCount] = React.useState(1);

  //current question
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  //selected answer id for styling purpose
  const [selectedAnwserId, setSelectedAnswerId] = React.useState(null);

  //selected answer id for styling purpose
  const [selectedAnwser, setSelectedAnswer] = React.useState(null);

  //first random answers
  var randomizedArray = questions[currentQuestion].options
    .slice(0, questions[currentQuestion].options.length - 1)
    .sort(() => Math.random() - 0.5);

  //answers array
  const [answers, setAnswers] = React.useState(randomizedArray);

  //correct answer for each question
  const [correctAnswer, setCorrectAnswer] = React.useState(
    questions[currentQuestion].options[
      questions[currentQuestion].options.length - 1
    ].correctAnswer
  );

  //record the number of tries
  const [tries, setTries] = React.useState(0);

  //attempts previously recorded
  const [attempts, setAttempts] = React.useState(0);

  //set the modal visibility
  const [showModal, setShowModal] = React.useState(false);

  // show alert
  const [showAlert, setShowAlert] = React.useState(false);

  // alert message
  const [alertMessage, setAlertMessage] = React.useState("");

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  //turn to next question else navigate to end game screen
  const nextQuestionHandler = () => {
    if (count === questions.length && selectedAnwser === correctAnswer) {
      console.log("log");
      storeAttempts();
    }
    if (count < questions.length) {
      setSelectedAnswerId(null);
      setSelectedAnswer(null);
      const nextCorrectAns =
        questions[currentQuestion].options[
          questions[currentQuestion].options.length - 1
        ].correctAnswer;
      setCorrectAnswer(nextCorrectAns);

      var rondomizedArray = questions[currentQuestion].options
        .slice(0, questions[currentQuestion].options.length - 1)
        .sort(() => Math.random() - 0.5);

      setAnswers(rondomizedArray);

      setCount(count + 1);
      setShowModal(false);
    } else {
      setShowModal(false);
      props.navigation.navigate("endgame", {
        tries: tries,
      });
    }
  };

  //show the states in the modal ans set a next question
  const triggerModalHandler = () => {
    if (selectedAnwser === null) {
      alertHandler("Please select any option.");
      return;
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
    setShowModal(true);
  };

  //selectedAnswer handler
  const selectedAnswerHandler = (ansId, answer) => {
    setSelectedAnswerId(ansId);
    setSelectedAnswer(answer);
  };

  //try again handler
  const tryAgainHandler = () => {
    if (count === questions.length) {
      setShowModal(false);
      setTries(tries + 1);
      setSelectedAnswerId(null);
      setSelectedAnswer(null);
    } else {
      const nextQuestion = currentQuestion - 1;
      setCurrentQuestion(nextQuestion);
      setSelectedAnswerId(null);
      setSelectedAnswer(null);
      setShowModal(false);
      setTries(tries + 1);
    }
  };

  //store successful user attempts
  const storeAttempts = async () => {
    const attempts = await AsyncStorage.getItem("attempts"); // database logic will be implemented
    let updatedAttempts = (attempts != null ? parseInt(attempts) : 0) + 1;
    console.log("VALUE", updatedAttempts);
    await AsyncStorage.setItem("attempts", JSON.stringify(updatedAttempts)); // database logic will be implemented
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <View>
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
          source={{ uri: questions[currentQuestion].questionImage }}
          style={styles.vectorImage}
        />
        <Text style={styles.line}> </Text>
        <View style={styles.questionRow}>
          <Text style={styles.actionText}>Question: </Text>
          <View style={styles.questionCount}>
            <Text style={{ color: color.secondaryColor }}>
              {currentQuestion + 1 + " out of " + questions.length}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.actionText,
            { color: "#222222", fontWeight: "200", marginTop: 25 },
          ]}
        >
          {questions[currentQuestion].question}
        </Text>
        <Text style={styles.gamesText}>Choose an answer</Text>
        <Text style={styles.line}> </Text>
        {answers.map((answer, index) => (
          <TouchableOpacity
            onPress={selectedAnswerHandler.bind(
              this,
              answer.id,
              answer.answerText
            )}
            key={index}
          >
            <View
              style={
                selectedAnwserId === answer.id
                  ? styles.selectedAnswerTab
                  : styles.answerTab
              }
            >
              <Text
                style={
                  selectedAnwserId === answer.id
                    ? [styles.answerText, { color: color.secondaryColor }]
                    : styles.answerText
                }
              >
                {answer.answerText}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.buttons}>
          <ButtonComponent
            text="Next"
            isLoading={false}
            clickHandler={triggerModalHandler}
            width={Dimensions.get("window").width / 2.5}
          />
        </View>
      </View>

      {/* modal for showing correct or incorrect options */}
      <Modal visible={showModal} statusBarTranslucent={true}>
        <View style={styles.modal}>
          {selectedAnwser === correctAnswer ? (
            <>
              <Image
                source={require("../assets/images/kids-vector4.jpg")}
                style={[
                  styles.vectorImage,
                  { height: Dimensions.get("window").width / 1.1 },
                ]}
              />
              <Text style={[styles.optionSelectedText, { color: "green" }]}>
                Hurray!{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  {correctAnswer}{" "}
                </Text>
                is a correct answer
              </Text>
            </>
          ) : (
            <>
              <Image
                source={require("../assets/images/kids-vector3.jpg")}
                style={[
                  styles.vectorImage,
                  { height: Dimensions.get("window").width / 1.1 },
                ]}
              />
              <Text style={styles.optionSelectedText}>
                Oops!{" "}
                <Text style={{ textDecorationLine: "underline" }}>
                  {selectedAnwser}
                </Text>{" "}
                is a wrong anwser
              </Text>
            </>
          )}

          <View style={{ marginTop: 40 }}>
            <ButtonComponent
              text={
                count === questions.length && selectedAnwser === correctAnswer
                  ? "Finish"
                  : selectedAnwser === correctAnswer
                  ? "Continue..."
                  : "Try Again"
              }
              isLoading={false}
              clickHandler={
                selectedAnwser === correctAnswer
                  ? nextQuestionHandler
                  : tryAgainHandler
              }
              width={Dimensions.get("window").width / 2.5}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default GamesOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.secondaryColor,
    padding: 20,
  },
  vectorImage: {
    width: Dimensions.get("window").width / 1.1,
    height: Dimensions.get("window").width / 1.6,
    alignSelf: "center",
    marginTop: 30,
  },
  gamesText: {
    color: color.primaryColor,
    fontSize: RFPercentage(2.2),
    marginTop: 30,
  },
  line: {
    width: Dimensions.get("window").width / 1.1,
    borderBottomColor: color.primaryColor,
    borderBottomWidth: 0.7,
  },
  actionText: {
    marginTop: 20,
    color: "black",
    fontWeight: "700",
    fontSize: RFPercentage(2.2),
  },
  card: {
    width: Dimensions.get("window").width / 2.5,
    height: Dimensions.get("window").width / 2.8,
    elevation: 8,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: color.secondaryColor,
    borderColor: color.primaryColor,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 5,
  },
  gameText: {
    color: color.primaryColor,
    fontSize: RFPercentage(2),
  },
  cardView: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  answerTab: {
    borderColor: color.primaryColor,
    borderWidth: 0.7,
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  selectedAnswerTab: {
    backgroundColor: color.primaryColor,
    borderWidth: 0.7,
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
  },
  answerText: {
    fontSize: RFPercentage(2),
    color: "black",
  },
  buttons: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "flex-end",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionCount: {
    padding: 8,
    backgroundColor: color.primaryColor,
    borderRadius: 5,
    marginTop: 20,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    marginTop: Dimensions.get("window").width / 3,
  },
  optionSelectedText: {
    fontSize: RFPercentage(2.5),
    color: "red",
    marginTop: 20,
  },
});
