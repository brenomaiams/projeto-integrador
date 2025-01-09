import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';

interface AuthContextType {
    user: {
        name: string | null;
        login: string | null;
        email: string | null;
        dataNascimento: string | null;
        endereco: string | null;
        numero: string | null;
        bairro: string | null;
        cep: string | null;
    };
    login: (login: string, senha: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser ] = useState<{
        name: string | null;
        login: string | null;
        email: string | null;
        dataNascimento: string | null;
        endereco: string | null;
        numero: string | null;
        bairro: string | null;
        cep: string | null;
    }>({
        name: null,
        login: null,
        email: null,
        dataNascimento: null,
        endereco: null,
        numero: null,
        bairro: null,
        cep: null,
    });

    const login = async (login: string, senha: string) => {
        try {
            const response = await axios.post('https://ev.speakbloom.com.br/api/index.php/distribuidor_api/auth', {
                login: login,
                token: 'Aisd%&$&66efsdfsd32894-234ds@@@$4',
                senha: senha,
                eh_api: true,
            });

            console.log('Estrutura da resposta da API:', response.data);

            const { status, msg, nome_completo, di_email, di_data_nascimento, di_endereco, di_numero, di_bairro, di_cep } = response.data;

            if (status === 'success') {
                setUser ({
                    name: nome_completo || null,
                    login: login,
                    email: di_email || null,
                    dataNascimento: di_data_nascimento || null,
                    endereco: di_endereco || null,
                    numero: di_numero || null,
                    bairro: di_bairro || null,
                    cep: di_cep || null,
                });
                console.log('Usuário logado com sucesso:', login);
            } else {
                throw new Error(msg || 'Erro ao autenticar');
            }
        } catch (error: any) {
            console.error('Erro ao fazer login:', error);
            const errorMessage = error.message || 'Erro ao autenticar';
            Toast.show({
                text1: 'Erro ao autenticar',
                text2: errorMessage,
                position: 'top',
                type: 'error',
                visibilityTime: 3000,
                autoHide: true,
            });
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        setUser ({
            name: null,
            login: null,
            email: null,
            dataNascimento: null,
            endereco: null,
            numero: null,
            bairro: null,
            cep: null,
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};