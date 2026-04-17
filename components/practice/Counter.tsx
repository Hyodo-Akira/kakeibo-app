import { useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <View>
            <Text>カウント：{count}</Text>
            <Button title="増やす" onPress={() => setCount(count + 1)} />
            <Button title="減らす" onPress={() => setCount(count - 1)} />
        </View>
    );
}
