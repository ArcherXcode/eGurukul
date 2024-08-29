import React from 'react';
import {Link, Stack, Tabs} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    return (
        <Stack
        initialRouteName='signup'
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
            <Stack.Screen name="signup" options={{ 
                headerShown: false,
                 }} />
            <Stack.Screen name="studentSignup" options={{ 
                title: 'Student Onboarding',
                headerLeft: () => (
                    <Link href="/signup" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
             <Stack.Screen name="teacherSignup" options={{ 
                title: 'Teacher Onboarding',
                headerLeft: () => (
                    <Link href="/signup" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
        </Stack>
    );
};

export default App;