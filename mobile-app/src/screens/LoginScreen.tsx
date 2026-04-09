import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import api from '../api/axiosInstance'; // Ensure this path is correct based on your folder move
import { AxiosError } from 'axios';

export default function LoginScreen() {
  // Explicitly typing state as strings
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Input Error", "Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/api/token/', { username, password });
      Alert.alert("Success", "Logged in to School ERP!");
      // Handle navigation or global state update here
    } catch (error) {
      const err = error as AxiosError;
      
      if (!err.response) {
        // This covers network issues (Wrong IP, Server Down)
        Alert.alert("Network Error", "Cannot reach the server. Check your laptop IP in .env and ensure Django is running.");
      } else if (err.response.status === 401) {
        Alert.alert("Login Failed", "Invalid username or password.");
      } else {
        Alert.alert("Error", "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>School ERP Mobile</Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput 
          style={styles.input} 
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.7 }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Signing In..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  button: { 
    backgroundColor: '#007bff', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});