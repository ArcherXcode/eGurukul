import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';
import { AntDesign } from '@expo/vector-icons';

const MyScreen = () => {
    const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));

    const generateWeekDays = () => {
        const days = [];
        for (let i = 0; i < 7; i++) {
            days.push(moment(currentWeek).add(i, 'days'));
        }
        return days;
    };

    const changeWeek = (direction: number) => {
        setCurrentWeek(prevWeek => moment(prevWeek).add(direction, 'week'));
    };

    const generateDaySchedule = () => {
        let schedule = [];
        let startTime = moment().startOf('day').add(9, 'hours'); // Start at 9:00 AM
        const endTime = moment().startOf('day').add(17, 'hours'); // End at 5:00 PM

        while (startTime.isBefore(endTime)) {
            const randomSubject = getRandomSubject();
            const isLab = randomSubject.isLab;

            schedule.push({
                time: startTime.format('h:mm A') + ' - ' + startTime.add(isLab ? 100 : 50, 'minutes').format('h:mm A'),
                subject: randomSubject.subject,
            });

            startTime.add(10, 'minutes'); // 10 minute gap between sessions
        }

        return schedule;
    };

    const getRandomSubject = () => {
        return subjects[Math.floor(Math.random() * subjects.length)];
    };

    const renderTableRow = (day: moment.Moment, index: number) => {
        const daySchedule = generateDaySchedule();
        return (
            <View key={index} style={styles.daySchedule}>
                <Text style={styles.dayHeader}>{day.format('dddd, MMM D')}</Text>
                {daySchedule.map((session, i) => (
                    <View key={i} style={styles.row}>
                        <Text style={styles.cell2}>{session.time}</Text>
                        <Text style={styles.cell3}>{session.subject}</Text>
                    </View>
                ))}
            </View>
        );
    };

    const subjects = [
        { id: '1', subject: 'Data Structures', isLab: false },
        { id: '2', subject: 'Database Management', isLab: false },
        { id: '3', subject: 'Operating System', isLab: false },
        { id: '4', subject: 'Computer Architecture', isLab: false },
        { id: '5', subject: 'Web Development', isLab: false },
        { id: '6', subject: 'AI Lab', isLab: true },
        { id: '7', subject: 'OS Lab', isLab: true },
        { id: '8', subject: 'DS Lab', isLab: true },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Weekly Timetable</Text>

            <View style={styles.weekNavigator}>
                <Pressable style={styles.navButton} onPress={() => changeWeek(-1)}>
                    <AntDesign name="left" size={20} color="#fff" />
                </Pressable>
                <Text style={styles.currentWeekText}>
                    {`${moment(currentWeek).format('MMM D')} - ${moment(currentWeek).add(6, 'days').format('MMM D, YYYY')}`}
                </Text>
                <Pressable style={styles.navButton} onPress={() => changeWeek(1)}>
                    <AntDesign name="right" size={20} color="#fff" />
                </Pressable>
            </View>

            <View style={styles.table}>
                <View style={styles.row}>
                    <Text style={[styles.cell1M, styles.headerCell]}>Time</Text>
                    <Text style={[styles.cell2M, styles.headerCell]}>Subject</Text>
                </View>

                <FlatList
                    data={generateWeekDays()}
                    renderItem={({ item, index }) => renderTableRow(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <StatusBar style="dark" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    weekNavigator: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    navButton: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    currentWeekText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    table: {
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
    },
    daySchedule: {
        marginBottom: 20,
    },
    dayHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cell1M: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        padding: 5,
        fontWeight: 'bold',
    },
    cell2M: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        padding: 5,
        fontWeight: 'bold',
    },
    cell2: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        padding: 5,
        width: "50%"
    },
    cell3: {
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        padding: 5,
        width: "50%", 
        fontWeight: 'bold',
    },
    headerCell: {
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
    },
});

export default MyScreen;
