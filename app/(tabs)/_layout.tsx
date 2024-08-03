import React from 'react';
import {Tabs} from 'expo-router';
import {View, Text, StyleSheet} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Import your tab screens here

const App = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{tabBarIcon : () =>(
                <Ionicons name='home-outline' size={20} color={'#000'}/>
            ),
            title: "Home",
            }}/>
            <Tabs.Screen name="classroom" options={{tabBarIcon : () =>(
                <MaterialCommunityIcons name='google-classroom' size={20} color={'#000'}/>
            ),
            title: "Class",
            }}/>
            <Tabs.Screen name="attendance" options={{tabBarIcon : () =>(
                <Entypo name='bar-graph' size={20} color={'#000'}/>
            ),
            title: "Attendance",
            }}/>
        </Tabs>
    );
};

export default App;