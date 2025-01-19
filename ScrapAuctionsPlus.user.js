// ==UserScript==
// @name         ScrapAuction+
// @namespace    skibidi toilet 2025
// @version      0.1
// @description  it adds cool buttons
// @author       eeek
// @match        https://scrap.tf/auctions*
// @require http://code.jquery.com/jquery-latest.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=scrap.tf
// @grant        none
// ==/UserScript==


let $list = $("#main-container .items-container > div");
$list.each(function () {
    $(this).append($('<button>', {class: 'history-button'}).append($('<i>', {class: 'fa fa-calendar'}))
        .css({position: 'relative', right: -$(this).width()*0.7, top: 0, 'white-space': 'nowrap', color:'white', 'background-color': 'rgba(80, 80,80, 0.5)', width: '2rem', 'z-index': 5, 'aspect-ratio': '100%', 'line-height': '1em', border: 'none'})
                  .on('click', function(event) {
        const dataId = $(event.currentTarget).closest('div').attr('data-id').trim();
        window.open(`https://backpack.tf/item/${dataId}`);
        event.stopPropagation();
    }));
        

    $(this).append($('<button>', {class: 'stat-button'}).append($('<i>', {class: 'stm stm-backpack-tf'}))
        .css({position: 'relative', top: '2em',right: -$(this).width()*0.42, 'white-space': 'nowrap', color:'white', 'background-color': 'rgba(80, 80,80, 0.5)', width:'2rem', 'z-index': 5, 'aspect-ratio': '100%', 'line-height': '1em', border: 'none'})
                   .on('click', function(event) {
        event.stopPropagation();
        console.log();
        const dataContent = $(`div[data-id="${$(this).closest('div').attr('data-id')}"]`).data('content');

        const effectMatch = dataContent.match(/Effect:\s*(.*?)(<|$)/);
        const effect = effectMatch ? effectMatch[1].trim() : null;

        const itemName = $('<div>').html($(this).closest('div').attr('data-title')).css({display: 'none'}).text();
        fetch(`https://backpack.tf/search?text=${effect}${itemName}`).then(result => {return result.json()})
            .then(data => {let res = data.results[0];
                           if (!res){
                               console.info('BPTF-API_ERROR: no item found. Redirecting to google...');
                               window.open(`https://google.com/search?q=${effect || ' '} ${itemName}`);
                           }else{
                               let u = `https://backpack.tf/stats/Unusual/${res.item_name}/Tradable/Craftable/${res.values[0].priceindex}`;
                               console.info('BPTF-API_SUCCESS: item was found! Redirecting to backpack.tf')
                               window.open(u)
                           }
                          })

    })
    );

})
