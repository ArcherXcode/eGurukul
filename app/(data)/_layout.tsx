import React from 'react';
import {Stack, Tabs, router} from 'expo-router';
import {View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import { Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    const handleBack = () => {
        router.back();
    }

    return (
        <Stack
        screenOptions={{
            headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
            },
            headerTitleAlign: 'center',
        }}
        >
            <Stack.Screen name="subjects" options={{ 
                title: 'Subjects',
                headerLeft: () => (
                    <Pressable 
                    onPress={handleBack} style={{marginTop: 5, left: -10,}}
                    >
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
            <Stack.Screen name="results" options={{ 
                title: 'Results',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="examRoutines" options={{ 
                title: 'Exam Routines',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="classTimetable" options={{ 
                title: 'Timetable',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="feedback" options={{ 
                title: 'Feedback',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="fees" options={{ 
                title: 'Payment Dashboard',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
             <Stack.Screen name="tests" options={{ 
                title: 'Tests',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
        </Stack>
    );
};

export default App;