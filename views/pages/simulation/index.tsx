import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter, Image, TouchableOpacity, ScrollView } from 'react-native';
import { navigate } from '../../../services/navigationService';
import styles from './simulation.style';
import * as RootNavigation from '../../../services/navigationService';
import { Simulator, Calculate } from '../../../Simulator';
import Carousel from 'react-native-snap-carousel';

export default class Simulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            homeIndex: 0,
            awayIndex: 0,
            times: [],
        }
    }

    componentDidMount() {
        const jogadores = require('../../../static/jogadores.json').jogadores;
        const times = require('../../../static/times.json').times;
        for (let i = 0; i < times.length; i++) {
            let players = jogadores.filter(p => p.timeid === times[i].id);
            for (let j = 0; j < players.length; j++) {
                let calcStatusPlayer = new Calculate().playerStatus(players[j]);
                players[j].overall = calcStatusPlayer;
                players[j].active = players[j].titular;
                players[j].yCard = 0;
                players[j].rCard = 0;
            }
            let calcStatusTeam = new Calculate().teamStatus(players);
            times[i].jogadores = players;
            times[i].status = calcStatusTeam;
        }

        //console.log("times: ", times);
        this.setState({
            times: times
        }, () => {
        });
    }
    componentWillUnmount() {
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.carousel}>
                <View style={styles.time}>
                    <Image source={{ uri: item.emblema }} style={[styles.image]} resizeMode="contain" />
                </View>
            </View>
        );
    }
    goBack() {
        RootNavigation.navigate('Home');
    }
    startGame() {
        const { homeIndex, awayIndex, times } = this.state;
        const simulatedGame = new Simulator().simulate(times[homeIndex], times[awayIndex]);
        console.log("simulatedGame: ", simulatedGame);
    }
    renderTeamStatus(id) {
        const { times } = this.state;
        const currentTeam = times[id];
        if (currentTeam === undefined) {
            return null;
        } else {
            return (
                <View>
                    <Text style={styles.statusText}>{currentTeam.status.atk} Atk</Text>
                    <Text style={styles.statusText}>{currentTeam.status.mid} Mid</Text>
                    <Text style={styles.statusText}>{currentTeam.status.def} Def</Text>
                </View>
            );
        }
    }
    render() {
        const { homeIndex, awayIndex } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.selecaoTituloBox}>
                    <View style={styles.btnBackBox}>
                        <TouchableOpacity onPress={() => { this.goBack() }}>
                            <Text style={styles.btnBack}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.selecaoTitulo}>Selecione os times</Text>
                </View>
                <View style={styles.timesSelecionados}>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeTitle}>Casa</Text>
                        <View style={styles.timeSelected}>
                            <Carousel
                                loop={true}
                                ref={ref => this.carousel = ref}
                                data={this.state.times}
                                renderItem={this._renderItem}
                                sliderWidth={148}
                                itemWidth={90}
                                onSnapToItem={index => this.setState({ homeIndex: index })} />
                        </View>
                        {this.renderTeamStatus(homeIndex)}
                    </View>
                    <View style={styles.timeDividerBox}>
                        <View style={styles.timeDivider}></View>
                    </View>
                    <View style={styles.timeBox}>
                        <Text style={styles.timeTitle}>Fora</Text>
                        <View style={styles.timeSelected}>
                            <Carousel
                                loop={true}
                                ref={ref => this.carousel = ref}
                                data={this.state.times}
                                renderItem={this._renderItem}
                                sliderWidth={148}
                                itemWidth={90}
                                onSnapToItem={index => this.setState({ awayIndex: index })} />
                        </View>
                        {this.renderTeamStatus(awayIndex)}
                    </View>
                </View>
                <View style={styles.actionBox}>
                    <TouchableOpacity onPress={() => { this.startGame() }}>
                        <Text style={styles.actionBtn}>Simular uma partida</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

