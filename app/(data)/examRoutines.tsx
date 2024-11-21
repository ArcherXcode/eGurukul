import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Sample exam routine data
const examRoutines = [
  { code: 'CS101', name: 'Computer Science', date: '2024-12-10', time: '10:00 AM - 12:00 PM', venue: 'Room A101' },
  { code: 'MA101', name: 'Mathematics', date: '2024-12-11', time: '2:00 PM - 4:00 PM', venue: 'Room B203' },
  { code: 'PH101', name: 'Physics', date: '2024-12-12', time: '10:00 AM - 12:00 PM', venue: 'Room C102' },
  { code: 'CH101', name: 'Chemistry', date: '2024-12-13', time: '2:00 PM - 4:00 PM', venue: 'Lab 1' },
  { code: 'EE101', name: 'Electrical Engineering', date: '2024-12-14', time: '10:00 AM - 12:00 PM', venue: 'Room D204' },
  { code: 'ME101', name: 'Mechanical Engineering', date: '2024-12-15', time: '2:00 PM - 4:00 PM', venue: 'Workshop Hall' },
  { code: 'CE101', name: 'Civil Engineering', date: '2024-12-16', time: '10:00 AM - 12:00 PM', venue: 'Room E303' },
  { code: 'ES101', name: 'Environmental Science', date: '2024-12-17', time: '2:00 PM - 4:00 PM', venue: 'Room F202' },
  { code: 'BI101', name: 'Biology', date: '2024-12-18', time: '10:00 AM - 12:00 PM', venue: 'Lab 2' },
  { code: 'EN101', name: 'English', date: '2024-12-19', time: '2:00 PM - 4:00 PM', venue: 'Room G401' },
];

const ExamRoutineScreen = () => {
  const renderItem = ({ item }: { item: typeof examRoutines[0] }) => (
    <View style={styles.card}>
      <Text style={styles.subjectName}>{item.name}</Text>
      <Text style={styles.subjectInfo}>Code: {item.code}</Text>
      <Text style={styles.subjectInfo}>Date: {item.date}</Text>
      <Text style={styles.subjectInfo}>Time: {item.time}</Text>
      <Text style={styles.subjectInfo}>Venue: {item.venue}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={examRoutines}
        renderItem={renderItem}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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

export default ExamRoutineScreen;
