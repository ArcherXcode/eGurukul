import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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

const AttendanceScreen = () => {
  const [attendanceData, setAttendanceData] = useState(generateAttendanceData());
  const [viewType, setViewType] = useState('day');

  const renderTable = () => {
    return courses.map((course) => {
      const data = attendanceData[course.code];
      if (!data) return null;

      if (viewType === 'day') {
        return (
          <View style={styles.row} key={course.code}>
            <Text style={[styles.cell, styles.fixedColumn]}>{course.code}</Text>
            {data.daily.map((att, index) => (
              <Text key={index} style={[styles.cell, att ? styles.attended : styles.absent]}>
                {att ? 'P' : 'A'}
              </Text>
            ))}
          </View>
        );
      }

      if (viewType === 'month') {
        return (
          <View style={[styles.row, {width: '100%'}]} key={course.code}>
            <Text style={[styles.cell, styles.fixedColumn, {width: '50%'}]}>{course.code}</Text>
            <Text style={[styles.cell, {width: '50%'}]}>
              {data.monthly[0]} / {data.monthly[1]} days
            </Text>
          </View>
        );
      }

      if (viewType === 'overall') {
        return (
          <View style={styles.row} key={course.code}>
            <Text style={[styles.cell, styles.fixedColumn, {width: '50%'}]}>{course.code}</Text>
            <Text style={[styles.cell, {width: '50%'}]}>{Math.round(data.overall * 100)}%</Text>
          </View>
        );
      }
    });
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
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.fixedHeader, {width: viewType !== 'day' ? '50%' : 'auto'}]}>Course Code</Text>
            {viewType === 'day'
              ? Array.from({ length: 30 }, (_, i) => (
                  <Text key={i} style={styles.headerCell}>
                    Day {i + 1}
                  </Text>
                ))
              : viewType === 'month' ? (
                  <Text style={[styles.headerCell, {width: '50%'}]}>Month Attendance</Text>
                ) : (
                  <Text style={[styles.headerCell, {width: '50%'}]}>Overall Attendance</Text>
                )}
          </View>
          {renderTable()}
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
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    minWidth: 100,
  },
  fixedHeader: {
    backgroundColor: '#ccc',
    minWidth: 120,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cell: {
    padding: 10,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    minWidth: 100,
  },
  fixedColumn: {
    backgroundColor: '#f7f7f7',
    minWidth: 120,
  },
  attended: {
    backgroundColor: '#81c784',
    color: '#fff',
  },
  absent: {
    backgroundColor: '#e57373',
    color: '#fff',
  },
});

export default AttendanceScreen;
