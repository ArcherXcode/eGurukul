import React from 'react';
import { Tabs, router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const App = () => {
  const handleProfile = () => {
    router.push('/profile');
  };

  const handleNotifications = () => {
    router.push('/notifications');
  };

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: '#000', // Active tab color
        tabBarInactiveTintColor: '#696969', // Inactive tab color (gray)
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent', // Transparent background
          borderTopWidth: 0.18, // Adding the faint border
          borderTopColor: '#adadad', // Faint black color for the top border
          height: 90,
          overflow: 'hidden', // Ensures proper rendering of blur view
          elevation: 5,
        },
        tabBarBackground: () => (
          <BlurView
            style={StyleSheet.absoluteFill}
            intensity={90}
            tint={'light'}
          />
        ),
        // headerShown: false,
        tabBarShowLabel: true, // Show labels below icons
        tabBarLabelStyle: {
          fontSize: 10, // Adjust font size
          marginTop: 5, // Add space between icon and label
        },
        headerTitleAlign: 'center',
        headerStyle: {
            borderBottomWidth: 0, // Remove any bottom border
            elevation: 0, // Remove shadow for Android
            shadowOpacity: 0, // Remove shadow for iOS
        },
        headerRight: () => (
          <Pressable onPress={() => handleNotifications()}>
            <View style={styles.notificationIcon}>
              <Ionicons name="notifications" size={24} color="#1e90FF" />
            </View>
          </Pressable>
        ),
        headerLeft: () => (
          <Pressable onPress={() => handleProfile()}>
            <Image source={require('../../assets/images/user.png')} style={styles.profileIcon} />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? ( <Ionicons name="home" size={26} color="#000" /> ) : ( <Ionicons name="home-outline" size={26} color="#696969" /> )
          ),
          title: 'Dashboard',
          headerTitleStyle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
        }}
      />
      <Tabs.Screen
        name="classroom"
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? ( <Ionicons name="people" size={30} color="#000" /> ) : ( <Ionicons name="people-outline" size={30} color="#696969" /> )
          ),
          title: 'Classrooms',
          headerTitleStyle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? ( <Ionicons name="file-tray-full" size={26} color="#000" /> ) : ( <Ionicons name="file-tray-full-outline" size={26} color="#696969" /> )
          ),
          title: 'Assignment',
          headerTitleStyle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? ( <Ionicons name="pie-chart" size={28} color="#000" /> ) : ( <Ionicons name="pie-chart-outline" size={28} color="#696969" /> )
          ),
          title: 'Attendance',
          headerTitleStyle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? ( <Ionicons name='albums' size={28} color="#000" /> ) : ( <Ionicons name='albums-outline' size={28} color="#696969" /> )
          ),
          title: 'Modules',
          headerTitleStyle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
          headerLeft: () => null,
        }}
      />
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
