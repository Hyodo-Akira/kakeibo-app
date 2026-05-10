import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Settings () {
    const [ hour, setHour ] = useState('');
    const [ minute, setMinute ] = useState('');

    return (
        <View style={styles.container}>
            <Text>各種設定画面</Text>
            <Text>リマインド設定</Text>
            <Text>現在の設定{hour}:{minute}</Text>
            <TextInput 
                placeholder='時'
                placeholderTextColor={'gray'}
                value={hour}
                onChangeText={(text) => setHour(text)}
                keyboardType='numeric'
            />
            <TextInput
                placeholder='分'
                placeholderTextColor={'gray'}
                value={minute}
                onChangeText={(text) => setMinute(text)}
                keyboardType='numeric'
            />
            <Button
                title='設定する'
                onPress={async () => {
                    try {
                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "家計簿APP",
                                body: "家計簿アプリの記入をお忘れではないですか？"
                            },
                            trigger: {
                                type: Notifications.SchedulableTriggerInputTypes.DAILY,
                                hour: Number(hour),
                                minute: Number(minute),
                            },
                        });
                        Alert.alert('設定完了',`毎日${hour}時${minute}分に通知します`);
                    } catch (e) {
                        Alert.alert('エラー', String(e));
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
        marginTop: 100
    }
})
