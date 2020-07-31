import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center'
    },
    btnMenu: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
        marginBottom: 20,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    btnMenuFont: {
        fontFamily: 'Lalezar',
        fontSize: 20,
        color: '#FFF'
    },
});

