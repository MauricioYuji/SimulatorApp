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
    menuBox: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    btnMenu: {
        minWidth: '60%',
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
        marginBottom: 20,
        borderRadius: 10,
    },
    btnMenuFont: {
        fontFamily: 'SourceSansProSemiBold',
        fontSize: 20,
        color: '#FFF'
    },
});

