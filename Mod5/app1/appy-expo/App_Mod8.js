import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <View 
                style={{
                    backgroundColor: 'blue',
                    margin: 10,
                    padding: 10,
                }}>
                    <Text 
                    style={{
                        color: 'red', 
                        fontFamily: 'Arial', 
                        fontSize: 50,
                        fontStyle: 'italic',
                        fontWeight: 'bold',
                        letterSpacing: 10,
                        lineHeight: 50,
                        textAlign: 'auto'
                    }}>Hello Yinzers</Text>
                </View>
                <View style={{backgroundColor: 'blue'}}>
                    <Text>Welcome back Yinzers</Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default App;