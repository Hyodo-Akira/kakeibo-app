import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type Props = {
    title: string;
};

export default function YenButton({ title }: Props) {
    const [expenses, setExpenses] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.amount}>今月の支出：{expenses}円</Text>
            <View style={styles.buttons}>
                <Button title="[+100円]" onPress={() => setExpenses(expenses + 100)} />
                <Button title="[-100円]" onPress={() => setExpenses(expenses - 100)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 16,
        margin: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    amount: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
