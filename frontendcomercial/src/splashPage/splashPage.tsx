import React from 'react';
import { View, StyleSheet } from 'react-native';
import FloatingLogo from '../components/FloatingLogo'; 

const SplashPage: React.FC = () => {
    return (
        <View style={styles.container}>
            <FloatingLogo source={require('../../src/assets/logo-light.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', 
    },
    logo: {
        width: 330,
        height: 150, 
    },
});

export default SplashPage;