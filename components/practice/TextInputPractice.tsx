import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function TextInputPractice() {
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>テキストを入力してください</Text>

      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        placeholder="ここに入力..."
        keyboardType='numeric'
      />


      {inputText !== '' && (
        <Text style={styles.result}>入力された文字: {inputText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
  },
});
