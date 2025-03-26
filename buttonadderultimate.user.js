// ==UserScript==
// @name         BPTF button on stn!
// @version      1.8b
// @description  it haks ur compure
// @author       eeek
// @match        https://stntrading.eu/item/tf2/Unusual+*
// @require https://code.jquery.com/jquery-latest.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=stntrading.eu
// @downloadURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/buttonadderultimate.user.js
// @updateURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/buttonadderultimate.user.js
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_xmlhttpRequest
// ==/UserScript==

function getItem() {
    let i = $('.card-title').html();
    return i;
};
function requester() {!GM_getValue('userToken')?
    GM_setValue('userToken', prompt('Please, enter your BPTF token. You can find it at \nbptf -> settings -> connections')): GM_setValue('userToken', prompt(`Your token was: ${GM_getValue('userToken')}\nYou're setting the new one`) || GM_getValue('userToken'))};
//////// ^^^^^^^^ token checker, you can actually just put your token here as variable lol, just change it's content to ( return gm_setValue('userToken', 'YOUR_API_TOKEN'))

///creating a bunch of elements
let $bpBtn = $('<button>', {class: 'btn xx custom-one'});
let $rqPrice = $('<button>', {class: 'btn request-price custom-one'});
let $rqSetting = $('<i>', {class: 'fa fa-plus'});
let $rqWindow = $('<div>', {class: 'bp-pricing'});
let $sellCount = $('<p>', {id: 'buy-count', class: 'quick-price'});
let $sell = $('<p>', {id: 'sell', class: 'quick-price'});
let $buy = $('<p>', {id: 'buy', class: 'quick-price'});

// selectors of those 2 stock buttons
let $wBtn = $('.px-3').eq(1).find('#wishlist_add');
let $rBtn = $('.px-3').eq(1).find('#request_reprice')

//.....and appending them
$('.justify-content-sm-start').append($bpBtn);
$('.xx').after($rqPrice);
$('.col-12').before($rqWindow);
$rqWindow.append($sellCount, $sell, $buy);
////......css stuff
$bpBtn.css({width: '30%', 'margin-left': '3%', border: 'none','border-radius': 0, 'padding-top': '0', 'background-color': '#cc77cc', color: 'white', 'line-height': '0.9rem'}).html('BPtf stats');
$rqPrice.css({position: 'relative', width: '30%', border: 'none', 'border-radius': 0, 'margin-left': '3%', 'padding': 0, 'background-color': '#55AA55', color: 'white', 'word-wrap': 'break-word', 'line-height':'0.9rem', 'font-size': '14px'}).html(`Check BPTF orders`).append($rqSetting);
$rqSetting.css({position: 'absolute', bottom: '0px', right: '2px'});
$rqWindow.css({width: '13rem', height: 'min-content', 'line-height': '0.5em', 'background-color': '#222', position: 'absolute', 'z-index': 10, display: 'none', 'padding-top': '0.5em', 'padding-left': '0.3em', left: '62%', 'font-weight': 'bold', 'border': '3px solid #333'})
// $rqSetting.hover(function (){$(this).css({color: '#ccc'})}, function () {$(this).css({color: 'white'})});
$('.custom-one').hover(function () {$(this).css({'filter': 'brightness(85%)'})}, function () {$(this).css({'filter': 'brightness(100%)'})})

let heart = $wBtn.children();
let search = $rBtn.children()
$wBtn.empty().append(heart)
$rBtn.empty().append(search)


/////////////////////////////// buwomp
let bUrl = `https://backpack.tf/api/classifieds/listings/snapshot?sku=${getItem().replace('Unusual', '').trim()}&appid=440&token=${GM_getValue('userToken')}`

////////////////////////////////////////////////////////


//functions, some unnecessary things are here but lolol im coder not you
$rqSetting.on('click', requester);
let done = false;
$rqPrice.on('click', function (){
    if (!GM_getValue('userToken')) {
        requester();
    } else {
        $rqWindow.toggle();
        if (!done) {
            done = true
            let cBuy = 0; let cSell = 0;
            //it generates link using item's title on stn
            GM_xmlhttpRequest({
                method: "GET",
                url: bUrl,
                onload: function(response) {
                    const d = JSON.parse(response.responseText);
                    if (!d.listings && d.message) {
                        console.info("There was an error getting listings. Check your token. If it's correct, the problem is on bptf's side");
                    } else if (!d.listings && !d.message) {
                        console.log("BPTF API error! This item's price can not be fetched")
                    } else {
                        d.listings.forEach(el => {
                            if (el.intent == 'sell') {cSell++};
                        });
                        let sellStart = d.listings.find(e =>
                              e.intent == 'sell');
                        if (!sellStart) {
                            $sell.text('No listings!');
                        } else {
                            $sell.text(`Buy: ${sellStart.currencies.keys? sellStart.currencies.keys + ' keys': '$' + sellStart.currencies.usd} ${sellStart.currencies.metal ? `${sellStart.currencies.metal} ref` : ''}`);}
                        let buyStart = d.listings.find(el =>
                              el.intent == 'buy' && !(el.item.attributes.some(cc => /\b1[0-9]{3}\b/.test(cc.defindex))));
                        let $bStn = $('.text-center p.mb-0:nth-of-type(1) + p.mb-0').text();
                        const regex = /(\d+)\s+keys(,\s+([\d.]+)\s+ref)?/;
                        const match = $bStn.match(regex);
                        let keys, ref;

                        if (match) {
                            keys = match[1];
                            ref = match[3];
                        };

                        $rqWindow.css('display', 'none')? $rqWindow.css('display', 'block'): $rqWindow.css('display', 'none');
                        $sellCount.text('Sellers: ' + cSell);
                        $buy.text(`Sell: ${buyStart.currencies.keys} keys ${buyStart.currencies.metal ? `${buyStart.currencies.metal} ref` : ''}`);
                        switch (cSell) {
                            case 0:
                            case 1: $sellCount.css('color', '#5D5'); break;
                            case 2: $sellCount.css('color', '#DD3'); break;
                            default: $sellCount.css('color', '#E55'); break;
                        }

                        // keys/ref is STN buy price, //buyStart.currencies is buy orders
                        // this one is checking what price is the best including refs (hopefully you wont find items that have 0.*ref difference, lol)
                        if (keys > buyStart.currencies.keys || (keys == buyStart.currencies.keys && ref > buyStart.currencies.metal)) {
                            console.log (buyStart.currencies.ref || 400, ref|| 400);
                            $('#buy').css('color', '#D55'); $('.text-center p.mb-0:nth-of-type(1) + p.mb-0').first().css('color', '#9f9')
                        } else {
                            console.log(buyStart.currencies.ref || 400, ref|| 400)
                            $('#buy').css('color', '#9f9'); $('.text-center p.mb-0:nth-of-type(1) + p.mb-0').first().css('color', '#D55')
                        }

                    }
    },
                onerror: function(error) {
                    console.error('FETCH ERROR: ', error);
                }
            }) } else {
            console.log('Click click click')
            }
    };
})

//It checks, if item can be found through bptf search api; if it fails, you will be redirected to google which is fiiiiine i guess
    $bpBtn.on('click', function() {
        let itemLink = `https://backpack.tf/search?text=${getItem()}`;
        GM_xmlhttpRequest({
            method: 'GET',
            url: itemLink,
            onload: function (response) {
                let res = JSON.parse(response.responseText).results[0];
                if (!res){
                    console.info('BPTF-SEARCH-API-ERROR: no item found. Redirecting to google...');
                    window.open(`https://google.com/search?q=${getItem()}`);
                }else{
                    let u = `https://backpack.tf/stats/Unusual/${res.item_name}/Tradable/Craftable/${res.values[0].priceindex}`;
                    console.info('BPTF-SEARCH-API-SUCCESS: item was found! Redirecting to backpack.tf')
                    window.open(u)
                }
            }
        })
    })
