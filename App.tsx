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
import { navigationRef, isReadyRef } from './services/navigationService';
import Navigation from './components/navigation';

const initialState = {
    isLoadingComplete: false
};

const customFonts = {
    'SourceSansProBlack': require('./assets/fonts/SourceSansPro-Black.ttf'),
    'SourceSansProBlackItalic': require('./assets/fonts/SourceSansPro-BlackItalic.ttf'),
    'SourceSansProBold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
    'SourceSansProBoldItalic': require('./assets/fonts/SourceSansPro-BoldItalic.ttf'),
    'SourceSansProExtraLight': require('./assets/fonts/SourceSansPro-ExtraLight.ttf'),
    'SourceSansProExtraLightItalic': require('./assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
    'SourceSansProItalic': require('./assets/fonts/SourceSansPro-Italic.ttf'),
    'SourceSansProLight': require('./assets/fonts/SourceSansPro-Light.ttf'),
    'SourceSansProLightItalic': require('./assets/fonts/SourceSansPro-LightItalic.ttf'),
    'SourceSansProRegular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'SourceSansProSemiBold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
    'SourceSansProSemiBoldItalic': require('./assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
};


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        console.log("componentDidMount");
        this._loadFontsAsync();
        isReadyRef.current = false;
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
            <NavigationContainer ref={navigationRef} onReady={() => { isReadyRef.current = true; }}>
                <StatusBar style="auto" />
                <ImageBackground source={require('./assets/images/bg.jpg')} resizeMode="cover" style={styles.container}>
                    <Navigation />
                </ImageBackground>
            </NavigationContainer>
        );
    }
}

