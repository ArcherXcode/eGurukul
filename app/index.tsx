import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { UIActivityIndicator } from 'react-native-indicators';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const MyScreen = () => {
    const [loading, setLoading] = useState(true);

    const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>() 
  const router = useRouter();
  const segments = useSegments();
  
  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('onAuthStateChanged', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;
    if (user) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/(authentication)/login');
    }
  }
  , [initializing, user]);
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
