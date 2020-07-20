
let apm = 1;
let maxTime = 90;
let maxPos = 7;

let scoreHome = 0;
let scoreAway = 0;
let matchHistory = [];
let currentPos = 0;

export default class Simulator {
    coinToss() {
        return Math.random() > 0.5 ? +1 : -1;
    }
    simulateRound(time) {
        currentPos += this.coinToss();
        let goal = false;
        if (currentPos > maxPos) {
            scoreHome += 1
            currentPos = 0;
            goal = true;
        } else if (currentPos < maxPos * -1) {
            scoreAway += 1
            currentPos = 0;
            goal = true;
        }
        let round = {
            time: time,
            ballPos: currentPos,
            goal: goal,
            score: [scoreHome, scoreAway]
        };
        //console.log("round: ", round);
        matchHistory.push(round);
    }

    simulate(a = apm, mt = maxTime, mp = maxPos) {
        let time = 0;
        for (let i = 0; i <= maxTime; i++) {
            this.simulateRound(i);
            time++;
        }
        const obj = { score: [scoreHome, scoreAway], matchHistory: matchHistory }
        //console.log("obj: ", obj);
        //console.log("score: ", score);
        //console.log("matchHistory: ", matchHistory.length);
        scoreHome = 0;
        scoreAway = 0;
        matchHistory = [];
        currentPos = 0;
        return obj;
    }

}



