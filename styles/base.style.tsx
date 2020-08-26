import { StyleSheet } from 'react-native';
import Layout from '../constants/Layout';
import { StatusBar } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        maxHeight: Layout.window.height - StatusBar.currentHeight,
        marginTop: StatusBar.currentHeight,
        alignContent: "center",
        justifyContent: 'space-between',
    },
});

