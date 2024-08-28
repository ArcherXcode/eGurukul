import React from 'react';
import {Link, Stack, Tabs} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    return (
        <Stack
        initialRouteName='login'
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
            <Stack.Screen name="subjects" options={{ 
                title: 'Subjects',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
            <Stack.Screen name="results" options={{ 
                title: 'Results',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
             <Stack.Screen name="examRoutines" options={{ 
                title: 'Exam Routines',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
             <Stack.Screen name="classTimetable" options={{ 
                title: 'Timetable',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
             <Stack.Screen name="feedback" options={{ 
                title: 'Feedback',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
             <Stack.Screen name="fees" options={{ 
                title: 'Payment Dashboard',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
             <Stack.Screen name="settings" options={{ 
                title: 'Settings',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Link>
                ),
             }} />
             <Stack.Screen name="tests" options={{ 
                title: 'Tests',
                headerLeft: () => (
                    <Link href="/data" style={{marginTop: 5, left: -10}}>
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