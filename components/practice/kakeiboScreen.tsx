import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

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
    const total = inputItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>家計簿</Text>
            <Text>合計：{total}円</Text>
            <FlatList
                data={inputItems}
                renderItem={({ item }) =>
                    <View style={styles.card}>
                        <Text>{item.name}: {item.amount}円</Text>
                        <Button
                            title='削除'
                            onPress={async() => {
                                const newItems = inputItems.filter((i) => i.id !== item.id );
                                setInputItems(newItems);
                                await AsyncStorage.setItem('item', JSON.stringify(newItems))
                            }}
                        />
                    </View>}
                keyExtractor={(item) => item.id}
            />
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={(text) => setInputText(text)}
                />
                <TextInput
                    style={styles.input}
                    value={inputNumber}
                    onChangeText={(text) => setInputNumber(text)}
                    keyboardType='numeric'
                />
            </View>
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

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputRow: {
        flexDirection: 'row'
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        padding: 8,
        marginRight: 8
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2
    }
})

