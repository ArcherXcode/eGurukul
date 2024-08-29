import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons"; // Import icons for visibility toggle

const MyScreen = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for confirm password visibility
  const fullText = "eGurukul";
  const typingSpeed = 200; // milliseconds
  const deletingSpeed = 200; // milliseconds
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (isTyping) {
          if (index < fullText.length) {
            setDisplayedText(fullText.slice(0, index + 1));
            setIndex(index + 1);
          } else {
            setIsTyping(false);
          }
        } else {
          if (index > 0) {
            setDisplayedText(fullText.slice(0, index - 1));
            setIndex(index - 1);
          } else {
            setIsTyping(true);
          }
        }
      },
      isTyping ? typingSpeed : deletingSpeed
    );

    return () => clearTimeout(timer);
  }, [index, isTyping]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{displayedText}</Text>
        <Text style={styles.headerSub}>Your Second School</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.subHeaderText}>Reset Password</Text>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Enter Your New Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputBox}
              placeholder="New Password"
              secureTextEntry={!passwordVisible} // Show/hide password text
            />
            <TouchableOpacity
              style={styles.showHideButton}
              onPress={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility
            >
              <Text style={styles.showHideText}>
                {passwordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Confirm Your Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputBox}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible} // Show/hide confirm password text
            />
            <TouchableOpacity
              style={styles.showHideButton}
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} // Toggle password visibility
            >
              <Text style={styles.showHideText}>
                {confirmPasswordVisible ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.button}>
          <TouchableOpacity style={styles.buttonBox} activeOpacity={0.5} onPress={() => router.push('/login')}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#cfe0fc",
    width: "100%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: "20%",
    height: "10%",
  },
  subHeader: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: "25%",
  },
  headerText: {
    color: "#1e90FF",
    fontSize: 56,
    fontWeight: "bold",
  },
  headerSub: {
    position: "absolute",
    top: "90%",
    color: "#000",
    fontSize: 16,
    fontWeight: "300",
  },
  subHeaderText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },
  body: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    top: "25%",
    backgroundColor: "#1e90FF",
    borderRadius: 15,
    paddingVertical: 25,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 3,
  },
  input: {
    width: "80%",
    marginVertical: 10,
  },
  inputBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  footerText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
  inputLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    width: "80%",
    marginVertical: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonBox: {
    width: "60%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#1e90FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  otpButton: {
    width: "15%",
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  showHideButton: {
    padding: 10,
  },
  showHideText: {
    color: "#1e90FF",
    fontSize: 14,
    marginRight: 0,
  },
});

export default MyScreen;
