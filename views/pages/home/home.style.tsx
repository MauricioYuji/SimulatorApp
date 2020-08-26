import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'space-between',
    },

    logoBox: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginTop: '30%',
    },
    logo: {
        fontFamily: 'SourceSansProBlackItalic',
        fontSize: 50,
        color: '#FFF'
    },
    btnFont: {
        fontFamily: 'SourceSansProSemiBold',
        fontSize: 20,
        color: '#FFF',
    },
    btn: {
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginBottom: '20%'
    },
});

