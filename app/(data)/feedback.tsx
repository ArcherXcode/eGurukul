import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Rating } from 'react-native-ratings';
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router';

const FeedbackScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [isBugReport, setIsBugReport] = useState(false); // Switch between Feedback and Bug Report
  const [isFeedback, setIsFeedback] = useState(true); // Switch between Feedback and Bug Report
  const [file, setFile] = useState<any>(null); // File data for bug report
  const [rating, setRating] = useState(0); // Rating for feedback

  const handleSubmit = () => {
    if (!name || !email || (!description && !isBugReport) || (isBugReport && !file)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const reportType = isBugReport ? 'Bug Report' : 'Feedback';
    Alert.alert('Thank You!', `${reportType} submitted successfully!`);

    // Reset the form
    setName('');
    setEmail('');
    setDescription('');
    setFile(null);
    setIsBugReport(false);
    setRating(0);
  };

  const handleCancel = () => {
    Alert.alert('Are you sure?', 'Do you want to cancel the feedback submission?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => {
        setName('');
        setEmail('');
        setDescription('');
        setFile(null);
        setIsBugReport(false);
        setRating(0);
        router.back();
      }},
    ]);
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'image/*',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ],
      });

      if (result.canceled) {
        Alert.alert('Error', 'No document selected');
        return;
      }

      const selectedFile = result.assets[0];
      setFile({
        uri: selectedFile.uri,
        name: selectedFile.name,
        mimeType: selectedFile.mimeType,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to pick a document');
    }
  };

  return (
    <View style={styles.mainContainer}>

      <View style={styles.inputContainer}>
          <View style={styles.subInputContainer}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.subInputContainer}>
            <Text style={styles.label}>Your Email</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.subInputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.inputBox, styles.textArea]}
              placeholder="Describe your feedback or bug"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.subInputContainer}>
          <Text style={styles.label}>Type</Text>
          {/* Switch for Report Type */}
      <View style={styles.switchContainer}>
        <View style={styles.switchRow}>
          <View style={[styles.switchItem,{marginRight: 20}]}>
            <Text style={styles.switchLabel}>Feedback</Text>
            <Switch
              value={isFeedback}
              onValueChange={(value) => {
                setIsFeedback(value)
              }}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isFeedback ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Bug Report</Text>
            <Switch
              value={isBugReport}
              onValueChange={(value) => {setIsBugReport(value)}}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isBugReport ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>
      </View>
      </View>

          {/* Conditional Rendering for Bug Report */}
          {isBugReport && (
            <View style={styles.subInputContainer}>
              <Text style={styles.label}>Upload Document</Text>
              <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPick}>
                <Text style={styles.uploadButtonText}>
                  {file ? file.name : 'Select File'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Conditional Rendering for Rating */}
          {isFeedback && (
            <View style={styles.subInputContainer}>
              <Text style={styles.label}>Rating</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                startingValue={rating}
                onFinishRating={setRating}
                style={{alignSelf: 'flex-start', marginTop: 5}}
                fractions={2}
              />
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button1} onPress={handleCancel}>
            <Text style={styles.buttonText1}>Cancel</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    height: '100%',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  subInputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  inputBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    minHeight: 50,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  textArea: {
    height: 100,
  },
  uploadButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#1e90FF',
    paddingVertical: 12,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button1: {
    backgroundColor: 'white',
    borderColor: '#1e90FF',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 5,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText1: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    padding: 0,
    backgroundColor: 'transparent',
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginVertical: 10,
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

export default FeedbackScreen;
