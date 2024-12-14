import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Checkbox } from 'expo-checkbox'; // Updated import for Expo
import DateTimePicker from '@react-native-community/datetimepicker'; // Keep this if not using Expo
import { Dropdown } from 'react-native-element-dropdown'; // Updated import for dropdown
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TakeAttendanceScreen = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'Alice', present: false },
    { id: 2, name: 'Bob', present: false },
    { id: 3, name: 'Charlie', present: false },
  ]);
  const { bottom } = useSafeAreaInsets();

  const [selectedSubject, setSelectedSubject] = useState('1');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const subjectData = [
    { label: 'Math', value: '1' },
    { label: 'Science', value: '2' },
    { label: 'English', value: '3' },
    { label: 'History', value: '4' },
  ];

  const sectionData = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
  ];

  const toggleAttendance = (id: number) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setDatePickerVisibility(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Success!', 'Attendance Submitted.');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.scrollContainer, { paddingBottom: bottom + 16 }]} // Adjust paddingBottom for safe area
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {/* Subject Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Subject</Text>
          <Dropdown
            data={subjectData}
            value={selectedSubject}
            onChange={(item) => setSelectedSubject(item.value)}
            labelField="label"
            valueField="value"
            placeholder="Select Subject"
            style={styles.picker}
            containerStyle={styles.dropdownContainer}
          />
        </View>

        {/* Section Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Class Section</Text>
          <Dropdown
            data={sectionData}
            value={selectedSection}
            onChange={(item) => setSelectedSection(item.value)}
            labelField="label"
            valueField="value"
            placeholder="Select Section"
            style={styles.picker}
            containerStyle={styles.dropdownContainer}
          />
        </View>

        {/* Date-Time Picker */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date & Time</Text>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={styles.input}>{selectedDate.toLocaleString()}</Text>
          </TouchableOpacity>
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Students List with Checkboxes */}
        <Text style={styles.label}>Students</Text>
        {students.map((student) => (
          <View key={student.id} style={styles.row}>
            <Checkbox
              value={student.present}
              onValueChange={() => toggleAttendance(student.id)}
            />
            <Text style={styles.text}>{student.name}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Submit Button */}
      <View style={[styles.buttonContainer, { bottom: 0 }]}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Attendance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '100%', // Ensure full-width dropdown
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    backgroundColor: '#fff',
    height: 80,
  },
  button: {
    backgroundColor: '#1e90FF',
    padding: 12,
    width: '80%',
    borderRadius: 5,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TakeAttendanceScreen;
