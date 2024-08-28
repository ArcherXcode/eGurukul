import React from 'react';
import {Link, Stack, Tabs} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const App = () => {

    return (
        <Stack
        initialRouteName='login'
        >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ 
                title: 'Sign Up',
                headerLeft: () => (
                    <Link href="/login">
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={24} color={'#000'}/>
                        <Text>Back</Text>
                        </View>
                    </Link>
                ),
                 }} />
            <Stack.Screen name="resetPassword" options={{ 
                title: 'Reset Password',
                headerLeft: () => (
                    <Link href="/login">
                        <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                        <Entypo name='chevron-left' size={24} color={'#000'}/>
                        <Text>Back</Text>
                        </View>
                    </Link>
                ),
             }} />
        </Stack>
    );
};

export default App;