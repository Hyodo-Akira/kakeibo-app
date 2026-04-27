import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export default function StoragePractice() {
    const [text, setText] = useState('');
    const [savedText, setSavedText] = useState('');
    useEffect(() => {
        const load = async () => {
            const value = await AsyncStorage.getItem('saved-text');
            setSavedText(value);
        };
        load();
    },[]);

    return (
        <View>
            <Text>{savedText}</Text>
            <TextInput
                value={text}
                onChangeText={(text) => setText(text)}
            />
            <Button
                title='保存'
                onPress={async() => {
                    await AsyncStorage.setItem('saved-text', text)
                }}
            />
        </View>
    );
}