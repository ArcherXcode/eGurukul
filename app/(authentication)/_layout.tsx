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
            <Stack.Screen name="resetPassword" options={{ 
                title: 'Reset Password',
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#1e90FF',
                },
                headerTitleStyle: {
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                headerLeft: () => (
                    <Link href="/login" style={{marginTop: 5, left: -10}}>
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