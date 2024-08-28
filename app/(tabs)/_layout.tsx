import React from 'react';
import {Tabs, router} from 'expo-router';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import { Entypo, FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

// Import your tab screens here

const App = () => {

    const handleProfile = () => {
        router.push('/profile');
    }
    const handleNotifications = () => {
        router.push('/notifications');
    }

    return (
        <Tabs
        initialRouteName='home'
        screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#000',
            tabBarActiveBackgroundColor: '#cfe0fc',
            tabBarInactiveBackgroundColor: '#1e90FF',
            tabBarStyle: {
                backgroundColor: '#1e90FF',
                borderTopColor: '#1e90FF',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
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
                borderRadius: 10,
                marginHorizontal: 15,
                marginTop: 5,
                marginBottom: 5,
                padding: 0,
            },
            headerRight: () => (
                <Pressable onPress={() => handleNotifications()}>
                <View style={styles.notificationIcon}>
                    <MaterialIcons name='notifications' size={24} color={'red'}/>
                </View>
                </Pressable>
            ),
            headerLeft: () => (
                <Pressable onPress={() => handleProfile()}>
                    <Image
                    source={require('../../assets/images/user.png')}
                    style={styles.profileIcon}
                    />
                </Pressable>
            )
        }}
        >
            <Tabs.Screen name="home" options={{tabBarIcon : ({focused}) =>(
                <MaterialCommunityIcons name='view-dashboard-outline' size={24} color={focused ? '#000' : '#fff'}/>
            ),
            title: "Dashboard",
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#1e90FF',
            },
            }}/>
            <Tabs.Screen name="classroom" options={{tabBarIcon : ({focused}) =>(
                <SimpleLineIcons name='social-dropbox' size={24} color={focused ? '#000' : '#fff'}/>
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
            <Tabs.Screen name="assignments" options={{tabBarIcon : ({focused}) =>(
                <FontAwesome5 name='tasks' size={24} color={focused ? '#000' : '#fff'}/>
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
            <Tabs.Screen name="attendance" options={{tabBarIcon : ({focused}) =>(
                <Entypo name='area-graph' size={24} color={focused ? '#000' : '#fff'}/>
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
            <Tabs.Screen name="data" options={{tabBarIcon : ({focused}) =>(
                <Entypo name= 'database' size={24} color={focused ? '#000' : '#fff'}/>
            ),
            title: "Modules",
            headerTitleStyle: {
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
            },
            headerStyle: {
                backgroundColor: '#1e90FF',
            },
            headerRight: () => (
                null
            ),
            headerLeft: () => (
                null
            ),
            }}/>
        </Tabs>
    );
};

export default App;

const styles = StyleSheet.create({
    notificationIcon: {
       marginRight: 10, 
       height: 25, 
       width: 25, 
       borderRadius: 12.5, 
       backgroundColor: '#cfe0fc',
       alignItems: 'center',
         justifyContent: 'center',
    },
    profileIcon: {
        marginLeft: 10, 
        height: 30, 
        width: 30, 
        borderRadius: 15, 
        backgroundColor: '#cfe0fc',
        alignItems: 'center',
          justifyContent: 'center',
     },
});