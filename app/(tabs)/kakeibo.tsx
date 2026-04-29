import CategorySelect from '@/components/practice/CategorySelect';
import KakeiboScreen from "@/components/practice/kakeiboScreen";
import { useState } from 'react';
import { View } from 'react-native';

export default function Kakeibo() {
    const [category, setCategory] = useState('食費');

    return (
        <View>
            <KakeiboScreen category={category} />
            <CategorySelect category={category} setCategory={setCategory} />
        </View>
    )
}