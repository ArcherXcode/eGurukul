import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

    const renderClassItem = ({ item }: { item: { id: string; time: string; subject: string; teacher: string } }) => (
        <View style={styles.classItem}>
            <Text style={styles.classTime}>{item.time}</Text>
            <Text style={styles.classSubject}>{item.subject}</Text>
            <Text style={styles.classTeacher}>{item.teacher}</Text>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={[styles.container, {paddingBottom: bottom * 2.5}]} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.headerCard}>
                <Text style={styles.textHeaderTitle}>Important Notifications</Text>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Mid-Semester Exam Schedule</Text>
                    <Text style={styles.textDescription}>The schedule for mid-semester exam is out.</Text>
                    <Text style={styles.footer}>Read more</Text>
                </View>
                <View style={styles.headFooter}>
                    <Pressable onPress={() => router.navigate('/notifications')}>
                        <Text style={styles.headerFooter}>View All</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.scheduleCard}>
                <Text style={styles.textHeaderTitle}>Today's Class Schedule</Text>
                <View style={styles.newNotification}>
                <FlatList
                    data={schedule}
                    renderItem={renderClassItem}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={true}
                />
                </View>
                <View style={[styles.headFooter, {marginVertical: 5}]}>
                    <Pressable onPress={() => router.navigate('/classTimetable')}>
                        <Text style={styles.headerFooter}>View All</Text>
                    </Pressable>
                </View>
            </View>
            <View style={styles.headerCard}>
                <Text style={styles.textHeaderTitle}>Assignments</Text>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
                <View style={styles.headFooter}>
                    <Pressable onPress={() => router.navigate('/assignments')}>
                        <Text style={styles.headerFooter}>View All</Text>
                    </Pressable>
                </View>
            </View>

        <StatusBar style="dark" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    headerCard: {
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '100%',
        marginBottom: 20,
        elevation: 5,
    },
    textHeaderTitle: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: '600',
    },
    newNotification: {
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#cfe0fc',
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
        marginTop: 5,
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
        marginBottom: 5,
    },
    scheduleCard: {
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '100%',
        elevation: 5,
    },
    classItem: {
        paddingVertical: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    classTime: {
        fontSize: 14,
        color: '#333',
        marginBottom: 2,
    },
    classSubject: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    classTeacher: {
        fontSize: 14,
        color: '#666',
    },
});

export default MyScreen;
