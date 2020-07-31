import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter, Image } from 'react-native';
import { navigate } from '../../../services/navigationService';
import styles from './simulation.style';

export default class Simulation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
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
                            <Image source={require('../../../../assets/images/logo-barca.png')} resizeMode="contain" style={styles.emblemaTime} />
                        </View>
                        <View style={styles.itemTime}>
                            <Image source={require('../../../../assets/images/logo-corinthians.png')} resizeMode="contain" style={styles.emblemaTime} />
                        </View>
                        <View style={styles.itemTime}>
                            <Image source={require('../../../../assets/images/logo-palmeiras.png')} resizeMode="contain" style={styles.emblemaTime} />
                        </View>
                        <View style={styles.itemTime}>
                            <Image source={require('../../../../assets/images/logo-real-madrid.png')} resizeMode="contain" style={styles.emblemaTime} />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

