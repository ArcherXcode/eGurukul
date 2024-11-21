import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PacmanIndicator } from "react-native-indicators";
import { useAuth } from "../hooks/useAuth";

const MyScreen = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      setTimeout(() => {
        router.replace("/(tabs)/home");
        Alert.alert("Welcome Back!", "Session Resumed.");
      }, 100); 
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(authentication)/login");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.headerText}>eGurukul</Text>
          <Text style={styles.loginCheck}>Checking For Login Session</Text>
          <View style={styles.loadingIcon}>
            <PacmanIndicator size={50} color="#1e90FF" />
          </View>
        </View>
        <StatusBar style="dark" />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingContainer: {
    height: "100%",
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  loadingIcon: {
    marginTop: 20,
    height: 50,
    width: 50,
  },
  loginCheck: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  headerText: {
    color: "#1e90FF",
    fontSize: 56,
    fontWeight: "bold",
  },
});

export default MyScreen;
