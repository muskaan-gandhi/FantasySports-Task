import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectMatch from './src/Components/select-matches';

export default function App() {
  return (
    <View style={styles.container}>
      <SelectMatch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
     marginTop:200,
    marginHorizontal:5
  },
});
