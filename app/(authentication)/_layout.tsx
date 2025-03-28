import React from 'react';
import { Stack } from 'expo-router';

const App = () => {
    return (
        <Stack
        initialRouteName='login'
        screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
        </Stack>
    );
};

export default App;