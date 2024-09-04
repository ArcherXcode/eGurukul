import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import auth from '@react-native-firebase/auth';

const MyScreen = () => {
    const handleLogout = () => {
        auth().signOut();
        router.replace('/(authentication)/login');
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={() => handleLogout()}
            style={styles.logoutButton}
            activeOpacity={0.5}
            >
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
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
    logoutButton:{
        padding: 10, 
        backgroundColor: '#1e90FF', 
        marginTop: 10,
        borderRadius: 5,
    },
    logoutText:{
        color: '#fff',
        fontSize: 16,
    },
});

export default MyScreen;