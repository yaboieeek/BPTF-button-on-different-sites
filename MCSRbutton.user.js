// ==UserScript==
// @name         mcsr button
// @namespace    xd
// @version      0.1
// @description  mannCo button on bptf
// @author       eeek
// @match        https://backpack.tf/stats/Unusual/*/Tradable/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=backpack.tf
// @updateURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/MCSRbutton.user.js
// @downloadURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/MCSRbutton.user.js
// @grant        none
// ==/UserScript==

let $bList = $('.price-boxes');
let $itemName = $('.stats-header-item>div').attr('data-name').trim().toLowerCase();
let $itemEffect = $('.stats-header-title').text().toLowerCase().replace($itemName, '').trim().replace($itemName, '');

let $mcBtn = $('<a>', {class: 'price-box', href: `https://mannco.store/item/440-${$itemEffect.replace(/\s/g, '-')}-unusual-${$itemName.replace(/\s/g, '-')}`, target: '_blank'}).css('width', '11em');
let insides = $('<div>', {class: 'value'}).text('View on').css({'white-space': 'nowrap'});
let ico = $('<div>', {class: 'icon'}).append($('<img>', {class: 'stm', src: 'https://i.ibb.co/YDPhFRS/images.png'}).css({width: '40px', height: '38px', 'margin-right': 0 }).css('margin-top', '-5px'));
let $text = $('<div>').text('MannCo Store').css({'font-weight': 'bold', position: 'relative', top: '1em', left: '-3.5em', 'white-space': 'nowrap'});
$bList.append($mcBtn);
$mcBtn.append(ico, insides, $text);
clearInterval(refresh);



