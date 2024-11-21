import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateAssignmentScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState<Date | null>(null); // Initialize with null for empty state
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<any>(null); // Using `any` to store the file data
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleCreateAssignment = () => {
    if (!title || !deadline || !description || !file) {
      Alert.alert('Error', 'Please fill in all fields and upload the document');
      return;
    }

    console.log('Assignment Created:', { title, deadline, description, file });

    // After creating, navigate back to the assignment list screen
    router.push('/assignments');
  };

  const handleCancel = () => {
    router.back();
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

      if (result.assets) {
        const selectedFile = result.assets[0];
        setFile({
          uri: selectedFile.uri,
          name: selectedFile.name,
          mimeType: selectedFile.mimeType,
        });
        console.log('Selected file:', selectedFile.name);
      }
    } catch (error) {
      console.error('Error selecting file:', error);
      Alert.alert('Error', 'Failed to pick a document');
    }
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || deadline;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setDeadline(currentDate); // Set the deadline only when a date is selected
  };

  const showDatePickerModal = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.subInputContainer}>
          <Text style={styles.label}>Enter Title</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Assignment Title"
            placeholderTextColor={'#333'}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View style={styles.subInputContainer}>
          <Text style={styles.label}>Select Deadline</Text>
          <TouchableOpacity style={styles.inputBox} onPress={showDatePickerModal}>
            <Text style={styles.inputBoxText}>
              {deadline ? deadline.toLocaleString() : 'Select Deadline'} {/* Display nothing initially */}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={deadline || new Date()} // Show current date if no deadline set
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.subInputContainer}>
          <Text style={styles.label}>Enter Description</Text>
          <TextInput
            style={[styles.inputBox, styles.textArea]}
            placeholder="Description"
            placeholderTextColor={'#333'}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>
        <View style={styles.subInputContainer}>
          <Text style={styles.label}>Upload Document</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleDocumentPick}>
            <Text style={styles.uploadButtonText}>
              {file ? file.name : 'Select File'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateAssignment}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={handleCancel}>
          <Text style={styles.buttonText2}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 10,
    width: '100%',
    padding: 10,
  },
  subInputContainer: {
    marginBottom: 5,
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
    marginBottom: 15,
  },
  inputBoxText: {
    fontSize: 16,
    color: '#333',
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
    marginBottom: 15,
    width: '30%',
    justifyContent: 'flex-start',
  },
  uploadButtonText: {
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    maxHeight: 120,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -3 },
    elevation: 5,
    shadowRadius: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 110,
  },
  button: {
    backgroundColor: '#1e90FF',
    paddingVertical: 12,
    borderRadius: 5,
    maxWidth: '45%',
    minWidth: '40%',
    minHeight: 50,
    height: 50,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button2: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderColor: '#1e90FF',
    borderWidth: 1,
    borderRadius: 5,
    maxWidth: '45%',
    minWidth: '40%',
    minHeight: 50,
    height: 50,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText2: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateAssignmentScreen;
