import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ログイン</Text>
            <Text>メールアドレスを入力してください</Text>
            <TextInput
                style={styles.textinput}
                placeholder='メールアドレス'
                placeholderTextColor='#ccc'
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Text>パスワードを入力してください

            </Text>
            <TextInput
                style={styles.textinput}
                placeholder='パスワード'
                placeholderTextColor='#ccc'
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
            />
            <Button
                title='ログインする'
                onPress={async () => {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email: email,
                        password: password,
                    });
                    if (error) {
                        Alert.alert('エラー', error.message);
                    } else {
                        router.replace('/(tabs)/kakeibo')
                    }
                }}
            />
            <Pressable onPress={() => router.push('/signup')}>
                <Text>アカウントをお持ちでない方はこちら</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 100,
        paddingHorizontal: 20
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 50
    },
    textinput: {
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
    }
})
