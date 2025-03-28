import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const TestDetail = () => {
  const params = useLocalSearchParams();
  const { id, name, code, teacher, date } = params;
  const router = useRouter();

  const startTest = () => {
    router.push(`/test/quiz?id=${id}&name=${name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Details</Text>

      <View style={styles.card}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Test ID:</Text>
          <Text style={styles.value}>{id}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Test Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Test Code:</Text>
          <Text style={styles.value}>{code}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Instructor:</Text>
          <Text style={styles.value}>{teacher}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Scheduled Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      </View>

      {/* Start Test Button */}
      <TouchableOpacity style={styles.button} onPress={startTest}>
        <Text style={styles.buttonText}>Start Test</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1E40AF", // Blue-700 equivalent
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2563EB", // Blue-600 equivalent
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default TestDetail;
