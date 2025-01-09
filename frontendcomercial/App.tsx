import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/loginPage/loginPage';
import RegisterPage from './src/pages/registerPage/registerPage'
import { Routes } from './src/routes';

export default function App() {
  return (
      <Routes/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
