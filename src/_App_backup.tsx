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

const initialState = {
    isLoadingComplete: false
};

const customFonts = {
    'SoccerLeague': require('../assets/fonts/SoccerLeague.ttf'),
    'Lalezar': require('../assets/fonts/Lalezar-Regular.ttf'),
};

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.container}>
            <View style={styles.logoBox}>
                <Image source={require('../assets/images/home-logo.png')} resizeMode="contain" style={styles.logo} />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Menu'); }}>
                <View style={styles.btn}>
                    <Text style={styles.btnFont}>Toque para começar</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};
const MenuScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.menu}>
            <TouchableOpacity onPress={() => { navigation.navigate('Simulation'); }}>
                <View style={styles.btnMenu}>
                    <Text style={styles.btnMenuFont}>Simular uma partida</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ManagerTeam'); }}>
                <View style={styles.btnMenu}>
                    <Text style={styles.btnMenuFont}>Gerenciar meu time</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Configuration'); }}>
                <View style={styles.btnMenu}>
                    <Text style={styles.btnMenuFont}>Configurações</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};
const SimulationScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.selecaoTimes}>
            <View style={styles.selecaoTimesOverlay}>
                <View style={styles.selecaoTituloBox}>
                    <Text style={styles.selecaoTitulo}>Selecione os times</Text>
                </View>
                <View style={styles.timesSelecionados}>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeTitle}>Casa</Text>
                        <View style={styles.timeSelected}></View>
                    </View>
                    <View style={styles.timeDividerBox}>
                        <View style={styles.timeDivider}></View>
                    </View>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeTitle}>Fora</Text>
                        <View style={styles.timeSelected}></View>
                    </View>
                </View>
                <View style={styles.listTimes}>
                    <View style={styles.itemTime}>
                        <Image source={require('../assets/images/logo-barca.png')} resizeMode="contain" style={styles.emblemaTime} />
                    </View>
                    <View style={styles.itemTime}>
                        <Image source={require('../assets/images/logo-corinthians.png')} resizeMode="contain" style={styles.emblemaTime} />
                    </View>
                    <View style={styles.itemTime}>
                        <Image source={require('../assets/images/logo-palmeiras.png')} resizeMode="contain" style={styles.emblemaTime} />
                    </View>
                    <View style={styles.itemTime}>
                        <Image source={require('../assets/images/logo-real-madrid.png')} resizeMode="contain" style={styles.emblemaTime} />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};
const ManagerTeamScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('Menu'); }}>
                <View style={styles.btn}>
                    <Text style={styles.btnFont}>Toque para começar</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};
const ConfigurationScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/bg.jpg')} resizeMode="cover" style={styles.container}>
            <TouchableOpacity onPress={() => { navigation.navigate('Menu'); }}>
                <View style={styles.btn}>
                    <Text style={styles.btnFont}>Toque para começar</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    );
};


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        console.log("componentDidMount");
        this._loadFontsAsync();
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ isLoadingComplete: true });
    }
    startTimer() {

        const simulatedGame = new Simulator().simulate();
        console.log("simulatedGame: ", simulatedGame);
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
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: 'transparent' }
                    }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Menu" component={MenuScreen} />
                    <Stack.Screen name="Simulation" component={SimulationScreen} />
                    <Stack.Screen name="ManagerTeam" component={ManagerTeamScreen} />
                    <Stack.Screen name="Configuration" component={ConfigurationScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

