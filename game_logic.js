const SAVE = loadGame();
const game = SAVE ? new Game(...SAVE) : new Game();

function D20Clicker() {
    let roll = Math.ceil(Math.random() * 20);
    game.changeCurrency(roll);
    if(roll < 10) roll = "0" + roll;
    document.getElementById("D20").innerHTML = roll;
}

function levelUp(attribute) {
    if(game[attribute].cost < game.currency) {
        game.changeCurrency(-game[attribute].cost);
        game[attribute].levelUp();
        document.getElementById(attribute + "Level").innerHTML = game[attribute].level;
        document.getElementById(attribute + "Cost").innerHTML = game[attribute].cost;
    }
}

function saveGame() {
    localStorage.setItem("d20Save", game.saveObject());
}

function deleteSave() {
    localStorage.clear();
}

function loadGame() {
    let save = localStorage.getItem("d20Save");
    if (save) {
        save = save.split(",").map(x => parseInt(x));
        return save;
    }
    return null;
}

function formatNumber(number) {
    let formated = [];
    number = String(number).split("").reverse();
    while (number.length > 0) {
        if(formated.length % 4 === 3) formated.unshift(".");
        formated.unshift(number.shift());
    }
    return formated.join("");
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize HTML with Game State.
    document.getElementById("currencyCounter").innerHTML = game.currency;
    document.getElementById("warriorLevel").innerHTML = game.warrior.level;
    document.getElementById("warriorCost").innerHTML = game.warrior.cost;
    document.getElementById("arcanistLevel").innerHTML = game.arcanist.level;
    document.getElementById("arcanistCost").innerHTML = game.arcanist.cost;
    document.getElementById("dragonLevel").innerHTML = game.dragon.level;
    document.getElementById("dragonCost").innerHTML = game.dragon.cost;
        
    setInterval(() => {
        const warriorTick = game.warrior.level / 10;
        const arcanistTick = game.arcanist.level / 2;
        const dragonTick = game.dragon.level * 4;
        game.changeCurrency(warriorTick);
        game.changeCurrency(arcanistTick);
        game.changeCurrency(dragonTick);
        const generation = (warriorTick + arcanistTick + dragonTick) * 10;
        document.getElementById("currencyPerSecond").innerHTML = formatNumber(generation) + " / second";
    }, 100);

    
    setInterval(() => {
        document.title = game.currency.toFixed() + " D20 Clicker";
    }, 3000);
});

