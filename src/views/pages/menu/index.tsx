import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter, TouchableOpacity } from 'react-native';
import { navigate } from '../../../services/navigationService';
import styles from './menu.style';
import { Simulator, Calculate } from '../../../Simulator';

export default class Menu extends Component {
    constructor(props) {
        super(props);
    }
    startSimulate() {

        //this.props.navigation.navigate('Simulation');

        const jogadores = require('~/static/jogadores.json').jogadores;
        const times = require('~/static/times.json').times;
        for (let i = 0; i < times.length; i++) {
            let players = jogadores.filter(p => p.timeid === times[i].id);
            for (let j = 0; j < players.length; j++) {
                let calcStatusPlayer = new Calculate().playerStatus(players[j]);
                players[j].overall = calcStatusPlayer;
            }
            let calcStatusTeam = new Calculate().teamStatus(players);
            times[i].jogadores = players;
            times[i].status = calcStatusTeam;
        }

        console.log("times: ", times);

        const simulatedGame = new Simulator().simulate(times[2], times[3]);
        console.log("simulatedGame: ", simulatedGame);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this.startSimulate() }}>
                    <View style={styles.btnMenu}>
                        <Text style={styles.btnMenuFont}>Simular uma partida</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ManagerTeam'); }}>
                    <View style={styles.btnMenu}>
                        <Text style={styles.btnMenuFont}>Gerenciar meu time</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Configuration'); }}>
                    <View style={styles.btnMenu}>
                        <Text style={styles.btnMenuFont}>Configurações</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

