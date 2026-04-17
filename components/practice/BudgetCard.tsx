import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type Props = {
    category: string;
    limit: number;
}

export default function BudgetCard({ category, limit }: Props) {
    const [expenses, setExpenses] = useState(0);

    return (
        <View style={styles.categorylist}>
            <Text style={styles.categoryname}>{category}</Text>
            <Text style={styles.categoryname}>予算：{limit}円</Text>
            <Text style={expenses > limit ? styles.over : styles.noover }>
                現在の支出：{expenses}円
            </Text>
            <View>
                <Button title="[+500円]" onPress={() => setExpenses(expenses + 500)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    categorylist: {
        borderWidth: 1,
        borderColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    categoryname: {
        fontSize: 50,
        textAlign: 'center',
        color: 'white',
    },
    over: {
        fontSize: 60,
        color: 'red',
        textAlign: 'center',
    },
    noover: {
        fontSize: 50,
        textAlign: 'center',
        color: 'white',
    }
})

