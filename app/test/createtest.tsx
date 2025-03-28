import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

type Question = {
    id: number;
    question: string;
    options: string[];
    answer: string;
  };
  
const TestCreator = () => {
  const [testName, setTestName] = useState("");
  const [numQuestions, setNumQuestions] = useState("1"); // as text for TextInput
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();

  // Generate empty questions array when numQuestions changes
  const generateQuestions = () => {
    const n = parseInt(numQuestions);
    if (isNaN(n) || n <= 0) {
      Alert.alert("Enter a valid number of questions");
      return;
    }
    const newQuestions = Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      question: "",
      options: ["", "", "", ""],
      answer: "",
    }));
    setQuestions(newQuestions);
  };

  const updateQuestion = (index: number, field: string, value: string) => {
    const updated = [...questions];
    if (field === "question") updated[index].question = value;
    setQuestions(updated);
};

const updateOption = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
};

const setCorrectAnswer = (qIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].answer = value;
    setQuestions(updated);
};


  const handleSaveTest = () => {
    // Basic validation
    for (let q of questions) {
      if (!q.question || q.options.some(o => !o) || !q.answer) {
        Alert.alert("Please fill all fields and select answers properly");
        return;
      }
    }
    console.log("Test Created:", { testName, questions });
    Alert.alert("Success", "Test created successfully!");
    router.back(); // Go back after saving
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Test Creator</Text>

      <TextInput
        placeholder="Enter Test Name"
        value={testName}
        onChangeText={setTestName}
        style={styles.input}
      />

      <TextInput
        placeholder="Number of Questions"
        keyboardType="numeric"
        value={numQuestions}
        onChangeText={setNumQuestions}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={generateQuestions}>
        <Text style={styles.buttonText}>Generate Questions</Text>
      </TouchableOpacity>

      {questions.map((q, qIndex) => (
        <View key={q.id} style={styles.questionCard}>
          <Text style={styles.questionTitle}>Question {q.id}</Text>
          <TextInput
            placeholder="Question"
            value={q.question}
            onChangeText={(text) => updateQuestion(qIndex, "question", text)}
            style={styles.input}
          />

          {q.options.map((opt, optIndex) => (
            <TextInput
              key={optIndex}
              placeholder={`Option ${optIndex + 1}`}
              value={opt}
              onChangeText={(text) => updateOption(qIndex, optIndex, text)}
              style={styles.input}
            />
          ))}

          <TextInput
            placeholder="Correct Answer (Option Text)"
            value={q.answer}
            onChangeText={(text) => setCorrectAnswer(qIndex, text)}
            style={styles.input}
          />
        </View>
      ))}

      {questions.length > 0 && (
        <TouchableOpacity style={styles.button} onPress={handleSaveTest}>
          <Text style={styles.buttonText}>Save Test</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  questionCard: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TestCreator;
