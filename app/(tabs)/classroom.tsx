import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { courses } from '../classroom/allCourses';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ClassroomScreen = () => {
  const [showPastClasses, setShowPastClasses] = useState(false);
  const [showUpcomingClasses, setShowUpcomingClasses] = useState(true);
  const { bottom } = useSafeAreaInsets();

  const ongoingCourse = courses.find((course) => course.status === 'ongoing');
  const pastCourses = courses.filter((course) => course.status === 'past');
  const upcomingCourses = courses.filter((course) => course.status === 'upcoming');

  return (
    <View style={[styles.mainContainer, { paddingBottom: bottom * 2.5 }]}>
      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Past Classes</Text>
            <Switch
              value={showPastClasses}
              onValueChange={(value) => setShowPastClasses(value)}
              trackColor={{ false: '#767577', true: '#d4d4d4' }}
              thumbColor={showPastClasses ? '#1e90FF' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Upcoming Classes</Text>
            <Switch
              value={showUpcomingClasses}
              onValueChange={(value) => setShowUpcomingClasses(value)}
              trackColor={{ false: '#767577', true: '#d4d4d4' }}
              thumbColor={showUpcomingClasses ? '#1e90FF' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {ongoingCourse && (
          <View style={styles.courseCard}>
            <Text style={styles.courseTitle}>{ongoingCourse.name}</Text>
            <Text style={styles.courseCode}>{ongoingCourse.code}</Text>
            <Text style={styles.classDetails}>Teacher: {ongoingCourse.teacher}</Text>
            <Text style={styles.classDetails}>Class Mode: {ongoingCourse.classMode}</Text>
            <Text style={styles.classDetails}>Timing: {ongoingCourse.timing}</Text>
            <View style={styles.statusDot}>
              <View style={[styles.dot, { backgroundColor: '#249624' }]} />
              <Text style={styles.statusText}>Ongoing</Text>
            </View>
          </View>
        )}

        {showPastClasses && pastCourses.length > 0 && (
          <>
            {pastCourses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.classDetails}>Teacher: {course.teacher}</Text>
                <Text style={styles.classDetails}>Class Mode: {course.classMode}</Text>
                <Text style={styles.classDetails}>Timing: {course.timing}</Text>
                <View style={styles.statusDot}>
                  <View style={[styles.dot, { backgroundColor: '#fc2833' }]} />
                  <Text style={styles.statusText}>Past</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {showUpcomingClasses && upcomingCourses.length > 0 && (
          <>
            {upcomingCourses.map((course) => (
              <View key={course.id} style={styles.courseCard}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.classDetails}>Teacher: {course.teacher}</Text>
                <Text style={styles.classDetails}>Class Mode: {course.classMode}</Text>
                <Text style={styles.classDetails}>Timing: {course.timing}</Text>
                <View style={styles.statusDot}>
                  <View style={[styles.dot, { backgroundColor: '#1e90FF' }]} />
                  <Text style={styles.statusText}>Upcoming</Text>
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
    backgroundColor: '#f0f0f0',
    padding: 0,
  },
  scrollContainer: {
    marginTop: 10,
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
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    // marginBottom: 10,
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
