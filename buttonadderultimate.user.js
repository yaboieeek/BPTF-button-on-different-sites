// ==UserScript==
// @name         BPTF button on stn!
// @namespace    skibiditoilet
// @version      2025-01-14
// @description  it haks ur compure
// @author       eeek
// @match        https://stntrading.eu/item/tf2/Unusual+*
// @match https://stntrading.eu/tf2/unusuals*
// @require http://code.jquery.com/jquery-latest.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stntrading.eu
// @downloadURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/buttonadderultimate.user.js
// @updateURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/buttonadderultimate.user.js
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

function getItem() {
    let i = $('.card-title').html();
    return i;
};
function requester() {!GM_getValue('userToken')?
    GM_setValue('userToken', prompt('Please, enter your BPTF API key')): GM_setValue('userToken', prompt(`Your API key was: ${GM_getValue('userToken')}\nYou're setting the new one`) || GM_getValue('userToken'))};



let $bpBtn = $('<button>', {class: 'btn xx custom-one'});
let $rqPrice = $('<button>', {class: 'btn request-price custom-one'});
let $rqSetting = $('<i>', {class: 'fa fa-plus'});

$('.justify-content-sm-start').append($bpBtn);
$('.xx').after($rqPrice);
$('.request-price').after($rqSetting);

$bpBtn.css({width: '30%', 'margin-left': '3%', border: 'none','border-radius': 0, 'padding-top': '0', 'background-color': '#cc77cc', color: 'white', 'line-height': '0.9rem'}).html('BPtf stats');
$rqSetting.css({position: 'relative', top: '2.8rem', right: '1rem', height: '1rem'});
$rqPrice.css({width: '30%', border: 'none', 'border-radius': 0, 'margin-left': '3%', 'padding': 0, 'background-color': '#55AA55', color: 'white', 'word-wrap': 'break-word', 'line-height':'0.9rem'}).html('Get BPTF sell/buy price');

$rqSetting.hover(function (){$(this).css({color: '#ccc'})}, function () {$(this).css({color: 'white'})});
$('.custom-one').hover(function () {$(this).css({'filter': 'brightness(85%)'})}, function () {$(this).css({'filter': 'brightness(100%)'})})


$rqSetting.on('click', requester)
$rqPrice.on('click', function (){
    if (!GM_getValue('userToken')) {
        requester();
    } else {
        let cBuy = 0; let cSell = 0;
        let bUrl = `https://backpack.tf/api/classifieds/listings/snapshot?sku=${getItem().replace('Unusual', '').trim()}&appid=440&token=${GM_getValue('userToken')}`;
        fetch(bUrl).then(r => r.json()).then(d => {
        if (!d.listings) {console.info("There was an error getting listings. Please, check your API key. ")} else
        {
            d.listings.forEach((el, index) => {
                if (el.intent == 'sell') {cSell++};
                console.log(index + ') ' + el.item.attributes)
            })
            let sellStart = d.listings.find(el => el.intent =='sell'); let buyStart = d.listings.find(el => el.intent == 'buy'); console.log(d.listings.currencies);
            console.log(`There's a total of ${cSell} sellers. Sellers start from ${sellStart.currencies.keys + ' keys' || sellStart.currencies.usd + ' USD'}\nBuyers start from ${buyStart.currencies.keys} keys${buyStart.currencies.ref? ' ' + buyStart.currencies.ref + ' ref': ''}`)
        }
        });
    }
})

    $bpBtn.on('click', function() {
        fetch(`https://backpack.tf/search?text=${getItem()}`).then(result => {return result.json()})
            .then(data => {let res = data.results[0];
                           if (!res){
                               console.info('BPTF-API_ERROR: no item found. Redirecting to google...');
                               window.open(`https://google.com/search?q=${getItem()}`);
                           }else{
                               let u = `https://backpack.tf/stats/Unusual/${res.item_name}/Tradable/Craftable/${res.values[0].priceindex}`;
                               console.info('BPTF-API_SUCCESS: item was found! Redirecting to backpack.tf')
                               window.open(u)
                           }
                          })

    })
