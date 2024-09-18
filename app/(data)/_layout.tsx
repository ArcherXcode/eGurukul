import React from 'react';
import {Stack, Tabs, router} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    const handleBack = () => {
        router.back();
    }

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
            headerTitleAlign: 'center',
        }}
        >
            <Stack.Screen name="subjects" options={{ 
                title: 'Subjects',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
            <Stack.Screen name="results" options={{ 
                title: 'Results',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="examRoutines" options={{ 
                title: 'Exam Routines',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="classTimetable" options={{ 
                title: 'Timetable',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="feedback" options={{ 
                title: 'Feedback',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="fees" options={{ 
                title: 'Payment Dashboard',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="settings" options={{ 
                title: 'Settings',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="tests" options={{ 
                title: 'Tests',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#fff'}/>
                        </View>
                    </Pressable>
                ),
             }} />
        </Stack>
    );
};

export default App;