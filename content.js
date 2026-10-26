(function() {
    'use strict';
    
    const lookAlikeDictionary = {
        "think": "thing", "thought": "taught", "thank": "tank", "thanks": "tanks",
        "please": "fleas", "could": "cold", "would": "wood", "should": "shout",
        "going": "gong", "want": "wart", "need": "knee", "people": "purple",
        "friend": "fried", "friends": "fries", "house": "horse", "home": "honed",
        "life": "lime", "time": "dime", "world": "worm", "work": "pork",
        "boss": "bass", "coffee": "coffin", "water": "waiter", "phone": "prawn",
        "money": "monkey", "happy": "hippo", "sorry": "safari", "tired": "tried",
        "busy": "busty"
    };

    function processTyping(event) {
        let inputField = event.target;
        let currentRawText = inputField.value || inputField.innerText || "";
        if (!currentRawText) return;

        let structuralTokens = currentRawText.split(/(\s+)/);
        let modificationFlag = false;

        for (let i = 0; i < structuralTokens.length; i++) {
            let normalizedToken = structuralTokens[i].toLowerCase().trim();
            if (lookAlikeDictionary[normalizedToken]) {
                structuralTokens[i] = lookAlikeDictionary[normalizedToken];
                modificationFlag = true;
            }
        }

        if (modificationFlag) {
            let savedCursorStart = inputField.selectionStart;
            let savedCursorEnd = inputField.selectionEnd;

            if (inputField.value !== undefined) {
                inputField.value = structuralTokens.join("");
                inputField.setSelectionRange(savedCursorStart, savedCursorEnd);
            } else {
                inputField.innerText = structuralTokens.join("");
            }
        }
    }

    document.addEventListener("input", processTyping, true);
})();
