(function() {
    console.log("[🤪 FACE] Misunderstanding Autocorrect Active.");

    // Words replaced by look-alike or sound-alike words with completely chaotic meanings
    const lookAlikeDictionary = {
        // Core Common Verbs & Pronouns
        "think": "thing",      // "I think" -> "I thing"
        "thought": "taught",  // "I thought" -> "I taught"
        "thank": "tank",       // "Thank you" -> "Tank you"
        "thanks": "tanks",     // "Thanks for" -> "Tanks for"
        "please": "fleas",     // "Please help" -> "Fleas help"
        "could": "cold",       // "I could" -> "I cold"
        "would": "wood",       // "It would be" -> "It wood be"
        "should": "shout",     // "You should" -> "You shout"
        "going": "gong",       // "I am going" -> "I am gong"
        "want": "wart",        // "I want this" -> "I wart this"
        "need": "knee",        // "I need it" -> "I knee it"
        "were": "wire",        // "They were" -> "They wire"
        "where": "whale",      // "Where is" -> "Whale is"
        "their": "there",      // Typo mimic
        "there": "they're",    // Typo mimic

        // Common Nouns & Objects
        "people": "purple",    // "Many people" -> "Many purple"
        "friend": "fried",     // "My best friend" -> "My best fried"
        "friends": "fries",    // "With friends" -> "With fries"
        "house": "horse",      // "Go to my house" -> "Go to my horse"
        "home": "honed",       // "Stay home" -> "Stay honed"
        "life": "lime",        // "My entire life" -> "My entire lime"
        "time": "dime",        // "One more time" -> "One more dime"
        "world": "worm",       // "Around the world" -> "Around the worm"
        "work": "pork",        // "Go to work" -> "Go to pork"
        "boss": "bass",        // "Talk to my boss" -> "Talk to my bass"
        "coffee": "coffin",    // "Drink some coffee" -> "Drink some coffin"
        "water": "waiter",     // "Glass of water" -> "Glass of waiter"
        "phone": "prawn",      // "On my phone" -> "On my prawn"
        "money": "monkey",     // "Need more money" -> "Need more monkey"
        "night": "knight",     // "Good night" -> "Good knight"
        "week": "weak",        // "Next week" -> "Next weak"
        "year": "gear",        // "This year" -> "This gear"

        // Adjectives & Feelings
        "happy": "hippo",      // "So happy" -> "So hippo"
        "sorry": "sorry",      // We can swap to:
        "sorry": "safari",     // "I am sorry" -> "I am safari"
        "tired": "tried",      // "So tired" -> "So tried" (classic)
        "busy": "busty",       // "Very busy" -> "Very busty"
        "ready": "radish",     // "Are you ready" -> "Are you radish"
        "great": "grate",      // "Great job" -> "Grate job"
        "good": "goose",       // "Good morning" -> "Goose morning"
        "bad": "bat",          // "Bad idea" -> "Bat idea"
        "beautiful": "barnacle" // "Beautiful day" -> "Barnacle day"
    };

    function processTyping(event) {
        let inputField = event.target;
        let currentRawText = inputField.value || inputField.innerText || "";
        if (!currentRawText) return;

        // Split words and look for exact end-of-word spacing triggers
        let structuralTokens = currentRawText.split(/(\s+)/);
        let modificationFlag = false;

        for (let i = 0; i < structuralTokens.length; i++) {
            let normalizedToken = structuralTokens[i].toLowerCase().trim();
            
            // Check if the common English word matches our look-alike typo database
            if (lookAlikeDictionary[normalizedToken]) {
                structuralTokens[i] = lookAlikeDictionary[normalizedToken];
                modificationFlag = true;
            }
        }

        // Inject the funny typo back into the input field smoothly
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
