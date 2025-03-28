import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, BackHandler, StyleSheet, AppState } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import * as NavigationBar from "expo-navigation-bar";

const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which language is used for React Native?",
    options: ["Java", "Python", "JavaScript", "C++"],
    answer: "JavaScript",
  },
  {
    id: 3,
    question: "Who developed the Theory of Relativity?",
    options: ["Newton", "Tesla", "Einstein", "Galileo"],
    answer: "Einstein",
  },
];

const TestStart = () => {
  const params = useLocalSearchParams();
  const { id, name } = params;
  const router = useRouter();

  const [timer, setTimer] = useState(60);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0); // <-- track current question


  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "background" || nextAppState === "inactive") {
        console.log("App moved to background, submitting test...");
        handleSubmit(); // Auto-submit if minimized
        router.replace("../(data)/tests");
        Alert.alert(
          "Test auto-submitted"
        );
      }
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);

    return () => subscription.remove();
  }, []);


  // Prevent going back
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Test in Progress", "You cannot leave the test once it has started.");
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    if (timer === 0) {
      backHandler.remove();
      return;
    }

    return () => backHandler.remove();
  }, [timer]);

  // Lock screen orientation and hide navigation bar
  useEffect(() => {
    const enableFullScreen = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      await NavigationBar.setVisibilityAsync("hidden");
    };
    enableFullScreen();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer === 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

    if(timer === 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleSelectOption = (questionId: number, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimer(0);
    let score = 0;
    questions.forEach((q) => {
      if (selectedOptions[q.id] === q.answer) score++;
    });

    Alert.alert("Test Completed", `You scored ${score}/${questions.length}`, [
      { text: "OK", onPress: () => router.replace("../(data)/tests") },
    ]);
  };

  const q = questions[currentQuestion];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Test: {name}</Text>
        <Text style={styles.timer}>Time Left: {timer}s</Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.question}>{q.question}</Text>
        {q.options.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => handleSelectOption(q.id, option)}
            style={[
              styles.optionButton,
              selectedOptions[q.id] === option && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selectedOptions[q.id] === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        {currentQuestion > 0 && (
          <TouchableOpacity onPress={handlePrev} style={[styles.submitButton, { backgroundColor: "#6B7280" }]}>
            <Text style={styles.submitButtonText}>Previous</Text>
          </TouchableOpacity>
        )}

        {currentQuestion < questions.length - 1 ? (
          <TouchableOpacity onPress={handleNext} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          !submitted && (
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Test</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    marginTop: 150,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
  selectedOption: {
    backgroundColor: "#2563EB",
  },
  selectedOptionText: {
    color: "white",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default TestStart;
