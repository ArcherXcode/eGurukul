import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "@react-native-firebase/auth";
import RadioGroup from "react-native-radio-buttons-group";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { FirebaseError } from "@firebase/util";
import auth from "@react-native-firebase/auth";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MyScreen = () => {
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [index, setIndex] = useState(0);
  const fullText = "eGurukul";
  const typingSpeed = 200; // milliseconds
  const deletingSpeed = 200; // milliseconds
  const [selectedCoordinateYear, setSelectedCoordinateYear] = useState("");
  const [loading, setLoading] = useState(false);

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

  const departmentData = useMemo(
    () => [
      {
        id: 1,
        label: "Computer Science",
        value: "Computer Science",
      },
      {
        id: 2,
        label: "Electrical Engineering",
        value: "Electrical Engineering",
      },
      {
        id: 3,
        label: "Mechanical Engineering",
        value: "Mechanical Engineering",
      },
      {
        id: 4,
        label: "Civil Engineering",
        value: "Civil Engineering",
      },
    ],
    []
  );

  const levelData = useMemo(
    () => [
      {
        id: 1,
        label: "Lecturer",
        value: "Lecturer",
      },
      {
        id: 2,
        label: "Assistant Professor",
        value: "Assistant Professor",
      },
      {
        id: 3,
        label: "Associate Professor",
        value: "Associate Professor",
      },
      {
        id: 4,
        label: "Professor",
        value: "Professor",
      },
    ],
    []
  );

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Mr.",
        value: "Mr.",
        color: "#fff",
        size: 18
      },
      {
        id: "2",
        label: "Mrs.",
        value: "Mrs.",
        color: "#fff",
        size: 18
      },
      {
        id: "3",
        label: "Ms.",
        value: "Ms.",
        color: "#fff",
        size: 18
      },
      {
        id: "4",
        label: "Dr.",
        value: "Dr.",
        color: "#fff",
        size: 18
      },
    ],
    []
  );

  const coordinateYear = useMemo(
    () => [
      {
        id: 1,
        label: "1st Year",
        value: "1st Year",
      },
      {
        id: 2,
        label: "2nd Year",
        value: "2nd Year",
      },
      {
        id: 3,
        label: "3rd Year",
        value: "3rd Year",
      },
      {
        id: 4,
        label: "4th Year",
        value: "4th Year",
      },
    ],
    []
  );

  const signup = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      alert("Coordinator Registration Successful");
      router.push('/login');
    } catch (e: any) {
      const error = e as FirebaseError;
      alert("Registration Failed: " + error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{displayedText}</Text>
        <Text style={styles.headerSub}>Your Second School</Text>
      </View>
      <View style={styles.cardContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={[styles.inputBox, { marginTop: 10, marginBottom: -10 }]}>
            <Text style={styles.label}>
              Prefix <Text style={styles.asterik}>*</Text>
            </Text>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={(id) => setSelectedPrefix(id)}
              selectedId={selectedPrefix}
              containerStyle={styles.radioContainer}
              labelStyle={styles.radioLabel}
            />
          </View>
          <View style={[styles.inputBox, { marginTop: 20 }]}>
            <Text style={styles.label}>
              First Name <Text style={styles.asterik}>*</Text>
            </Text>
            <TextInput 
            style={styles.input} 
            placeholder="First Name" 
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Middle Name</Text>
            <TextInput style={styles.input} placeholder="Middle Name" />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Last Name <Text style={styles.asterik}>*</Text>
            </Text>
            <TextInput style={styles.input} placeholder="Last Name" autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off" />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Email <Text style={styles.asterik}>*</Text>
            </Text>
            <TextInput style={styles.input} placeholder="Work Email" autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off" 
            value={email}
            onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Level <Text style={styles.asterik}>*</Text>
            </Text>
            <Dropdown
              data={levelData}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.dropdownPlaceholder}
              itemContainerStyle={styles.dropdownItem}
              placeholder="Select Level"
              style={styles.dropdown}
              value={selectedLevel}
              labelField={"label"}
              valueField={"value"}
              onChange={(item) => setSelectedLevel(item.value)}
              activeColor="#cfe0fc"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Department <Text style={styles.asterik}>*</Text>
            </Text>
            <Dropdown
              data={departmentData}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.dropdownPlaceholder}
              itemContainerStyle={styles.dropdownItem}
              style={styles.dropdown}
              placeholder="Select Department"
              value={selectedDepartment}
              labelField={"label"}
              valueField={"value"}
              onChange={(item) => setSelectedDepartment(item.value)}
              activeColor="#cfe0fc"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Coordination Year <Text style={styles.asterik}>*</Text>
            </Text>
            <Dropdown
              data={coordinateYear}
              showsVerticalScrollIndicator={false}
              placeholderStyle={styles.dropdownPlaceholder}
              containerStyle={styles.dropdownContainer}
              itemContainerStyle={styles.dropdownItem}
              style={styles.dropdown}
              placeholder="Select Coordination Year"
              value={selectedCoordinateYear}
              labelField={"label"}
              valueField={"value"}
              onChange={(item) => setSelectedCoordinateYear(item.value)}
              activeColor="#cfe0fc"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Password <Text style={styles.asterik}>*</Text>
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
              />
              <TouchableOpacity
                style={styles.showHideButton}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Text style={styles.showHideText}>
                  {passwordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Confirm Password <Text style={styles.asterik}>*</Text>
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Confirm Password"
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
              />
              <TouchableOpacity
                style={styles.showHideButton}
                onPress={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
              >
                <Text style={styles.showHideText}>
                  {confirmPasswordVisible ? "Hide" : "Show"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={() => signup()}>
            <Text style={styles.buttonText}>Sign-Up</Text>
          </TouchableOpacity>
          <Link href='/(teacher)/teacherSignup'><AntDesign name={'arrowleft'} size={18} color={'#fff'}/> <Text style={styles.footerText}>Go Back</Text></Link>
        </View>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cfe0fc",
    paddingHorizontal: 10,
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
    height: "10%",
    marginTop: -20
  },
  headerText: {
    color: "#1e90FF",
    fontSize: 56,
    fontWeight: "bold",
    marginTop: -20,
  },
  headerSub: {
    position: "absolute",
    top: "80%",
    color: "#000",
    fontSize: 16,
    fontWeight: "300",
  },
  cardContainer: {
    top: "5%",
    flexDirection: "column",
    width: "95%",
    height: "65%",
    backgroundColor: "#1e90FF",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {width: 3, height: 5},
    shadowRadius: 3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 20, // Add padding at the bottom to prevent cutting off content
  },
  inputBox: {
    width: windowWidth - 80,
    borderRadius: 10,
    height: 60,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 25,
  },
  input: {
    width: windowWidth - 80,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingLeft: 10,
    marginLeft: -2,
  },
  asterik: {
    color: "orange",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    marginBottom: 8,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth - 80,
    borderRadius: 8,
    marginLeft: -8,
    height: 30,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  dropdown: {
    width: windowWidth - 80,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingLeft: 10,
    marginLeft: -2,
  },
  dropdownContainer: {
    borderRadius: 10,
  },
  dropdownItem: {
    borderRadius: 10,
  },
  dropdownPlaceholder: {
    color: "#ccc",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: windowWidth - 80,
    paddingHorizontal: 10,
  },
  inputPassword: {
    width: windowWidth - 120,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingLeft: 10,
    marginLeft: -2,
  },
  showHideButton: {
    marginLeft: -20,
    borderRadius: 5,
  },
  showHideText: {
    color: "#1e90FF",
    fontSize: 14,
    textAlign: "right",
    width: 40,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    paddingTop: 20,
  },
  button: {
    width: "40%",
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#1e90FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default MyScreen;
