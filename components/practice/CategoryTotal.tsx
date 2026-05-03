import { Text, View } from 'react-native';

type Props = {
    inputItems: { id: string; name: string; amount: number; category: string; }[];
}

export default function CategoryTotal( { inputItems }: Props ) {
    // ここにカテゴリ別合計を計算するコードを書く
    const accTotal = inputItems.reduce((acc, item) => {
        if (acc[item.category]) {
            // 足し算
            acc[item.category] = acc[item.category] + item.amount;
        } else {
            // 新規セット
            acc[item.category] = item.amount;
        }
        return acc;
    }, {} as { [key: string]: number });

    return (
        <View>
            <Text>カテゴリ別合計</Text>
            {Object.entries(accTotal).map(([category, total]) => (
                <Text key={category}>{category}：{total}円</Text>
            ))} 
        </View>
    );
}
