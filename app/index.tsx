import { FlatList, StyleSheet, Text, View } from "react-native";

export default function App() {
    const items = [
        { id: '1', name: '食費', amount: 500 },
        { id: '2', name: '交際費', amount: 200 },
        { id: '3', name: '娯楽費', amount: 1000 },
    ];
    return (
        <View style={Styles.container}>
            <Text style={Styles.title}>家計簿</Text>
            <FlatList
                data={items}
                renderItem={({ item }) => <Text style={Styles.items}>{item.name}:{item.amount}円</Text>}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 16
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    items: {
        padding: 10
    }
})
