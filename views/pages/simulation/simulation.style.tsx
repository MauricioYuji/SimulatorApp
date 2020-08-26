import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
    },
    selecaoTimesOverlay: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
    },
    btnBackBox: {
        borderBottomRightRadius: 10,
        backgroundColor: "#000",
        paddingHorizontal: 15,
        paddingVertical: 5,
        position: "absolute",
        left: 0,
        top: 0,
    },
    btnBack: {
        fontFamily: 'SourceSansProRegular',
        color: "#FFF",
    },
    teamScroll: {
        paddingLeft: 20,
        paddingRight: 60
    },
    image: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },
    selecaoTituloBox: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center'
    },
    selecaoTitulo: {
        fontFamily: 'SourceSansProBold',
        fontSize: 40,
        color: '#FFF',
        textAlign: 'center'
    },
    timesSelecionados: {
        flex: 4,
        alignItems: "center",
        alignContent: "center",
        justifyContent: 'center',
        flexDirection: "row"
    },
    timeBox: {
        flex: 2,
        alignContent: "center",
        justifyContent: 'center',
        alignItems: "center",
    },
    time: {
        width: 90,
        height: 90,
        alignContent: "center",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 20,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    timeTitle: {
        textAlign: "center",
        fontFamily: 'SourceSansProBold',
        fontSize: 20,
        marginBottom: 15,
        color: '#FFF'
    },
    carousel: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
        alignItems: "center"
    },
    timeSelected: {
        alignSelf: "center",
        justifyContent: "center",
        borderColor: '#FFF',
        borderRadius: 5,
        borderWidth: 3,
        borderStyle: "solid",
        width: '80%',
        marginHorizontal: 20,
        marginBottom: 30,
        aspectRatio: 1
    },
    statusText: {
        color: "#FFF",
        fontSize: 24,
        fontFamily: 'SourceSansProBold',
    },
    timeDividerBox: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
    },
    timeDivider: {
    },
    listTimes: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-evenly"
    },
    itemTime: {
        flexGrow: 1,
        margin: 10,
    },
    emblemaTime: {
        width: 100,
        height: 100,
        aspectRatio: 1,
    },
    actionBox: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
    },
    actionBtn: {
        minWidth: '60%',
        paddingVertical: 20,
        paddingHorizontal: 30,
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
        marginBottom: 20,
        borderRadius: 10,
        fontSize: 20,
        fontFamily: 'SourceSansProSemiBold',
        color: "#FFF"
    }
});

