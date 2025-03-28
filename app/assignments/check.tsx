import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { UIActivityIndicator } from 'react-native-indicators';

const Check = () => {
  const { id } = useLocalSearchParams(); // Get the assignment ID
  const [loading, setLoading] = useState(true);
  const [submissionText, setSubmissionText] = useState('');
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    // Simulate fetching submission for the assignment
    setTimeout(() => {
      setSubmissionText('Student submission content...');
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleFeedbackSubmit = () => {
    // Handle feedback submission
    console.log(`Submitting feedback: ${feedbackText}`);
  };

  if (loading) {
    return <UIActivityIndicator color="#1e90FF" size={40} />;
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.innerContainer}
      >
        <Text style={styles.title}>Review Assignment Submission</Text>
        <Text style={styles.submission}>{submissionText}</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your feedback here"
          multiline
          value={feedbackText}
          onChangeText={setFeedbackText}
        />
      </KeyboardAvoidingView>

      {/* TouchableOpacity as submit button fixed at the bottom */}
      <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
        <Text style={styles.submitButtonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  submission: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    maxHeight: 150,
    marginVertical: 20,
    borderRadius: 8,
    fontSize: 16,
    flex: 1, // Allow the input to take up available space
  },
  submitButton: {
    position: 'absolute',
    bottom: 30, // Positioned 20px from the bottom
    left: 20,
    right: 20,
    backgroundColor: '#007BFF',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Check;
