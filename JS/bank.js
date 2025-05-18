let bankValue = parseInt(localStorage.getItem('bankValue')) || 10;
let lastUpdate = parseInt(localStorage.getItem('lastUpdate')) || Date.now();

export function getBank() {
    return bankValue;
}

export function saveBankValue() {
    localStorage.setItem('bankValue', bankValue);
    localStorage.setItem('lastUpdate', Date.now());
}

export function updateBank(amount) {
    bankValue += amount;
    renderBank();
    saveBankValue();
}

export function canAfford(amount) {
    return amount <= bankValue && amount > 0;
}

export function renderBank() {
    const bankDiv = document.getElementById('Totl');
    if (bankDiv) {
        bankDiv.textContent = `C u r r e n t - P o i n t s : ${bankValue}`;
    }
}

export function renderMode(type) {
    const modeDiv = document.getElementById('Mode');
    if (modeDiv) {
        modeDiv.textContent = `Current Mode: ${type}`;
    }
}

export function renderCounter(count) {
    const counterDiv = document.getElementById('true')
    if (counterDiv) {
        counterDiv.textContent = `Left: ${count}`;
    }
}

function updateBankValuePeriodically() {
    const now = Date.now();
    const timeElapsed = Math.floor((now - lastUpdate) / 60000);

    if (timeElapsed >= 60) {
        bankValue = 10;
        lastUpdate = now;
        saveBankValue();
    } else if (timeElapsed >= 2) {
        bankValue += Math.floor(timeElapsed / 2) * 5;
        lastUpdate += Math.floor(timeElapsed / 2) * 2 * 60000;
        saveBankValue();
    }

    renderBank();
}

setInterval(updateBankValuePeriodically, 1000);

window.addEventListener('load', () => {
    updateBankValuePeriodically();
    renderBank();
});