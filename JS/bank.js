let bankValue = 10;

export function getBank() {
    return bankValue;
}

export function updateBank(amount) {
    bankValue += amount;
    renderBank();
}

export function canAfford(amount) {
    return amount <= bankValue && amount >= 0;
}

export function renderBank() {
    const bankDiv = document.getElementById("Totl");
    if (bankDiv) {
        bankDiv.textContent = `C u r r e n t - P o i n t s : ${bankValue}`;
    }
}