(function() {
    console.log("[🤪 FACE] Chaotic Multiverse AutoCorrect Active.");

    // Comprehensive comedic mapping covering core English verbs, nouns, pronouns, and business speak
    const megaDictionary = {
        // Greetings & Basics
        "hello": "greetings, mortal carbon-based lifeform",
        "hi": "salutations, fleshy bipedal creature",
        "hey": "listen closely, organic entity",
        "thanks": "i offer my eternal unpayable debt of gratitude",
        "thank": "worship",
        "please": "i beg of you on my bruised knees",
        "yes": "absolutely, by order of the high council",
        "no": "absolutely not, under strict legal advice",
        "ok": "acknowledged with minor existential dread",
        "okay": "i compliance under deep psychological duress",
        "bye": "gargantuan farewell, remember my legacy",

        // Corporate & Work Speak
        "meeting": "ritualistic corporate gathering of despair",
        "work": "voluntary modern economic confinement",
        "job": "daily capitalist survival trial",
        "boss": "Supreme Overlord of my Daily Misery",
        "manager": "designated corporate cattle herder",
        "deadline": "moment of absolute imminent doom",
        "project": "collaborative chaotic experiment",
        "email": "digital letter of structural passive-aggression",
        "money": "imaginary dynamic validation tokens",
        "salary": "crumbs from the master's table",
        "business": "monopoly money activities",
        "team": "group of beautifully confused individuals",
        "strategy": "highly elaborate guessing game",
        "marketing": "weaponized corporate gaslighting",

        // Food & Life Dependencies
        "coffee": "liquid legal speed anxiety fluid",
        "water": "essential hydrogen-oxygen hydration juice",
        "food": "biological fuel matrix input",
        "lunch": "temporary mid-day nutrient ingestion break",
        "dinner": "the final feast before the night terror",
        "breakfast": "morning chemical awakening ritual",
        "beer": "fermented liquid liquid inhibition deleter",
        "wine": "grape juice for emotional coping mechanics",
        "diet": "temporary starvation protocol prior to pizza",

        // Daily Actions & Verbs
        "sleep": "temporary simulation of the afterlife",
        "tired": "soul-crushed and biologically decaying",
        "busy": "pretending to be valuable to society",
        "help": "rescue my sinking psychological ship",
        "love": "flawed biochemical trick to propagate genes",
        "hate": "intense cellular allergic reaction to existence",
        "like": "mildly tolerate without vomiting",
        "think": "generate highly unstable thoughts",
        "know": "delude myself into absolute certainty",
        "want": "crave due to unchecked consumerism",
        "need": "desperately require for survival comfort",
        "coding": "smashing plastic buttons until computer screams",
        "programming": "injecting dark magic into microchips",
        "test": "praying to the digital deities that this works",

        // People & Places
        "friend": "co-conspirator in this simulation",
        "people": "unpredictable hairless primates",
        "human": "bipedal anxiety-ridden mammal",
        "gym": "sweat dungeon of heavy metal dysmorphia",
        "home": "the decompression chamber of my anxiety",
        "house": "overpriced brick box",
        "school": "institutional compliance training facility",
        "university": "premium subscription protocol for debt acquisition",
        "car": "rolling gas-guzzling metal cage",
        "phone": "the glowing black mirror of micro-doses of dopamine",
        "computer": "the lightning-infused sand box that rules my life",

        // Conceptual & Meta
        "life": "unsolicited subscription to linear time",
        "time": "the relentless marching illusion",
        "world": "this chaotic spinning wet space rock",
        "internet": "the global network of screaming humans",
        "code": "spaghetti logical configurations",
        "bug": "unplanned emergent feature of my genius",
        "fix": "slapping duct tape on digital structural decay",
        "problem": "catastrophic cosmic roadblock",
        "system": "the oppressive digital machine",
        "user": "the chaotic entity pressing random buttons"
    };

    function processTyping(event) {
        let inputField = event.target;
        let currentRawText = inputField.value || inputField.innerText || "";
        if (!currentRawText) return;

        // Split text cleanly while preserving spaces and line breaks
        let structuralTokens = currentRawText.split(/(\s+)/);
        let modificationFlag = false;

        for (let i = 0; i < structuralTokens.length; i++) {
            let normalizedToken = structuralTokens[i].toLowerCase().trim();
            
            // If the typed English word exists in our massive funny mapping registry
            if (megaDictionary[normalizedToken]) {
                structuralTokens[i] = megaDictionary[normalizedToken];
                modificationFlag = true;
            }
        }

        // Apply changes instantly back into the DOM element without breaking user input focus
        if (modificationFlag) {
            let savedCursorStart = inputField.selectionStart;
            let savedCursorEnd = inputField.selectionEnd;

            if (inputField.value !== undefined) {
                inputField.value = structuralTokens.join("");
                // Restore typing cursor safely
                inputField.setSelectionRange(savedCursorStart, savedCursorEnd);
            } else {
                inputField.innerText = structuralTokens.join("");
            }
        }
    }

    // Intercept input dynamically across all web fields reactively
    document.addEventListener("input", processTyping, true);
})();
