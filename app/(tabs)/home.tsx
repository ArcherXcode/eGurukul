import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import { getDoc, getFirestore, collection, doc } from 'firebase/firestore';
import { FIREBASE_APP } from '@/firebaseConfig';

const MyScreen = () => {
    // const [data, setData] = useState({});
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const auth = getAuth();
                const db = getFirestore(FIREBASE_APP);
                const user = auth.currentUser;
                if (!user) return;
                const docD = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docD);
                if (docSnap.exists()) {
                    // setData(docSnap.data());
                    setUserName(docSnap.data().firstName);
                    console.log('Document data:', docSnap.data());
                } else {
                    console.log('No such document!');
                }

    } catch (error) {
        console.log('Error getting data:', error);
    }
};
    getData();
}
    , []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome Back! {userName}</Text>
            <StatusBar style="light" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 10,
    },
    textUser: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyScreen;