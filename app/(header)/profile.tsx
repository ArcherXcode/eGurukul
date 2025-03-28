import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getAuth, onAuthStateChanged, sendEmailVerification, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { FIREBASE_APP } from '@/firebaseConfig';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarIndicator, PacmanIndicator, PulseIndicator, SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';

// Define the type for user data
interface UserData {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    role?: string;
    email?: string;
    school?: string;
    year?: string;
    department?: string;
    classId?: string;
}

const MyScreen = () => {
    const auth = getAuth();
    const [data, setData] = useState<UserData>({});
    const [verified, setVerified] = useState(false);
    const [verificationSent, setVerificationSent] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    const handleLogout = async () => {
        await signOut(auth).then(() => {
            Alert.alert('Success', 'Logged out successfully');
            router.push('/(authentication)/login');
        }).catch((error) => {
            console.log('Error signing out:', error);
        });
    };

    const handleResendVerification = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                Alert.alert('Success', 'Verification email sent successfully');
                setVerificationSent(true);
            }
        } catch (error) {
            console.log('Error sending verification email:', error);
        }
    };

    useEffect(() => {
        const db = getFirestore(FIREBASE_APP);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setData(docSnap.data() as UserData);
                        setVerified(user.emailVerified);
                        console.log('User Verified:', user.emailVerified);
                    } else {
                        console.log('No such document!');
                    }
                } finally {
                    setLoading(false); // Hide loading indicator after data is fetched
                }
            }
        });

        return unsubscribe;
    }, [auth]);

    const orderedKeys: Array<keyof UserData> = ['firstName', 'middleName', 'lastName', 'role', 'email', 'school', 'year', 'department', 'classId'];

    const renderDataFields = () => {
        return orderedKeys.map((key) => {
            if (data[key]) {
                return (
                    <View key={key} style={styles.item}>
                        <View style={styles.label}>
                            <Text style={styles.textLabel}>{formatLabel(key)}</Text>
                        </View>
                        <View style={styles.value}>
                            {key === 'email' ? (
                                <View style={styles.emailContainer}>
                                    <Text style={styles.textValue}>{data[key]}</Text>
                                    <View style={styles.verificationContainer}>
                                        {verified ? (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                style={[styles.verificationButton, {
                                                    backgroundColor: 'green',
                                                    opacity: 1
                                                }]} 
                                            >
                                                <MaterialCommunityIcons name={'email-check-outline'} size={16} color={'#fff'} />
                                            </TouchableOpacity>
                                        ) : (
                                            <View style={styles.verificationWrapper}>
                                                <TouchableOpacity
                                                    activeOpacity={0.5}
                                                    style={[styles.verificationButton, {
                                                        backgroundColor: 'red'
                                                    }]}
                                                    onPress={handleResendVerification}
                                                >
                                                    <MaterialCommunityIcons name={'email-alert-outline'} size={16} color={'#fff'} />
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            ) : (
                                <Text style={styles.textValue}>{data[key]}</Text>
                            )}
                        </View>
                    </View>
                );
            }
            return null;
        });
    };

    const formatLabel = (key: keyof UserData) => {
        const label = key.replace(/([A-Z])/g, ' $1');
        return label.charAt(0).toUpperCase() + label.slice(1);
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <Modal transparent={true} visible={loading} animationType="none">
                    <View style={styles.loadingContainer}>
                        <View style={{ marginBottom: 20, backgroundColor: 'white', padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: '600' }}>Loading Profile</Text>
                        <View style={{ marginBottom: 20, backgroundColor: '#fff', height: 20, width: 50 }}>
                        <UIActivityIndicator color="#1e90FF" size={40}/>
                        </View>
                        </View>
                    </View>
                </Modal>
            ) : (
                <>
                    {renderDataFields()}
                    <View style={[styles.item, { marginTop: 30, justifyContent: 'center', alignItems: 'center' }]}>
                        <Pressable onPress={handleLogout} style={styles.buttonContainer}>
                            <View style={styles.button}>
                                <Text style={styles.buttonLabel}>Log Out</Text>
                            </View>
                        </Pressable>
                    </View>
                    <StatusBar style="dark" />
                </>
            )}
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
        paddingBottom: 10,
        paddingTop: 20
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
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    verificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    verificationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
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
    verifiedText: {
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
    },
    unverifiedText: {
        color: 'red',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 10,
    },
    verificationSentText: {
        color: '#ffa500',
        fontSize: 14,
        marginLeft: 10,
    },
    resendButton: {
        backgroundColor: '#0000ff',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    resendText: {
        color: '#fff',
        fontSize: 12,
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
    verificationButton: {
        padding: 8,
        borderRadius: 5,
        opacity: 0.5,
        marginTop: -15
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default MyScreen;
