import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FIREBASE_APP } from '@/firebaseConfig';

const MyScreen = () => {
    const auth = getAuth();
    const [data, setData] = useState({});

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.replace('/(authentication)/login');
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const db = getFirestore(FIREBASE_APP);
                const user = auth.currentUser;
                if (!user) return;
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                    console.log('Document data:', docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.log('Error getting data:', error);
            }
        };
        getData();
    }, []);

    // Define the desired key order
    const orderedKeys = ['firstName', 'middleName', 'lastName', 'email', 'school', 'year', 'department', 'classId'];

    // Render each key-value pair dynamically based on the desired order
    const renderDataFields = () => {
        return orderedKeys.map((key) => {
            if (data[key]) {
                return (
                    <View key={key} style={styles.item}>
                        <View style={styles.label}>
                            <Text style={styles.textLabel}>{formatLabel(key)}</Text>
                        </View>
                        <View style={styles.value}>
                            <Text style={styles.textValue}>{data[key]}</Text> 
                        </View>
                    </View>
                );
            }
            return null; // Avoid rendering if data[key] doesn't exist
        });
    };

    // Helper function to format labels (capitalize and add spaces)
    const formatLabel = (key) => {
        const label = key.replace(/([A-Z])/g, ' $1');
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    return (
        <View style={styles.container}>
            {renderDataFields()}
            <View style={[styles.item, { marginTop: 30, justifyContent: 'center', alignItems: 'center' }]}>
                <Pressable onPress={handleLogout} style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Text style={styles.buttonLabel}>Log Out</Text>
                    </View>
                </Pressable>
            </View>
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'column',
        marginBottom: 10,
        width: '100%',
    },
    label: {
        marginBottom: 2,
    },
    value: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 6,
        width: '100%',
    },
    textLabel: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    textValue: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#f00',
        padding: 10,
        borderRadius: 5,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyScreen;
