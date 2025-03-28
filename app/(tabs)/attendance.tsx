import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import moment from 'moment'; // Make sure to install moment.js for date formatting

// Sample courses with codes
const courses = [
  { code: 'CS101', name: 'Computer Science' },
  { code: 'MA101', name: 'Mathematics' },
  { code: 'PH101', name: 'Physics' },
  { code: 'CH101', name: 'Chemistry' },
  { code: 'EE101', name: 'Electrical Engineering' },
  { code: 'ME101', name: 'Mechanical Engineering' },
  { code: 'CE101', name: 'Civil Engineering' },
  { code: 'ES101', name: 'Environmental Science' },
  { code: 'BI101', name: 'Biology' },
  { code: 'EN101', name: 'English' },
];

// Generate random attendance data for courses
type AttendanceData = {
  [key: string]: {
    daily: boolean[];
    monthly: [number, number];
    overall: number;
  };
};

const generateAttendanceData = (): AttendanceData => {
  const data: AttendanceData = {};
  courses.forEach((course) => {
    const attendanceDays = Array.from({ length: 30 }, () => Math.random() > 0.2);
    data[course.code] = {
      daily: attendanceDays,
      monthly: [attendanceDays.filter((att) => att).length, attendanceDays.length],
      overall: attendanceDays.filter((att) => att).length / attendanceDays.length,
    };
  });
  return data;
};

// Generate a list of formatted dates for the current month (e.g., 29 Dec, 30 Dec, ...)
const generateDatesForMonth = () => {
  const daysInMonth = 30; // Set number of days you need for attendance
  const today = moment(); // Use today's date as the starting point
  const dates = [];

  for (let i = 0; i < daysInMonth; i++) {
    dates.push(today.clone().add(i, 'days').format('DD MMM')); // Format as "29 Dec"
  }

  return dates;
};

const AttendanceScreen = () => {
  const [attendanceData, setAttendanceData] = useState(generateAttendanceData());
  const [viewType, setViewType] = useState('day');
  const dates = generateDatesForMonth(); // Get formatted dates for the current month

  const renderTable = () => {
    return courses.map((course) => {
      const data = attendanceData[course.code];
      if (!data) return []; // Ensure it returns an empty array if no data found

      let rowData: string[] = [course.code, course.name]; // Include the course code and name at the start

      if (viewType === 'day') {
        rowData = [
          course.code,
          course.name,
          ...data.daily.map((att) => (att ? 'P' : 'A')),
        ];
      }

      if (viewType === 'month') {
        rowData = [
          course.code,
          course.name,
          `${data.monthly[0]} / ${data.monthly[1]} days`,
        ];
      }

      if (viewType === 'overall') {
        rowData = [
          course.code,
          course.name,
          `${Math.round(data.overall * 100)}%`,
        ];
      }

      return rowData; // Return as a flat array
    }).filter(row => row.length > 0); // Remove empty rows
  };

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[
            styles.switchOption,
            viewType === 'day' && styles.activeOption,
          ]}
          onPress={() => setViewType('day')}
        >
          <Text style={viewType === 'day' ? styles.activeOptionText : styles.optionText}>
            Day-wise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchOption,
            viewType === 'month' && styles.activeOption,
          ]}
          onPress={() => setViewType('month')}
        >
          <Text style={viewType === 'month' ? styles.activeOptionText : styles.optionText}>
            Month-wise
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.switchOption,
            viewType === 'overall' && styles.activeOption,
          ]}
          onPress={() => setViewType('overall')}
        >
          <Text style={viewType === 'overall' ? styles.activeOptionText : styles.optionText}>
            Overall
          </Text>
        </TouchableOpacity>
      </View>

      {/* Attendance Table */}
      <ScrollView horizontal contentContainerStyle={styles.tableContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.table}>
          <Table borderStyle={styles.tableBorder}>
            {/* Header */}
            <Row
              data={viewType === 'day' ? ['Course Code', 'Course Name', ...dates] : viewType === 'month' ? ['Course Code', 'Course Name', 'Month Attendance'] : ['Course Code', 'Course Name', 'Overall Attendance']}
              style={styles.headerRow}
              textStyle={styles.headerCell}
              widthArr={[100, 200, ...Array.from({ length: dates.length }, () => 65)]} // Wider columns for dates
            />
            {/* Data Rows */}
            <Rows
              data={renderTable()}
              style={styles.row}
              textStyle={styles.cellText}
              widthArr={[100, 200, ...Array.from({ length: dates.length }, () => 65)]} // Wider columns for dates
            />
          </Table>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  switchOption: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  activeOption: {
    backgroundColor: '#1e90FF',
  },
  optionText: {
    fontSize: 16,
    color: '#555',
  },
  activeOptionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  tableContainer: {
    flexGrow: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableBorder: {
    borderColor: '#ddd',
    borderWidth: 1,
  },
  headerRow: {
    backgroundColor: '#e0e0e0',
    height: 40,
  },
  headerCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  row: {
    height: 40,
  },
  cellText: {
    fontSize: 14,
    padding: 5,
    textAlign: 'center',
  },
});

export default AttendanceScreen;
