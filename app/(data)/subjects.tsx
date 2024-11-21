import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Sample data for subjects
const subjects = [
  { code: 'CS101', name: 'Computer Science', teacher: 'Dr. Smith', credits: 4 },
  { code: 'MA101', name: 'Mathematics', teacher: 'Dr. Johnson', credits: 3 },
  { code: 'PH101', name: 'Physics', teacher: 'Dr. Brown', credits: 4 },
  { code: 'CH101', name: 'Chemistry', teacher: 'Dr. Taylor', credits: 3 },
  { code: 'EE101', name: 'Electrical Engineering', teacher: 'Dr. Anderson', credits: 4 },
  { code: 'ME101', name: 'Mechanical Engineering', teacher: 'Dr. Thomas', credits: 3 },
  { code: 'CE101', name: 'Civil Engineering', teacher: 'Dr. White', credits: 4 },
  { code: 'ES101', name: 'Environmental Science', teacher: 'Dr. Lewis', credits: 2 },
  { code: 'BI101', name: 'Biology', teacher: 'Dr. Walker', credits: 3 },
  { code: 'EN101', name: 'English', teacher: 'Dr. Hall', credits: 2 },
];

const SubjectsScreen = () => {
  const renderItem = ({ item }: { item: typeof subjects[0] }) => (
    <View style={styles.card}>
      <Text style={styles.subjectName}>{item.name}</Text>
      <Text style={styles.subjectInfo}>Code: {item.code}</Text>
      <Text style={styles.subjectInfo}>Teacher: {item.teacher}</Text>
      <Text style={styles.subjectInfo}>Credits: {item.credits}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={subjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
});

export default SubjectsScreen;
