let colorDisplay = null;

export function showColor(color) {
    hideColor();
    colorDisplay = document.createElement("img");
    colorDisplay.src = `Images/Colour/${color}.webp`;
    colorDisplay.id = "colorFlash";
    colorDisplay.style.position = "absolute";
    colorDisplay.style.top = "10vh";
    colorDisplay.style.left = "35vw";
    colorDisplay.style.width = "30vw";
    colorDisplay.style.zIndex = "999";
    document.body.appendChild(colorDisplay);
}

export function hideColor() {
    const existing = document.getElementById("colorFlash");
    if (existing) existing.remove();
}

export function showJackpot(ms) {
    setTimeout(() => {
    let jackpotDisplay = document.createElement("p");
    jackpotDisplay.id = "jackpotFlash";
    jackpotDisplay.style.position = "absolute";
    jackpotDisplay.style.top = "40vh";
    jackpotDisplay.style.left = "35vw";
    jackpotDisplay.style.width = "30vw";
    jackpotDisplay.style.zIndex = "999";
    jackpotDisplay.style.color = "white";
    jackpotDisplay.style.textAlign = "center";
    jackpotDisplay.style.fontSize = "5vw";
    jackpotDisplay.style.webkitTextStroke = "2px black";
    jackpotDisplay.style.fontFamily = "'Press Start 2P', serif";
    jackpotDisplay.innerText = "JACKPOT";
    document.body.appendChild(jackpotDisplay);
    }, ms);
}

export function hideJackpot() {
    const existing = document.getElementById("jackpotFlash");
    if (existing) existing.remove();
}

export function startSpinningReels(num1, num2, num3) {
    const reels = [
        document.getElementById("Slide1"),
        document.getElementById("Slide2"),
        document.getElementById("Slide3")
    ];
    const targets = [num1, num2, num3];

    reels.forEach((reel, index) => {
        let wrapper = reel.querySelector('.reelWrapper');
        const targetId = String(targets[index]);

        if (!wrapper) {
            const images = Array.from(reel.querySelectorAll("img"));
            wrapper = document.createElement('div');
            wrapper.className = 'reelWrapper';
            wrapper.style.position = 'relative';
            wrapper.style.top = '0px';
            wrapper.style.transition = 'none';

            for (let i = 0; i < 4; i++) {
                images.forEach(img => {
                    const clone = img.cloneNode(true);
                    wrapper.appendChild(clone);
                });
            }

            reel.innerHTML = '';
            reel.appendChild(wrapper);
        }

        wrapper.style.transition = 'none';
        wrapper.style.top = '0px';

        const allImages = Array.from(wrapper.querySelectorAll("img"));
        const imageHeight = allImages[0].clientHeight || 100;
        const loopHeight = allImages.length * imageHeight;

        let offset = 0;
        const speed = 24;
        const spinStart = performance.now();

        let animationFrame;

        function spinStep(timestamp) {
            const elapsed = timestamp - spinStart;
            offset += speed;
            if (offset >= loopHeight * 2) offset -= loopHeight;

            wrapper.style.transition = 'none';
            wrapper.style.top = `-${offset}px`;

            if (elapsed < 5000) {
                animationFrame = requestAnimationFrame(spinStep);
            } else {
                slowToResult(offset);
            }
        }

        function slowToResult(currentOffset) {
            const visibleImages = Array.from(wrapper.querySelectorAll("img"));
            const total = visibleImages.length;

            let currentIndex = Math.floor(currentOffset / imageHeight);
            let targetIndex = -1;

            for (let i = currentIndex + 1; i < total; i++) {
                if (visibleImages[i].id === targetId) {
                    targetIndex = i;
                    break;
                }
            }

            if (targetIndex === -1) {
                for (let i = 0; i < total; i++) {
                    if (visibleImages[i].id === targetId) {
                        targetIndex = i;
                        break;
                    }
                }
            }

            const targetOffset = targetIndex * imageHeight;
            const distance = targetOffset - currentOffset;
            const duration = Math.min(Math.max(1000, (distance / speed) * 16), 3000);

            wrapper.style.transition = `top ${duration}ms ease-out`;
            wrapper.style.top = `-${targetOffset}px`;

            cancelAnimationFrame(animationFrame);
        }

        requestAnimationFrame(spinStep);
    });
}