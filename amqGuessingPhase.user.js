// ==UserScript==
// @name         AMQ Guessing Phase
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Sends messages whenever guessing phase starts and ends. Useful for moderating ranked chat.
// @author       ToToTroll
// @match        https://*.animemusicquiz.com/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/ToToTroll/AMQ-Scripts/master/amqGuessingPhase.user.js
// @updateURL    https://raw.githubusercontent.com/ToToTroll/AMQ-Scripts/master/amqGuessingPhase.user.js
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// ==/UserScript==
if (document.getElementById('startPage')) return;

// Wait until the LOADING... screen is hidden and load script
let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        setup();
        clearInterval(loadInterval);
    }
}, 500);

//Initialize listeners and 'Installed Userscripts' menu
function setup() {
    new Listener("Game Starting", () => {
        gameChat.systemMessage(`========== Game Start ==========`)
    }).bindListener();
    new Listener("play next song", () => {
        gameChat.systemMessage(`========== Round ` +  (parseInt($("#qpCurrentSongCount").text()) + 1) + ` - Guessing Phase Start ==========`)
    }).bindListener();
    new Listener("guess phase over", () => {
        gameChat.systemMessage(`========== Round ` +  (parseInt($("#qpCurrentSongCount").text())) + ` - Guessing Phase End ==========`)
    }).bindListener();
    new Listener("quiz end result", () => {
        gameChat.systemMessage(`========== Game End ==========`)
    }).bindListener();
    AMQ_addScriptData({
        name: "AMQ Guessing Phase",
        author: "ToToTroll",
        description: `Sends messages whenever guessing phase starts and ends. Useful for moderating ranked chat.`
    });
}