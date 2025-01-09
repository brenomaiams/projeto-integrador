import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import Login from '../pages/loginPage/loginPage';
import RegisterPage from '../pages/registerPage/registerPage';
import SecondRegisterPage from '../pages/registerPage/registerPageNext';
import SplashPage from '../splashPage/splashPage';
import { useNavigation } from '@react-navigation/native';
import ProfilePage from '../pages/profilePage/profilePage';
import HomeScreen from '../pages/homePage/homePage';
import Toast from 'react-native-toast-message';
import { AuthProvider } from '../contexts/authContext/AuthContext';

const Stack = createNativeStackNavigator();

const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    useEffect(() => {
        const loadData = async () => {
            
            await new Promise(resolve => setTimeout(resolve, 3000)); 
            navigation.navigate('Login');
            Toast.show({
                type: 'success', 
                text1: 'Welcome!',
                text2: 'You are now being redirected to the Home screen.',
            });

           
            
        };
    
        loadData();
    }, [navigation]);

    return <SplashPage />;
};

export const Routes = () => {
    return (
        <AuthProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen 
                    name="Splash" 
                    component={SplashScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={RegisterPage} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen
                    name="RegisterNext"
                    component={SecondRegisterPage}
                    options={{ headerShown: false }}
                />
                 <Stack.Screen
                    name="ProfilePage"
                    component={ProfilePage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
         <Toast/>
        </NavigationContainer>
        </AuthProvider>
    );
};