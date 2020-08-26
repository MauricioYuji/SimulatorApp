import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter, Image, TouchableOpacity } from 'react-native';
import * as nav from '../../../services/navigationService';
import styles from './home.style';
import { Simulator, Calculate } from '../../../Simulator';
import Menu from '../menu/index';

export default class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        showmenu: false
    };
    startGame() {
        this.setState({
            showmenu: true
        }, () => {
        });
    }
    renderMenu() {
        const { showmenu } = this.state;
        if (showmenu) {
            return (
                <Menu />
            );
        } else {
            return (
                <TouchableOpacity onPress={() => { this.startGame() }}>
                    <View style={styles.btn}>
                        <Text style={styles.btnFont}>Toque para começar</Text>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoBox}>
                    <Text style={styles.logo}>Soccer Simulator</Text>
                </View>
                {this.renderMenu()}
            </View>
        );
    }
}

