import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './styles/base.style';
import Simulator from './Simulator';

const initialState = {
    fieldPos: 0,
    score: [0, 0],
    time: 0,
    timerRunning: false
};
let apm = 1;
let history = [];
let timeout = null;
const loopTime = 0;
const maxTime = 90;
const maxPos = 7;


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = initialState;
    }

    componentDidMount() {
        console.log("componentDidMount");
    }
    componentWillUnmount() {
        console.log("componentWillUnmount");
        clearTimeout(timeout);
    }
    coinToss() {
        let { fieldPos, score } = this.state;
        const rnd = Math.random() > 0.5 ? +1 : -1;
        let newPos = fieldPos + rnd;
        if (newPos > maxPos) {
            this.setState({
                fieldPos: 0,
                score: [score[0], score[1] + 1]
            });
        } else if (newPos < maxPos * -1) {
            this.setState({
                fieldPos: 0,
                score: [score[0] + 1, score[1]]
            });
        } else {
            this.setState({
                fieldPos: newPos
            });
        }

    }
    actionTime() {
        let { time, timerRunning, score } = this.state;
        const _self = this;
        let newTime = time + 1;
        console.log("newTime: ", newTime);
        this.setState({
            time: newTime
        });
        for (let i = 0; i < apm; i++) {
            this.coinToss();
        }

        timeout = setTimeout(function () {
            if (newTime < maxTime && timerRunning) {
                _self.actionTime();
            } else {
                history.push(score);
                _self.startTimer();
            }
        }, loopTime);
    }
    startTimer() {
        this.reset();
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
    Simulate() {
        const game = new Simulator();
        console.log("game: ", game.simulate());
    }
    render() {
        const { fieldPos, score, time } = this.state;
        return (
            <View style={styles.container}>
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

                <TouchableOpacity onPress={() => { this.Simulate() }}>
                    <Text style={styles.btn}>Simulate</Text>
                </TouchableOpacity>
                <StatusBar style="auto" />
            </View>
        );
    }
}

