import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';

const TestLayout = () => {
    const handleBack = () => {
        router.back();
    };

    return (
        <Stack
            initialRouteName="detail"
            screenOptions={{
                headerTitleStyle: {
                    color: '#000',
                    fontSize: 20,
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name="detail"
                options={{
                    title: 'Test Details',
                    headerLeft: () => (
                        <Pressable onPress={handleBack} style={{ marginTop: 5, left: -10 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Entypo name='chevron-left' size={28} color={'#000'} />
                            </View>
                        </Pressable>
                    ),
                }}
            />
            <Stack.Screen
                name="quiz"
                options={{
                    headerShown: false ,
                }}
            />
            <Stack.Screen
                name="createtest"
                options={{
                    title: 'Create Test',
                    headerLeft: () => (
                        <Pressable onPress={handleBack} style={{ marginTop: 5, left: -10 }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Entypo name='chevron-left' size={28} color={'#000'} />
                            </View>
                        </Pressable>
                    ),
                }}
                />
        </Stack>
    );
};

export default TestLayout;