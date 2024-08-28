import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const MyScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Classroom</Text>
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    miniContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
});

export default MyScreen;