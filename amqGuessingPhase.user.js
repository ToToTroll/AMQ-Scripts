// ==UserScript==
// @name         AMQ Guessing Phase
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Sends messages whenever guessing phase starts and ends. Useful for moderating ranked chat. Ctrl+Q to toggle.
// @author       ToToTroll
// @match        https://*.animemusicquiz.com/*
// @grant        none
// @downloadURL  https://github.com/ToToTroll/AMQ-Scripts/raw/refs/heads/master/amqGuessingPhase.user.js
// @updateURL    https://github.com/ToToTroll/AMQ-Scripts/raw/refs/heads/master/amqGuessingPhase.user.js
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// ==/UserScript==

//disabled by default
let enabled = false;

if (document.getElementById('startPage')) return;

// Wait until the LOADING... screen is hidden and load script
let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        setup();
        clearInterval(loadInterval);
    }
}, 500);

//Toggle on/off
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'q') {
        event.preventDefault();
        enabled = !enabled;
        if(enabled) gameChat.systemMessage(`Guessing Phase messages enabled!`);
        else gameChat.systemMessage(`Guessing Phase messages disabled!`);
    }
});

function message(msg) {
    if (enabled) gameChat.systemMessage(msg);
}

//Initialize listeners and 'Installed Userscripts' menu
function setup() {
    new Listener("Game Starting", () => {
        message(`========== Game Start ==========`)
    }).bindListener();
    new Listener("play next song", () => {
        message(`========== Round ` +  (parseInt($("#qpCurrentSongCount").text()) + 1) + ` - Guessing Phase Start ==========`)
    }).bindListener();
    new Listener("guess phase over", () => {
        message(`========== Round ` +  (parseInt($("#qpCurrentSongCount").text())) + ` - Guessing Phase End ==========`)
    }).bindListener();
    new Listener("quiz end result", () => {
        message(`========== Game End ==========`)
    }).bindListener();
    AMQ_addScriptData({
        name: "AMQ Guessing Phase",
        author: "ToToTroll",
        version: "1.1",
        link: "https://github.com/ToToTroll/AMQ-Scripts/raw/refs/heads/master/amqGuessingPhase.user.js",
        description: `Sends messages whenever guessing phase starts and ends. Useful for moderating ranked chat. Ctrl+Q to toggle.`
    });
}