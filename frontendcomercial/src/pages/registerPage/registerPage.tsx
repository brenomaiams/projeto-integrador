import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Animated, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FloatingLogo from '../../components/FloatingLogo'; 
import { validateRegisterPage } from '../../components/ValidationHelper'; 
import { Ionicons } from '@expo/vector-icons';
import { useRoute} from '@react-navigation/native'
import Toast from 'react-native-toast-message';

const RegisterPage: React.FC = () => {
  const route = useRoute();
  const { sponsorLogin } = route.params as { sponsorLogin: string }; 
  const [loginPatrocinador, setLoginPatrocinador] = useState<string>(sponsorLogin || ''); 
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [loginDesejado, setLoginDesejado] = useState<string>('');
  const [senha, setSenha] = useState<string>('');
  const [repetirSenha, setRepetirSenha] = useState<string>('');
  const [nomeCompleto, setNomeCompleto] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dataNascimento, setDataNascimento] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fillAnimation = useState(new Animated.Value(0))[0];

  const handleCadastro = () => {
    const validationErrors = validateRegisterPage({
      loginPatrocinador,
      loginDesejado,
      senha,
      repetirSenha,
      nomeCompleto,
      email,
      dataNascimento,
    });
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setLoading(true);
    Animated.timing(fillAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      try {
       
        navigation.navigate('RegisterNext', {
          loginPatrocinador,
          loginDesejado,
          senha,
          repetirSenha,
          nomeCompleto,
          email,
          dataNascimento,
        });
      } catch (error) {
        console.error('Erro ao navegar para a segunda etapa:', error);
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
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Ionicons name="arrow-back-outline" size={30} color="#a3e200" />
          </TouchableOpacity>
          <FloatingLogo source={require('../../assets/logo-light.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Cadastro Gratuito</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.textinput}>Login do Patrocinador</Text>
          <TextInput
            value={loginPatrocinador}
            onChangeText={setLoginPatrocinador}
            style={styles.input}
            placeholder="Insira o nome de usuário"
          />
          {errors.loginPatrocinador && <Text style={{ color: 'red' }}>{errors.loginPatrocinador}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textinput}>Seu Login Desejado</Text>
          <TextInput
            value={loginDesejado}
            onChangeText={setLoginDesejado}
            style={styles.input}
            placeholder="Insira o nome de usuário (sem espaços)"
          />
          {errors.loginDesejado && <Text style={{ color: 'red' }}>{errors.loginDesejado}</Text>}
        </View>
        <View style ={styles.inputContainer}>
          <Text style={styles.textinput}>Senha</Text>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={styles.input}
            placeholder="Insira a senha"
          />
          {errors.senha && <Text style={{ color: 'red' }}>{errors.senha}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textinput}>Repita sua Senha</Text>
          <TextInput
            value={repetirSenha}
            onChangeText={setRepetirSenha}
            secureTextEntry
            style={styles.input}
            placeholder="Insira a senha novamente"
          />
          {errors.repetirSenha && <Text style={{ color: 'red' }}>{errors.repetirSenha}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textinput}>Nome Completo</Text>
          <TextInput
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
            style={styles.input}
            placeholder="Nome Completo"
          />
          {errors.nomeCompleto && <Text style={{ color: 'red' }}>{errors.nomeCompleto}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textinput}>E-mail</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
            placeholder="O email não pode ter sido usado anteriormente"
          />
          {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.textinput}>Data de Nascimento</Text>
          <TextInput
            value={dataNascimento}
            onChangeText={setDataNascimento}
            placeholder="XX/XX/XXXX"
            style={styles.input}
          />
          {errors.dataNascimento && <Text style={{ color: 'red' }}>{errors.dataNascimento}</Text>}
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#a3e200', position: 'relative', overflow: 'hidden' }]}
          onPress={handleCadastro}
          disabled={loading}
        >
          <Animated.View style={animatedStyle} />
          <Text style={{ color: '#fff', textAlign: 'center', padding: 10, fontWeight: 'bold', fontSize: 15 }}>
            {loading ? 'Carregando...' : 'Próxima Etapa'}
          </Text>
        </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    alignSelf: 'center',
    marginLeft: 35,
    width: 250,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
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
  textinput: {
    fontWeight: 'bold',
    marginBottom: 7,
  },
});

export default RegisterPage;