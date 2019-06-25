//event listener for extension button
chrome.browserAction.onClicked.addListener(function(tab) {
    muteTab(tab);
});

//mute currently selected tab
function muteTab(tab) {
    let isMuted = tab.mutedInfo.muted;
    chrome.tabs.update(tab.id, {
        "muted": !isMuted
    });
}