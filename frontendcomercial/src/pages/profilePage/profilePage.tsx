import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/authContext/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfilePage: React.FC = () => {
    const navigation = useNavigation();
    const { user } = useAuth(); 

    const [nomeCompleto, setNomeCompleto] = useState<string>(user.name || '');
    const [email, setEmail] = useState<string>(user.email || '');
    const [dataNascimento, setDataNascimento] = useState<string>(user.dataNascimento || '');
    const [endereco, setEndereco] = useState<string>(user.endereco || '');
    const [numero, setNumero] = useState<string>(user.numero || '');
    const [bairro, setBairro] = useState<string>(user.bairro || '');
    const [cep, setCep] = useState<string>(user.cep || '');
    const [avatar, setAvatar] = useState<string | null>(null);

    const handleSaveProfile = () => {
        console.log('Dados do perfil salvos:', {
            nomeCompleto,
            email,
            dataNascimento,
            endereco,
            numero,
            bairro,
            cep,
            avatar,
        });
    };

    const handleSelectAvatar = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('É necessário permitir o acesso à câmera para selecionar uma imagem.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setAvatar(result.assets[0].uri);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={handleSelectAvatar} style={styles.avatarContainer}>
                    {avatar ? (
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                    ) : (
                        <Image source={require('../../assets/user.png')} style={styles.avatar} />
                    )}
                </TouchableOpacity>
                <Text style={styles.title}>Perfil</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.textinput}>Nome Completo</Text>
                    <TextInput
                        value={nomeCompleto}
                        onChangeText={setNomeCompleto}
                        style={styles.input}
                        placeholder="Nome Completo"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textinput}>E-mail</Text>
                    <TextInput
                        value={email}
                        style={styles.input}
                        placeholder="Seu e-mail"
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textinput}>Data de Nascimento</Text>
                    <TextInput
                        value={dataNascimento}
                        onChangeText={setDataNascimento}
                        placeholder="XX/XX/XXXX"
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textinput}>Endereço</Text>
                    <TextInput
                        value={endereco}
                        onChangeText={setEndereco}
                        style={styles.input}
                        placeholder="Insira o endereço"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textinput}>Número</Text>
                    <TextInput
                        value={numero}
                        onChangeText={setNumero}
                        style={styles.input}
                        placeholder="Insira o número"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textinput}>Bairro</Text>
                    <TextInput
                        value={bairro}
                        onChangeText={setBairro}
                        style={styles.input}
                        placeholder="Insira o bairro"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.textinput}>CEP</Text>
                    <TextInput
                        value={cep}
                        onChangeText={setCep}
                        style={styles.input}
                        placeholder="Insira o CEP"
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                    <Text style={styles.buttonText}>Salvar Perfil</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={30} color="#a3e200" />
            </TouchableOpacity>
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
    avatarContainer: {
        alignSelf: 'center',
        marginBottom: 7,
        marginTop: 30,
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#a3e200',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 35,
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    button: {
        marginTop: 5,
        backgroundColor: '#a3e200',
        width: '99%',
        borderRadius: 13,
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        fontWeight: 'bold',
        fontSize: 15,
    },
    textinput: {
        fontWeight: 'bold',
        marginBottom: 7,
    },
    iconContainer: {
        position: 'absolute',
        top: 80,
        right: 340,
        zIndex: 1,
    },
});

export default ProfilePage;