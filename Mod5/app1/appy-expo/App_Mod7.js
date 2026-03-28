import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    borderWidth: 1, 
                    borderTopWidth: 5, 
                    borderBottomWidth: 10, 
                    borderLeftWidth: 3, 
                    borderRightWidth: 20, 
                    borderColor: 'blue'
                }}>
                    <Text>Hello Yinzers</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;