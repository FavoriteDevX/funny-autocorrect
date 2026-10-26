(function() {
    console.log("[🤪 FACE] Mobile/Web Extension Loaded.");

    const funnyRules = {
        "hello": "greetings carbon-based lifeform",
        "love": "biochemical trick to propagate the species",
        "money": "imaginary dynamic validation tokens",
        "sim": "com certeza, meu mestre absoluto",
        "nao": "me recuso terminantemente sob orientação jurídica"
    };

    function processInput(event) {
        let element = event.target;
        let text = element.value || element.innerText || "";
        if (!text) return;

        let words = text.split(/(\s+)/);
        let modified = false;

        for (let i = 0; i < words.length; i++) {
            let cleanWord = words[i].toLowerCase().trim();
            if (funnyRules[cleanWord]) {
                words[i] = funnyRules[cleanWord];
                modified = true;
            }
        }

        if (modified) {
            if (element.value !== undefined) {
                element.value = words.join("");
            } else {
                element.innerText = words.join("");
            }
        }
    }

    // Intercept with capturing phase for instantaneous mobile web response
    document.addEventListener("input", processInput, true);
})();
