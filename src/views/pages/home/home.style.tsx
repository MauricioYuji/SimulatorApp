import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'space-between',
    },

    logoBox: {
        flexDirection: "row",
        marginTop: '30%',
    },
    logo: {
        width: '80%',
        height: 70,
        alignSelf: "flex-start",
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "flex-start"
    },
    btnFont: {
        fontFamily: 'Lalezar',
        fontSize: 20,
        color: '#FFF',
        textShadowColor: 'rgba(255, 255, 255, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5
    },
    btn: {
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: '20%'
    },
});

