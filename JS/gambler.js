import { getBank, updateBank, canAfford, renderBank } from './bank.js'; 
import { showColor, hideColor, startSpinningReels } from './visionary.js';

class PrivatePureLoveTrain {
    constructor() {
        this.num1 = 0;
        this.num2 = 0;
        this.num3 = 0;
        this.pachinko = 0;
        this.roll = 0;
        this.probability = 0;
        this.faster = 0;
        this.jackpot = 0;
        this.count = 0;
        this.spin = 0;
    }

    initializePachinko() {
        this.faster = 0;
        this.probability = 0;
        this.jackpot = 0;
        this.count = 0;
        this.spin = Math.floor(Math.random() * 20) + 1;

        if (this.spin === 20) this.pachinko = 4;
        else if (this.spin > 15) this.pachinko = 3;
        else if (this.spin > 10) this.pachinko = 2;
        else this.pachinko = 1;

        switch (this.pachinko) {
            case 1:
                this.roll = 2;
                console.log("Green");
                break;
            case 2:
                this.roll = 4;
                console.log("Red");
                break;
            case 3:
                this.roll = 6;
                console.log("Gold");
                break;
            case 4:
                this.jackpot = 1;
                step=1;
                console.log("Rainbow");
                break;
        }
    }

    getColor() {
        switch (this.pachinko) {
            case 1: return 'Green';
            case 2: return 'Red';
            case 3: return 'Gold';
            case 4: return 'Rainbow';
            default: return null;
        }
    }

    doSpin() {
        if (this.jackpot !== 1) {
            this.num1 = Math.floor(Math.random() * 7) + 1;
            this.num2 = Math.floor(Math.random() * 7) + 1;
            this.num3 = Math.floor(Math.random() * 7) + 1;

            console.log(`${this.num1} ${this.num2} ${this.num3}`);

            if (this.num1 === this.num2 && this.num1 === this.num3) {
                this.jackpot = 1;
            }
        }
    }

    finalize(cost, plinko) {
        if (this.jackpot === 1) {
            cost = cost * plinko;
            console.log(`Jackpot +${cost} $`);

            if ([2, 4, 6].includes(this.num1)) this.probability = 1;
            if ([1, 3, 5].includes(this.num1)) this.faster = 1;
            if (this.num1 === 7) this.probability = 2;
        } else {
            cost = cost * -1;
            console.log(`No Jackpot. -${cost} $`);
        }
        return cost;
    }
}

let game = null;
let cost = 0;
let step = 0;
let canPress = true;

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (!canPress) {
            console.log("Wait for cooldown...");
            return;
        }

        handleStep();
    }
});


function handleStep() {
    switch (step) {
        case 0:
            const input = document.getElementById("costInput");
            cost = parseInt(input.value, 10);
            if (isNaN(cost)) {
                console.log("Please enter a valid number.");
                return;
            }
            if (!canAfford(cost)) {
                console.log("You can't afford this bet.");
                return;
            }

            game = new PrivatePureLoveTrain();
            game.initializePachinko();
            showColor(game.getColor());
            step++;
            startCooldown(1000);
            break;

        case 1:
            hideColor();
            game.doSpin();
            startSpinningReels(game.num1, game.num2, game.num3);
            startCooldown(6500);

            if (game.roll === 0) {
                const result = game.finalize(cost, 1);
                updateBank(result);
                renderBank();
                console.log("Result:", result);
                reset();
                return;
            }

            game.count++;
            if (game.jackpot === 1 || game.count === game.roll) {
                step++;
            }
            break;

        case 2:
            hideColor();
            const result = game.finalize(cost, 1);
            updateBank(result);
            renderBank();
            console.log("Result:", result);
            reset();
            startCooldown(1000);
            break;
    }
}


function reset() {
    step = 0;
    game = null;
}

function startCooldown(ms) {
    canPress = false;
    setTimeout(() => {
        canPress = true;
        console.log("Cooldown complete. You may press Enter again.");
    }, ms);
}

document.addEventListener("DOMContentLoaded", () => {
    renderBank();
});
