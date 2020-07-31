import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter, Image, TouchableOpacity } from 'react-native';
import { navigate } from '../../../services/navigationService';
import styles from './home.style';
import { Simulator, Calculate } from '../../../Simulator';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    startGame() {
        this.props.navigation.navigate('Menu');

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoBox}>
                    <Image source={require('../../../../assets/images/home-logo.png')} resizeMode="contain" style={styles.logo} />
                </View>
                <TouchableOpacity onPress={() => { this.startGame() }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnFont}>Toque para começar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

