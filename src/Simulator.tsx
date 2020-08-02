

//GAME VARS
const apm = 5;
const maxTime = 90;
const maxPos = 7; //FIXED

//GAME VALUES
let scoreHome = 0;
let scoreAway = 0;
let homeTeam = {};
let awayTeam = {};
let matchHistory = [];
let currentPos = 0;
let prevPlayer = {};
let currentPlayer = {};
let ballPossess = 0; //HOME = 0, AWAY = 1
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
            shotsPercS: homeActions.filter(p => p.action.acao === "chute" && p.action.status).length / homeActions.filter(p => p.action.acao === "chute").length * 100,
            passes: homeActions.filter(p => p.action.acao === "passe").length,
            passesPercS: homeActions.filter(p => p.action.acao === "passe" && p.action.status).length / homeActions.filter(p => p.action.acao === "passe").length * 100,
            dribbble: homeActions.filter(p => p.action.acao === "drible").length,
            dribbblePercS: homeActions.filter(p => p.action.acao === "drible" && p.action.status).length / homeActions.filter(p => p.action.acao === "drible").length * 100,
        }
        const awayActStatus = {
            goals: awayActions.filter(p => p.goal).length,
            ballPossession: ((awayActions.length / ((maxTime + 1) * apm)) * 100),
            shots: awayActions.filter(p => p.action.acao === "chute").length,
            shotsPercS: awayActions.filter(p => p.action.acao === "chute" && p.action.status).length / awayActions.filter(p => p.action.acao === "chute").length * 100,
            passes: awayActions.filter(p => p.action.acao === "passe").length,
            passesPercS: awayActions.filter(p => p.action.acao === "passe" && p.action.status).length / awayActions.filter(p => p.action.acao === "passe").length * 100,
            dribbble: awayActions.filter(p => p.action.acao === "drible").length,
            dribbblePercS: awayActions.filter(p => p.action.acao === "drible" && p.action.status).length / awayActions.filter(p => p.action.acao === "drible").length * 100,
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
    getPossiblePos() {
        let array = [];
        const fator = ballPossess === 0 ? 1 : -1;
        let basePos = currentPos * fator;
        if (basePos === -7) {
            array.push("g");
        }
        if (basePos > -7 && basePos < -1) {
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

        const index = pList.findIndex(p => p == currentPlayer);
        if (index !== -1) {
            pList.splice(index, 1);
        }
        return pList[Math.floor(Math.random() * pList.length)];
    }
    decisionMethod(data) {
        let currentTeamPos = ballPossess === 0 ? currentPos : currentPos * -1;
        const chute = data.chute[currentTeamPos + 7];
        const passe = data.passe[currentTeamPos + 7];
        const drible = data.drible[currentTeamPos + 7];
        const rnd = Math.random();
        let resultObj = {
            acao: '',
            porc: 0
        };
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
        return resultObj;
    }
    progressMethod(decision) {
        const pSuccess = this.coinToss(currentPlayer[decision.acao] / 100);
        const success = this.coinToss(decision.porc);
        //console.log("player: " + currentPlayer.nome + " " + decision.acao + " " + currentPlayer[decision.acao] + ": " + pSuccess);
        //console.log("decision: ", decision, " - result: ", success);
        const fator = ballPossess === 0 ? 1 : -1;
        let resultObj = {};




        let pList = [];
        let pos = this.getPossiblePos();


        if (success && pSuccess) {
            resultObj.pos = this.coinToss(1 / apm) ? 1 * fator : 0;


            if ((ballPossess === 0 && decision.acao !== "chute") || (ballPossess === 1 && decision.acao === "chute")) {
                pList = homeTeam.jogadores.filter(p => p.titular);
            } else {
                pList = awayTeam.jogadores.filter(p => p.titular);
            }
            if (decision.acao === "chute") {
                pos = "a";
            }

        } else {
            resultObj.pos = 0;


            if (ballPossess === 0) {
                pList = awayTeam.jogadores.filter(p => p.titular);
            } else {
                pList = homeTeam.jogadores.filter(p => p.titular);
            }
        }
        resultObj.goal = decision.acao === "chute" && success;
        resultObj.result = success;


        prevPlayer = currentPlayer;

        const player = this.rndPlayerbyPos(pList, pos);
        currentPlayer = player;


        return resultObj;
    }
    simulateRound(time, apm, team) {
        for (let j = 0; j < apm; j++) {
            const initialPos = currentPos;
            const teamPos = ballPossess;
            let porcBase = team.data;
            //console.log("TIME: ", (ballPossess === 0 ? "HOME" : "AWAY"));
            const decision = this.decisionMethod(porcBase);

            //const result = this.coinToss(decision.porc);
            ////console.log("decision: ", decision, " - result: ", result);
            //if (!result) {
            //    ballPossess = ballPossess === 0 ? 1 : 0;
            //}
            const progress = this.progressMethod(decision);
            //console.log("progress: ", progress);

            if (!progress.result) {
                ballPossess = ballPossess === 0 ? 1 : 0;
            }
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
                teamPos: teamPos,
                score: [scoreHome, scoreAway],
                currentPlayer: currentPlayer,
                prevPlayer: prevPlayer,
                action: {
                    acao: decision.acao, status: progress.result
                }
            };
            //if (round.action.acao === "chute" && round.action.status) {
            //    console.log(round.time + "m - " + "GOOOOL do " + round.prevPlayer.nome + " do time " + (round.teamPos === 0 ? homeTeam.nome : awayTeam.nome) + " com um chute da posição " + round.initialPos + " fazendo o placar ficar: " + scoreHome + "-" + scoreAway);
            //} else {
            //    console.log(round.time + "m - " + round.prevPlayer.nome + " do time " + (round.teamPos === 0 ? homeTeam.nome : awayTeam.nome) + " tentou um " + round.action.acao + (round.action.status ? " com sucesso " : " sem sucesso ") + "e a bola foi para " + round.currentPlayer.nome + " saindo de " + round.initialPos + " para " + round.ballPos);
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


        const player = this.rndPlayerbyPos(homeTeam.jogadores.filter(p => p.titular), "a");
        currentPlayer = player;
        prevPlayer = player;
        for (let i = 0; i <= maxTime; i++) {
            const team = ballPossess === 0 ? homeTeam : awayTeam;
            this.simulateRound(i, apm, team);
            //console.log("--------------------------------");
        }

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
        currentPos = 0;
        ballPossess = 0;
    }
}




