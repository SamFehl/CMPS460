import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

interface RecordEntry {
  id: string;
  recordName: string;
  artistName: string;
  genre: string;
  releaseDate: string;
  criticRating: number;
  personalRating: number;
  purchaseLocation: string;
  purchasePrice: string;
  purchaseDate: string;
}

const INITIAL_FORM = {
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
  const [currentScreen, setCurrentScreen] = useState<'add' | 'list' | 'detail'>('add');
  const [records, setRecords] = useState<RecordEntry[]>([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [selectedRecord, setSelectedRecord] = useState<RecordEntry | null>(null);

  const saveRecord = () => {
    if (!formData.recordName || !formData.artistName) {
      Alert.alert("Required Fields", "Please enter a Record Title and Artist.");
      return;
    }
    const newEntry: RecordEntry = { ...formData, id: Date.now().toString() };
    setRecords([newEntry, ...records]);
    setFormData(INITIAL_FORM);
    setCurrentScreen('list');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {currentScreen === 'add' ? 'New Entry' : currentScreen === 'list' ? 'Collection' : 'Details'}
          </Text>
        </View>

        {/* MAIN CONTENT AREA */}
        <View style={{ flex: 1 }}>
          
          {/* SCREEN: ADD RECORD */}
          {currentScreen === 'add' && (
            <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
              <Text style={styles.label}>Record Title</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Rumours" 
                placeholderTextColor="#666"
                value={formData.recordName}
                onChangeText={(text) => setFormData({...formData, recordName: text})}
              />

              <Text style={styles.label}>Artist</Text>
              <TextInput 
                style={styles.input} 
                placeholder="e.g. Fleetwood Mac" 
                placeholderTextColor="#666"
                value={formData.artistName}
                onChangeText={(text) => setFormData({...formData, artistName: text})}
              />

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>Genre</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Rock" 
                    placeholderTextColor="#666"
                    value={formData.genre}
                    onChangeText={(text) => setFormData({...formData, genre: text})}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Year</Text>
                  <TextInput 
                    style={styles.input} 
                    placeholder="1977" 
                    keyboardType="numeric"
                    placeholderTextColor="#666"
                    value={formData.releaseDate}
                    onChangeText={(text) => setFormData({...formData, releaseDate: text})}
                  />
                </View>
              </View>

              <Text style={styles.label}>Personal Rating ({formData.personalRating}/10)</Text>
              <View style={styles.starRow}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setFormData({...formData, personalRating: star})}>
                    <MaterialIcons name={star <= formData.personalRating ? "star" : "star-border"} size={26} color="#B594FF" />
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={saveRecord}>
                <Text style={styles.buttonText}>Save Record</Text>
              </TouchableOpacity>
              <View style={{ height: 50 }} />
            </ScrollView>
          )}

          {/* SCREEN: LIST VIEW */}
          {currentScreen === 'list' && (
            <ScrollView style={styles.content}>
              {records.length === 0 ? (
                <Text style={styles.emptyText}>No records added yet.</Text>
              ) : (
                records.map((item) => (
                  <TouchableOpacity 
                    key={item.id} 
                    style={styles.card} 
                    onPress={() => { setSelectedRecord(item); setCurrentScreen('detail'); }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>{item.recordName}</Text>
                      <Text style={styles.cardSubtitle}>{item.artistName}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#B594FF" />
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          )}

          {/* SCREEN: DETAIL VIEW */}
          {currentScreen === 'detail' && selectedRecord && (
            <ScrollView style={styles.content}>
              <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('list')}>
                <MaterialIcons name="arrow-back" size={20} color="#B594FF" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.detailTitle}>{selectedRecord.recordName}</Text>
              <Text style={styles.detailArtist}>{selectedRecord.artistName}</Text>
              <View style={styles.detailBox}>
                <Text style={styles.detailInfo}>Genre: {selectedRecord.genre || 'N/A'}</Text>
                <Text style={styles.detailInfo}>Year: {selectedRecord.releaseDate || 'N/A'}</Text>
                <Text style={styles.detailInfo}>Rating: {selectedRecord.personalRating}/10</Text>
              </View>
            </ScrollView>
          )}
        </View>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.nav}>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('add')}>
            <MaterialIcons name="add-box" size={28} color={currentScreen === 'add' ? '#B594FF' : '#555'} />
            <Text style={[styles.navLabel, currentScreen === 'add' && { color: '#B594FF' }]}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => setCurrentScreen('list')}>
            <MaterialIcons name="library-music" size={28} color={currentScreen === 'list' ? '#B594FF' : '#555'} />
            <Text style={[styles.navLabel, currentScreen === 'list' && { color: '#B594FF' }]}>Collection</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E24' },
  header: { padding: 20, backgroundColor: '#111115', borderBottomWidth: 1, borderBottomColor: '#B594FF33', alignItems: 'center' },
  headerText: { color: '#B594FF', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 20 },
  label: { color: '#E6E6FA', fontSize: 14, fontWeight: 'bold', marginBottom: 5, marginTop: 15 },
  input: { backgroundColor: '#2D2D35', borderRadius: 8, padding: 12, color: '#FFF', borderWidth: 1, borderColor: '#4A4A5A' },
  row: { flexDirection: 'row' },
  starRow: { flexDirection: 'row', marginTop: 5 },
  primaryButton: { backgroundColor: '#B594FF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  buttonText: { color: '#111115', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#2D2D35', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center' },
  cardTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  cardSubtitle: { color: '#AAA' },
  emptyText: { color: '#555', textAlign: 'center', marginTop: 50 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { color: '#B594FF', marginLeft: 5, fontWeight: 'bold' },
  detailTitle: { color: '#FFF', fontSize: 28, fontWeight: 'bold' },
  detailArtist: { color: '#B594FF', fontSize: 20, marginBottom: 20 },
  detailBox: { backgroundColor: '#2D2D35', padding: 20, borderRadius: 10 },
  detailInfo: { color: '#FFF', fontSize: 16, marginBottom: 10 },
  nav: { flexDirection: 'row', height: 70, backgroundColor: '#111115', borderTopWidth: 1, borderTopColor: '#333', justifyContent: 'space-around', alignItems: 'center' },
  navItem: { alignItems: 'center' },
  navLabel: { color: '#555', fontSize: 12, marginTop: 2 }
});