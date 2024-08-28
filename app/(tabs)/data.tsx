import { Entypo, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, Pressable} from 'react-native';

const MyScreen = () => {
    const handleLogout = () => {
        router.replace('/(authentication)/login');
    }
    return (
        <View style={styles.container}>
            <View style={styles.miniContainer}>
                <Entypo name='circular-graph' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Result</Text>
            </View>
            <View style={styles.miniContainer}>
                <Entypo name='calendar' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Class Timetable</Text>
            </View>
            <View style={styles.miniContainer}>
                <MaterialIcons name='list-alt' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Tests & Quizzes</Text>
            </View>
            <View style={styles.miniContainer}>
                <Entypo name='credit' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Fees</Text>
            </View>
            <View style={styles.miniContainer}>
                <Entypo name='book' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Exam Routines</Text>
            </View>
            <View style={styles.miniContainer}>
                <Entypo name='chat' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Feedback</Text>
            </View>
            <View style={styles.miniContainer}>
                <Entypo name='cog' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Settings</Text>
            </View>
            <Pressable style={styles.miniContainer} onPress={handleLogout}>
                <Entypo name='log-out' size={20} color={'#000'} style={{marginRight: 10}}/>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        padding: 10,
        width: '100%',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    miniContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        borderWidth: 0.5,
        borderBlockColor: 'gray',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
        textAlign: 'left',
    },
});

export default MyScreen;