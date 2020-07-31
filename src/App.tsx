import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, ImageBackground, Image, Button } from 'react-native';
import styles from './styles/base.style';
import Simulator from './Simulator';
import { AppLoading, SplashScreen, Linking } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef, isMountedRef, navigationChange, navigate } from './services/navigationService';
import Navigation from './components/navigation';

const initialState = {
    isLoadingComplete: false
};

const customFonts = {
    'SoccerLeague': require('../assets/fonts/SoccerLeague.ttf'),
    'Lalezar': require('../assets/fonts/Lalezar-Regular.ttf'),
};


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        console.log("componentDidMount");
        this._loadFontsAsync();
        isMountedRef.current = true;
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ isLoadingComplete: true });
    }


    render() {
        const { isLoadingComplete } = this.state;
        if (!isLoadingComplete) {
            return (
                <AppLoading
                />
            );

        }
        return (
            <NavigationContainer ref={navigationRef} onStateChange={(e) => navigationChange(e)}>
                <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.container}>
                    <Navigation />
                </ImageBackground>
            </NavigationContainer>
        );
    }
}

