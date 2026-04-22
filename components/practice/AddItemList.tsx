import { useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";

export default function AdditemList() {
    const [items, setItems] = useState([]);
    const [inputText, setInputText] = useState('')
    return (
        <View>
            <FlatList
                data={items}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={(item) => item.id}
            />
        
            <Text>テキストを入力してください</Text>
    
            <TextInput
                value={inputText}
                onChangeText={(text) => setInputText(text)}
                placeholder="ここに入力..."
            />

            <Button
                title='項目を追加'
                onPress={() => {
                    setItems([...items, { id:Date.now().toString(), name: inputText }]);
                    setInputText('');
                }}
            />
        </View>
    )
}




