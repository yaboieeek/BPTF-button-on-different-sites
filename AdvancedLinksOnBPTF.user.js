// ==UserScript==
// @name         BPTF advanced links
// @namespace    https://steamcommunity.com/profiles/76561198967088046
// @version      0.3.1
// @description  mannCo and stn button on bptf
// @author       eeek
// @match        *://*.backpack.tf/stats/Unusual/*/Tradable/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=backpack.tf
// @updateURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/AdvancedLinksOnBPTF.user.js
// @downloadURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/AdvancedLinksOnBPTF.user.js
// @grant        none
// ==/UserScript==

let $bList = $('.price-boxes');
let $itemName = $('.stats-header-item>div').attr('data-name').trim().toLowerCase();
let itemName = $itemName.replace(/'/g, '');
let $itemEffect = $('.stats-header-title').text().toLowerCase().replace($itemName, '').trim().replace($itemName, '');


let $mcBtn = $('<a>', {class: 'price-box', href: `https://mannco.store/item/440-${$itemEffect.replace(/\s/g, '-').replace(/:/g, '')}-unusual-${itemName.replace(/\s/g, '-').replace(/:/g, '')}`, target: '_blank'}).css('width', '11em');
let insides = $('<div>', {class: 'value'}).text('View on').css({'white-space': 'nowrap'});
let ico = $('<div>', {class: 'icon'}).append($('<img>', {class: 'stm', src: 'https://i.ibb.co/YDPhFRS/images.png'}).css({width: '40px', height: '38px', 'margin-right': 0 }).css('margin-top', '-5px'));
let $text = $('<div>').text('MannCo Store').css({'font-weight': 'bold', position: 'relative', top: '1em', left: '-3.5em', 'white-space': 'nowrap'});

let $stnBtn = $('<a>', {class: 'price-box', href: `https://stntrading.eu/item/tf2/Unusual+${$('.stats-header-title').text().trim().replace(/\s/g, '+')}`, target: '_blank'}).css('width', '11em');
let Sinsides = $('<div>', {class: 'value'}).text('View on').css({'white-space': 'nowrap'});
let Sico = $('<div>', {class: 'icon'}).append($('<img>', {class: 'stm', src: 'https://www.google.com/s2/favicons?sz=64&domain=stntrading.eu'}).css({width: '40px', height: '38px', 'margin-right': 0 }).css('margin-top', '-5px'));
let $stext = $('<div>').text('STNtrading').css({'font-weight': 'bold', position: 'relative', top: '1em', left: '-3.5em', 'white-space': 'nowrap'});

$bList.append($mcBtn || '', $stnBtn||'');
$mcBtn.append(ico, insides, $text);

$stnBtn.append(Sico, Sinsides, $stext);




