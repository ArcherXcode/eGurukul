import React from 'react';
import {Link, Stack, Tabs} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    return (
        <Stack
        initialRouteName='login'
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
            <Stack.Screen name="createPassword" options={{ headerShown: false }} />
        </Stack>
    );
};

export default App;