import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import { Link, router } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";

const MyScreen = () => {
  
  const handleScreens = (screen: string) => {
    if (screen === "subjects") {
      router.push("/subjects");
    } else if (screen === "results") {
      router.push("/results");
    } else if (screen === "classTimetable") {
      router.push("/classTimetable");
    } else if (screen === "tests") {
      router.push("/tests");
    } else if (screen === "fees") {
      router.push("/fees");
    } else if (screen === "examRoutines") {
      router.push("/examRoutines");
    } else if (screen === "feedback") {
      router.push("/feedback");
    } else if (screen === "profile") {
      router.push("/profile");
    }
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
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('subjects')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <Feather
            name="bookmark"
            size={20}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Subjects</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('results')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <Entypo
            name="circular-graph"
            size={20}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Result</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('classTimetable')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <Entypo
            name="calendar"
            size={20}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Class Timetable</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('tests')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <MaterialIcons
            name="list-alt"
            size={20}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Tests & Quizzes</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('fees')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <Entypo
            name="credit"
            size={20}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Fees</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('examRoutines')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <FontAwesome5
            name="tasks"
            size={20}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Exam Routines</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('feedback')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <Ionicons
            name="chatbox-ellipses-outline"
            size={20}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Feedback</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
        <Pressable style={styles.miniContainer}
        onPress={() => handleScreens('profile')}
        >
          <View style={styles.miniFirstRow}>
          <View style={styles.iconContainer}>
          <Ionicons
            name="settings-outline"
            size={22}
            color={"#000"}
          />
          </View>
          <Text style={styles.buttonText}>Account Center</Text>
          </View>
          <View style={styles.miniSecondRow}>
          <SimpleLineIcons
            name="arrow-right"
            size={10}
            color={"#000"}
            style={{ marginRight: 10 }}
          />
          </View>
        </Pressable>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingRight: 20,
    paddingLeft: 10,
    width: "90%",
  },
  icon: {
    marginRight: 5,
  },
  iconContainer: {
    width: 35,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
    paddingVertical: 15,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  inputBox: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 5,
    fontSize: 16,
    fontWeight: '500',
    color: "#000",
  },
  miniContainer: {
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
    fontWeight: "500",
    color: "black",
    textAlign: "left",
  },
  miniFirstRow:{
    flexDirection: "row", 
    width: '70%', 
    justifyContent:'flex-start', 
    alignItems: 'center'
  },
  miniSecondRow:{
    flexDirection: "row", 
    width: '30%', 
    justifyContent:'flex-end', 
    alignItems: 'center'
  },
});

export default MyScreen;
