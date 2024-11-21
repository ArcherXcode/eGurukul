import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker'; // Import the Document Picker module

const Submit = () => {
  const { id } = useLocalSearchParams(); // Get the assignment ID
  const [file, setFile] = useState<{ uri: string; name: string; mimeType: string } | null>(null); // State to hold the selected file

  const handleDocumentPick = async () => {
    try {
      // Open the document picker with allowed types
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

      if (result.assets) {
        const selectedFile = result.assets[0];
        // Set the selected file in the state
        setFile({
          uri: selectedFile.uri,
          name: selectedFile.name,
          mimeType: selectedFile.mimeType || 'application/octet-stream',
        });
        console.log('Selected file:', selectedFile.name);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
      Alert.alert('Error', 'Failed to pick a document');
    }
  };

  const handleSubmit = async () => {
    if (file) {
      console.log(`Submitting assignment ID: ${id}, with file: ${file.name}`);
      // Add your file upload logic here (e.g., upload to server or cloud storage)
    } else {
      console.log("No file selected");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Assignment</Text>

      {/* TouchableOpacity to pick a document */}
      <TouchableOpacity style={styles.inputField} onPress={handleDocumentPick}>
        <Text style={styles.inputText}>{file ? file.name : 'Select a document to upload'}</Text>
      </TouchableOpacity>

      {/* Submit button fixed at the bottom */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputField: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  inputText: {
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    position: 'absolute',
    bottom: 30,
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

export default Submit;
