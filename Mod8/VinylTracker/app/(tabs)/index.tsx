import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons'; 


const INITIAL_STATE = {
  recordName: '',
  artistName: '',
  genre: '',
  releaseDate: '',
  criticRating: 0, 
  personalRating: 0, 
  purchaseLocation: '',
  purchasePrice: '',
  purchaseDate: ''
};

export default function RecordTracker() {
  const [recordData, setRecordData] = useState(INITIAL_STATE);

  const handleInputChange = (field: string, value: string | number) => {
    setRecordData({ ...recordData, [field]: value });
  };

  const saveRecord = () => {
    console.log("Saving new record:", recordData);
    Alert.alert("Success!", `${recordData.recordName || 'Record'} by ${recordData.artistName || 'Unknown Artist'} added to collection.`);
  };

  const clearForm = () => {
    // Resetting the state back to our blank INITIAL_STATE object
    setRecordData(INITIAL_STATE);
  };

  // A custom reusable component to render a row of 10 clickable stars
  const StarRating = ({ rating, fieldName }: { rating: number, fieldName: string }) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleInputChange(fieldName, star)}>
            <MaterialIcons
              name={star <= rating ? "star" : "star-border"}
              size={28}
              color="#B594FF" 
            />
          </TouchableOpacity>
        ))}
      </View>
    );
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
          <TextInput style={styles.input} placeholder="YYYY" keyboardType="numeric" placeholderTextColor="#E6E6FA"
            value={recordData.releaseDate} onChangeText={(text) => handleInputChange('releaseDate', text)} />

          <Text style={styles.label}>Critics Rating</Text>
          {}
          <StarRating rating={recordData.criticRating} fieldName="criticRating" />

          <Text style={styles.label}>Personal Rating</Text>
          {}
          <StarRating rating={recordData.personalRating} fieldName="personalRating" />

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

          {/* New Clear Form Button */}
          <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
            <Text style={styles.clearButtonText}>Clear Form</Text>
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
    backgroundColor: '#1E1E24', 
  },
  header: {
    backgroundColor: '#111115', 
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#B594FF', 
  },
  headerText: {
    color: '#B594FF', 
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
    color: '#E6E6FA', 
  },
  input: {
    backgroundColor: '#2D2D35', 
    borderWidth: 1,
    borderColor: '#4A4A5A', 
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    color: '#FFFFFF', 
  },
 
  starContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    marginTop: 5,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#B594FF', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#B594FF', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, 
  },
  buttonText: {
    color: '#111115', 
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  clearButton: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#4A4A5A', 
  },
  clearButtonText: {
    color: '#E6E6FA',
    fontSize: 16,
    fontWeight: 'bold',
  },
});