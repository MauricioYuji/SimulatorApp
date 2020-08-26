
import { Screens } from '../../constants/Screens';
import Home from '../../views/pages/home';
import Menu from '../../views/pages/menu';
import Simulation from '../../views/pages/simulation';
import ManagerTeam from '../../views/pages/managerteam';
import Configuration from '../../views/pages/configuration';
import { createNativeStackNavigator, createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import { TransitionSpecs } from '@react-navigation/stack';
import { HeaderStyleInterpolators } from '@react-navigation/stack';
const Stack = createStackNavigator();

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
                transform: [
                    {
                        translateX: next ?
                            next.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -layouts.screen.width],
                            })
                            : current.progress.interpolate({
                                inputRange: [0, 1],
                                outputRange: [layouts.screen.width, 0],
                            }),
                    },
                ],
                opacity: next
                    ? next.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }) : current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    }),
            },
        };
    },
}

export default class rootStack extends Component {
    render() {
        return (
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    gestureEnabled: false,
                    cardStyle: {
                        backgroundColor: 'transparent',
                        ...MyTransition
                    }
                }}
                headerMode="none"
            >
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: 'Custom animation',
                        ...MyTransition,
                    }}
                />
                <Stack.Screen
                    name="Simulation"
                    component={Simulation}
                    initialParams={{ user: 'me' }}
                    options={{
                        title: 'Custom animation',
                        ...MyTransition,
                    }}
                />
                <Stack.Screen
                    name="ManagerTeam"
                    component={ManagerTeam}
                    initialParams={{ user: 'me' }}
                />
                <Stack.Screen
                    name="Configuration"
                    component={Configuration}
                    initialParams={{ user: 'me' }}
                />
            </Stack.Navigator>
        );
    }
}

//export default createAppContainer(createAnimatedSwitchNavigator(
//    {
//        Home: Home,
//        Simulation: Simulation,
//        ManagerTeam: ManagerTeam,
//        Configuration: Configuration,
//    },
//    {
//        // The previous screen will slide to the bottom while the next screen will fade in
//        transition: (
//            <Transition.Together>
//                <Transition.Out
//                    type="slide-left"
//                    durationMs={400}
//                    interpolation="easeInOut"
//                />
//                <Transition.In type="fade" durationMs={500} />
//            </Transition.Together>
//        ),
//    }
//));