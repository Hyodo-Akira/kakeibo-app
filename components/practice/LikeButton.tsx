import { useState } from 'react';
import { Button, Text, View } from 'react-native';

type Props = {
    title: string;
};

export default function LikeButton({ title }: Props) {
    const [likes, setLikes] = useState(0);

    return (
        <View>
            <Text>{title}</Text>
            <Text>いいね：{likes}</Text>
            <Button title="いいね！" onPress={() => setLikes(likes + 1)} />
        </View>
    )
}
