import React, { useState, Component, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Animated, TouchableHighlight, TouchableWithoutFeedback, PixelRatio, ScrollView, DeviceEventEmitter } from 'react-native';
import styles from './navigation.style';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { navigate } from '../../services/navigationService';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Screens } from '../../constants/Screens';
import Home from '../../views/pages/home';
import Menu from '../../views/pages/menu';
import Simulation from '../../views/pages/simulation';
import ManagerTeam from '../../views/pages/managerteam';
import Configuration from '../../views/pages/configuration';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';




import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

export default createAppContainer(createAnimatedSwitchNavigator(
    {
        Home: Home,
        Menu: Menu,
        Simulation: Simulation,
        ManagerTeam: ManagerTeam,
        Configuration: Configuration,
    },
    {
        // The previous screen will slide to the bottom while the next screen will fade in
        transition: (
            <Transition.Together>
                <Transition.Out
                    type="slide-left"
                    durationMs={400}
                    interpolation="easeInOut"
                />
                <Transition.In type="fade" durationMs={500} />
            </Transition.Together>
        ),
    }
));