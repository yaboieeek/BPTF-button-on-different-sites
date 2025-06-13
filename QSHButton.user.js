// ==UserScript==
// @name         QSHistoryButton!
// @namespace    https://steamcommunity.com/profiles/76561198967088046
// @version      0.1.1
// @description  we be adding buttons
// @author       eeek
// @match        https://quicksell.store
// @match        https://quicksell.store/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quicksell.store
// @grant        none
// ==/UserScript==

var refresh =
    setInterval(checker, 300);//this thing checks if items were loaded
var erCount = 0;

function addButton () { ///coding is lil fckd up here but again im the coder not you
    $('.our-items div.quality-unusual').each(function() {
        !$(this).find('button').length? $(this).append($('<button>').css({padding: 0, 'background-color': 'rgba(100, 230, 100, 0.4)', border: 'none', color: '#fff', position: 'relative', left: '17px', top: '3px', width: '1.5rem', height: '1.5rem', 'padding-bottom': '0.1rem'}).on('click', function(event){
            window.open(`https://backpack.tf/item/${$(this).closest('div').data('assetid')}`);
            event.stopPropagation();
        }).append($('<i>', {class: 'fa fa-calendar'}).css({'font-weight': 200, 'font-size': '1rem', 'line-height': 0}))): null;
    })
};

function checker() {//i mean this one checks
    erCount ++;
    if (erCount >= 30) {
        console.log('Stopping script execution after 30 retries! Refresh the page');
        clearInterval(refresh);
        return;
    };

    if ($('.our-items > .loading').css('display') === 'none') {
        clearInterval(refresh);
        addButton();

        const nd = document.querySelector('.our-items');//this checks if items were changed or if more items were loaded
        const cfg = {childList: true, subtree: true};

        const adder = function(mut) {
        for (const event in mut) {
            if (event) {
                addButton()
            }
        }
        }
        const observer = new MutationObserver(adder);
        observer.observe(nd, cfg);
    }
}

