
//GAME VARS
const apm = 10;
const maxTime = 90;
const maxPos = 7; //FIXED

//GAME VALUES
let scoreHome = 0;
let scoreAway = 0;
let homeTeam = {};
let awayTeam = {};
let matchHistory = [];
let currentPos = 0;
let currentPlayer = {};
let newPlayer = {};
let currentCPlayer = {};
let faultP = [];
let ballPossess = 0; //HOME = 0, AWAY = 1

const baseAcao = {
    'chute': [{ 's': 0, 'p': 0 }, { 's': 0, 'p': 0 }, { 's': 0, 'p': 0 }, { 's': 0, 'p': 0 }, { 's': 0, 'p': 0 }, { 's': 0, 'p': 0 }, { 's': 0.01, 'p': 0.01 }, { 's': 0.05, 'p': 0.01 }, { 's': 0.05, 'p': 0.01 }, { 's': 0.05, 'p': 0.05 }, { 's': 0.05, 'p': 0.05 }, { 's': 0.2, 'p': 0.05 }, { 's': 0.3, 'p': 0.1 }, { 's': 0.3, 'p': 0.1 }, { 's': 0.5, 'p': 0.5 }],
    'passe': [{ 's': 0.8, 'p': 0.95 }, { 's': 0.8, 'p': 0.95 }, { 's': 0.8, 'p': 0.95 }, { 's': 0.8, 'p': 0.95 }, { 's': 0.8, 'p': 0.95 }, { 's': 0.8, 'p': 0.95 }, { 's': 0.8, 'p': 0.94 }, { 's': 0.8, 'p': 0.94 }, { 's': 0.8, 'p': 0.94 }, { 's': 0.8, 'p': 0.9 }, { 's': 0.8, 'p': 0.9 }, { 's': 0.8, 'p': 0.9 }, { 's': 0.8, 'p': 0.85 }, { 's': 0.6, 'p': 0.85 }, { 's': 0.6, 'p': 0.4 }],
    'drible': [{ 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }, { 's': 0.3, 'p': 0.05 }],
}

export class Calculate {
    teamStatus(jogadores) {
        const defP = jogadores.filter(p => (p.pos === "g" || p.pos === "d") && p.titular);
        const def = Object.values(defP).reduce((t, a) => t + a.overall, 0) / defP.length;
        const midP = jogadores.filter(p => p.pos === "m" && p.titular);
        const mid = Object.values(midP).reduce((t, a) => t + a.overall, 0) / midP.length;
        const atkP = jogadores.filter(p => p.pos === "a" && p.titular);
        const atk = Object.values(atkP).reduce((t, a) => t + a.overall, 0) / atkP.length;
        let obj = { def: Math.ceil(def), mid: Math.ceil(mid), atk: Math.ceil(atk) }
        return obj;
    }
    playerStatus(jogador) {
        let overall = 0;
        if (jogador.pos === "g") {
            overall = jogador.defesa;
        } else if (jogador.pos === "d") {
            overall = (jogador.defesa + jogador.passe) / 2;
        } else if (jogador.pos === "m") {
            overall = (jogador.chute + jogador.passe + jogador.drible) / 3;
        } else if (jogador.pos === "a") {
            overall = (jogador.chute + jogador.passe + jogador.drible) / 3;
        }
        return Math.ceil(overall);
    }
    calculateGameStatus(match) {
        //console.log("match: ", match);
        const homeActions = match.filter(p => p.teamPos === 0);
        const awayActions = match.filter(p => p.teamPos === 1);
        const homeActStatus = {
            goals: homeActions.filter(p => p.goal).length,
            ballPossession: ((homeActions.length / ((maxTime + 1) * apm)) * 100),
            shots: homeActions.filter(p => p.action.acao === "chute").length,
            shotsPercS: homeActions.filter(p => p.action.acao === "chute" && p.action.finalStatus).length / homeActions.filter(p => p.action.acao === "chute").length * 100,
            passes: homeActions.filter(p => p.action.acao === "passe").length,
            passesPercS: homeActions.filter(p => p.action.acao === "passe" && p.action.finalStatus).length / homeActions.filter(p => p.action.acao === "passe").length * 100,
            dribbble: homeActions.filter(p => p.action.acao === "drible").length,
            dribbblePercS: homeActions.filter(p => p.action.acao === "drible" && p.action.finalStatus).length / homeActions.filter(p => p.action.acao === "drible").length * 100,
            faltas: homeActions.filter(p => p.falta).length,
        }
        const awayActStatus = {
            goals: awayActions.filter(p => p.goal).length,
            ballPossession: ((awayActions.length / ((maxTime + 1) * apm)) * 100),
            shots: awayActions.filter(p => p.action.acao === "chute").length,
            shotsPercS: awayActions.filter(p => p.action.acao === "chute" && p.action.finalStatus).length / awayActions.filter(p => p.action.acao === "chute").length * 100,
            passes: awayActions.filter(p => p.action.acao === "passe").length,
            passesPercS: awayActions.filter(p => p.action.acao === "passe" && p.action.finalStatus).length / awayActions.filter(p => p.action.acao === "passe").length * 100,
            dribbble: awayActions.filter(p => p.action.acao === "drible").length,
            dribbblePercS: awayActions.filter(p => p.action.acao === "drible" && p.action.finalStatus).length / awayActions.filter(p => p.action.acao === "drible").length * 100,
            faltas: awayActions.filter(p => p.falta).length,
        }
        //console.log("homeActStatus: ", homeActStatus);
        //console.log("awayActStatus: ", awayActStatus);
        return {
            homeActStatus: homeActStatus,
            awayActStatus: awayActStatus
        };
    }
}

export class Simulator {
    coinToss(perc) {
        return Math.random() < perc;
    }
    //METODO DE SORTEIO DE POSSIVEL POSIÇÃO PARA ONDE A BOLA IRÁ
    getPossiblePos(contra) {
        let array = [];
        let fator = 0;
        if (!contra)
            fator = (ballPossess === 0) ? 1 : -1;
        else {
            fator = (ballPossess === 0) ? -1 : 1;
        }

        let basePos = currentPos * fator;
        if (basePos >= -7 && basePos < -1) {
            array.push("d");
        }
        if (basePos > -3 && basePos < 5) {
            array.push("m");
        }
        if (basePos > 3) {
            array.push("a");
        }
        return array[Math.floor(Math.random() * array.length)]
    }
    //SORTEIO DE QUAL JOGADOR IRÁ RECEBER A BOLA
    rndPlayerbyPos(p, pos) {
        let pList = p.filter(p => p.pos === pos);

        const index = pList.findIndex(p => p == newPlayer);
        if (index !== -1) {
            pList.splice(index, 1);
        }
        const player = pList[Math.floor(Math.random() * pList.length)];
        return player === undefined ? pList.findIndex(p => p == newPlayer) : player;
    }


    progressRnd() {
        const rnd = Math.random();
        if (rnd < 0.05) {
            return "falta"
        } else if (rnd > 0.05 && rnd < 0.2) {
            return 1
        } else {
            return 0;
        }
    }
    decisionMethod(data, time) {
        let currentTeamPos = ballPossess === 0 ? currentPos : currentPos * -1;
        const chute = data.chute[currentTeamPos + 7];
        const passe = data.passe[currentTeamPos + 7];
        const drible = data.drible[currentTeamPos + 7];
        const rnd = Math.random();
        let resultObj = {
            acao: '',
            porc: 0
        };
        const lastround = matchHistory[matchHistory.length - 1];
        //console.log("lastround: ", lastround);
        if (lastround === undefined || (lastround.time === 45 && time === 46)) {
            resultObj = {
                acao: 'passe',
                porc: 1
            }
        } else if (lastround.falta) {
            const fator = ballPossess === 0 ? 1 : -1;
            if (currentPos * fator > 4) {
                resultObj = {
                    acao: 'chute',
                    porc: chute.s
                }
            } else {
                resultObj = {
                    acao: 'passe',
                    porc: passe.s
                }
            }
        } else {
            if (rnd < chute.p) {
                resultObj = {
                    acao: 'chute',
                    porc: chute.s
                }
            } else if (rnd > chute.p && rnd < chute.p + passe.p) {
                resultObj = {
                    acao: 'passe',
                    porc: passe.s
                }
            } else if (rnd > chute.p + passe.p && rnd < chute.p + passe.p + drible.p) {
                resultObj = {
                    acao: 'drible',
                    porc: drible.s
                }
            }
        }
        return resultObj;
    }
    progressMethod(decision) {
        let pList = [];
        let cList = [];
        if (ballPossess === 0) {
            pList = homeTeam.jogadores.filter(p => p.titular && p.active);
            cList = awayTeam.jogadores.filter(p => p.titular && p.active);
        } else {
            cList = homeTeam.jogadores.filter(p => p.titular && p.active);
            pList = awayTeam.jogadores.filter(p => p.titular && p.active);
        }

        //const lastround = matchHistory[matchHistory.length - 1];
        //console.log("lastround: ", lastround);
        //if (lastround === undefined) {

        //} else if (lastround.falta) {

        //}
        let cPos = decision.acao === "chute" ? "g" : this.getPossiblePos(true);
        currentCPlayer = this.rndPlayerbyPos(cList, cPos);
        //COIN TOSS PARA O JOGADOR PELA AÇÃO
        const pSuccess = this.coinToss(newPlayer[decision.acao] / 100);
        //COIN TOSS PARA A AÇÃO
        const success = this.coinToss(decision.porc);
        //COIN TOSS PARA O JOGADOR CONTRA A AÇÃO
        const cpSuccess = this.coinToss(currentCPlayer.defesa / 100);

        const fator = ballPossess === 0 ? 1 : -1;
        let resultObj = {};
        resultObj.playerSuccess = pSuccess;
        resultObj.basicSucess = success;
        resultObj.counterPlayerSuccess = cpSuccess;
        resultObj.falta = false;
        resultObj.yCard = "";
        resultObj.rCard = "";
        resultObj.keyMoment = false;
        currentPlayer = newPlayer;

        if (pSuccess && success && !cpSuccess) {
            //GOL
            //console.log("SUCESSO");
            resultObj.pos = 1 * fator;
            if (decision.acao === "chute") {
                resultObj.keyMoment = true;
                const player = this.rndPlayerbyPos(cList, "a");
                newPlayer = player;
            } else if (decision.acao === "passe") {
                let pos = this.getPossiblePos(false);
                const player = this.rndPlayerbyPos(pList, pos);
                newPlayer = player;
            }
        } else if (pSuccess && success && cpSuccess) {
            //PODE SER ESCANTEIO OU REBOTE OU FALTA
            //console.log("FAIL MAS MANTEM POSSE");
            const newprogress = this.progressRnd();
            //console.log("newprogress: ", newprogress);
            resultObj.pos = newprogress * fator;
            if (decision.acao === "chute") {
                resultObj.keyMoment = true;
                //currentPos = 7 * fator; //VAI PARA A MÃO DO GOLEIRO
                currentPos = 0; //GOLEIRO CHUTA PARA O MEIO DE CAMPO


                let pos = this.getPossiblePos(false);
                let rnd = this.coinToss(0.5);
                resultObj.pos = 0;
                if (rnd) {
                    ballPossess = ballPossess === 0 ? 1 : 0;
                    const player = this.rndPlayerbyPos(cList, pos);
                    newPlayer = player;
                } else {
                    const player = this.rndPlayerbyPos(pList, pos);
                    newPlayer = player;
                }
            } else {

                if (newprogress === "falta") {
                    resultObj.keyMoment = true;
                    resultObj.pos = 0;
                    resultObj.falta = true;
                    faultP.push(currentCPlayer.id);
                    //console.log("faultP: ", faultP);
                    const userFaults = faultP.filter(p => p === currentCPlayer.id).length;
                    if ((userFaults > 2 && currentCPlayer.yCard == 0) || (userFaults > 4 && currentCPlayer.yCard == 1)) {
                        //console.log("CARTÃO AMARELO PARA: ", currentCPlayer.nome);
                        currentCPlayer.yCard++;
                        resultObj.yCard = currentCPlayer.id;
                        if (currentCPlayer.yCard === 2) {
                            //console.log("CARTÃO VERMELHO PARA: ", currentCPlayer.nome);
                            currentCPlayer.rCard++;
                            currentCPlayer.active = false;
                            resultObj.rCard = currentCPlayer.id;
                        }
                    }
                }
                let pos = this.getPossiblePos(false);
                //console.log("pos: ", pos);
                //console.log("pList: ", pList);
                const player = this.rndPlayerbyPos(pList, pos);
                //console.log("player: ", player);
                newPlayer = player;
            }



        } else {
            //BOLA DO GOLEIRO CHUTA PARA O MEIO DE CAMPO OU SAI JOGANDO
            //console.log("FAIL");
            resultObj.pos = 0;
            if (decision.acao === "chute") {
                resultObj.keyMoment = true;
                let cPos = this.getPossiblePos(true);
                //console.log("cPos: ", cPos);
                newPlayer = this.rndPlayerbyPos(cList, cPos);
            } else {
                newPlayer = currentCPlayer;
            }
            ballPossess = ballPossess === 0 ? 1 : 0;
        }
        resultObj.goal = decision.acao === "chute" && pSuccess && success && !cpSuccess;
        resultObj.result = pSuccess && success && !cpSuccess;




        return resultObj;
    }
    simulateRound(time, apm) {
        for (let j = 0; j < apm; j++) {


            const initialPos = currentPos;
            let porcBase = baseAcao;
            const decision = this.decisionMethod(porcBase, time);

            const progress = this.progressMethod(decision);

            if (progress.goal) {
                currentPos = 0;

                if (ballPossess === 0) {
                    scoreHome += 1;
                } else {
                    scoreAway += 1;
                }
                ballPossess = ballPossess === 0 ? 1 : 0;
            } else {
                if ((currentPos < maxPos && ballPossess === 0) || (currentPos > maxPos * -1 && ballPossess === 1))
                    currentPos += progress.pos;
            }

            const round = {
                time: time,
                initialPos: initialPos,
                ballPos: currentPos,
                goal: progress.goal,
                teamPos: ballPossess,
                falta: progress.falta,
                yCard: progress.yCard,
                rCard: progress.rCard,
                keyMoment: progress.keyMoment,
                score: [scoreHome, scoreAway],
                newPlayer: newPlayer,
                currentCPlayer: currentCPlayer,
                currentPlayer: currentPlayer,
                action: {
                    acao: decision.acao,
                    finalStatus: progress.result,
                    counterResult: progress.counterPlayerSuccess,
                    playerResult: progress.playerSuccess,
                    basicResult: progress.basicSucess
                }
            };
            //if (round.action.acao === "chute" && round.action.finalStatus) {
            //    console.log(round.time + "m - " + "GOOOOL do " + round.currentPlayer.nome + " do time " + (round.teamPos === 0 ? homeTeam.nome : awayTeam.nome) + " com um chute da posição " + round.initialPos + " fazendo o placar ficar: " + scoreHome + "-" + scoreAway);
            //} else {
            //    console.log(round.time + "m - " + round.currentPlayer.nome + " do time " + (round.teamPos === 0 ? homeTeam.nome : awayTeam.nome) + " tentou um " + round.action.acao + (round.action.finalStatus ? " com sucesso " : " sem sucesso ") + "e a bola foi para " + round.newPlayer.nome + " saindo de " + round.initialPos + " para " + round.ballPos);
            //}

            //console.log("round: ", round);
            //console.log("------------------------");
            matchHistory.push(round);
        }

    }

    simulate(home, away) {

        homeTeam = JSON.parse(JSON.stringify(home))
        awayTeam = JSON.parse(JSON.stringify(away))
        homeTeam.score = 0;
        awayTeam.score = 0;


        for (let i = 0; i <= maxTime; i++) {
            if (i == 0) {
                const player = this.rndPlayerbyPos(homeTeam.jogadores.filter(p => p.titular), "a");
                newPlayer = player;
                currentPlayer = player;
                currentPos = 0;
                ballPossess = 0;
            } else if (i == 46) {
                const player = this.rndPlayerbyPos(awayTeam.jogadores.filter(p => p.titular), "a");
                newPlayer = player;
                currentPlayer = player;
                currentPos = 0;
                ballPossess = 1;
            }
            this.simulateRound(i, apm);
            //console.log("--------------------------------");
        }
        //console.log("faultP: ", faultP);

        homeTeam.score = scoreHome;
        awayTeam.score = scoreAway;
        let statistics = new Calculate().calculateGameStatus(matchHistory);
        const obj = { score: [scoreHome, scoreAway], matchHistory: matchHistory, home: homeTeam, away: awayTeam, statistics: statistics }

        this.resetValues();
        return obj;
    }
    resetValues() {
        scoreHome = 0;
        scoreAway = 0;
        matchHistory = [];
        faultP = [];
        currentPos = 0;
        ballPossess = 0;
    }
}
