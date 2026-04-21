import { FlatList, Text } from "react-native";

export default function App() {
    const items = [
        { id: '1', name: '食費', amount: 500 },
        { id: '2', name: '交際費', amount: 200 },
        { id: '3', name: '娯楽費', amount: 1000 },
    ];
    return (
        <FlatList
            data={items}
            renderItem={({ item }) => <Text>{item.name}:{item.amount}円</Text>}
            keyExtractor={(item) => item.id}
        />
    )
}
