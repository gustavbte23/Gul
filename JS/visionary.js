let colorDisplay = null;
let spinning = false;

export function showColor(color) {
    hideColor();
    colorDisplay = document.createElement("img");
    colorDisplay.src = `Images/Colour/${color}.png`;
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

export function startSpinningReels(num1, num2, num3) {
    const reels = [
        document.getElementById("Slide1"),
        document.getElementById("Slide2"),
        document.getElementById("Slide3")
    ];
    const targets = [num1, num2, num3];

    reels.forEach((reel, index) => {
        const resultId = targets[index];
        const originalImages = Array.from(reel.querySelectorAll("img"));
        const imageHeight = originalImages[0].clientHeight;

        // Create long reel for looping
        reel.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.top = '0px';
        wrapper.style.transition = 'none';

        // Duplicate 4 times to allow wraparound
        const duplicates = [...originalImages, ...originalImages, ...originalImages, ...originalImages];
        duplicates.forEach(img => wrapper.appendChild(img.cloneNode(true)));
        reel.appendChild(wrapper);

        let offset = 0;
        const loopHeight = originalImages.length * imageHeight;
        let speed = 24; // pixels/frame
        const spinStart = performance.now();

        function spinStep(timestamp) {
            const elapsed = timestamp - spinStart;

            offset += speed;
            if (offset >= loopHeight * 2) {
                offset -= loopHeight;
            }

            wrapper.style.transition = 'none';
            wrapper.style.top = `-${offset}px`;

            if (elapsed < 5000) {
                requestAnimationFrame(spinStep);
            } else {
                slowToResult(offset);
            }
        }

        function slowToResult(currentOffset) {
            const finalImages = Array.from(wrapper.querySelectorAll("img"));
            const totalImages = finalImages.length;

            // Find the FIRST image with matching ID AFTER the current scroll offset
            let indexOffset = Math.floor(currentOffset / imageHeight);
            let targetIndex = -1;

            for (let i = indexOffset + 1; i < totalImages; i++) {
                if (finalImages[i].id === String(resultId)) {
                    targetIndex = i;
                    break;
                }
            }

            // If not found, fallback to the first matching one ahead of the current
            if (targetIndex === -1) {
                for (let i = 0; i < totalImages; i++) {
                    if (finalImages[i].id === String(resultId)) {
                        targetIndex = i;
                        break;
                    }
                }
            }

            if (targetIndex === -1) {
                console.error(`No matching image with id=${resultId} found`);
                return;
            }

            const targetOffset = targetIndex * imageHeight;

            // Animate to target smoothly using same base speed
            const distance = targetOffset - currentOffset;
            const duration = Math.min(Math.max(1000, (distance / speed) * 16), 3000); // Clamp between 1–3s

            wrapper.style.transition = `top ${duration}ms ease-out`;
            wrapper.style.top = `-${targetOffset}px`;
        }

        requestAnimationFrame(spinStep);
    });
}