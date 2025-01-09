import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Image, TouchableWithoutFeedback, Share, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../contexts/authContext/AuthContext';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [data, setData] = useState<any[]>([]);
  const [info, setInfo] = useState<string>('');
  const { user } = useAuth(); 
  const fullName = user.name || "Usuário";
  const userBalance = 1500.00; 
  const [showBalance, setShowBalance] = useState(false); 
  const [dropdownVisible, setDropdownVisible] = useState(false); 


  const firstName = fullName.split(' ')[0];

  const handleButtonPress = (buttonType: string) => {
    switch (buttonType) {
      case 'clientes':
        setInfo('Informações sobre Clientes');
        setData([
          { id: '1', name: 'Cliente A' },
          { id: '2', name: 'Cliente B' },
          { id: '3', name: 'Cliente C' },
        ]);
        break;
      case 'primeiroNivel':
        setInfo('Informações sobre Primeiro Nível');
        setData([
          { id: '1', name: 'Primeiro Nível A' },
          { id: '2', name: 'Primeiro Nível B' },
        ]);
        break;
      case 'segundoNivel':
        setInfo('Informações sobre Segundo Nível');
        setData([
          { id: '1', name: 'Segundo Nível A' },
          { id: '2', name: 'Segundo Nível B' },
          { id: '3', name: 'Segundo Nível C' },
        ]);
        break;
      case 'terceiroNivel':
        setInfo('Informações sobre Terceiro Nível');
        setData([
          { id: '1', name: 'Terceiro Nível A' },
        ]);
        break;
      case 'ultimoPagamento':
        setInfo('Informações sobre Último Pagamento');
        setData([
          { id: '1', name: 'Pagamento A - R$100,00' },
          { id: '2', name: 'Pagamento B - R$200,00' },
        ]);
        break;
      case 'proximoPagamento':
        setInfo('Informações sobre Próximo Pagamento');
        setData([
          { id: '1', name: 'Pagamento A - R$150,00' }, 
          { id: '2', name: 'Pagamento B - R$250,00' },
        ]);
        break;
      default:
        setInfo('');
        setData([]);
    }
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfilePage'); 
  };

  const handleLogout = () => {
    navigation.navigate('Login')
    console.log("Usuário saiu");
  };

  const handleOutsidePress = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  const shareLink = async () => {
    try {
      await Share.share({
        message: 'Confira este link: https://ev.speakbloom.com.br/public o/index.php/entrar/login',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleRegisterPress = () => {
    Alert.alert(
      "Confirmação",
      "Você deseja continuar com a ação? Você será desconectado da sua conta.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            navigation.navigate('Register', {sponsorLogin: user.login}); 
            Toast.show({
              text1: 'Desconectado',
              text2: 'Você foi desconectado e redirecionado para a tela de registro.',
              type: 'success',
            });
          }
        }
      ]
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#a3e200', '#d2f08b']} 
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <Text style={styles.welcomeText}>Bem-vindo, {firstName}</Text>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
              <Image source={require('../../../src/assets/user.png')} style={styles.userImage} />
            </TouchableOpacity>
          </View> 
          <Text style={styles.subText}>Ao SpeakBloom Comercial !</Text>
          {dropdownVisible && (
            <View style={styles.dropdown}>
              <TouchableOpacity onPress={navigateToProfile}>
                <Text style={styles.dropdownItem}>Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.dropdownItem}>Sair</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo</Text>
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={styles.balanceValueContainer}>
            {showBalance ? (
              <Text style={[styles.balanceValue, { color: '#a3e200' }]}>
                R$ {userBalance.toFixed(2)}
              </Text>
            ) : (
              <Ionicons name="eye" size={24} color="#a3e200" style={styles.eyeIcon} />
            )}
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.buttonContainer}
          style={styles.scrollView}
        >
          <TouchableOpacity style={styles.rectangleButton} onPress={() => handleButtonPress('clientes')}>
            <Ionicons name="person-circle-outline" size={30} color="#000" />
            <Text style={styles.buttonText}>Clientes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rectangleButton} onPress={() => handleButtonPress('primeiroNivel')}>
            <Ionicons name="filter" size={30} color="#000" />
            <Text style={styles.buttonText}>1º Nível</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rectangleButton} onPress={() => handleButtonPress('segundoNivel')}>
            <Ionicons name="filter" size={30} color="#000" />
            <Text style={styles.buttonText}>2º Nível</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rectangleButton} onPress={() => handleButtonPress('terceiroNivel')}>
            <Ionicons name="filter" size={30} color="#000" />
            <Text style={styles.buttonText}>3º Nível</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rectangleButton} onPress={() => handleButtonPress('ultimoPagamento')}>
            <MaterialIcons name="credit-card" size={30} color="#000" />
            <Text style={styles.buttonText}>Último Pagamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rectangleButton} onPress={() => handleButtonPress('proximoPagamento')}>
            <MaterialIcons name="credit-card" size={30} color="#000" />
            <Text style={styles.buttonText}>Próximo Pagamento</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rectangleButton} onPress={shareLink}>
            <Ionicons name="megaphone-outline" size={30} color="#000" />
            <Text style={styles.buttonText}>Indicação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rectangleButton} onPress={handleRegisterPress}>
            <Ionicons name="person-add" size={30} color="#000" />
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text style={styles.infoText}>{info}</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={styles.flatListContainer}
        />
        <Toast/>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 20,
    height: '23%'
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center',
    marginLeft: -350,
  },
  rectangleButton: {
    width: 100, 
    height: 75, 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#ccc', 
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  userImage: {
    width: 65,
    height: 65,
    borderRadius: 15,
    marginTop: 10,
  },
  dropdown: {
    position: 'absolute',
    right: 30,
    top: 120,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  balanceContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 40,
    marginVertical: 10,
  },
  balanceLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 20,
    textShadowOffset: { width: 0, height: 1 },
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  scrollView: {
    maxHeight: 90,
  },
  circleButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    paddingTop: 30,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
  },
  flatListContainer: {
    paddingTop: 30,
  },
});

export default HomeScreen;