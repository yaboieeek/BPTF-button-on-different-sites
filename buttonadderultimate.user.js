// ==UserScript==
// @name         BPTF button on stn!
// @namespace    skibiditoilet
// @version      2025-01-14
// @description  it haks ur compure
// @author       eeek
// @match        https://stntrading.eu/item/tf2/Unusual+*
// @require http://code.jquery.com/jquery-latest.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stntrading.eu
// @grant        none
// ==/UserScript==

function getItem() {
    return $('.card-title').html()
};

let $bpBtn = $('<button>', {class: 'btn xx'});

$('.justify-content-sm-start').append($bpBtn);

let $itemInfo = $('.card-title').text();
console.log($itemInfo);

$bpBtn.css({width: '25%', 'margin-left': '3%', border: 'none','border-radius': 0, 'padding-top': '0', 'background-color': '#cc77cc', color: 'white'}).html('BPtf stats');
    $bpBtn.on('click', function() {
        fetch(`https://backpack.tf/search?text=${getItem()}`).then(result => {return result.json()})
            .then(data => {let res = data.results[0];
                           if (!res){
                               console.info('BPTF-API-ERROR: no item found. Redirecting...');
                               window.open(`https://google.com/search?q=${$itemInfo.replace(/\s+/g, ' ')}`);
                           }else{
                               window.open(`https://backpack.tf/stats/Unusual/${res.item_name}/Tradable/Craftable/${res.values[0].priceindex}`)
                               console.log(res.values);
                           }
                          })

    })

