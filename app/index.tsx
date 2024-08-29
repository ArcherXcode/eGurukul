import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UIActivityIndicator } from 'react-native-indicators';


const MyScreen = () => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Simulate a delay or perform some async task
        setTimeout(() => {
            setLoading(false);
            router.push('/login');
        }, 1000); // 1-second delay
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <UIActivityIndicator color="#1e90FF" />
                <StatusBar style="light" />
            </View>
        );
    }

    return null; // Nothing to display after redirection
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    splashImage: {
        width: 200,  // Adjust the width as needed
        height: 200, // Adjust the height as needed
        marginBottom: 20, // Add some space below the image if necessary
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#1e90FF',
    },
});

export default MyScreen;
