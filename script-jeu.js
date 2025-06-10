
document.addEventListener("DOMContentLoaded", () => {
    const alien = document.getElementById("alien-invader");
    const targetCard = document.getElementById("bugged-card");
    const sound = document.getElementById("8bit-sound");

    if (!alien || !targetCard) return;

    alien.style.pointerEvents = "auto";
    alien.style.cursor = "crosshair";

    alien.addEventListener("click", () => {
        alien.style.animation = "none";
        alien.style.transition = "all 0.3s";
        alien.style.opacity = "1";
        alien.style.zIndex = "10000";
        alien.style.position = "absolute";
        document.body.appendChild(alien);

        const rect = targetCard.getBoundingClientRect();

        alien.style.left = `${rect.left + rect.width / 2}px`;
        alien.style.top = `${rect.top + window.scrollY}px`;
        alien.style.transform = "translate(-50%, -50%) scale(3) rotate(720deg)";
        alien.style.transition = "transform 1s ease-in-out, top 1s, left 1s";

        setTimeout(() => {
            if (sound) {
                sound.volume = 1;
                sound.currentTime = 0;
                sound.play().catch(e => console.warn("Audio blocké :", e));
            }

            // Créer un effet de lumière / explosion
            const flash = document.createElement("div");
            flash.className = "explosion-effect";
            targetCard.appendChild(flash);
            setTimeout(() => flash.remove(), 1000);

            // Lancer l'animation d'infection visuelle lente (8s)
            targetCard.classList.add("infecting");

            // Au bout de 8s, passer à l'état infecté
            setTimeout(() => {
                targetCard.classList.remove("infecting");
                targetCard.classList.add("infected");
                triggerVirus();
                alien.remove();
            }, 8000);
        }, 1000);
    });

    function triggerVirus() {
        document.body.classList.add("hacked");

        if (!document.getElementById("virus-style")) {
            const style = document.createElement("style");
            style.id = "virus-style";
            style.innerHTML = `
                .hacked * {
                    animation: glitch 0.3s infinite;
                    background-color: black !important;
                    color: #0f0 !important;
                    text-shadow: 0 0 5px #0f0;
                }

                @keyframes glitch {
                    0% { transform: skew(0.5deg); }
                    20% { transform: skew(-1deg); }
                    40% { transform: skew(1.5deg); }
                    60% { transform: skew(-0.5deg); }
                    80% { transform: skew(1deg); }
                    100% { transform: skew(0deg); }
                }

                .modal-game {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: rgba(0,0,0,0.85);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 99999;
                }

                .modal-game .modal-content {
                    background: #111;
                    color: #0f0;
                    padding: 2rem;
                    border-radius: 10px;
                    text-align: center;
                    box-shadow: 0 0 20px #0f0;
                    max-width: 400px;
                    width: 90%;
                    font-family: monospace;
                }

                .modal-game button {
                    margin: 1rem 0.5rem 0 0.5rem;
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    background: #0f0;
                    color: black;
                    transition: 0.3s;
                }

                .modal-game button:hover {
                    background: #cfff5a;
                }

                .explosion-effect {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: radial-gradient(circle, rgba(255,0,0,0.6) 0%, transparent 70%);
                    z-index: 10;
                    pointer-events: none;
                    animation: explosion-blink 0.8s ease-out;
                }

                @keyframes explosion-blink {
                    0% { opacity: 0; transform: scale(0.5); }
                    50% { opacity: 1; transform: scale(1.2); }
                    100% { opacity: 0; transform: scale(1.4); }
                }

                .infecting {
                    animation: card-contaminate 8s forwards;
                }

                @keyframes card-contaminate {
                    0% { box-shadow: none; filter: none; }
                    20% { box-shadow: 0 0 10px red; filter: brightness(1.1); }
                    40% { box-shadow: 0 0 20px red; filter: hue-rotate(15deg); }
                    60% { box-shadow: 0 0 25px crimson; filter: contrast(1.2); }
                    80% { box-shadow: 0 0 30px darkred; transform: scale(1.02); }
                    100% { box-shadow: 0 0 40px red; transform: scale(1.03); }
                }
            `;
            document.head.appendChild(style);
        }

        const modal = document.createElement("div");
        modal.className = "modal-game";
        modal.innerHTML = `
            <div class="modal-content">
                <h2>⚠️ Site infecté !</h2>
                <p>Une anomalie a été détectée dans le système.<br>
                Voulez-vous activer le <strong>mode Jeu</strong> pour le restaurer ?</p>
                <button onclick="startGameMode()">Activer le mode Jeu</button>
                <button onclick="cancelGameMode()">Annuler</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    window.startGameMode = function () {
        const modal = document.querySelector(".modal-game");
        if (modal) modal.remove();
        alert("🎮 Mode Jeu activé ! (à implémenter : mini-jeux, inventaire...)");
    };

    window.cancelGameMode = function () {
        const modal = document.querySelector(".modal-game");
        if (modal) modal.remove();
        document.body.classList.remove("hacked");
    };
});
