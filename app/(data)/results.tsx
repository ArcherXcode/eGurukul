import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Sample data for subjects with grades
const subjectsWithGrades = [
  { code: 'CS101', name: 'Computer Science', grade: 9 },
  { code: 'MA101', name: 'Mathematics', grade: 8 },
  { code: 'PH101', name: 'Physics', grade: 7 },
  { code: 'CH101', name: 'Chemistry', grade: 8 },
  { code: 'EE101', name: 'Electrical Engineering', grade: 9 },
  { code: 'ME101', name: 'Mechanical Engineering', grade: 7 },
  { code: 'CE101', name: 'Civil Engineering', grade: 8 },
  { code: 'ES101', name: 'Environmental Science', grade: 10 },
  { code: 'BI101', name: 'Biology', grade: 6 },
  { code: 'EN101', name: 'English', grade: 9 },
];

const ResultScreen = () => {
  const renderItem = ({ item }: { item: typeof subjectsWithGrades[0] }) => (
    <View style={styles.card}>
      <Text style={styles.subjectName}>{item.name}</Text>
      <Text style={styles.subjectInfo}>Code: {item.code}</Text>
      <Text style={styles.subjectGrade}>Grade: {item.grade}/10</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={subjectsWithGrades}
        renderItem={renderItem}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  subjectName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subjectInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  subjectGrade: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default ResultScreen;
