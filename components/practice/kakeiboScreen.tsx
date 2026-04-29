import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Props = {
    category: string;
}

export default function KakeiboScreen({ category }: Props) {
    const [inputText, setInputText] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [inputItems, setInputItems] = useState<{ id: string; name: String; amount: number; category: string; }[]>([]);
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
            <FlatList
                data={inputItems}
                renderItem={({ item }) =>
                    <View style={styles.card}>
                        <Text style={styles.listName}>【{item.category}】{item.name}: {item.amount}円</Text>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={async() => {
                                const newItems = inputItems.filter((i) => i.id !== item.id );
                                setInputItems(newItems);
                                await AsyncStorage.setItem('item', JSON.stringify(newItems))
                            }}>
                        <Text>削除</Text>
                        </TouchableOpacity>
                            
                    </View>}
                keyExtractor={(item) => item.id}
            />
            <Text style={styles.total}>合計：{total}円</Text>
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
                    const newItems = [...inputItems, { id: Date.now().toString(), name: inputText, amount: Number(inputNumber), category: category }];
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
        backgroundColor: '#f5f5f5',
        marginTop: 100
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center'
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
        shadowRadius: 2,
        flexDirection: 'row'
    },
    listName: {
        fontSize: 20,
        flex: 3,
        margin: 'auto'
    },
    deleteButton: {
        flex: 1
    },
    total: {
        textAlign: 'right',
        margin: 20,
        fontWeight: 'bold',
        fontSize: 30
    }
})

