import React from "react";
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

const GamesOne = (props) => {
  // data i.e. questions coming from backend
  const questionsArray = [
    {
      question: "What elephant looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Dear",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        { correctAnswer: "Elephant" },
      ],
    },
    {
      question: "What Lion looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        { correctAnswer: "Lion" },
      ],
    },
    {
      question: "What Giraffe looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Giraffe",
          image:
            "https://live.staticflickr.com/1751/42562233012_9068d479ce_b.jpg",
        },
        { correctAnswer: "Giraffe" },
      ],
    },
    {
      question: "What Tiger looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Tiger",
          image:
            "https://live.staticflickr.com/2834/11310313296_85f22ccc93.jpg",
        },
        { correctAnswer: "Tiger" },
      ],
    },
    {
      question: "What Zebra looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Zebra",
          image:
            "https://th.bing.com/th/id/R.e69f96a46fb72bb2ddfc16aa25bdbc8e?rik=jBys%2fstfssGHGw&pid=ImgRaw&r=0",
        },
        { correctAnswer: "Zebra" },
      ],
    },
    {
      question: "What Monkey looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Monkey",
          image:
            "https://petshoods.com/wp-content/uploads/2020/07/Howler-Monkey-Diet.jpg",
        },
        { correctAnswer: "Monkey" },
      ],
    },
    {
      question: "What Wolf looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Wolf",
          image:
            "https://2.bp.blogspot.com/-LiYVxoTK9SU/VDVhlTuAPQI/AAAAAAAAAc8/YWwZgdG1PLU/s1600/Wolf%2BWallpapers%2B(1).jpg",
        },
        { correctAnswer: "Wolf" },
      ],
    },
    {
      question: "What Cat looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Cat",
          image:
            "https://th.bing.com/th/id/OIP.dnEAv3e1UDBNtpZ2NvTcxwHaEK?pid=ImgDet&rs=1",
        },
        { correctAnswer: "Cat" },
      ],
    },
    {
      question: "What Dog looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Dog",
          image:
            "https://www.bluedogrescue.com/wp-content/uploads/2015/08/Pugsley-vet.jpg",
        },
        { correctAnswer: "Dog" },
      ],
    },
    {
      question: "What Squirrel looks like?",
      options: [
        {
          id: 1,
          title: "Elephant",
          image:
            "https://th.bing.com/th/id/R.3a82af2943ee3a9a8e248bba160aaf8c?rik=oQ8dGrf%2bx7N5iw&riu=http%3a%2f%2fwww.botswana.co.za%2fimages%2felephant-jeremy-jowell-1280x881.jpg&ehk=RFcq9%2f%2bFIjuGDXgtvl%2brX6EdtA34ZUwziP%2fkejZI4gI%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          id: 2,
          title: "Lion",
          image:
            "https://4.bp.blogspot.com/--Hi3i1pB6u4/UL-MuBauclI/AAAAAAAABaU/9D6HycXGyP8/s1600/lion-hd-wallpapers-2012+05.jpg",
        },
        {
          id: 3,
          title: "Deer",
          image:
            "https://live.staticflickr.com/5278/14561338926_4059576118.jpg",
        },
        {
          id: 4,
          title: "Squirrel",
          image:
            "https://th.bing.com/th/id/OIP.uk0hDbMUBFnRL74CHk0vDwHaE7?pid=ImgDet&rs=1",
        },
        { correctAnswer: "Squirrel" },
      ],
    },
  ];

  //questions
  const [questions] = React.useState(questionsArray);

  //count state
  const [count, setCount] = React.useState(1);

  //current question
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  //selected answer id for styling purpose
  const [selectedAnwserId, setSelectedAnswerId] = React.useState(null);

  //selected answer
  const [selectedAnwser, setSelectedAnswer] = React.useState(null);

  //first random answers
  var randomizedArray = questions[currentQuestion].options
    .slice(0, questions[currentQuestion].options.length - 1)
    .sort(() => Math.random() - 0.5);

  //answers array
  const [answers, setAnswers] = React.useState(randomizedArray);

  //select correct option
  const [correctAnswer, setCorrectAnswer] = React.useState(
    questions[currentQuestion].options[
      questions[currentQuestion].options.length - 1
    ].correctAnswer
  );

  //record number of tries
  const [tries, setTries] = React.useState(0);

  //set the modal visibility
  const [showModal, setShowModal] = React.useState(false);

  //show the alert
  const [showAlert, setShowAlert] = React.useState(false);

  //alert message
  const [alertMessage, setAlertMessage] = React.useState("");

  //alert handler
  const alertHandler = (alert) => {
    setAlertMessage(alert);
    setShowAlert(true);
  };

  //turn to next question else navigate to end game screen
  const nextQuestionHandler = () => {
    if (count < questions.length) {
      console.log("REACHEED");
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

  //show the states in the modal
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
  const selectedAnswerHandler = React.useCallback((ansId, answer) => {
    setSelectedAnswerId(ansId);
    setSelectedAnswer(answer);
  }, []);
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
        <Text style={styles.gamesText}>Choose an answer image</Text>
        <Text style={styles.line}> </Text>
        {answers.map((answer, index) => (
          <TouchableOpacity
            onPress={selectedAnswerHandler.bind(this, answer.id, answer.title)}
            key={index}
          >
            <View
              style={
                selectedAnwserId === answer.id
                  ? styles.selectedAnswerTab
                  : styles.answerTab
              }
            >
              <Image
                source={{ uri: answer.image }}
                style={styles.optionImages}
              />
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
    alignItems: "center",
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
  optionImages: {
    width: Dimensions.get("window").width / 1.2,
    height: Dimensions.get("window").width / 1.5,
    borderRadius: 5,
  },
});
