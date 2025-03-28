import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MyScreen = () => {
    const { top, bottom } = useSafeAreaInsets();
    const [schedule, setSchedule] = useState<{ id: string; time: string; subject: string; teacher: string; }[]>([]);

    useEffect(() => {
        // Mock data for today's class schedule
        const todaysSchedule = [
            { id: '1', time: '9:00 AM - 10:30 AM', subject: 'Data Structures', teacher: 'Prof. A Sharma' },
            { id: '2', time: '11:00 AM - 12:30 PM', subject: 'Database Management', teacher: 'Prof. S Verma' },
            { id: '3', time: '1:30 PM - 3:00 PM', subject: 'Operating Systems', teacher: 'Prof. P Gupta' },
            { id: '4', time: '3:30 PM - 5:00 PM', subject: 'Web Development', teacher: 'Prof. M Singh' },
        ];

        setSchedule(todaysSchedule);
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.container, { paddingBottom: bottom * 3 }]} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.headerCard}>
            <Pressable onPress={() => router.navigate('/notifications')}>
                <View style={styles.headerRow}>
                
                <Text style={styles.textHeaderTitle}>Important Notifications</Text>
                <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                    
                </View>
                </Pressable>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Mid-Semester Exam Schedule</Text>
                    <Text style={styles.textDescription}>The schedule for mid-semester exam is out.</Text>
                </View>
            </View>
            <View style={styles.scheduleCard}>
            <Pressable onPress={() => router.navigate('/classTimetable')}>
                <View style={styles.headerRow}>
                <Text style={styles.textHeaderTitle}>Today's Class Schedule</Text>
                
                        <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                    
                </View>
                </Pressable>
                {schedule.map(item => (
                    <View key={item.id} style={styles.classItem}>
                        <Text style={styles.classTime}>{item.time}</Text>
                        <Text style={styles.classSubject}>{item.subject}</Text>
                        <Text style={styles.classTeacher}>{item.teacher}</Text>
                    </View>
                ))}
                <View style={[styles.headFooter]}>
                </View>
            </View>
            <View style={styles.headerCard}>
            <Pressable onPress={() => router.navigate('/(data)/fees')}>
                <View style={styles.headerRow}>
                <Text style={styles.textHeaderTitle}>Payments</Text>
                
                <Ionicons name="chevron-forward" size={20} color="#007AFF" />
                    
                    </View>
                    </Pressable>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>B.Tech 4th Year</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                    <Text style={styles.textDescriptionDueBold}>Due: </Text>
                    <Text style={styles.textDescriptionDue}>₹20,000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 5 }}>
                    <Text style={styles.textDescriptionDueBold}>Date: </Text>
                    <Text style={styles.textDescriptionDue}>2024-11-05</Text>
                    </View>
                </View>
            </View>
            <StatusBar style="dark" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 100,
    },
    headerCard: {
        backgroundColor: 'white',
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        marginBottom: 10,
        elevation: 5,
    },
    textHeaderTitle: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 18,
        paddingHorizontal: 10,
        fontWeight: '800',
        paddingBottom: 5,
    },
    newNotification: {
        marginVertical: 10,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    textTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    textDescription: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
    textDescriptionDueBold: {
        fontSize: 14,
        color: '#333',
        fontWeight: '600',
    },
    textDescriptionDue: {
        fontSize: 14,
        color: 'red',
    },
    footer: {
        fontSize: 12,
        color: '#007AFF',
        textAlign: 'right',
        marginTop: 5,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headFooter: {
        marginTop: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    headerFooter: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
        marginBottom: 5,
    },
    scheduleCard: {
        backgroundColor: 'white',
        paddingVertical: 5,
        borderRadius: 10,
        width: '100%',
        elevation: 5,
    },
    classItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    classTime: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    classSubject: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    classTeacher: {
        fontSize: 14,
        color: '#666',
    },

});

export default MyScreen;
