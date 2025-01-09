import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

const FloatingLogo: React.FC<{ source: any; style?: any }> = ({ source, style }) => {
    const floatingAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(floatingAnimation, {
                        toValue: -10, 
                        duration: 1000, 
                        useNativeDriver: true,
                    }),
                    Animated.timing(floatingAnimation, {
                        toValue: 0, 
                        duration: 1000, 
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        };

        animate();
    }, [floatingAnimation]);

    const animatedStyle = {
        transform: [
            {
                translateY: floatingAnimation, 
            },
        ],
    };

    return (
        <Animated.Image
            source={source}
            style={[styles.logo, animatedStyle, style]}
            resizeMode="contain"
        />
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 100, 
        height: 100,
    },
});

export default FloatingLogo;
