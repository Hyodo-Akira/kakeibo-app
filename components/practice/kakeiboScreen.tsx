import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

export default function KakeiboScreen() {
    const [inputText, setInputText] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [inputItems, setInputItems] = useState<{ id: string; name: String; amount: number }[]>([]);
    useEffect(() => {
        const load = async () => {
            const value = await AsyncStorage.getItem('item');
            if (value !== null) {
                setInputItems(JSON.parse(value) ?? []);
            }
        }
        load();
    },[]);

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
                onPress={async() => {
                    if (inputText === '' || inputNumber === '') return;
                    setInputText('');
                    setInputNumber('');
                    const newItems = [...inputItems, { id: Date.now().toString(), name: inputText, amount: Number(inputNumber) }];
                    setInputItems(newItems);
                    await AsyncStorage.setItem('item', JSON.stringify(newItems))
                }}
            />
        </View>
    )
}

