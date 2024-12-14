import React from 'react';
import {Stack, router} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    const handleBack = () => {
        router.back();
    }

    return (
        <Stack
        initialRouteName="profile"
        screenOptions={{
            headerTitleStyle: {
                color: '#000',
                fontSize: 20,
                fontWeight: 'bold',
            },
        }}
        >
            <Stack.Screen name="profile" options={{ 
                title: 'Account Center',
                headerLeft: () => (
                    <Pressable onPress={handleBack} style={{marginTop: 5, left: -10,}}>
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={28} color={'#000'}/>
                        </View>
                    </Pressable>
                ),
             }} />
            <Stack.Screen name="notifications" options={{ 
                title: 'Notifications',
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