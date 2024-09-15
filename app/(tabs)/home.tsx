import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { getAuth } from 'firebase/auth';
import { getDoc, getFirestore, collection, doc } from 'firebase/firestore';
import { FIREBASE_APP } from '@/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const MyScreen = () => {
    // const [data, setData] = useState({});
    const [userName, setUserName] = useState('');
    const navigation = useNavigation();

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
                    setUserName(`${docSnap.data().firstName} ${docSnap.data().lastName}`);
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

    useLayoutEffect(() => {
        if (userName) {
            navigation.setOptions({
                headerTitle: userName,
            });
        }
    }, [navigation, userName]);


    return (
        <View style={styles.container}>
            <View style={styles.headerCard}>
            <Text style={styles.text}>Welcome Back! </Text>
            <Text style={styles.textUser}>{userName}</Text>
            </View>
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
        paddingHorizontal: 10,
    },
    headerCard: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
        marginTop: 5,
        // marginLeft: 5,
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '400',
    },
    textUser: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MyScreen;