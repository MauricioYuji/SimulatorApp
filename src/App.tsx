import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles/base.style';
import Simulator from './Simulator';

const initialState = {
    fieldPos: 0,
    score: [0, 0],
    time: 0,
    timerRunning: false,
    curTime: null
};
let simulatedGame = null;
let apm = 1;
let history = [];
let timeout = null;
const loopTime = 100;
const maxTime = 90;
const maxPos = 7;
let horas = null;


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        console.log("componentDidMount");
        horas = setInterval(() => {
            this.setState({
                curTime: new Date().toLocaleString()
            })
        }, 1000)
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
        clearTimeout(timeout);
        clearInterval(horas);
    }
    actionTime(time = 0) {
        const _self = this;
        timeout = setTimeout(function () {
            if (time < simulatedGame.matchHistory.length) {
                _self.setState({
                    fieldPos: simulatedGame.matchHistory[time].ballPos,
                    time: time,
                    score: simulatedGame.matchHistory[time].score
                });
                time++;
                _self.actionTime(time);
            } else {
                history.push(simulatedGame.score);
                clearTimeout(timeout);
                _self.startTimer();
            }
        }, loopTime);
    }
    startTimer() {
        this.reset();

        simulatedGame = new Simulator().simulate();
        //console.log("simulatedGame: ", simulatedGame);

        this.setState({
            timerRunning: true
        }, () => this.actionTime());

    }
    pauseTimer() {
        console.log("PAUSE TIMER");
        clearTimeout(timeout);
        this.setState({
            timerRunning: false
        });
    }
    reset() {
        console.log("RESET");
        clearTimeout(timeout);
        this.setState(initialState);
    }
    resetHistory() {
        console.log("resetHistory");
        history = [];
    }
    renderHistory() {
        const content = [];
        for (let i = 0; i < history.length; i++) {
            content.push(<Text key={i}>{history[i][0]} - {history[i][1]}</Text>);
        }
        return (content);
    }



    render() {
        const { fieldPos, score, time, curTime } = this.state;
        return (
            <View style={styles.container}>
                <Text>{curTime}</Text>
                <View style={styles.score}>
                    <Text>{score[0]} - {score[1]}</Text>
                </View>
                <Text>Tempo: {time}</Text>
                <Text>{fieldPos}</Text>
                <View style={styles.btnBox}>
                    <TouchableOpacity onPress={() => { this.startTimer() }}>
                        <Text style={styles.btn}>START</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.pauseTimer() }}>
                        <Text style={styles.btn}>PAUSE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.reset() }}>
                        <Text style={styles.btn}>RESET</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.resetHistory() }}>
                        <Text style={styles.btn}>RESET HISTORY</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.historyBox}>
                    {this.renderHistory()}
                </ScrollView>

                <StatusBar style="auto" />
            </View>
        );
    }
}

