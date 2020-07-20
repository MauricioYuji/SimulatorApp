import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    score: {
        flexDirection: "row"
    },
    historyBox: {
        maxHeight: '50%',
        width: '100%',
        backgroundColor: '#0F0',
        padding: 20
    },
    btnBox: {
        flexDirection: "row",
        marginVertical: 10
    },
    btn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#33F',
        borderRadius: 5,
        color: '#FFF',
        marginHorizontal: 5,
        fontSize: 10
    }
});

