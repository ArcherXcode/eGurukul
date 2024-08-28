import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Link } from 'expo-router';

const MyScreen = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [index, setIndex] = useState(0);
    const fullText = 'eGurukul';
    const typingSpeed = 200; // milliseconds
    const deletingSpeed = 100; // milliseconds

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isTyping) {
                if (index < fullText.length) {
                    setDisplayedText(fullText.slice(0, index + 1));
                    setIndex(index + 1);
                } else {
                    setIsTyping(false);
                }
            } else {
                if (index > 0) {
                    setDisplayedText(fullText.slice(0, index - 1));
                    setIndex(index - 1);
                } else {
                    setIsTyping(true);
                }
            }
        }, isTyping ? typingSpeed : deletingSpeed);

        return () => clearTimeout(timer);
    }, [index, isTyping]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{displayedText}</Text>
                <Text style={styles.headerSub}>Your Second School</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.subHeaderText}>Login</Text>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Enrollment Number</Text>
                    <TextInput style={styles.inputBox} placeholder="Enter your Enrollment Number" />
                </View>
                <View style={styles.input}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={styles.inputBox} placeholder="Enter your password" />
                </View>
                <View style={styles.button}>
                    <Pressable style={styles.buttonBox}>
                        <Text style={styles.buttonText}>Login</Text>
                    </Pressable>
                    <View style={styles.buttonBox}>
                        <Link href="/signup">
                            <Text style={styles.buttonText}>SignUp</Text>
                        </Link>
                    </View>
                </View>
                <Link href="/resetPassword">
                    <Text style={styles.footerText}>Forgot Password?</Text>
                </Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#1e90FF',
        width: '100%',
        // paddingVertical: 50,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    header: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        top: "20%",
        height: '10%',
    },
    subHeader: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        top: "25%",
    },
    headerText: {
        color: '#fff',
        fontSize: 56,
        fontWeight: 'bold',
    },
    headerSub: {
        position: 'absolute',
        top: '90%',
        color: '#fff',
        fontSize: 16,
        fontWeight: '300',
    },
    subHeaderText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    body: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        top: "25%",
        backgroundColor: '#151b54',
        borderRadius: 15,
        paddingVertical: 25
    },
    input: {
        width: '80%',
        marginVertical: 10,
    },
    inputBox: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
    },
    footerText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
    },
    inputLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5
    },
    button: {
        width: '80%',
        marginVertical: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonBox: {
        width: '45%',
        backgroundColor: '#1e90FF',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default MyScreen;