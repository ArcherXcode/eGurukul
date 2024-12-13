import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

// Helper function to generate random assignments
const generateRandomAssignments = () => {
    const randomTitles = [
      "Operating Systems",
      "Database Systems",
      "Computer Networks",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Structures",
      "Algorithms",
      "Software Engineering",
      "Digital Circuits",
      "Web Development",
    ];
  
    const randomDescriptions = [
      "This assignment focuses on the core concepts of the subject.",
      "Complete the exercises and submit the required reports.",
      "This involves solving real-world problems using theoretical knowledge.",
      "Focus on understanding the practical applications of the theory.",
      "You will need to implement and optimize algorithms.",
      "This task involves coding and debugging.",
      "Research and implement a project based on the given topic.",
      "Submit a detailed analysis of the concepts learned.",
      "Prepare a comprehensive report on the recent developments in the field.",
      "Complete the case study by applying the learned concepts to real-world scenarios.",
    ];
  
    // Shuffle function to randomize the order of the array elements
    const shuffleArray = (arr: any[]) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
      }
    };
  
    // Shuffle both titles and descriptions arrays
    shuffleArray(randomTitles);
    shuffleArray(randomDescriptions);
  
    const getRandomDate = () => {
      const randomDays = Math.floor(Math.random() * 30) + 1; // Random date within next 30 days
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + randomDays);
      return deadline.toLocaleDateString(); // Format the date as a string
    };
  
    const assignments = [];
    for (let i = 0; i < 10; i++) {
      const title = randomTitles[i];
      const description = randomDescriptions[i];
      const deadline = getRandomDate();
      assignments.push({
        id: (i + 1).toString(),
        title,
        description,
        deadline,
      });
    }
  
    return assignments;
  };
  
  

const Assignments = () => {
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const assignments = generateRandomAssignments();

  const navigateToCreate = () => {
    router.push("../assignments/create");
  };

  const handleCardPress = (id: string, name: string, deadline: string, description: string) => {
    router.push(`../assignments/details?id=${id}&name=${name}&deadline=${deadline}&description=${description}`);
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={[styles.containerScroller, {paddingBottom: bottom * 3}]} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {assignments.map((assignment) => (
            <TouchableOpacity 
            style={styles.assignmentCard} 
            key={assignment.id}
            onPress={() => handleCardPress(assignment.id, assignment.title, assignment.deadline, assignment.description)}
            >
              <View style={styles.newNotification}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent:'space-between', width: '100%' }}>
                <Text style={styles.textTitle}>{assignment.title}</Text>
                </View>
                <Text style={styles.textDescription}>
                  Deadline: {assignment.deadline}
                </Text>
                <Text style={styles.textDescription}>
                  Description: {assignment.description.split(" ").slice(0, 5).join(" ")}...
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={[styles.fab, {bottom: bottom * 3}]} onPress={navigateToCreate}>
        <Feather name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    height: "100%",
  },
  containerScroller: { padding: 10, backgroundColor: "#f0f0f0" },
  container: { width: "100%" },
  assignmentCard: {
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    padding: 5,
    elevation: 5,
    minHeight: 100,
    height: 120,
    flexDirection: "column",
  },
  newNotification: {
    padding: 10,
    backgroundColor: "#cfe0fc",
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: "100%",
    height: '100%',
  },
  textTitle: { fontSize: 16, fontWeight: "bold" },
  textDescription: { fontSize: 14, color: "#333" },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    right: "25%",
    alignItems: "center",
  },
  footer: { fontSize: 14, color: "#007AFF", marginRight: 10 }, // Added marginRight to footer
  arrowIcon: {
    marginLeft: 5, // Add space between the text and the icon
  },
  fab: {
    position: "absolute", // Make sure the FAB is positioned absolutely
    right: 20, // Position it 20 units from the right
    bottom: 20, // Position it 20 units from the bottom
    zIndex: 10, // Ensure FAB is above all other elements
    backgroundColor: "#1e90FF", // FAB background color
    width: 60, // Set the width of the FAB
    height: 60, // Set the height of the FAB
    borderRadius: 35, // Set the border radius to make it round
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", // Center the content vertically
  },
});

export default Assignments;
