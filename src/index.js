const player1 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0
}

const player2 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0
}

async function rollDice() {
    // retornando o número de 1 a 6
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} rolou um dado tipo ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`Rodada ${round}`);

        // sortear bloco
        // se eu não usasse o await aqui apareceria "Bloco: [object Promise]" no terminal
        let block = await getRandomBlock(); 
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "velocidade", diceResult1, character1.VELOCIDADE);
            await logRollResult(character2.NOME, "velocidade", diceResult2, character2.VELOCIDADE);

            if (totalTestSkill1 === totalTestSkill2) {
                console.log("Reta empatada!");
            }
        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade", diceResult2, character2.MANOBRABILIDADE);

            if (totalTestSkill1 === totalTestSkill2) {
                console.log("Curva empatada!");
            }

        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou ${character2.NOME}!`);

            await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

            if ((powerResult1 > powerResult2) && (character2.PONTOS > 0)) {
                console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto.`);
                character2.PONTOS--;
            } else if ((powerResult2 > powerResult1) && (character1.PONTOS > 0)) {
                console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto.`);
                character1.PONTOS--;
            } else if (powerResult1 === powerResult2) {
                console.log("Confronto empatado! Ninguém perdeu pontos.");
            }
        } 
        
        if (block !== "CONFRONTO") {
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} marcou um ponto!`);
                character1.PONTOS++;
            } else {
                console.log(`${character2.NOME} marcou um ponto!`);
                character2.PONTOS++;
            }
        }

        console.log("-------------------------------");
    }
}

async function declareWinner(character1, character2) {
    console.log("Resultado final:");
    console.log(`${character1.NOME}: ${character1.PONTOS} pontos.`);
    console.log(`${character2.NOME}: ${character2.PONTOS} pontos.`);

    if (character1.PONTOS >  character2.PONTOS) {
        console.log(`${character1.NOME} venceu! Parabens :D`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`${character2.NOME} venceu! Parabens :D`);
    } else {
        console.log("A corrida terminou em empate :/");
    }

}

// função que roda sempre que o programa é executado
(async function main() {
    console.log(
        `Os jogadores ${player1.NOME} e ${player2.NOME} iniciaram a corrida!`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();

