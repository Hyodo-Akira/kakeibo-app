import { router } from 'expo-router';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function List() {
    const items = [
        { id: '1', name: '食費' },
        { id: '2', name: '交際費' },
        { id: '3', name: '娯楽費' },
    ];

    return (
        <View style={{ paddingTop: 100 }}>
            <Text style={{ color: 'white'}}>リスト画面</Text>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/detail?name=${item.name}`)}>
                        <Text style={{ color: 'white', fontSize: 50}}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}