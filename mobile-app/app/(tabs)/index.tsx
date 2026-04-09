import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../../src/api/axiosInstance';
import * as SecureStore from 'expo-secure-store';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/api/token/', { username, password });
      
      // Save tokens securely
      await SecureStore.setItemAsync('access_token', response.data.access);
      await SecureStore.setItemAsync('refresh_token', response.data.refresh);
    
      Alert.alert("Success", `Welcome back, ${username}!`);
      // Now you can navigate to the Dashboard
    } catch (error) {
      // ... error handling
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>School ERP Mobile</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword} 
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#ddd' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});