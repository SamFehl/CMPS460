import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
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

const SAMPLE_RECORDS: RecordEntry[] = [
  { id: '1', recordName: 'Abbey Road', artistName: 'The Beatles', genre: 'Rock', releaseDate: '1969', criticRating: 10, personalRating: 10, purchaseLocation: 'London', purchasePrice: '$30.00', purchaseDate: '01/01/2023' },
  { id: '2', recordName: 'Dark Side of the Moon', artistName: 'Pink Floyd', genre: 'Prog Rock', releaseDate: '1973', criticRating: 10, personalRating: 9, purchaseLocation: 'Online', purchasePrice: '$35.00', purchaseDate: '02/15/2023' },
  { id: '3', recordName: 'Discovery', artistName: 'Daft Punk', genre: 'Electronic', releaseDate: '2001', criticRating: 9, personalRating: 10, purchaseLocation: 'Local Shop', purchasePrice: '$28.00', purchaseDate: '03/10/2023' },
  { id: '4', recordName: 'Rumours', artistName: 'Fleetwood Mac', genre: 'Rock', releaseDate: '1977', criticRating: 10, personalRating: 10, purchaseLocation: 'Gift', purchasePrice: '$0.00', purchaseDate: '05/12/2023' },
  { id: '5', recordName: 'Murmur', artistName: 'R.E.M.', genre: 'Alternative', releaseDate: '1983', criticRating: 10, personalRating: 9, purchaseLocation: 'Athens, GA', purchasePrice: '$22.00', purchaseDate: '04/12/2023' },
  { id: '6', recordName: 'Power, Corruption & Lies', artistName: 'New Order', genre: 'Alternative', releaseDate: '1983', criticRating: 10, personalRating: 10, purchaseLocation: 'Manchester', purchasePrice: '$25.00', purchaseDate: '05/01/2023' },
  { id: '7', recordName: 'Nevermind', artistName: 'Nirvana', genre: 'Grunge', releaseDate: '1991', criticRating: 9, personalRating: 9, purchaseLocation: 'Online', purchasePrice: '$25.00', purchaseDate: '08/11/2023' },
  { id: '8', recordName: 'Back to Black', artistName: 'Amy Winehouse', genre: 'Soul', releaseDate: '2006', criticRating: 9, personalRating: 10, purchaseLocation: 'London', purchasePrice: '$22.00', purchaseDate: '09/30/2023' },
  { id: '9', recordName: 'The Velvet Underground & Nico', artistName: 'The Velvet Underground', genre: 'Art Rock', releaseDate: '1967', criticRating: 10, personalRating: 7, purchaseLocation: 'Vintage Shop', purchasePrice: '$50.00', purchaseDate: '10/05/2023' },
  { id: '10', recordName: 'To Pimp a Butterfly', artistName: 'Kendrick Lamar', genre: 'Hip Hop', releaseDate: '2015', criticRating: 10, personalRating: 10, purchaseLocation: 'Online', purchasePrice: '$32.00', purchaseDate: '11/12/2023' },
  { id: '11', recordName: 'The Crossing', artistName: 'Big Country', genre: 'Alternative', releaseDate: '1983', criticRating: 9, personalRating: 8, purchaseLocation: 'Scotland', purchasePrice: '$18.00', purchaseDate: '01/20/2024' },
  { id: '12', recordName: 'The Miseducation of Lauryn Hill', artistName: 'Lauryn Hill', genre: 'R&B/Hip Hop', releaseDate: '1998', criticRating: 10, personalRating: 10, purchaseLocation: 'Online', purchasePrice: '$28.00', purchaseDate: '02/05/2024' },
  { id: '13', recordName: 'Kid A', artistName: 'Radiohead', genre: 'Experimental', releaseDate: '2000', criticRating: 10, personalRating: 9, purchaseLocation: 'Local Shop', purchasePrice: '$32.00', purchaseDate: '03/12/2024' },
  { id: '14', recordName: 'Random Access Memories', artistName: 'Daft Punk', genre: 'Electronic', releaseDate: '2013', criticRating: 9, personalRating: 10, purchaseLocation: 'Online', purchasePrice: '$38.00', purchaseDate: '04/01/2024' },
  { id: '15', recordName: 'Paranoid', artistName: 'Black Sabbath', genre: 'Heavy Metal', releaseDate: '1970', criticRating: 10, personalRating: 9, purchaseLocation: 'Flea Market', purchasePrice: '$18.00', purchaseDate: '05/10/2024' },
  { id: '16', recordName: 'Blue Rev', artistName: 'Alvvays', genre: 'Indie Rock', releaseDate: '2022', criticRating: 9, personalRating: 10, purchaseLocation: 'Online', purchasePrice: '$26.00', purchaseDate: '06/01/2024' },
  { id: '17', recordName: 'Madvillainy', artistName: 'Madvillain', genre: 'Hip Hop', releaseDate: '2004', criticRating: 10, personalRating: 10, purchaseLocation: 'Record Store Day', purchasePrice: '$45.00', purchaseDate: '06/15/2024' },
  { id: '18', recordName: 'The New Abnormal', artistName: 'The Strokes', genre: 'Indie Rock', releaseDate: '2020', criticRating: 8, personalRating: 9, purchaseLocation: 'Online', purchasePrice: '$30.00', purchaseDate: '06/20/2024' },
  { id: '19', recordName: 'Is This It', artistName: 'The Strokes', genre: 'Indie Rock', releaseDate: '2001', criticRating: 10, personalRating: 10, purchaseLocation: 'NYC', purchasePrice: '$25.00', purchaseDate: '11/25/2024' },
  { id: '20', recordName: 'The Mountain', artistName: 'Gorillaz', genre: 'Alternative', releaseDate: '2026', criticRating: 9, personalRating: 10, purchaseLocation: 'Digital Pre-order', purchasePrice: '$25.00', purchaseDate: '01/01/2026' },
];

const INITIAL_FORM = { recordName: '', artistName: '', genre: '', releaseDate: '', criticRating: 0, personalRating: 0, purchaseLocation: '', purchasePrice: '', purchaseDate: '' };

type SortOption = 'Newest' | 'Artist' | 'Album' | 'Rating';

export default function RecordTracker() {
  const [currentScreen, setCurrentScreen] = useState<'add' | 'list' | 'detail' | 'stats'>('list');
  const [records, setRecords] = useState<RecordEntry[]>(SAMPLE_RECORDS);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [selectedRecord, setSelectedRecord] = useState<RecordEntry | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedYearRecords, setSelectedYearRecords] = useState<{year: string, items: RecordEntry[]}>({year: '', items: []});
  const [sortType, setSortType] = useState<SortOption>('Newest');

  const saveRecord = () => {
    if (!formData.recordName || !formData.artistName) {
      Alert.alert("Missing Info", "Record name and artist are required.");
      return;
    }
    if (isEditing && selectedRecord) {
      const updatedRecords = records.map(r => r.id === selectedRecord.id ? { ...formData, id: selectedRecord.id } : r);
      setRecords(updatedRecords);
      setIsEditing(false);
    } else {
      setRecords([{ ...formData, id: Date.now().toString() }, ...records]);
    }
    setFormData(INITIAL_FORM);
    setCurrentScreen('list');
  };

  const deleteRecord = (id: string) => {
    Alert.alert("Delete", "Permanently remove this record?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => {
        setRecords(records.filter(r => r.id !== id));
        setCurrentScreen('list');
      }}
    ]);
  };

  const StarInput = ({ rating, label, field }: { rating: number, label: string, field: string }) => (
    <View style={{ marginTop: 15 }}>
      <Text style={styles.label}>{label} ({rating}/10)</Text>
      <View style={styles.starRow}>
        {[1,2,3,4,5,6,7,8,9,10].map(s => (
          <TouchableOpacity key={s} onPress={() => setFormData({...formData, [field]: s})}>
            <MaterialIcons name={s <= rating ? "star" : "star-border"} size={26} color="#B594FF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const genreCounts = records.reduce((acc: any, curr) => {
    const g = curr.genre || 'Unknown';
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const yearMap = records.reduce((acc: any, curr) => {
    const y = curr.releaseDate || 'Unknown';
    if (!acc[y]) acc[y] = [];
    acc[y].push(curr);
    return acc;
  }, {});

  const sortedYears = Object.keys(yearMap).sort();
  const maxCountInOneYear = records.length > 0 ? Math.max(...Object.values(yearMap).map((v: any) => v.length)) : 1;

  // SORT LOGIC
  const getSortedRecords = () => {
    const items = [...records];
    if (sortType === 'Artist') return items.sort((a, b) => a.artistName.localeCompare(b.artistName));
    if (sortType === 'Album') return items.sort((a, b) => a.recordName.localeCompare(b.recordName));
    if (sortType === 'Rating') return items.sort((a, b) => b.personalRating - a.personalRating);
    return items; // Default (Newest)
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {currentScreen === 'add' ? 'Manage Record' : currentScreen === 'list' ? 'Library' : currentScreen === 'stats' ? 'Collection Stats' : 'Details'}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          {currentScreen === 'add' && (
            <ScrollView style={styles.content} keyboardShouldPersistTaps="handled">
              <Text style={styles.label}>Record Title</Text>
              <TextInput style={styles.input} value={formData.recordName} onChangeText={(t) => setFormData({...formData, recordName: t})} placeholder="Album Name" placeholderTextColor="#666" />
              <Text style={styles.label}>Artist</Text>
              <TextInput style={styles.input} value={formData.artistName} onChangeText={(t) => setFormData({...formData, artistName: t})} placeholder="Artist Name" placeholderTextColor="#666" />
              
              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>Genre</Text>
                  <TextInput style={styles.input} value={formData.genre} onChangeText={(t) => setFormData({...formData, genre: t})} placeholder="Rock" placeholderTextColor="#666" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Release Year</Text>
                  <TextInput style={styles.input} value={formData.releaseDate} keyboardType="numeric" onChangeText={(t) => setFormData({...formData, releaseDate: t})} placeholder="19xx" placeholderTextColor="#666" />
                </View>
              </View>

              <Text style={styles.label}>Purchase Location</Text>
              <TextInput style={styles.input} value={formData.purchaseLocation} onChangeText={(text) => setFormData({...formData, purchaseLocation: text})} placeholder="Record Store, Online, etc." placeholderTextColor="#666" />

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={styles.label}>Purchase Price</Text>
                  <TextInput style={styles.input} value={formData.purchasePrice} onChangeText={(text) => setFormData({...formData, purchasePrice: text})} placeholder="$0.00" placeholderTextColor="#666" keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Purchase Date</Text>
                  <TextInput style={styles.input} value={formData.purchaseDate} onChangeText={(text) => setFormData({...formData, purchaseDate: text})} placeholder="MM/DD/YY" placeholderTextColor="#666" />
                </View>
              </View>

              <StarInput label="Personal Rating" rating={formData.personalRating} field="personalRating" />
              <StarInput label="Critic Rating" rating={formData.criticRating} field="criticRating" />

              <TouchableOpacity style={styles.primaryBtn} onPress={saveRecord}>
                <Text style={styles.btnText}>{isEditing ? "Update Entry" : "Save to Collection"}</Text>
              </TouchableOpacity>
              <View style={{height: 40}} />
            </ScrollView>
          )}

          {currentScreen === 'list' && (
            <View style={{ flex: 1 }}>
              {/* SORT MENU */}
              <View style={styles.sortContainer}>
                {(['Newest', 'Artist', 'Album', 'Rating'] as SortOption[]).map((type) => (
                  <TouchableOpacity 
                    key={type} 
                    style={[styles.sortBtn, sortType === type && styles.sortBtnActive]} 
                    onPress={() => setSortType(type)}
                  >
                    <Text style={[styles.sortText, sortType === type && styles.sortTextActive]}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <ScrollView style={styles.content}>
                {records.length === 0 ? (
                  <Text style={styles.emptyMsg}>Your collection is empty.</Text>
                ) : (
                  getSortedRecords().map((item) => (
                    <TouchableOpacity key={item.id} style={styles.card} onPress={() => { setSelectedRecord(item); setCurrentScreen('detail'); }}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cardTitle}>{item.recordName}</Text>
                        <Text style={styles.cardSubtitle}>{item.artistName}</Text>
                      </View>
                      <MaterialIcons name="chevron-right" size={24} color="#B594FF" />
                    </TouchableOpacity>
                  ))
                )}
                <View style={{height: 40}} />
              </ScrollView>
            </View>
          )}

          {currentScreen === 'detail' && selectedRecord && (
            <ScrollView style={styles.content}>
               <TouchableOpacity style={styles.backBtn} onPress={() => setCurrentScreen('list')}><MaterialIcons name="arrow-back" size={20} color="#B594FF" /><Text style={styles.backText}>Back</Text></TouchableOpacity>
               <Text style={styles.detailTitle}>{selectedRecord.recordName}</Text>
               <Text style={styles.detailArtist}>{selectedRecord.artistName}</Text>
               <View style={styles.detailBox}>
                <Text style={styles.detailText}><Text style={styles.boldLabel}>Genre:</Text> {selectedRecord.genre}</Text>
                <Text style={styles.detailText}><Text style={styles.boldLabel}>Year:</Text> {selectedRecord.releaseDate}</Text>
                
                <View style={styles.divider} />
                
                <Text style={styles.detailText}><Text style={styles.boldLabel}>Personal Rating:</Text> {selectedRecord.personalRating}/10</Text>
                <Text style={styles.detailText}><Text style={styles.boldLabel}>Critic Rating:</Text> {selectedRecord.criticRating}/10</Text>
                
                <View style={styles.divider} />
                
                <Text style={styles.detailText}><Text style={styles.boldLabel}>Purchase Location:</Text> {selectedRecord.purchaseLocation || 'N/A'}</Text>
                <Text style={styles.detailText}><Text style={styles.boldLabel}>Purchase Price:</Text> {selectedRecord.purchasePrice || 'N/A'}</Text>
                <Text style={styles.detailText}><Text style={styles.boldLabel}>Purchase Date:</Text> {selectedRecord.purchaseDate || 'N/A'}</Text>

                <View style={styles.divider} />
                <View style={styles.actionRow}>
                  <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#4A4A5A'}]} onPress={() => { setFormData(selectedRecord); setIsEditing(true); setCurrentScreen('add'); }}><Text style={styles.btnTextSmall}>Edit</Text></TouchableOpacity>
                  <TouchableOpacity style={[styles.actionBtn, {backgroundColor: '#FF4444'}]} onPress={() => deleteRecord(selectedRecord.id)}><Text style={styles.btnTextSmall}>Delete</Text></TouchableOpacity>
                </View>
               </View>
            </ScrollView>
          )}

          {currentScreen === 'stats' && (
            <ScrollView style={styles.content}>
              <Text style={styles.sectionHeader}>Genre Breakdown</Text>
              {Object.keys(genreCounts).map(g => (
                <View key={g} style={styles.statLine}><Text style={styles.statLabel}>{g}</Text><Text style={styles.statVal}>{genreCounts[g]}</Text></View>
              ))}

              <Text style={[styles.sectionHeader, {marginTop: 30}]}>Release Timeline</Text>
              <Text style={styles.subHint}>Tap a bar to see albums from that year</Text>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartArea}>
                <View style={styles.chartBottom}>
                  {sortedYears.map(year => {
                    const barHeight = (yearMap[year].length / maxCountInOneYear) * 120;
                    return (
                      <TouchableOpacity key={year} style={styles.barItem} onPress={() => { setSelectedYearRecords({ year, items: yearMap[year] }); setModalVisible(true); }}>
                        <View style={[styles.barShape, { height: Math.max(barHeight, 15) }]} />
                        <Text style={styles.barYearText}>{year}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
              <View style={{height: 50}} />
            </ScrollView>
          )}
        </View>

        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalBox}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{selectedYearRecords.year} Records</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}><MaterialIcons name="close" size={24} color="#FFF" /></TouchableOpacity>
              </View>
              <FlatList data={selectedYearRecords.items} keyExtractor={item => item.id} renderItem={({ item }) => (
                <View style={styles.listItem}><Text style={styles.listMain}>{item.recordName}</Text><Text style={styles.listSub}>{item.artistName}</Text></View>
              )} />
            </View>
          </View>
        </Modal>

        <View style={styles.nav}>
          <TouchableOpacity style={styles.navBtn} onPress={() => {setIsEditing(false); setFormData(INITIAL_FORM); setCurrentScreen('add');}}>
            <MaterialIcons name="add-box" size={24} color={currentScreen === 'add' ? '#B594FF' : '#555'} /><Text style={[styles.navText, currentScreen === 'add' && {color: '#B594FF'}]}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => setCurrentScreen('list')}>
            <MaterialIcons name="library-music" size={24} color={currentScreen === 'list' ? '#B594FF' : '#555'} /><Text style={[styles.navText, currentScreen === 'list' && {color: '#B594FF'}]}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBtn} onPress={() => setCurrentScreen('stats')}>
            <MaterialIcons name="bar-chart" size={24} color={currentScreen === 'stats' ? '#B594FF' : '#555'} /><Text style={[styles.navText, currentScreen === 'stats' && {color: '#B594FF'}]}>Timeline</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E1E24' },
  header: { padding: 15, backgroundColor: '#111115', borderBottomWidth: 1, borderBottomColor: '#B594FF33', alignItems: 'center' },
  headerText: { color: '#B594FF', fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20 },
  label: { color: '#E6E6FA', fontSize: 13, fontWeight: 'bold', marginBottom: 5 },
  input: { backgroundColor: '#2D2D35', borderRadius: 8, padding: 12, color: '#FFF', borderWidth: 1, borderColor: '#4A4A5A', marginBottom: 15 },
  row: { flexDirection: 'row' },
  starRow: { flexDirection: 'row' },
  primaryBtn: { backgroundColor: '#B594FF', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#111115', fontWeight: 'bold' },
  card: { backgroundColor: '#2D2D35', padding: 15, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderLeftWidth: 3, borderLeftColor: '#B594FF' },
  cardTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  cardSubtitle: { color: '#AAA', fontSize: 13 },
  emptyMsg: { color: '#555', textAlign: 'center', marginTop: 40 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backText: { color: '#B594FF', marginLeft: 5, fontWeight: 'bold' },
  detailTitle: { color: '#FFF', fontSize: 24, fontWeight: 'bold' },
  detailArtist: { color: '#B594FF', fontSize: 18, marginBottom: 20 },
  detailBox: { backgroundColor: '#2D2D35', padding: 20, borderRadius: 12 },
  detailText: { color: '#FFF', fontSize: 16, marginBottom: 10 },
  boldLabel: { color: '#B594FF', fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#4A4A5A', marginVertical: 15 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  actionBtn: { padding: 10, borderRadius: 8, width: '48%', alignItems: 'center' },
  btnTextSmall: { color: '#FFF', fontWeight: 'bold' },
  sectionHeader: { color: '#B594FF', fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  statLine: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#333' },
  statLabel: { color: '#FFF' },
  statVal: { color: '#B594FF', fontWeight: 'bold' },
  chartArea: { marginTop: 10, backgroundColor: '#111115', padding: 15, borderRadius: 12 },
  chartBottom: { flexDirection: 'row', alignItems: 'flex-end', height: 160 },
  barItem: { alignItems: 'center', marginHorizontal: 8, width: 35 },
  barShape: { width: 18, backgroundColor: '#B594FF', borderRadius: 4 },
  barYearText: { color: '#AAA', fontSize: 9, marginTop: 8, transform: [{ rotate: '-45deg' }] },
  subHint: { color: '#666', fontSize: 12, marginBottom: 10 },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 20 },
  modalBox: { backgroundColor: '#2D2D35', borderRadius: 15, padding: 20, maxHeight: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#4A4A5A', paddingBottom: 10 },
  modalTitle: { color: '#B594FF', fontSize: 18, fontWeight: 'bold' },
  listItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333' },
  listMain: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  listSub: { color: '#AAA', fontSize: 14 },
  nav: { flexDirection: 'row', height: 70, backgroundColor: '#111115', borderTopWidth: 1, borderTopColor: '#333', justifyContent: 'space-around', alignItems: 'center' },
  navBtn: { alignItems: 'center' },
  navText: { color: '#555', fontSize: 10, marginTop: 4 },
  // ADDED STYLES
  sortContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#111115', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#333' },
  sortBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#2D2D35' },
  sortBtnActive: { backgroundColor: '#B594FF' },
  sortText: { color: '#AAA', fontSize: 12, fontWeight: 'bold' },
  sortTextActive: { color: '#111115' }
});