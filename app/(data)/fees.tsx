import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';

// Sample course fee and payment data
const courses = [
  { name: 'B.Tech 1st Year', totalFee: 35000 },
  { name: 'B.Tech 2nd Year', totalFee: 35000 },
  { name: 'B.Tech 3rd Year', totalFee: 35000 },
  { name: 'B.Tech 4th Year', totalFee: 35000 },
];

const payments = [
  { course: 'B.Tech 1st Year', receiptNumber: 'R001', date: '2024-10-10', amount: 15000, status: 'Paid' },
  { course: 'B.Tech 2nd Year', receiptNumber: 'R002', date: '2024-10-15', amount: 10000, status: 'Paid' },
  { course: 'B.Tech 3rd Year', receiptNumber: 'R003', date: '2024-11-01', amount: 20000, status: 'Pending' },
  { course: 'B.Tech 4th Year', receiptNumber: 'R004', date: '2024-11-05', amount: 15000, status: 'Pending' },
];

const FeesPaymentScreen = () => {
    // Calculate total pending amount
    const totalPendingAmount = courses.reduce((total, course) => {
      const coursePayment = payments.find((payment) => payment.course === course.name);
      const remaining = course.totalFee - (coursePayment ? coursePayment.amount : 0);
      return coursePayment?.status === 'Pending' ? total + remaining : total;
    }, 0);

    // Function to handle receipt download
    const downloadReceipt = (receiptNumber: string) => {
      Alert.alert('Download Receipt', `Downloading receipt: ${receiptNumber}`);
      // Here you can implement actual download logic, such as fetching from S3 or another source
    };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.cardContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {courses.map((course) => {
          const coursePayment = payments.find(payment => payment.course === course.name);
          const remaining = course.totalFee - (coursePayment ? coursePayment.amount : 0);
          return (
            <View key={course.name} style={styles.card}>
              <Text style={styles.cardTitle}>{course.name}</Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardLabel}>Total Fee:</Text>
                <Text style={styles.cardValue}>₹{course.totalFee}</Text>
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardLabel}>Paid:</Text>
                <Text style={styles.cardValue}>₹{coursePayment ? coursePayment.amount : 0}</Text>
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardLabel}>Due:</Text>
                <Text style={styles.cardValue}>₹{remaining}</Text>
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardLabel}>Receipt No:</Text>
                <Text style={styles.cardValue}>{coursePayment ? coursePayment.receiptNumber : '-'}</Text>
              </View>
              <View style={styles.cardDetails}>
                <Text style={styles.cardLabel}>Date:</Text>
                <Text style={styles.cardValue}>{coursePayment ? coursePayment.date : '-'}</Text>
              </View>
              <View style={styles.cardDetails}>
                <Text style={[styles.cardLabel, coursePayment?.status === 'Paid' ? styles.paidStatus : styles.pendingStatus]}>
                  Status:
                </Text>
                <Text style={[styles.cardValue, coursePayment?.status === 'Paid' ? styles.paidStatus : styles.pendingStatus]}>
                  {coursePayment ? coursePayment.status : '-'}
                </Text>
              </View>

              {/* Download Receipt Button (only for Paid courses) */}
              {coursePayment?.status === 'Paid' && (
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => downloadReceipt(coursePayment.receiptNumber)}
                >
                    <Feather name="download" size={16} color="#fff" />
                  <Text style={styles.downloadButtonText}>Receipt</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Pending Total Amount */}
      <View style={styles.pendingAmountContainer}>
        <Text style={styles.pendingAmount}>Total Pending Amount: </Text>
        <Text style={styles.pendingAmountText}>₹{totalPendingAmount}</Text>
      </View>

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.payButton} onPress={() => alert('Payment Process Initiated')}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 14,
    color: '#555',
  },
  cardValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  paidStatus: {
    color: '#4CAF50',
  },
  pendingStatus: {
    color: '#FF9800',
  },
  pendingAmountContainer: {
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pendingAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  pendingAmountText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF9800',
  },
  payButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 5,
    width: '75%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    width: '25%',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FeesPaymentScreen;
