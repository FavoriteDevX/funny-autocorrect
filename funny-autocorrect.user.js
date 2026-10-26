// ==UserScript==
// @name         Funny AutoCorrect Everywhere (FACE)
// @namespace    http://tampermonkey.net
// @version      1.0
// @description  Instantly replaces common English words with look-alike chaotic alternatives across all websites.
// @author       Your Name
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    console.log("[🤪 FACE] One-Click Misunderstanding Autocorrect Active.");

    // Words replaced by look-alike or sound-alike words with completely chaotic meanings
    const lookAlikeDictionary = {
        "think": "thing",
        "thought": "taught",
        "thank": "tank",
        "thanks": "tanks",
        "please": "fleas",
        "could": "cold",
        "would": "wood",
        "should": "shout",
        "going": "gong",
        "want": "wart",
        "need": "knee",
        "were": "wire",
        "where": "whale",
        "people": "purple",
        "friend": "fried",
        "friends": "fries",
        "house": "horse",
        "home": "honed",
        "life": "lime",
        "time": "dime",
        "world": "worm",
        "work": "pork",
        "boss": "bass",
        "coffee": "coffin",
        "water": "waiter",
        "phone": "prawn",
        "money": "monkey",
        "night": "knight",
        "week": "weak",
        "year": "gear",
        "happy": "hippo",
        "sorry": "safari",
        "tired": "tried",
        "busy": "busty",
        "ready": "radish",
        "great": "grate",
        "good": "goose",
        "bad": "bat",
        "beautiful": "barnacle"
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
