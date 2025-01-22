// ==UserScript==
// @name         QSHistoryButton!
// @namespace    esskeit
// @version      0.1
// @description  try to take over the world!
// @author       eeek
// @match        https://quicksell.store*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=quicksell.store
// @grant        none
// ==/UserScript==

var refresh = setInterval(checker, 500); // Удаляем скобки, чтобы передать функцию
var erCount = 0;

function checker() {
    erCount++;

    if (erCount >= 30) {
        console.log(`Stopping refresh after 30 retries`);
        clearInterval(refresh);
        return; // Завершаем выполнение функции
    }

    console.log(`QSButtons: We're trying`);

    if ($('.our-items > .loading').css('display') === 'none') {
        console.log('QSButtons: items were loaded');
        let $items = $('.our-items div.quality-unusual');
        $items.each(function () {
            const itemID = $(this).data('assetid');
            $(this).append($('<button>', {class: 'history-btn item-btn'}).html($('<i>', {class: 'fa fa-calendar'})).css({'font-size': '15px', width: 'min-content', 'aspect-ratio': 1, position: 'relative', right: '-25px', top: '-0.5rem',color: '#FDD', 'background-color': '#F55', 'font-weight': 400}).on('click', function(event) {
                window.open(`https://backpack.tf/item/${itemID}`);
                event.stopPropagation();
            }))
        });
        clearInterval(refresh);
    }
}
