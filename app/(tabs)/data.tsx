import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import { Link, router } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

const MyScreen = () => {
  const handleLogout = () => {
    router.replace("/(authentication)/login");
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <FontAwesome
            name="search"
            size={16}
            color="#787878"
            style={styles.icon}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="Search"
            placeholderTextColor={"#787878"}
          />
        </View>
      </View>
      <View style={styles.wholeContainer}>
        <View style={styles.miniContainer}>
          <Feather
            name="bookmark"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Subjects</Text>
        </View>
        <View style={styles.miniContainer}>
          <Entypo
            name="circular-graph"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Result</Text>
        </View>
        <View style={styles.miniContainer}>
          <Entypo
            name="calendar"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Class Timetable</Text>
        </View>
        <View style={styles.miniContainer}>
          <MaterialIcons
            name="list-alt"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Tests & Quizzes</Text>
        </View>
        <View style={styles.miniContainer}>
          <Entypo
            name="credit"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Fees</Text>
        </View>
        <View style={styles.miniContainer}>
          <Entypo
            name="book"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Exam Routines</Text>
        </View>
        <View style={styles.miniContainer}>
          <Entypo
            name="chat"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Feedback</Text>
        </View>
        <View style={styles.miniContainer}>
          <Entypo
            name="cog"
            size={20}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          <Text style={styles.buttonText}>Settings</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    // padding: 10,
    width: "100%",
  },
  wholeContainer: {
    width: "97%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#ffffff",
    padding: 5,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 20,
    width: "90%",
  },
  icon: {
    marginRight: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "400",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // height: 60,
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputBox: {
    flex: 1, // Take up the remaining space
    paddingVertical: 10,
    paddingLeft: 5, // Adjust for padding between icon and text
    fontSize: 16,
    color: "#000",
  },
  miniContainer: {
    // backgroundColor: '#ffffff',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 15,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderBlockColor: "gray",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "black",
    textAlign: "left",
  },
});

export default MyScreen;
