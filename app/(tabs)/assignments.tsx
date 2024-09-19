import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const MyScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.containerScroller} horizontal={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <View style={styles.headerCard}>
                <View style={styles.newNotification}>
                    <Text style={styles.textTitle}>Operating Systems</Text>
                    <Text style={styles.textDescription}>Deadline: 20 October, 2024</Text>
                    <Text style={styles.footer}>View Assignment</Text>
                </View>
            </View>
            <StatusBar style="light" />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerScroller: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        width: '100%',
        paddingTop: 10,
    },
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    headerCard: {
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: '100%',
        marginBottom: 0,
        elevation: 5,
    },
    textHeaderTitle: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: '600',
    },
    newNotification: {
        // marginTop: 10,
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
});

export default MyScreen;