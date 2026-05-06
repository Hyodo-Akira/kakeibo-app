import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import CategoryTotal from './CategoryTotal';
import PieChartPractice from './PieChartPractice';

type Props = {
    category: string;
}

export default function KakeiboScreen({ category }: Props) {
    const [inputText, setInputText] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [inputItems, setInputItems] = useState<{ id: string; name: String; amount: number; category: string; date: string; }[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const load = async () => {
            const { data } = await supabase.from('expenses').select('*');
            if (data !== null) {
                setInputItems(data ?? []);
            }
        }
        load();
    },[]);
    const d = new Date();
    const [currentMonth, setCurrentMonth] = useState(
        ( String(d.getFullYear()) + "-" + String(d.getMonth()+1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0') ).slice(0, 7)
    );
    const filteredItems = inputItems.filter((item) => item.date?.slice(0, 7) === currentMonth );
    const total = filteredItems.reduce((sum, item) => sum + item.amount, 0);
    const goPrevMonth = () => {
        const [year, month] = currentMonth.split("-");
        if (Number(month) - 1 === 0) {
            setCurrentMonth(`${Number(year)-1}-12`);
        } else {
            setCurrentMonth(`${year}-${String(Number(month) - 1).padStart(2, '0')}`);
        }
    }
    const goNextMonth = () => {
        const [year, month] = currentMonth.split("-");
        if (Number(month) + 1 === 13) {
            setCurrentMonth(`${Number(year)+1}-01`);
        } else {
            setCurrentMonth(`${year}-${String(Number(month) + 1).padStart(2, '0')}`);
        }
    }
    const [year, month] = currentMonth.split("-");

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>家計簿</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',marginBottom: 10 }}>
                    <TouchableOpacity onPress={goPrevMonth}>
                        <Text>＜　　</Text>
                    </TouchableOpacity>
                    <Text>{year}年{month}月</Text>
                    <TouchableOpacity onPress={goNextMonth}>
                        <Text>　　＞</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ flex: 1 }}
                    data={filteredItems}
                    renderItem={({ item }) =>
                        <View style={styles.card}>
                            <Text style={styles.listName}>{Number(item.date?.split("-")[1])}/{Number(item.date?.split("-")[2])}【{item.category}】{item.name}: {item.amount}円</Text>
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
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <View style={styles.inputRow}>
                    <TextInput
                        placeholder='品名'
                        placeholderTextColor='#999'
                        style={styles.input}
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                    />
                    <TextInput
                        placeholder='金額'
                        placeholderTextColor='#999'
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
                        if (Number(inputNumber) <= 0) {
                            setErrorMessage('金額は１円以上を入力してください');
                            return;
                        } else {
                            setErrorMessage('')
                        }
                        setInputText('');
                        setInputNumber('');
                        const d = new Date;
                        const newItems = [...inputItems, {
                            id: Date.now().toString(),
                            name: inputText,
                            amount: Number(inputNumber),
                            category: category,
                            date: String(d.getFullYear()) + "-" + String(d.getMonth()+1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0'),
                        }];
                        setInputItems(newItems);
                        await AsyncStorage.setItem('item', JSON.stringify(newItems))
                        await supabase.from('expenses').insert({
                            name: inputText,
                            amount: Number(inputNumber),
                            category: category,
                            date: String(d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2, '0'))
                        });
                    }}
                />
                <CategoryTotal inputItems={inputItems} />
                <PieChartPractice filteredItems={filteredItems} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    errorMessage: {
        color: 'red'
    }
    
})

