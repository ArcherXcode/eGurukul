import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { NavigationContainer } from '@react-navigation/native';

const AssignmentLayout = () => {

    const handleBack = () => {
        router.back();
    };

    return (
        <Stack
            initialRouteName="details"
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
                name="details" 
                options={{ 
                    title: 'Assignment Details',
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
                name="submit" 
                options={{ 
                    title: 'Submit Assignment',
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
                name="create" 
                options={{ 
                    title: 'Create Assignment',
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
                name="check" 
                options={{ 
                    title: 'Check Assignment',
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

const styles = StyleSheet.create({
    headerMain: {
        borderBottomWidth: 0, 
            elevation: 0, 
            shadowOpacity: 0, 
    },
    header: {
        backgroundColor: '#1e90FF',
        padding: 15,
        borderRadius: 10,
    },
    headerTitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AssignmentLayout;
