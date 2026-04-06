import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function RecordTracker() {
  const [recordData, setRecordData] = useState({
    recordName: '',
    artistName: '',
    genre: '',
    releaseDate: '',
    criticRating: '',
    personalRating: '',
    purchaseLocation: '',
    purchasePrice: '',
    purchaseDate: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setRecordData({ ...recordData, [field]: value });
  };

  const saveRecord = () => {
    console.log("Saving new record:", recordData);
    Alert.alert("Success!", `${recordData.recordName} by ${recordData.artistName} added to collection.`);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Add to Collection</Text>
        </View>

        <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled">
          
          <Text style={styles.label}>Record Name</Text>
          <TextInput style={styles.input} placeholder="e.g. Abbey Road" placeholderTextColor="#E6E6FA"
            value={recordData.recordName} onChangeText={(text) => handleInputChange('recordName', text)} />

          <Text style={styles.label}>Artist Name</Text>
          <TextInput style={styles.input} placeholder="e.g. The Beatles" placeholderTextColor="#E6E6FA"
            value={recordData.artistName} onChangeText={(text) => handleInputChange('artistName', text)} />

          <Text style={styles.label}>Genre</Text>
          <TextInput style={styles.input} placeholder="e.g. Classic Rock" placeholderTextColor="#E6E6FA"
            value={recordData.genre} onChangeText={(text) => handleInputChange('genre', text)} />

          <Text style={styles.label}>Album Release Date</Text>
          <TextInput style={styles.input} placeholder="MM/DD/YYYY" keyboardType="numeric" placeholderTextColor="#E6E6FA"
            value={recordData.releaseDate} onChangeText={(text) => handleInputChange('releaseDate', text)} />

          <Text style={styles.label}>Critics Rating</Text>
          <TextInput style={styles.input} placeholder="1-10" keyboardType="numeric" placeholderTextColor="#E6E6FA"
            value={recordData.criticRating} onChangeText={(text) => handleInputChange('criticRating', text)} />

          <Text style={styles.label}>Personal Rating</Text>
          <TextInput style={styles.input} placeholder="1-10" keyboardType="numeric" placeholderTextColor="#E6E6FA"
            value={recordData.personalRating} onChangeText={(text) => handleInputChange('personalRating', text)} />

          <Text style={styles.label}>Purchase Location</Text>
          <TextInput style={styles.input} placeholder="e.g. Local Record Store" placeholderTextColor="#E6E6FA"
            value={recordData.purchaseLocation} onChangeText={(text) => handleInputChange('purchaseLocation', text)} />

          <Text style={styles.label}>Purchase Price</Text>
          <TextInput style={styles.input} placeholder="$0.00" keyboardType="decimal-pad" placeholderTextColor="#E6E6FA"
            value={recordData.purchasePrice} onChangeText={(text) => handleInputChange('purchasePrice', text)} />

          <Text style={styles.label}>Purchase Date</Text>
          <TextInput style={styles.input} placeholder="MM/DD/YYYY" placeholderTextColor="#E6E6FA"
            value={recordData.purchaseDate} onChangeText={(text) => handleInputChange('purchaseDate', text)} />

          <TouchableOpacity style={styles.button} onPress={saveRecord}>
            <Text style={styles.buttonText}>Save Record</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} /> 
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E24', // Dark Graphite background
  },
  header: {
    backgroundColor: '#111115', // Near-black header for contrast
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#B594FF', // Lavender accent line under the header
  },
  headerText: {
    color: '#B594FF', // Vibrant Lavender
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#E6E6FA', // Soft Lavender for labels
  },
  input: {
    backgroundColor: '#2D2D35', // Slightly lighter graphite for the input boxes
    borderWidth: 1,
    borderColor: '#4A4A5A', // Subtle border
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#FFFFFF', // White text so user input is clearly visible
  },
  button: {
    backgroundColor: '#B594FF', // Vibrant Lavender button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#B594FF', // Adds a subtle lavender glow behind the button
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
  },
  buttonText: {
    color: '#111115', // Dark graphite text on the light button for high contrast
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});