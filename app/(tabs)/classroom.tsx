import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { courses } from '../classroom/allCourses';

const ClassroomScreen = () => {
  // State to manage visibility of past and upcoming classes
  const [showPastClasses, setShowPastClasses] = useState(false);
  const [showUpcomingClasses, setShowUpcomingClasses] = useState(true);

  // Filter the courses based on their status
  const ongoingCourse = courses.find((course) => course.status === 'ongoing');
  const pastCourses = courses.filter((course) => course.status === 'past');
  const upcomingCourses = courses.filter((course) => course.status === 'upcoming');

  return (
    <View style={styles.mainContainer}>
      {/* Switches for Past and Upcoming Classes at the top */}
      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Past Classes</Text>
            <Switch
              value={showPastClasses}
              onValueChange={(value) => setShowPastClasses(value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={showPastClasses ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Upcoming Classes</Text>
            <Switch
              value={showUpcomingClasses}
              onValueChange={(value) => setShowUpcomingClasses(value)}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={showUpcomingClasses ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {/* Ongoing Class */}
        {ongoingCourse && (
          <View style={styles.courseCard}>
            <View style={styles.ongoingClass}>
              <Text style={styles.courseTitle}>{ongoingCourse.name}</Text>
              <Text style={styles.courseCode}>{ongoingCourse.code}</Text>
              <Text style={styles.classDetails}>Teacher: {ongoingCourse.teacher}</Text>
              <Text style={styles.classDetails}>Class Mode: {ongoingCourse.classMode}</Text>
              <Text style={styles.classDetails}>Timing: {ongoingCourse.timing}</Text>
              <View style={styles.statusDot}>
                <View style={[styles.dot, { backgroundColor: 'green' }]} />
                <Text style={styles.statusText}>Ongoing</Text>
              </View>
            </View>
          </View>
        )}

        {/* Past Classes (toggle visibility) */}
        {showPastClasses && pastCourses.length > 0 && (
          <>
            {pastCourses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <View style={[styles.pastUpcomingClass, { backgroundColor: '#f7d1d1' }]}>
                  <Text style={styles.courseTitle}>{course.name}</Text>
                  <Text style={styles.courseCode}>{course.code}</Text>
                  <Text style={styles.classDetails}>Teacher: {course.teacher}</Text>
                  <Text style={styles.classDetails}>Class Mode: {course.classMode}</Text>
                  <Text style={styles.classDetails}>Timing: {course.timing}</Text>
                  <View style={styles.statusDot}>
                    <View style={[styles.dot, { backgroundColor: 'red' }]} />
                    <Text style={styles.statusText}>Past</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Upcoming Classes (toggle visibility) */}
        {showUpcomingClasses && upcomingCourses.length > 0 && (
          <>
            {upcomingCourses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <View style={[styles.pastUpcomingClass, { backgroundColor: '#d1e7f7' }]}>
                  <Text style={styles.courseTitle}>{course.name}</Text>
                  <Text style={styles.courseCode}>{course.code}</Text>
                  <Text style={styles.classDetails}>Teacher: {course.teacher}</Text>
                  <Text style={styles.classDetails}>Class Mode: {course.classMode}</Text>
                  <Text style={styles.classDetails}>Timing: {course.timing}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 0,
  },
  scrollContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  courseCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
  },
  ongoingClass: {
    backgroundColor: '#e1f7d5',
    padding: 10,
    borderRadius: 8,
  },
  pastUpcomingClass: {
    padding: 10,
    borderRadius: 8,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  courseCode: {
    fontSize: 14,
    color: '#555',
  },
  classDetails: {
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
    marginBottom: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default ClassroomScreen;
