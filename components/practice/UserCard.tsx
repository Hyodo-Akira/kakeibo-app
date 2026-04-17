import { Text, View } from 'react-native';

export default function UserCard({ name, age }: { name: string, age: number }) {
    return (
        <View>
            <Text>{name}</Text>
            <Text>{age}</Text>
        </View>
    );
}
