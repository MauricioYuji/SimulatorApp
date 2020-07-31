


//GAME VARS
const apm = 1;
const maxTime = 90;
const maxPos = 7; //FIXED

//GAME VALUES
let scoreHome = 0;
let scoreAway = 0;
let matchHistory: Array<object> = [];
let currentPos = 0;
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
        const homeActions = match.filter(p => p.teamPos === 0);
        const awayActions = match.filter(p => p.teamPos === 1);
        const homeActStatus = {
            ballPossession: ((homeActions.length / ((maxTime + 1) * apm)) * 100) + "%",
            shots: "(" + homeActions.filter(p => p.action.acao === "chute").length + ")",
            passes: "(" + homeActions.filter(p => p.action.acao === "passe").length + ")",
            dribbble: "(" + homeActions.filter(p => p.action.acao === "drible").length + ")",
        }
        const awayActStatus = {
            ballPossession: ((awayActions.length / ((maxTime + 1) * apm)) * 100) + "%",
            shots: "(" + awayActions.filter(p => p.action.acao === "chute").length + ")",
            passes: "(" + awayActions.filter(p => p.action.acao === "passe").length + ")",
            dribbble: "(" + awayActions.filter(p => p.action.acao === "drible").length + ")",
        }
        console.log("homeActStatus: ", homeActStatus);
        console.log("awayActStatus: ", awayActStatus);
        return null;
    }
}

export class Simulator {
    coinToss(perc) {
        return Math.random() < perc;
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
    progressMethod(success, decision) {
        const fator = ballPossess === 0 ? 1 : -1;
        let resultObj = null;
        if (success) {
            if (decision.acao === "chute") {
                resultObj = {
                    goal: true,
                    pos: 0
                }
            } else {
                resultObj = {
                    goal: false,
                    pos: 1 * fator
                }
            }
        } else {
            resultObj = {
                goal: false,
                pos: 0
            }
        }
        return resultObj;
    }
    simulateRound(time, apm, team) {
        for (let j = 0; j < apm; j++) {
            const initialPos = currentPos;
            const teamPos = ballPossess;
            let porcBase = team.data;
            //console.log("TIME: ", (ballPossess === 0 ? "HOME" : "AWAY"));
            const decision = this.decisionMethod(porcBase);

            const result = this.coinToss(decision.porc);
            //console.log("decision: ", decision, " - result: ", result);
            if (!result) {
                ballPossess = ballPossess === 0 ? 1 : 0;
            }
            const progress = this.progressMethod(result, decision);
            //console.log("progress: ", progress);
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
                action: {
                    acao: decision.acao, status: result
                }
            };
            //console.log("round: ", round);
            matchHistory.push(round);
        }

    }

    simulate(home, away) {

        let homeTeam = JSON.parse(JSON.stringify(home))
        let awayTeam = JSON.parse(JSON.stringify(away))
        homeTeam.score = 0;
        awayTeam.score = 0;
        for (let i = 0; i <= maxTime; i++) {
            const team = ballPossess === 0 ? homeTeam : awayTeam;
            this.simulateRound(i, apm, team);
            //console.log("--------------------------------");
        }

        homeTeam.score = scoreHome;
        awayTeam.score = scoreAway;
        let status = new Calculate().calculateGameStatus(matchHistory);
        const obj = { score: [scoreHome, scoreAway], matchHistory: matchHistory, home: homeTeam, away: awayTeam }

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



