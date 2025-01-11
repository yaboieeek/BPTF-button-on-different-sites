// ==UserScript==
// @name         BPTF button on mannco.store!
// @namespace    skibiditoilet
// @version      2025-01-11
// @description  it haks ur compure
// @author       eeek
// @match       https://mannco.store/item/440-*-unusual-*
// @require http://code.jquery.com/jquery-latest.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stntrading.eu
// @grant        none
// ==/UserScript==

function getItem() {
    return $('.item-info__name').text().replace('★', '').replace('Unusual', '').replace(/\s+/g, " ").trim();
};
console.log(getItem())
let $bpBtn = $('<button>', {class: 'btn btn-sm justify-content-center'});

$('.item-info__data').append($bpBtn);


$bpBtn.css({'font-size': '2rem', 'background-color': '#189ab9', 'border-color': '#35bddb'}).html('BPtf stats');
$bpBtn.on('click', function() {
    fetch(`https://backpack.tf/search?text=${getItem()}`).then(result => {return result.json()})
        .then(data => {let res = data.results[0];
              if(!res) {alert(`Can't fetch this item page because of '-'`); console.log('data is undefined')} else { console.log(`data is defined`)
              window.open(`https://backpack.tf/stats/Unusual/${res.item_name}/Tradable/Craftable/${res.values[0].priceindex}`)}
    })

})
