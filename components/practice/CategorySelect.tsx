import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    category: string;
    setCategory: (value: string) => void;
}

export default function CategorySelect({ category, setCategory }: Props) {
    const categories = ['食費','交際費','娯楽費','日用品'];

    return (
        <View>
            {categories.map((item) => (
                <TouchableOpacity key={item} onPress={() => setCategory(item)} style={category === item ? styles.selected : styles.button}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create ({
    button: {
        backgroundColor: '#ddd',
        padding: 8,
        borderRadius: 8,
        marginRight: 8
    },
    selected: {
        backgroundColor: '#4a90e2',
        padding: 8,
        borderRadius: 8,
        marginRight: 8
    }
})
