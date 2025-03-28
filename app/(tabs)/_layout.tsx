import React, { useEffect, useRef, useState } from 'react';
import { Tabs, router } from 'expo-router';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { getAuth } from 'firebase/auth';
import { getDoc, getFirestore, doc } from 'firebase/firestore';
import { FIREBASE_APP } from '@/firebaseConfig';

const App = () => {
  const [userType, setUserType] = useState('');
  
  useEffect(() => {
    const getData = async () => {
        try {
            const auth = getAuth();
            const db = getFirestore(FIREBASE_APP);
            const user = auth.currentUser;
            if (!user) return;
            const docD = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docD);
            if (docSnap.exists()) {
                setUserType(`${docSnap.data().role}`.toLowerCase());
                console.log(user.emailVerified);
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.log('Error getting data:', error);
        }
    };
    getData();
}, []);
  
  const handleProfile = () => {
    router.push('/profile');
  };

  const handleCheckClick = () => {
    router.push('/assignments/create');
  }

  const handleNotifications = () => {
    router.push('/notifications');
  };

  const handleTakeAddignmentClick = () => {
    router.push('/attendance/take');
  }

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: '#000', 
        tabBarInactiveTintColor: '#696969', 
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0.18,
          borderTopColor: '#adadad',
          height: 80,
          overflow: 'hidden',
          elevation: 5,
        },
        tabBarBackground: () => (
          <BlurView
            style={StyleSheet.absoluteFill}
            intensity={125}
            tint={'light'}
          />
        ),
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 10, 
          marginTop: 5, 
        },
        headerTitleAlign: 'center',
        headerStyle: {
            borderBottomWidth: 0, 
            elevation: 0, 
            shadowOpacity: 0.2, 
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
          title: 'Classes',
          headerTitleStyle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
        }}
      />
      <Tabs.Screen
        name="assignments"
        options={{
          tabBarIcon: ({ focused }) => (
            focused ? ( <Ionicons name="file-tray-full" size={26} color="#000" /> ) : ( <Ionicons name="file-tray-full-outline" size={26} color="#696969" /> )
          ),
          title: 'Assignments',
          headerTitleStyle: { color: '#000', fontSize: 20, fontWeight: 'bold' },
          headerRight: () => (
            userType === 'student' ? (
              <Pressable onPress={() => handleNotifications()}>
                <View style={styles.notificationIcon}>
                  <Ionicons name="notifications" size={24} color="#1e90FF" />
                </View>
              </Pressable>
            ) : (
              <View style={styles.attendanceHeaderRight}>
              <Pressable onPress={() => handleCheckClick()}>
                <View style={styles.plusIcon}>
                  <Entypo name="plus" size={20} color="#fff" />
                </View>
              </Pressable>
            <Pressable onPress={() => handleNotifications()}>
              <View style={styles.notificationIcon}>
                <Ionicons name="notifications" size={24} color="#1e90FF" />
              </View>
            </Pressable>
            </View>
            )
          ),
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
          headerRight: () => (
            userType === 'student' ? (
              <Pressable onPress={() => handleNotifications()}>
                <View style={styles.notificationIcon}>
                  <Ionicons name="notifications" size={24} color="#1e90FF" />
                </View>
              </Pressable>
            ) : (
              <View style={styles.attendanceHeaderRight}>
              <Pressable onPress={() => handleTakeAddignmentClick()}>
                <View style={styles.takeIcon}>
                <MaterialIcons name="assignment-add" size={24} color="#1e90FF" />
                </View>
              </Pressable>
            <Pressable onPress={() => handleNotifications()}>
              <View style={styles.notificationIcon}>
                <Ionicons name="notifications" size={24} color="#1e90FF" />
              </View>
            </Pressable>
            </View>
            )
          ),
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
  attendanceHeaderRight: {
    flexDirection: 'row',
    marginRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    marginRight: 15,
    height: 22,
    width: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90FF',
  },
  takeIcon: {
    marginRight: 15,
    height: 25,
    width: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});