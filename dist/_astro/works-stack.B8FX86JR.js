document.addEventListener("DOMContentLoaded", () => {
    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cardsContainer = document.querySelector(".cards-container");
    if (!cardsContainer) return;

    let stack = null;
    let cards = [];
    let listeners = [];

    const getDurationFromCSS = (variableName, element = document.documentElement) => {
        const value = getComputedStyle(element)?.getPropertyValue(variableName)?.trim();
        if (!value) return 0;
        if (value.endsWith("ms")) return parseFloat(value);
        if (value.endsWith("s")) return parseFloat(value) * 1000;
        return parseFloat(value) || 0;
    };

    const createStack = () => {
        if (stack) return;
        stack = document.createElement("section");
        stack.className = "card-stack";
        stack.setAttribute("role", "region");
        stack.setAttribute("aria-label", "Obras destacadas");

        // default second-card offsets (can be inverted on right-swipe)
        stack.style.setProperty("--second-tx", "20px");
        stack.style.setProperty("--second-rz", "3deg");

        const originalCards = Array.from(cardsContainer.querySelectorAll(".card"));
        if (!originalCards.length) return;

        const cloned = originalCards.map((c) => c.cloneNode(true));
        cloned.forEach((c, idx) => {
            c.style.setProperty("--i", idx + 1);
            stack.appendChild(c);
        });

        cardsContainer.insertAdjacentElement("afterend", stack);
        cards = [...stack.querySelectorAll(".card")];

        // interaction state
        let isSwiping = false;
        let startX = 0;
        let currentX = 0;
        let animationFrameId = null;

        const getActiveCard = () => cards[0];

        const updatePositions = () => {
            cards.forEach((card, i) => {
                card.style.setProperty("--i", i + 1);
                card.style.setProperty("--swipe-x", "0px");
                card.style.setProperty("--swipe-rotate", "0deg");
                card.style.opacity = "1";
                // expose current visual position for CSS targeting
                try {
                    card.dataset.pos = String(i + 1);
                } catch (e) {
                    // ignore if dataset not writable
                }
            });
        };

        const applySwipeStyles = (deltaX) => {
            const card = getActiveCard();
            if (!card) return;
            card.style.setProperty("--swipe-x", `${deltaX}px`);
            card.style.setProperty("--swipe-rotate", `${deltaX * 0.2}deg`);
            card.style.opacity = 1 - Math.min(Math.abs(deltaX) / 100, 1) * 0.75;
        };

        const handleStart = (clientX) => {
            if (isSwiping) return;
            isSwiping = true;
            startX = currentX = clientX;
            const card = getActiveCard();
            card && (card.style.transition = "none");
        };

        const handleMove = (clientX) => {
            if (!isSwiping) return;
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(() => {
                currentX = clientX;
                const deltaX = currentX - startX;
                applySwipeStyles(deltaX);

                if (Math.abs(deltaX) > 50) handleEnd();
            });
        };

        const handleEnd = () => {
            if (!isSwiping) return;
            cancelAnimationFrame(animationFrameId);

            const deltaX = currentX - startX;
            const threshold = 50;
            const duration = getDurationFromCSS("--card-swap-duration") || 150;
            const card = getActiveCard();

            if (card) {
                card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

                if (Math.abs(deltaX) > threshold) {
                    const direction = Math.sign(deltaX);

                    // move active card off in swipe direction
                    card.style.setProperty("--swipe-x", `${direction * 100}px`);
                    card.style.setProperty("--swipe-rotate", `${direction * 20}deg`);

                    setTimeout(() => {
                        card.style.setProperty("--swipe-rotate", `${-direction * 20}deg`);
                    }, duration * 0.5);

                    setTimeout(() => {
                        // rotate stack order
                        cards = [...cards.slice(1), card];
                        updatePositions();

                        // Now that the visual reordering is done, set the second-card offsets
                        // according to swipe direction. We do this AFTER the animation so
                        // the second card does not change during the swipe animation.
                        if (direction > 0) {
                            stack.style.setProperty("--second-tx", "-20px");
                            stack.style.setProperty("--second-rz", "-3deg");
                        } else {
                            stack.style.setProperty("--second-tx", "20px");
                            stack.style.setProperty("--second-rz", "3deg");
                        }
                    }, duration);
                } else {
                    applySwipeStyles(0);
                }
            }

            isSwiping = false;
            startX = currentX = 0;
        };

        // attach pointer listeners and keep refs for cleanup
        const onPointerDown = (ev) => {
            ev.preventDefault();
            stack.setPointerCapture?.(ev.pointerId);
            handleStart(ev.clientX);
        };

        const onPointerMove = (ev) => handleMove(ev.clientX);
        const onPointerEnd = () => handleEnd();

        stack.addEventListener("pointerdown", onPointerDown);
        stack.addEventListener("pointermove", onPointerMove);
        ["pointerup", "pointercancel", "pointerleave"].forEach((evName) =>
            stack.addEventListener(evName, onPointerEnd)
        );

        listeners.push([stack, "pointerdown", onPointerDown]);
        listeners.push([stack, "pointermove", onPointerMove]);
        ["pointerup", "pointercancel", "pointerleave"].forEach((evName) =>
            listeners.push([stack, evName, onPointerEnd])
        );

        updatePositions();
    };

    const destroyStack = () => {
        if (!stack) return;
        // remove listeners
        listeners.forEach(([el, name, fn]) => el.removeEventListener(name, fn));
        listeners = [];
        // remove stack from DOM
        stack.remove();
        stack = null;
        cards = [];
    };

    // media change handling
    const mql = window.matchMedia("(max-width: 768px)");

    const handleMQ = (ev) => {
        if (ev.matches) {
            createStack();
        } else {
            destroyStack();
        }
    };

    // initialize according to current state
    if (mql.matches) createStack();

    if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", handleMQ);
    } else if (typeof mql.addListener === "function") {
        mql.addListener(handleMQ);
    }
});
