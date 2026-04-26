import { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

export default function KakeiboScreen() {
    const [inputText, setInputText] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [inputItems, setInputItems] = useState<{ id: string; name: String; amount: number }[]>([]);

    return (
        <View>
            <FlatList
                data={inputItems}
                renderItem={({ item }) => <Text>{item.name}: {item.amount}円</Text>}
                keyExtractor={(item) => item.id}
            />
            <TextInput
                value={inputText}
                onChangeText={(text) => setInputText(text)}
            />
            <TextInput
                value={inputNumber}
                onChangeText={(text) => setInputNumber(text)}
                keyboardType='numeric'
            />
            <Button
                title='追加'
                onPress={() => {
                    if (inputText === '' || inputNumber === '') return;
                    setInputItems([...inputItems, { id: Date.now().toString(), name: inputText, amount: Number(inputNumber) }]);
                    setInputText('');
                    setInputNumber('');
                }}
            />
        </View>
    )
}

