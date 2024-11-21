import React from 'react';
import {Link, Stack, Tabs} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    return (
        <Stack
        initialRouteName='teacherSignup'
        screenOptions={{
            headerStyle: {
                backgroundColor: '#1e90FF',
            },
            headerTitleStyle: {
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
            },
        }}
        >
            <Stack.Screen name="teacherSignup" options={{ 
                headerShown: false,
                 }} />
            <Stack.Screen name="subjectTeacherSignup" options={{ 
                headerShown: false,
             }} />
             <Stack.Screen name="coordinatorSignup" options={{ 
                headerShown: false,
             }} />
        </Stack>
    );
};

export default App;