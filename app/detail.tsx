import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Detail() {
    const { name } = useLocalSearchParams();

    return (
        <View>
            <Text style={{ color: 'white', fontSize: 50 }}>{ name }の詳細</Text>
        </View>
    )
}
