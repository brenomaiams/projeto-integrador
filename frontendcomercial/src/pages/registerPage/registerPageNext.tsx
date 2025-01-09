import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Animated, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FloatingLogo from '../../components/FloatingLogo';
import CountrySelector from '../../components/CountrySelector';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RegisterParams = {
    loginPatrocinador: string;
    loginDesejado: string;
    senha: string;
    repetirSenha: string;
    nomeCompleto: string;
    email: string;
    dataNascimento: string;
  };

const SecondRegisterPage: React.FC = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();
    const route = useRoute();
    const { loginPatrocinador, loginDesejado, senha, repetirSenha, nomeCompleto, email, dataNascimento } = route.params as RegisterParams
    
    const [endereco, setEndereco] = useState<string>('');
    const [numero, setNumero] = useState<string>('');
    const [bairro, setBairro] = useState<string>('');
    const [pais, setPais] = useState<string>('');
    const [cep, setCep] = useState<string>('');
    const [complemento, setComplemento] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [countrySelectorVisible, setCountrySelectorVisible] = useState<boolean>(false);
    const [messageVisible, setMessageVisible] = useState<boolean>(false);
    const slideAnim = useState(new Animated.Value(-100))[0];
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!endereco) newErrors.endereco = 'Endereço é obrigatório.';
        if (!numero) newErrors.numero = 'Número é obrigatório.';
        if (!bairro) newErrors.bairro = 'Bairro é obrigatório.';
        if (!pais) newErrors.pais = 'País é obrigatório.';
        if (pais === 'BR' && !cep) newErrors.cep = 'CEP é obrigatório.';
        if (cep && cep.length !== 8) newErrors.cep = 'CEP deve ter 8 dígitos.';
        // if (!complemento) newErrors.complemento = 'Complemento é obrigatório.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCadastroNext = async () => {
        if (!validateFields()) return;
    
        setLoading(true);
    
        try {
            const requestBody = {
                eh_api: true,
                token_api: "Aisd%&$&66efsdfsd32894-234ds@@@$4", 
                di_usuario_patrocinador: loginPatrocinador, 
                di_usuario: loginDesejado, 
                senha: senha,
                di_tipo_documento: "taxid",
                di_cpf: "1313", // 
                di_nome_completo: nomeCompleto,
                di_email: email,
                di_data_nascimento: dataNascimento,
                di_pais: 1, 
                di_postal: "", 
                di_cep: cep,
                di_uf: "SP", 
                di_cidade: "Mirante do Paranapanema", 
                di_endereco: endereco,
                di_numero: numero,
                di_complemento: complemento,
                di_bairro: bairro,
                plano: 103, 
                li: "sim",
                uid: "123456" 
            };
    
            const response = await fetch('https://ev.speakbloom.com.br/api/index.php/distribuidor_api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });
    
            const textResponse = await response.text(); 
            console.log('Resposta da API:', textResponse); 
    
            if (!response.ok) {
                console.error('Erro na requisição:', textResponse);
                alert('Erro na requisição: ' + textResponse);
                return;
            }
    
            const data = JSON.parse(textResponse); 
    
            if (data.status === "success") {
                console.log('Cadastro realizado com sucesso!', data);
                alert('Cadastro realizado com sucesso!');
                navigation.navigate('Login');
                
            } else {
                console.error('Erro ao cadastrar:', data.message);
                alert('Erro ao cadastrar: ' + data.message);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Erro na requisição. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };


    
    const animatedMessageStyle = {
        transform: [{ translateY: slideAnim }],
    };

    const handleCepChange = async (value: string) => {
        setCep(value);
        if (value.length === 8 && pais === 'BR') {
            Keyboard.dismiss();
            try {
                const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setEndereco(data.logradouro);
                    setBairro(data.bairro);
                } else {
                    setEndereco('');
                    setBairro('');
                    alert('CEP não encontrado.');
                }
            } catch (error) {
                console.error(error);
                alert('Erro ao buscar o endereço. Tente novamente.');
            }
        }
    };

    const handleCountrySelect = (selectedCountry: string) => {
        setPais(selectedCountry);
        setCountrySelectorVisible(false);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FloatingLogo source={require('../../assets/logo-light.png')} style={styles.logo} />
                <Text style={styles.title}>Informações Adicionais</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Endereço</Text>
                    <TextInput
                        value={endereco}
                        onChangeText={setEndereco}
                        style={styles.input}
                        placeholder="Insira o endereço"
                    />
                    {errors.endereco && <Text style={styles.errorText}>{errors.endereco}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Número</Text>
                    <TextInput
                        value={numero}
                        onChangeText={setNumero}
                        style={styles.input}
                        placeholder="Insira o número"
                        keyboardType="numeric"
                    />
                    {errors.numero && <Text style={styles.errorText}>{errors.numero}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Bairro</Text>
                    <TextInput
                        value={bairro}
                        onChangeText={setBairro}
                        style={styles.input}
                        placeholder="Insira o bairro"
                    />
                    {errors.bairro && <Text style={styles.errorText}>{errors.bairro}</Text>}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>País</Text>
                    <TouchableOpacity onPress={() => setCountrySelectorVisible(!countrySelectorVisible)} style={styles.countrySelector}>
                        <Text style={styles.countryText}>{pais || 'Selecione um país'}</Text>
                    </TouchableOpacity>
                    {countrySelectorVisible && (
                        <CountrySelector selectedCountry={pais} onSelectCountry={handleCountrySelect} />
                    )}
                    {errors.pais && <Text style={styles.errorText}>{errors.pais}</Text>}
                </View>
                {pais === 'BR' ? (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CEP</Text>
                        <TextInput
                            value={cep}
                            onChangeText={handleCepChange}
                            style={styles.input}
                            placeholder="Insira o CEP"
                            keyboardType="numeric"
                        />
                        {errors.cep && <Text style={styles.errorText}>{errors.cep}</Text>}
                    </View>
                ) : (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Caixa Postal</Text>
                        <TextInput
                            value={cep}
                            onChangeText={setCep}
                            style={styles.input}
                            placeholder="Insira a caixa postal"
                        />
                    </View>
                )}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Complemento</Text>
                    <TextInput
                        value={complemento}
                        onChangeText={setComplemento}
                        style={styles.input}
                        placeholder="Insira o complemento"
                    />
                    {errors.complemento && <Text style={styles.errorText}>{errors.complemento}</Text>}
                </View>
                <TouchableOpacity onPress={handleCadastroNext} style={styles.button}>
                    <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Cadastrar'}</Text>
                </TouchableOpacity>
                {messageVisible && (
                    <Animated.View style={[styles.messageContainer, animatedMessageStyle]}>
                        <Text style={styles.messageText}>Cadastro realizado com sucesso!</Text>
                    </Animated.View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: 20,
        marginTop: 50,
        width: 250,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    countrySelector: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    countryText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#a3e200',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    messageContainer: {
        position: 'absolute',
        top: 130,
        left: 0,
        right: 0,
        backgroundColor: '#d4edda',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    messageText: {
        color: '#155724',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
});

export default SecondRegisterPage;