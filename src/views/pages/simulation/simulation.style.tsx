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
    selecaoTituloBox: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center'
    },
    selecaoTitulo: {
        fontFamily: 'Lalezar',
        fontSize: 40,
        color: '#FFF',
        textAlign: 'center'
    },
    timesSelecionados: {
        flex: 2,
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
    timeTitle: {
        textAlign: "center",
        fontFamily: 'Lalezar',
        fontSize: 20,
        marginBottom: 15,
        color: '#FFF'
    },
    timeSelected: {
        alignSelf: "center",
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderColor: '#FFF',
        borderRadius: 5,
        borderWidth: 3,
        borderStyle: "solid",
        width: '80%',
        marginHorizontal: 20,
        marginBottom: 30,
        aspectRatio: 1
    },
    timeDividerBox: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
    },
    timeDivider: {
        width: 50,
        height: 10,
        borderRadius: 10,
        alignSelf: "center",
        backgroundColor: '#FFF',
        marginTop: 40
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
    }
});

