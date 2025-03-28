import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import RadioGroup from "react-native-radio-buttons-group";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { FIREBASE_APP } from "@/firebaseConfig";
import { UIActivityIndicator } from "react-native-indicators";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MyScreen = () => {
  const [classID, setClassID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
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
  const [loading, setLoading] = useState(false);
  const [emailPrefix, setEmailPrefix] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");

  interface DropdownValues {
    id: number;
    label: string;
    value: string;
  }

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

  useEffect(() => {
    if (emailPrefix && selectedDomain) {
      setEmail(`${emailPrefix}${selectedDomain}`);
    }
  }, [emailPrefix, selectedDomain]);

  const schoolName = useMemo(
    () => [
      {
        id: 1,
        label: "Sharda University",
        value: "Sharda University",
        email: [
          {
            id: 1,
            label: "Default",
            value: "@sharda.ac.in",
          },
          // {
          //   id: 2,
          //   label: "Undergraduate",
          //   value: "@ug.sharda.ac.in",
          // },
          // {
          //   id: 3,
          //   label: "Postgraduate",
          //   value: "@pg.sharda.ac.in",
          // },
        ],
      },
      {
        id: 2,
        label: "Amity University",
        value: "Amity University",
        email: [
          {
            id: 1,
            label: "Default",
            value: "@amity.edu",
          },
          // {
          //   id: 2,
          //   label: "Undergraduate",
          //   value: "@ug.amity.edu",
          // },
          // {
          //   id: 3,
          //   label: "Postgraduate",
          //   value: "@pg.amity.edu",
          // },
        ],
      },
      {
        id: 3,
        label: "Chandigarh University",
        value: "Chandigarh University",
        email: [
          {
            label: "Default",
            value: "@cuchd.ac.in",
            id: 1,
          },
          // {
          //   id: 2,
          //   label: "Undergraduate",
          //   value: "@ug.cuchd.ac.in",
          // },
          // {
          //   id: 3,
          //   label: "Postgraduate",
          //   value: "@pg.cuchd.ac.in",
          // },
        ],
      },
      {
        id: 4,
        label: "Lovely Professional University",
        value: "Lovely Professional University",
        email: [
          {
            id: 1,
            label: "Default",
            value: "@lpu.ac.in",
          },
          // {
          //   id: 2,
          //   label: "Undergraduate",
          //   value: "@ug.lpu.ac.in",
          // },
          // {
          //   id: 3,
          //   label: "Postgraduate",
          //   email: "@pg.lpu.ac.in",
          // },
        ],
      },
    ],
    []
  );

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
        id: "Mr.",
        label: "Mr.",
        value: "Mr.",
        color: "#fff",
        size: 18,
      },
      {
        id: "Mrs.",
        label: "Mrs.",
        value: "Mrs.",
        color: "#fff",
        size: 18,
      },
      {
        id: "Ms.",
        label: "Ms.",
        value: "Ms.",
        color: "#fff",
        size: 18,
      },
      {
        id: "Dr.",
        label: "Dr.",
        value: "Dr.",
        color: "#fff",
        size: 18,
      },
    ],
    []
  );

  const signup = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const db = getFirestore(FIREBASE_APP);

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const data = {
        prefix: selectedPrefix,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        email: email,
        school: selectedSchool,
        level: selectedLevel,
        department: selectedDepartment,
        classId: classID,
        role: "Lecturer",
      };
      if (user) {
        await sendEmailVerification(user);
        const userRef = doc(collection(db, "users"), user.uid);
        await setDoc(userRef, data);
        setLoading(false);
        Alert.alert("Success", "Signed up successfully. Please verify the Email.", [
          {
            text: "OK",
            onPress: () => router.push("/home"),
          },
        ]);
      }
    } catch (e: any) {
      alert("Registration Failed: " + e.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
              onPress={(value) => setSelectedPrefix(value)}
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
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>Middle Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              placeholder="Middle Name"
              value={middleName}
              onChangeText={(text) => setMiddleName(text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Last Name <Text style={styles.asterik}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              School Name <Text style={styles.asterik}>*</Text>
            </Text>
            <Dropdown
              data={schoolName}
              showsVerticalScrollIndicator={false}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.dropdownPlaceholder}
              itemContainerStyle={styles.dropdownItem}
              placeholder="Select Level"
              style={styles.dropdown}
              value={selectedSchool}
              labelField={"label"}
              valueField={"value"}
              onChange={(item) => setSelectedSchool(item.value)}
              activeColor="#cfe0fc"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              Level <Text style={styles.asterik}>*</Text>
            </Text>
            <Dropdown
              data={levelData}
              showsVerticalScrollIndicator={false}
              placeholderStyle={styles.dropdownPlaceholder}
              containerStyle={styles.dropdownContainer}
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
              placeholderStyle={styles.dropdownPlaceholder}
              containerStyle={styles.dropdownContainer}
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
              Class ID <Text style={styles.asterik}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Class ID"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              value={classID}
              onChangeText={(text) => setClassID(text)}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>
              School Email <Text style={styles.asterik}>*</Text>
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <TextInput
                style={[
                  styles.input,
                  {
                    flex: 0.55, // Adjusted flex to ensure both elements fit on the same line
                    fontSize: 13,
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius:
                      selectedSchool && selectedSchool !== "" ? 0 : 8,
                    borderTopRightRadius:
                      selectedSchool && selectedSchool !== "" ? 0 : 8,
                  },
                ]}
                placeholder="Email Prefix"
                editable={!!selectedSchool}
                value={emailPrefix}
                onChangeText={(text) => setEmailPrefix(text)}
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
              />
              {selectedSchool && selectedSchool !== "" && (
                <Dropdown
                  data={
                    schoolName
                      .find((item) => item.value === selectedSchool)
                      ?.email.map((item) => ({
                        id: item.id,
                        label: item.label,
                        value: item.value,
                      })) as DropdownValues[]
                  }
                  showsVerticalScrollIndicator={false}
                  placeholderStyle={styles.dropdownPlaceholder}
                  selectedTextStyle={{ fontSize: 14 }}
                  containerStyle={[styles.dropdownContainer, { marginLeft: 1 }]}
                  itemContainerStyle={[
                    styles.dropdownItem,
                    { marginHorizontal: -10 },
                  ]}
                  itemTextStyle={{ fontSize: 14 }}
                  placeholder="Email Postfix"
                  style={[
                    styles.dropdown,
                    {
                      flex: 0.45, // Adjusted flex to fit within the same line
                      marginLeft: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 8,
                      borderTopRightRadius: 8,
                    },
                  ]}
                  labelField={"value"}
                  valueField={"value"}
                  value={selectedDomain}
                  onChange={(item: DropdownValues) =>
                    setSelectedDomain(item.value)
                  }
                  activeColor="#cfe0fc"
                />
              )}
            </View>
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
                autoComplete="off"
                autoCorrect={false}
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
                autoComplete="off"
                autoCorrect={false}
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
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.5}
            onPress={() => signup()}
          >
            <Text style={styles.buttonText}>Sign-Up</Text>
          </TouchableOpacity>
          <Link href="/(teacher)/teacherSignup">
            <AntDesign name={"arrowleft"} size={18} color={"#fff"} />{" "}
            <Text style={styles.footerText}>Go Back</Text>
          </Link>
        </View>
      </View>
      <StatusBar style="dark" />
      <Modal transparent={true} visible={loading} animationType="none">
        <View style={styles.loadingContainer}>
          <View
            style={{
              marginBottom: 20,
              backgroundColor: "white",
              padding: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: "600" }}>
              Siging Up...
            </Text>
            <View
              style={{
                marginBottom: 20,
                backgroundColor: "#fff",
                height: 20,
                width: 50,
              }}
            >
              <UIActivityIndicator color="#1e90FF" size={40} />
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
  },
  headerText: {
    color: "#1e90FF",
    fontSize: 56,
    fontWeight: "bold",
  },
  headerSub: {
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
    shadowOffset: { width: 3, height: 5 },
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default MyScreen;
