import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const MyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.containerScroller} horizontal={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Looping through notifications */}
        {Array(10).fill(null).map((_, index) => (
          <View style={styles.headerCard} key={index}>
            <View style={styles.newNotification}>
              <Text style={styles.textTitle}>Mid-Semester Exam Schedule</Text>
              <Text style={styles.textDescription}>The schedule for mid-semester exam is out.</Text>
              <Text style={styles.footer}>Read more</Text>
            </View>
          </View>
        ))}
        <StatusBar style='dark' />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroller: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f0f0f0',
    marginBottom: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerCard: {
    backgroundColor: 'white', // Plain white background for each notification card
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    elevation: 5, // Optional: keeps the shadow on Android
  },
  textHeaderTitle: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '600',
  },
  newNotification: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 10,
    width: '100%',
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'right',
    marginTop: 10,
  },
  headFooter: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerFooter: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
    marginLeft: 0,
  },
});

export default MyScreen;
