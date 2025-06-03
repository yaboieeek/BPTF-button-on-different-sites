// ==UserScript==
// @name         ScrapAuction+
// @namespace    skibidi toilet 2025
// @version      1.0.0
// @description  it adds cool buttons
// @author       eeek
// @match        https://scrap.tf/auctions*
// @updateURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/ScrapAuctionsPlus.user.js
// @downloadURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/ScrapAuctionsPlus.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=scrap.tf
// @grant        GM_xmlhttpRequest
// ==/UserScript==


(function () {
    const $itemElements = document.querySelectorAll('.quality5');

    for (const itemElement of $itemElements) {
        if (document.querySelector('.auction-inventory:has(.quality5)')) return;
        const $historyButton = document.createElement('button');
        const $statButton = document.createElement('button');
        [$historyButton, $statButton].forEach(elem => elem.classList.add('custom-button'))
        const $buttonsContainer = document.createElement('div');
        $buttonsContainer.classList.add('bptf-buttons');
        const historyIcon = document.createElement('i');
        const statIcon = document.createElement('i');
        historyIcon.classList.add('fa', 'fa-calendar');
        statIcon.classList.add('stm', 'stm-backpack-tf');

        $buttonsContainer.append($historyButton, $statButton);
        $historyButton.append(historyIcon);
        $statButton.append(statIcon);
        itemElement.append($buttonsContainer);

        itemElement.style.position = 'relative';
        const {title: rawTitle, id, content: rawContent} = itemElement.dataset;

        const title = parser(rawTitle).replace('★Unusual ', '').trim() || '';
        const effect = parser(rawContent).replace('★Unusual ', '').trim() || '';

        $historyButton.addEventListener('click', (event) => {
            event.stopPropagation();
            window.open(`https://backpack.tf/item/${id}`);
        });
        $statButton.addEventListener('click', function (event) {
            event.stopPropagation();
            const finalString = encodeURIComponent(`${effect} ${title}`);
            GM_xmlhttpRequest({
                url: `https://backpack.tf/search?text=${finalString}`,
                onload: async function(response){
                    if (response.status !== 200 || typeof JSON.parse(response.responseText).results[0] === 'undefined') {
                        ScrapTF.Crouton.Add(`[SrapAuction+] Couldn't find ${effect} ${title}, redirecting to Google`, 'alert-error');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        window.open(`https://www.google.com/search?q=${effect + ' ' + title}`);
                        return;
                    };
                    const res = JSON.parse(response.responseText).results;
                    console.log(res);
                        ScrapTF.Crouton.Add('[SrapAuction+] Success! Opening the stat page');
                        await new Promise(resolve => setTimeout(resolve, 500));
                        const effectIndex = res[0].values[0].priceindex;
                    window.open(`https://backpack.tf/stats/Unusual/${title}/Tradable/Craftable/${effectIndex}`)
                }
            })
        })
    };
    function parser(elementHTML) {
        const parseElement = document.createElement('div');
        parseElement.innerHTML = elementHTML;

        switch (parseElement.children.length) {
            case 1: {
                const innerText = parseElement.innerText;
                parseElement.remove();
                return innerText;
            }
            case 0: return 'undefined name';
            default: {
                try {
                    const innerText = parseElement.innerHTML.toString().match(/<br>Effect: (.*?)<br>/)[1];
                    console.log(innerText);
                    parseElement.remove();
                    return innerText;
                } catch(error) {
                    return '';
                }
            }
        }

    }

    const CUSTOM_BUTTONS_STYLE = document.createElement('style');
    CUSTOM_BUTTONS_STYLE.innerHTML = `
          .bptf-buttons {
              position: absolute;
              right: 0; top: 0;

              display: flex;
              flex-direction: column;
              gap: 5px;

              align-items: center;
              justify-content: center;
              line-height: 1;

              button {
                background-color: rgba(255,255,255,0.2);
                padding: 5px;
                aspect-ratio: 1;
                color: white;
                border: none
                }
          }
          `

    document.head.append(CUSTOM_BUTTONS_STYLE)
})();
