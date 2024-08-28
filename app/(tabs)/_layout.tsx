import React from 'react';
import {Tabs} from 'expo-router';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// Import your tab screens here

const App = () => {
    return (
        <Tabs
        initialRouteName='home'
        screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarActiveBackgroundColor: '#151b54',
            tabBarInactiveBackgroundColor: '#1e90FF',
            tabBarStyle: {
                backgroundColor: '#1e90FF',
                borderTopColor: '#1e90FF',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                height: 90,
            },
            tabBarIconStyle: {
                color: '#fff',
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
            },
            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
                color: '#fff',
            },
            tabBarShowLabel: false,
            tabBarItemStyle: {
                borderRadius: 20,
                margin: 10,
                padding: 0,
            },
        }}
        >
            <Tabs.Screen name="home" options={{tabBarIcon : () =>(
                <Ionicons name='home-outline' size={24} color={'#fff'}/>
            ),
            title: "Home",
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#1e90FF',
            },
            headerRight: () => (
                <View style={{marginRight: 10}}>
                    <MaterialIcons name='notifications' size={24} color={'#fff'}/>
                </View>
            )
            }}/>
            <Tabs.Screen name="classroom" options={{tabBarIcon : () =>(
                <MaterialCommunityIcons name='google-classroom' size={24} color={'#fff'}/>
            ),
            title: "Class Rooms",
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#1e90FF',
            }
            }}/>
            <Tabs.Screen name="attendance" options={{tabBarIcon : () =>(
                <Entypo name='bar-graph' size={24} color={'#fff'}/>
            ),
            title: "Attendance",
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#1e90FF',
            }
            }}/>
            <Tabs.Screen name="data" options={{tabBarIcon : () =>(
                <Entypo name= 'database' size={24} color={'#fff'}/>
            ),
            title: "Modules",
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#1e90FF',
            }
            }}/>
        </Tabs>
    );
};

export default App;