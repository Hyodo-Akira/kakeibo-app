import CategorySelect from '@/components/practice/CategorySelect';
import KakeiboScreen from "@/components/practice/kakeiboScreen";
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default function Kakeibo() {
    const [category, setCategory] = useState('食費');

    return (
        <ScrollView
            style={styls.container}
            automaticallyAdjustKeyboardInsets={true}
            keyboardShouldPersistTaps='handled'
        >
            <KakeiboScreen category={category} />
            <CategorySelect category={category} setCategory={setCategory} />
        </ScrollView>
    )
}

const styls = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white' 
    }
})