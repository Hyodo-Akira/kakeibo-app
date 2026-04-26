import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function SumApp() {
    const [inputText, setInputText] = useState('');
    const [total, setTotal] = useState(0);

    return (
        <View>
            <TextInput
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                keyboardType='numeric'
            />
            <Button
                title='追加'
                onPress={() => {
                    if (inputText === '') return;
                    setTotal(total + Number(inputText))
                    setInputText('')
                }}
            />
            <Text>合計：{total}</Text>
        </View>
    )
}