import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FloatingLogo from '../../components/FloatingLogo';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../contexts/authContext/AuthContext';

const Login: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const { login } = useAuth();
    const [loginInput, setLoginInput] = useState<string>('');
    const [senha, setSenha] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const fillAnimation = useState(new Animated.Value(0))[0];

    const handleLogin = async () => {
        console.log('Tentando fazer login...');
        setLoading(true);
        Animated.timing(fillAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
        }).start(async () => {
            try {
                await login(loginInput, senha);
                Toast.show({
                    text1: 'Login realizado com sucesso',
                    text2: 'Usuário logado com sucesso',
                    position: 'top',
                    type: 'success',
                    visibilityTime: 3000,
                    autoHide: true,
                });
                navigation.navigate('Home');
            } catch (error: any) {
                console.error('Erro ao autenticar:', error); 
                const errorMessage = error.message || 'Erro desconhecido';
                Toast.show({
                    text1: 'Erro ao autenticar',
                    text2: errorMessage,
                    position: 'top',
                    type: 'error',
                    visibilityTime: 3000,
                    autoHide: true,
                });
            } finally {
                setLoading(false);
                fillAnimation.setValue(0);
            }
        });
    };

    const animatedStyle = {
        width: fillAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        }),
        backgroundColor: '#a3e200',
        position: 'absolute' as const,
        top: 0,
        left: 0,
        height: '100%' as const,
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <FloatingLogo source={require('../../assets/logo-light.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.textContainer}>Usuário</Text>
                <TextInput
                    value={loginInput}
                    onChangeText={setLoginInput}
                    style={styles.input}
                    placeholder='Insira seu Usuário'
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.textContainer}>Senha</Text>
                <TextInput
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    style={styles.input}
                    placeholder='Insira sua senha'
                />
            </View>
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#a3e200' }]}
                onPress={handleLogin}
                disabled={loading} 
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Carregando...' : 'Login'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Register', { sponsorLogin: loginInput })} style={styles.registerContainer}>
                <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
            
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    logo: {
        width: 330, 
        height: 150, 
        marginTop: -100,
        marginBottom: 50
    },
    title: {
        fontSize: 20,
        
        marginBottom: 20,
        paddingBottom: 10
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    button: {
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: '100%',
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    textContainer: {
        fontSize: 16,
        paddingLeft: 3,
        paddingBottom: 10
    },
    registerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 16,
        color: '#a3e200',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        marginTop: 40
    },
    loginWebContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    loginWebText: {
        fontSize: 16,
        color: '#a3e200',
        textDecorationLine: 'underline',
        paddingTop: 20,
        fontWeight: 'bold',
    },
});

export default Login;