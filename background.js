//event listener for extension button
chrome.browserAction.onClicked.addListener(function() {
    muteAllTabs();
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        let muteState = changeInfo.mutedInfo.muted;
        muteState ? changeIconMute() : changeIconUnmute();
    });
});

//mute currently selected tab
function muteTab(tab) {
    let isMuted = tab.mutedInfo.muted;
    chrome.tabs.update(tab.id, {
        "muted": !isMuted
    });
}

function muteAllTabs() {
    //query returns array of all tabs that match given property
    chrome.tabs.query({"audible": true}, function(tabs) {
        for (const tab of tabs) {
            muteTab(tab);
        }
    })
}

function changeIconMute() {
    chrome.browserAction.setIcon({
        path: {"16": "no-audio-16.png"}
    });
    chrome.browserAction.setTitle({
        "title": "Click to unmute tabs"
    });
}

function changeIconUnmute() {
    chrome.browserAction.setIcon({
        path: {"16": "speaker-16.png"}
    });
    chrome.browserAction.setTitle({
        "title": "Click to mute tabs"
    });
}