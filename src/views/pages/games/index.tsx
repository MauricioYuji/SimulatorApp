import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import styles from './lists.style';



export default class Games extends Component {

    renderImage(img: string) {
        return 'https://firebasestorage.googleapis.com/v0/b/teste-925f4.appspot.com/o/images%2F' + img + '?alt=media';
    }
    renderList() {
        const list = require('~/files/consoles.json');
        console.log("list: ", list.Consoles);

        const result = Object.keys(list.Companies).map(function (key) {
            return list.Companies[key];
        });

        let items = [];
        for (let i = 0; i < result.length; i++) {
            console.log("result[i].name: ", result[i]);
            items.push(<View><Image source={{ uri: result[i].img }} style={[{ width: result[i].width / 2, height: result[i].height / 2 }, styles.image]} /></View>);
        }
        return items;
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps='handled'>
                <View style={styles.container}>
                    {this.renderList()}
                    <Text style={styles.text}>Lists</Text>
                </View>
            </ScrollView>
        );
    }
}

