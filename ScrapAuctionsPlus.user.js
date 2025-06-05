// ==UserScript==
// @name         ScrapAuction+
// @namespace    skibidi toilet 2025
// @version      1.1.1
// @description  it adds cool buttons
// @author       eeek
// @match        https://scrap.tf/auctions*
// @updateURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/ScrapAuctionsPlus.user.js
// @downloadURL https://github.com/yaboieeek/BPTF-button-on-different-sites/raw/refs/heads/main/ScrapAuctionsPlus.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=scrap.tf
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    //GM_setValue("BLOCKED_USERS", []); //<------------IF YOU WANT TO WIPE THE BLOCK LIST!!!
    class AuctionsBlocker {
        constructor() {
            this.blockedCache = GM_getValue("BLOCKED_USERS") || [];
            this.blockedCounter = 0;
            this.availableAuctions = [
                ...document
                    .querySelectorAll(".auctions-list")[1]
                    .querySelectorAll(".panel-auction"),
            ];
        }
        init() {
            console.log(this.blockedCache);
            this.#processAuctions();
            this.#initialHide(this.blockedCache);
        }
        #processAuctions() {
            this.availableAuctions.forEach((auction) =>
                this.#buttonAdder(auction)
            );
        }

        #processUserData(auction) {
            const userData = auction.querySelector(".username");
            return {
                userName: userData.innerText,
                userId: userData.getAttribute("href").replace("/profile/", ""),
            };
        }

        #updateCacheData() {
            GM_setValue("BLOCKED_USERS", this.blockedCache);
        }

        #buttonAdder(auction) {
            const blockButton = document.createElement("a");
            const target = auction.querySelector(".auction-user span");
            blockButton.innerText = "Block this user";
            target.append(blockButton);

            blockButton.style = "color: #666; margin-left: 5%";

            const { userName, userId: _userId } =
                this.#processUserData(auction);

            const blockHandler = (userName, userId) => {
                this.#showConfirmationModal(userName, userId);
            };
            blockButton.addEventListener("click", () =>
                blockHandler(userName, _userId)
            );
        }

        #removeUserListings(userId) {
            this.availableAuctions.forEach((auction) => {
                const { userId: _userId } = this.#processUserData(auction);
                if (_userId !== userId) return;
                auction.remove();
            });
        }
        #showConfirmationModal(userName, userId) {
            const confirmBlockContainer = document.createElement("div");
            const buttonsContainer = document.createElement("div");
            const confirmationTextContainer = document.createElement("span");
            const confirmationHTML = `You sure want to block ${userName}?<br><b>This action can not be undone (for now)!</b>`;
            const confirmButton = document.createElement("button");
            const cancelButton = document.createElement("button");
            const dimmer = document.querySelector("canvas");

            dimmer.style =
                "background-color: rgba(0,0,0, 0.5); z-index: 999 !important";
            confirmBlockContainer.style =
                "display: flex; flex-direction: column; position: fixed; width: 500px; height: 150px; left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 9999; align-items: center; justify-content: center; border-radius: 10px; background-color: #444;";
            buttonsContainer.style =
                "display: flex; flex-direction: row; gap: 5%; justify-content: center";
            confirmButton.style =
                "border: none; background-color: red; color: white; font-weight: 600";
            cancelButton.style =
                "border: 2px solid #555; background-color: transparent; color: #666;";

            confirmButton.innerText = "Block!";
            cancelButton.innerText = "Cancel";

            confirmBlockContainer.append(
                confirmationTextContainer,
                buttonsContainer
            );
            buttonsContainer.append(confirmButton, cancelButton);
            confirmationTextContainer.innerHTML = confirmationHTML;
            document
                .querySelector("#pid-auctions")
                .prepend(confirmBlockContainer);

            const handleConfirmClick = () => {
                this.#blockUser(userId);
                this.#removeUserListings(userId);
                this.#showNotification(
                    `[ScrapAuction+] ${userName} was blocked! Their auctions will be hidden`
                );
                removeModal();
            };
            const handleCancelClick = () => {
                removeModal();
            };

            function removeModal() {
                dimmer.style = "";
                confirmBlockContainer.remove();
                confirmButton.removeEventListener("click", handleConfirmClick);
                cancelButton.removeEventListener("click", handleCancelClick);
            }

            confirmButton.addEventListener("click", handleConfirmClick);
            cancelButton.addEventListener("click", handleCancelClick);
        }
        #blockUser(userId) {
            if (this.blockedCache.includes(userId)) return;
            this.blockedCache.push(userId);
            this.#updateCacheData();
        }

        #showNotification(message, warning = false) {
            warning
                ? ScrapTF.Crouton.Add(message, true)
                : ScrapTF.Crouton.Add(message);
        }
        #initialHide(blockedArray) {
            for (const userId of this.blockedCache) {
                this.#removeUserListings(userId);
            }
        }
    }

    new AuctionsBlocker().init();

    const $itemElements = document.querySelectorAll(".quality5");

    for (const itemElement of $itemElements) {
        if (document.querySelector(".auction-inventory:has(.quality5)")) return;
        const $historyButton = document.createElement("button");
        const $statButton = document.createElement("button");
        [$historyButton, $statButton].forEach((elem) =>
            elem.classList.add("custom-button")
        );
        const $buttonsContainer = document.createElement("div");
        $buttonsContainer.classList.add("bptf-buttons");
        const historyIcon = document.createElement("i");
        const statIcon = document.createElement("i");
        historyIcon.classList.add("fa", "fa-calendar");
        statIcon.classList.add("stm", "stm-backpack-tf");

        $buttonsContainer.append($historyButton, $statButton);
        $historyButton.append(historyIcon);
        $statButton.append(statIcon);
        itemElement.append($buttonsContainer);

        itemElement.style.position = "relative";
        const {
            title: rawTitle,
            id,
            content: rawContent,
        } = itemElement.dataset;

        const title = parser(rawTitle).replace("★Unusual ", "").trim() || "";
        const effect = parser(rawContent).replace("★Unusual ", "").trim() || "";

        $historyButton.addEventListener("click", (event) => {
            event.stopPropagation();
            window.open(`https://backpack.tf/item/${id}`);
        });
        $statButton.addEventListener("click", function (event) {
            event.stopPropagation();
            const finalString = encodeURIComponent(`${effect} ${title}`);
            GM_xmlhttpRequest({
                url: `https://backpack.tf/search?text=${finalString}`,
                onload: async function (response) {
                    if (
                        response.status !== 200 ||
                        typeof JSON.parse(response.responseText).results[0] ===
                            "undefined"
                    ) {
                        ScrapTF.Crouton.Add(
                            `[SrapAuction+] Couldn't find ${effect} ${title}, redirecting to Google`,
                            "alert-error"
                        );
                        await new Promise((resolve) =>
                            setTimeout(resolve, 500)
                        );
                        window.open(
                            `https://www.google.com/search?q=${
                                effect + " " + title
                            }`
                        );
                        return;
                    }
                    const res = JSON.parse(response.responseText).results;
                    console.log(res);
                    ScrapTF.Crouton.Add(
                        "[SrapAuction+] Success! Opening the stat page"
                    );
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    const effectIndex = res[0].values[0].priceindex;
                    window.open(
                        `https://backpack.tf/stats/Unusual/${title}/Tradable/Craftable/${effectIndex}`
                    );
                },
            });
        });
    }

    const CUSTOM_BUTTONS_STYLE = document.createElement("style");
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
          `;

    document.head.append(CUSTOM_BUTTONS_STYLE);
    function parser(elementHTML) {
        const parseElement = document.createElement("div");
        parseElement.innerHTML = elementHTML;

        switch (parseElement.children.length) {
            case 1: {
                const innerText = parseElement.innerText;
                parseElement.remove();
                return innerText;
            }
            case 0:
                return "undefined name";
            default: {
                try {
                    const innerText = parseElement.innerHTML
                        .toString()
                        .match(/<br>Effect: (.*?)<br>/)[1];
                    console.log(innerText);
                    parseElement.remove();
                    return innerText;
                } catch (error) {
                    return "";
                }
            }
        }
    }
})();
