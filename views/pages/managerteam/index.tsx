import React, { Component } from 'react';
import { Text, View, Button, DeviceEventEmitter } from 'react-native';
import { navigate } from '../../../services/navigationService';
import styles from './managerteam.style';

export default class ManagerTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Bird's Nest",
        };
    }
    setText(texto: any) {
        this.setState({ text: texto });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Home - {this.state.text}</Text>
                <Button
                    onPress={() => { this.props.navigation.navigate('Menu'); }}
                    title="Press Me"
                />
                <Button
                    onPress={() => {
                        this.setText('aaaaaaaa!');
                    }}
                    title="aaaaaaa"
                />
            </View>
        );
    }
}

