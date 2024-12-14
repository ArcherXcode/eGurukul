import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';

const TestAndQuizzesScreen = () => {
  // State to manage visibility of past and upcoming tests/quizzes
  const [showPastTests, setShowPastTests] = useState(false);
  const [showUpcomingTests, setShowUpcomingTests] = useState(true);

  // Dummy data for tests and quizzes with marks for past tests
  const testsAndQuizzes = [
    { id: 1, name: 'Math Test', status: 'ongoing', code: 'MATH101', teacher: 'Mr. John', date: '2024-11-25', type: 'Test' },
    { id: 2, name: 'History Quiz', status: 'upcoming', code: 'HIST101', teacher: 'Ms. Jane', date: '2024-12-05', type: 'Quiz' },
    { id: 3, name: 'Physics Test', status: 'past', code: 'PHYS101', teacher: 'Mr. Smith', date: '2024-11-10', type: 'Test', marks: 20 },
    { id: 4, name: 'Chemistry Quiz', status: 'upcoming', code: 'CHEM101', teacher: 'Ms. Davis', date: '2024-12-10', type: 'Quiz' },
    // Additional test/quiz data...
  ];

  // Filter the tests and quizzes based on their status
  const ongoingTests = testsAndQuizzes.filter((test) => test.status === 'ongoing');
  const pastTests = testsAndQuizzes.filter((test) => test.status === 'past');
  const upcomingTests = testsAndQuizzes.filter((test) => test.status === 'upcoming');

  return (
    <View style={styles.mainContainer}>
      {/* Switches for Past and Upcoming Tests/Quizzes at the top */}
      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Past</Text>
            <Switch
              value={showPastTests}
              onValueChange={(value) => setShowPastTests(value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={showPastTests ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Upcoming</Text>
            <Switch
              value={showUpcomingTests}
              onValueChange={(value) => setShowUpcomingTests(value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={showUpcomingTests ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {/* Ongoing Tests/Quizzes */}
        {ongoingTests.length > 0 && (
          <>
            {ongoingTests.map((test) => (
              <View key={test.id} style={styles.testCard}>
                <View style={styles.ongoingTest}>
                  <Text style={styles.testTitle}>{test.name}</Text>
                  <Text style={styles.testCode}>{test.code}</Text>
                  <Text style={styles.testDetails}>Teacher: {test.teacher}</Text>
                  <Text style={styles.testDetails}>Date: {test.date}</Text>
                  <View style={styles.statusDot}>
                    <View style={[styles.dot, { backgroundColor: 'green' }]} />
                    <Text style={styles.statusText}>Ongoing</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Past Tests/Quizzes (toggle visibility) */}
        {showPastTests && pastTests.length > 0 && (
          <>
            {pastTests.map((test) => (
              <View key={test.id} style={styles.testCard}>
                <View style={[styles.pastUpcomingTest]}>
                  <Text style={styles.testTitle}>{test.name}</Text>
                  <Text style={styles.testCode}>{test.code}</Text>
                  <Text style={styles.testDetails}>Teacher: {test.teacher}</Text>
                  <Text style={styles.testDetails}>Date: {test.date}</Text>
                  {test.marks !== undefined && (
                    <Text style={styles.testDetails}>Marks: {test.marks}/25</Text>
                  )}
                  <View style={styles.statusDot}>
                    <View style={[styles.dot, { backgroundColor: 'red' }]} />
                    <Text style={styles.statusText}>Past</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Upcoming Tests/Quizzes (toggle visibility) */}
        {showUpcomingTests && upcomingTests.length > 0 && (
          <>
            {upcomingTests.map((test) => (
              <View key={test.id} style={styles.testCard}>
                <View style={[styles.pastUpcomingTest]}>
                  <Text style={styles.testTitle}>{test.name}</Text>
                  <Text style={styles.testCode}>{test.code}</Text>
                  <Text style={styles.testDetails}>Teacher: {test.teacher}</Text>
                  <Text style={styles.testDetails}>Date: {test.date}</Text>
                  <View style={styles.statusDot}>
                    <View style={[styles.dot, { backgroundColor: 'blue' }]} />
                    <Text style={styles.statusText}>Upcoming</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 0,
  },
  scrollContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  testCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  ongoingTest: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
  },
  pastUpcomingTest: {
    padding: 10,
    borderRadius: 8,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  testCode: {
    fontSize: 14,
    color: '#555',
  },
  testDetails: {
    fontSize: 14,
    color: '#777',
    marginVertical: 2,
  },
  statusDot: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#333',
  },
  switchContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
});

export default TestAndQuizzesScreen;
