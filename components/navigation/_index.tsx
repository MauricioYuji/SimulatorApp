import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Animated, TouchableHighlight, TouchableWithoutFeedback, PixelRatio, ScrollView, DeviceEventEmitter } from 'react-native';
import styles from './navigation.style';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from '../../services/navigationService';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screens } from '../../constants/Screens';




const Pages = createMaterialTopTabNavigator();

const MyTransition = {
    gestureDirection: 'horizontal',
    transitionSpec: {
        open: TransitionSpecs.TransitionIOSSpec,
        close: TransitionSpecs.TransitionIOSSpec,
    },
    headerStyleInterpolator: HeaderStyleInterpolators.forFade,
    cardStyleInterpolator: ({ current, next, layouts }) => {
        return {
            cardStyle: {
                backgroundColor: 'transparent',
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0],
                        }),
                    },
                    {
                        rotate: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0],
                        }),
                    },
                    {
                        scale: next
                            ? next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0.9],
                            })
                            : 1,
                    },
                ],
            },
            overlayStyle: {
                opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                }),
            },
        };
    },
}


function MyPages() {
    return (
        <Pages.Navigator
            screenOptions={{
                cardStyle: { backgroundColor: 'transparent' },
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...MyTransition,
            }}
            tabBar={tab => null}
            sceneContainerStyle={{ backgroundColor: 'transparent' }}
            headerMode='none'>
            {Screens.map(({ component, params, route }, index) =>
                <Pages.Screen
                    name={route}
                    component={component}
                    key={index}
                />
            )}
        </Pages.Navigator>
    );
}



export default class navigation extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MyPages />
        );
    }
}

