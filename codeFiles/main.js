

const debug = true;

const reportsArray = [];
let saveReportsArray = [];
const addedCardIds = [];
let eventHandlerType;
const usdPrices = [];

const dataDebug =
    [

        {
            "id": "01coin",
            "symbol": "zoc",
            "name": "01coin"
        },
        {
            "id": "0chain",
            "symbol": "zcn",
            "name": "Zus"
        },
        {
            "id": "0-knowledge-network",
            "symbol": "0kn",
            "name": "0 Knowledge Network"
        },
        {
            "id": "0-mee",
            "symbol": "ome",
            "name": "O-MEE"
        },
        {
            "id": "0vix-protocol",
            "symbol": "vix",
            "name": "0VIX Protocol"
        },
        {
            "id": "0vm",
            "symbol": "zerovm",
            "name": "0VM"
        },
        {
            "id": "0x",
            "symbol": "zrx",
            "name": "0x Protocol"
        },
        {
            "id": "0x0-ai-ai-smart-contract",
            "symbol": "0x0",
            "name": "0x0.ai: AI Smart Contract"
        },
        {
            "id": "0x1-tools-ai-multi-tool",
            "symbol": "0x1",
            "name": "0x1.tools: AI Multi-tool"
        },
        {
            "id": "0x404",
            "symbol": "xfour",
            "name": "0x404"
        },
        {
            "id": "0xaiswap",
            "symbol": "0xaiswap",
            "name": "0xAISwap"
        },
        {
            "id": "0xanon",
            "symbol": "0xanon",
            "name": "0xAnon"
        },
        {
            "id": "0xbet",
            "symbol": "0xbet",
            "name": "0xBET"
        },
        {
            "id": "0xblack",
            "symbol": "0xb",
            "name": "0xBlack"
        },
        {
            "id": "0xcoco",
            "symbol": "coco",
            "name": "0xCoco"
        },
        {
            "id": "0xconnect",
            "symbol": "0xcon",
            "name": "0xConnect"
        },
        {
            "id": "0xdao",
            "symbol": "oxd",
            "name": "0xDAO"
        },
        {
            "id": "0xdefcafe",
            "symbol": "cafe",
            "name": "0xDEFCAFE"
        },
        {
            "id": "0xengage",
            "symbol": "engage",
            "name": "0xEngage"
        },
        {
            "id": "0xfair",
            "symbol": "fair",
            "name": "0xFair"
        },
        {
            "id": "0xfreelance",
            "symbol": "0xfree",
            "name": "0xFreelance"
        },
        {
            "id": "0xgambit",
            "symbol": "0xg",
            "name": "0xgambit"
        },
        {
            "id": "0xgasless",
            "symbol": "0xgas",
            "name": "0xGasless (OLD)"
        },
        {
            "id": "0xgasless-2",
            "symbol": "0xgas",
            "name": "0xGasless"
        },
        {
            "id": "0xgpu-ai",
            "symbol": "0xg",
            "name": "0xGPU.ai"
        },
        {
            "id": "0x-leverage",
            "symbol": "oxl",
            "name": "0x Leverage"
        },
        {
            "id": "0xliquidity",
            "symbol": "0xlp",
            "name": "0xLiquidity"
        },
        {
            "id": "0xlsd",
            "symbol": "0xlsd",
            "name": "0xLSD"
        },
        {
            "id": "0xmonero",
            "symbol": "0xmr",
            "name": "0xMonero"
        },
        {
            "id": "0xnude",
            "symbol": "nude",
            "name": "0xNude"
        },
        {
            "id": "0xnumber",
            "symbol": "oxn",
            "name": "0xNumber"
        },
        {
            "id": "0xos-ai",
            "symbol": "0xos",
            "name": "0xOS AI"
        }
    ];

const cache = {};
// Simulate progress (increase value over time)
// Simulate progress (increase value over time)
function simulateProgress() {
    var val = $("#progress-bar").progressbar("value");
    val = val + 10; // Increase value by 10%
    if (val <= 100) {
        $("#progress-bar").progressbar("value", val);
        $("#progress-label").text(val + "%");
        setTimeout(simulateProgress, 1000); // Update every 1 second
    }
}



const startProgress = function () {
    $("#progress-bar").progressbar({
        value: 0 // Initial value (0%)
    });

    simulateProgress(); // Start the progress simulation
};

const endProgress = function () {
    $("#progress-bar").progressbar({
        value: 100 // Initial value (0%)
    });

    $("#progress-label").text("Complete!"); // Update progress label when complete
};

const headerLogo = document.getElementById('header-main');
const mainHeader = document.createElement('h1');
mainHeader.setAttribute('id', 'main-header');
mainHeader.setAttribute('class', 'mainHeaderStyle');
mainHeader.setAttribute('class', 'parallax-header');
mainHeader.style.fontWeight = "bold"; // Set the font weight to bold
mainHeader.style.fontSize = "25px"; // Set the font size to 20 pixels

mainHeader.style.backgroundImage = "url('../assets/cr.png')";
// mainHeader.textContent = "Crypto";

headerLogo.appendChild(mainHeader);

document.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const parallaxSpeed = 0.5; // Adjust this value to control the parallax speed
    mainHeader.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
});



const navbarContainer = document.getElementById("navbar-container");

/*
const progressBarContainer = document.createElement('div');
progressBarContainer.setAttribute('id', 'progress-bar-container');
navbarContainer.appendChild(progressBarContainer);

const progressBarLabel = document.createElement('div');
progressBarLabel.setAttribute('id', 'progress-label');
progressBarContainer.appendChild(progressBarLabel);

const progressBar = document.createElement('div');
progressBar.setAttribute('id', 'progress-bar');
progressBarLabel.appendChild(progressBar);
*/


let isAdditionalInfoDisplayed = {
    'home-id': false,
    'live-reports-id': false,
    'about-id': false
};
const navbarItems = ['home-id', 'live-reports-id', 'about-id'];

navbarItems.forEach(itemId => {
    const navItem = document.getElementById(itemId);

    navItem.addEventListener('click', () => {
        console.log(this)

        const toActivate = Object.keys(isAdditionalInfoDisplayed)
            .filter(navId => navId !== itemId);
        toActivate.forEach(navId => $('#' + navId).removeClass('active')); // hide all sections not under itemId
        $('#' + itemId).addClass('active'); // show the section under itemId

        // reflect the display on the respective section(s)
        const toHide = Object.keys(isAdditionalInfoDisplayed)
            .filter(navId => navId !== itemId)
            .map(navId => navId.replace(/-id/, '-sect'));
        toHide.forEach(sectId => $('#' + sectId).hide()); // hide all sections not under itemId
        $('#' + itemId.replace(/-id/, '-sect')).show(); // show the section under itemId

        isAdditionalInfoDisplayed[itemId] = !isAdditionalInfoDisplayed[itemId];
    });
});



// a function to fetch the coin information
async function getCoins() {

    try {
        let response;
        let data;

        if (debug !== true) {
            response = await fetch('https://api.coingecko.com/api/v3/coins/list')
            data = await response.json();
        } else {
            data = dataDebug // 'file:///Users/shakedkelman/Documents/FullStack4578:41/projects/project_two/codeFiles/coins.json');
        }

        const first25Coins = data.slice(0, 25);
        console.log(first25Coins);

        const cardContainer = document.getElementById('home-sect');

        //cardContainer.setAttribute('id', 'coin-container');
        //document.body.appendChild(cardContainer);


        first25Coins.forEach((coin, index) => {

            const cardOutput = document.createElement('div');
            cardOutput.setAttribute('class', 'cardOutputStyle mb-3 col-md-4');
            cardOutput.setAttribute('id', 'card-coin-output');
            const coinInfoId = `coin-info-id-${index}`;
            cardOutput.setAttribute('id', `card-coin-output-${index}`);
            cardOutput.setAttribute('coin-id', coin.id)



            cardOutput.innerHTML = `
            <div class="card mb-3 custom-card-style" style="max-width: 540px;">

            <div class="row g-0">
            <div class="col-md-4">
                <img src="../assets/card-logo.png" class="img-fluid rounded-start" alt="a logo picture">
            </div>
            <div class="col-md-8">

            <div class="card-body text-bg-light text-dark" >
            <label class="toggle-switch" id="toggle-button-${index}">
                <input type="checkbox" id="toggle-switch-${index}">
                <span class="slider"></span>
            </label>

                    <h5 class="card-title">${coin.symbol}</h5>
                    <p class="card-text">${coin.name}</p>

                    <p>
                    <button class="btn btn-dark btn-sm more-info-btn-${index}" data-bs-target="#collapseExample${index}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    more info </button>
                  </p>
                  <div class="collapse multi-collapse" aria-expanded="false" id="collapseExample${index}">
                    <div class="card card-body cardIndex${index}" id="coin-info-id-${index}">

                    </div>
                  </div>
             </div>
            </div>
        </div>
        </div>

            `;


            cardContainer.appendChild(cardOutput);

            function handleToggleSwitchChange(index, isChecked, coin) {
                console.log(index, isChecked, coin)
                if (!isChecked) {
                    removeReport(index);
                } else {
                    addToReport(coin, index);
                    if (isChecked) {
                        // setInterval(() => {
                        //     if (typeof chart !== 'undefined') {
                        //     // Update the x-axis to show the current time
                        //     chart.options.data.forEach(dataSeries => {
                        //         const y =  fetchCoinPrices('zcn,zoc').then( (res => dataSeries.dataPoints.push({ x: new Date(), y: y.ZOC.USD }) , rej => new Error('cannot')))
                        //         console.log(y)
                        //         // Example: Generate random data
                        //     });
                        //     chart.render();
                        //     } else { console.log('chart not defined')}
                        // }, 2000);
                        
                        //fetchCoinPrices(); // Call fetchCoinPrices here
                    }
                }
                console.log("Selected toggle card index:", index);
                // console.log("Main toggle index:", mainToggleIndex); // Log the main toggle index

                // If the modal toggle is unchecked, uncheck the corresponding coin card toggle switch
                if (!isChecked) {
                    $(`#toggle-switch-${index}`).prop('checked', false);
                }
            }


            // Usage:
            const toggleSwitch = $(`#toggle-switch-${index}`);
            toggleSwitch.on('change', function (event) {
                handleToggleSwitchChange(index, event.target.checked, coin);
            });


            function removeReport(index) {
                const reportIndex = reportsArray.findIndex(item => item.index === index);
                if (reportIndex !== -1) {
                    const removedCoin = reportsArray[reportIndex].coin; // Get the coin object before removing it
                    reportsArray.splice(reportIndex, 1);
                    const addedIndex = addedCardIds.indexOf(index);
                    if (addedIndex !== -1) {
                        addedCardIds.splice(addedIndex, 1);
                    }
                    console.log('Removed coin from reports array:', removedCoin); // Log the removed coin
                    console.log('Reports array:', reportsArray);
                }
            }

            // Add event listener to "more info" button
            const moreInfoButton = cardOutput.querySelector(`.more-info-btn-${index}`);
            moreInfoButton.addEventListener('click', async (ev) => {
                const btnTarget = ev.target.getAttribute('data-bs-target')
                console.log($(btnTarget).prop('class'))
                setTimeout(() => getMyCollapse(btnTarget), 500)
                await getCoinInfo(coin.id, coinInfoId);

            });

        });
        document.body.style.height = `${window.innerHeight}px`;

        return first25Coins;

    } catch (err) {
        console.log('an error happened', err);
    }

}
getCoins();

const getMyCollapse = (elem = '#collapseExample1') => {
    console.log($(elem).prop('class'))
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getCoinInfo(coinId, coinInfoId) {
    try {
        startProgress();
        let data;
        if (!cache.hasOwnProperty(coinId)) {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
            data = await response.json();
            cache[coinId] = data;
            setTimeout(() => {
                delete cache[coinId];
                console.log(`Cache for ${coinId} cleared.`);
            }, 2 * 60 * 1000); // 2 minutes in milliseconds
        } else {
            data = cache[coinId];
            await sleep(2000)
        }

        //$('#dummy').removeClass('done')
        //$('#dummy').addClass("load").delay(4000).addClass("done").removeClass('load');

        const moreInfoData = document.getElementById(coinInfoId);
        moreInfoData.innerHTML = `
        <img src="${data.image.small}" class="coinInfoImg">
        <div class="coinInfoDiv">
            market price:
           <br> in usd-${data.market_data.current_price.usd}$
           <br>  in eur-${data.market_data.current_price.eur}€
           <br>  in ils-${data.market_data.current_price.ils}₪
        </div>
    `;

        console.log(data.id);
        console.log("Coin ID:", coinId);
        console.log("card ID:", coinInfoId);

    } catch (error) {
        console.log("an error happened");
        console.log(error);
    }
    endProgress();
}





function addToReport(coin, index) {
    if (!addedCardIds.includes(index)) {
        reportsArray.push({ coin, index });
        addedCardIds.push(index);
        console.log('Added coin to reports array:', coin);
        console.log('Reports array:', reportsArray);
    } else {
        console.log('This card has already been added to the reports.');
    }

    if (reportsArray.length > 5) {
        const modalDOM = $('#model-text');
        modalDOM.html(generateModalContent()); // Populate modal body with content
        $('#maxCoinsModal').modal('show'); // Show the modal
    }
}



function getCoinHash() {
    const coin_hash = Object.assign({},
        ...Array.from($('.cardOutputStyle'))
            .map(d => ({ [d.getAttribute('coin-id')]: d.id.replace(/.*-/, '') })))
    return coin_hash;
}


function undoSaveHistory() {
    const undoBtn = $('#undoModal');
    if (eventHandlerType === 'click') {
        console.log('EventHandler "click" has already been applied to #undoModal');
    } else {
        // create a click handler that restores the reportsArray to the toggles' original positions
        undoBtn.on('click', function (ev) {
            eventHandlerType = ev.type;
            $("[id*='modal-switch-']:not(:checked)").click();
        })
    }
}


function generateModalContent() {
    let switches = $('#modal-switches');
    switches.empty();

    const coin_hash = getCoinHash();

    undoSaveHistory();

    reportsArray
        .sort((a, b) => coin_hash[a.coin.id] - coin_hash[b.coin.id])
        .forEach((item) => {
            const coin = item.coin; // Define coin variable here
            const index = coin_hash[coin.id];
            console.log(index)

            // Create a new <li> element, within create a label + input, within the latter create a span
            const li = $('<li>');
            li.text(`${coin.name} (${coin.symbol})`);
            const div = $('<span>')
            const label = $('<label>').addClass('toggle-switch').attr('id', `modal-toggle-${index}`);
            const inp = $('<input>')
            inp.attr('type', 'checkbox').attr('id', `modal-switch-${index}`).prop('checked', true);

            inp[0].addEventListener('change', function (ev) {
                $('#' + ev.target.id.replace(/modal-/, 'toggle-')).click()
                // handleToggleSwitchChange(index, $( this).prop('checked'), coin); // Pass coin as a parameter
            });

            console.log(inp)
            const span = $('<span>').addClass('slider-modal').attr('id', `modal-slider-${index}`)
            label.append(inp).append(span);
            div.append(label)
            li.append(div);
            switches.append(li);

            // Add event listener to the toggle switch
            /*
            inp.on('change', function (ev) {
                console.log([ 'EEEEEEEEEEEE', ev ])
                //handleToggleSwitchChange(index, $(this).prop('checked'), coin); // Pass coin as a parameter
            });
            */
        });

    return switches;
}

function closeModal() {
    // $('#maxCoinsModal').modal('hide');
    // console.log('Reports array:', reportsArray);
    // Check if there are 5 or fewer items in the reportsArray
    if (reportsArray.length <= 5) {
        $('#maxCoinsModal').modal('hide');
        console.log('Reports array:', reportsArray);
    } else {
        alert('please make sure there are 5 or less coins selected')
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.querySelector('#maxCoinsModal .close');

    closeButton.addEventListener('click', function () {
        closeModal();
        renderReportsArray(); // Render the reports array after closing the modal
    });

    // Render modal content on page load
    const modalDOM = document.getElementById('model-text');
    //modalText.innerHTML = generateModalContent();
});

function renderReportsArray() {
    // Render the reports array wherever you want to display it
    console.log('Reports array:', reportsArray);

    // Iterate over each report in the array
    reportsArray.forEach(report => {
        const index = report.index;
        const isChecked = $(`#modal-switch-${index}`).prop('checked');

        if (!isChecked) {
            // If the toggle switch in the modal is unchecked,
            // check the corresponding toggle switch in the main UI
            $(`#toggle-switch-${index}`).prop('checked', true);
        }
    });
}

function reloadPage() {
    window.location.reload();
}





function filterByName() {

    const filterValue = document.getElementById('filterInput').value.toLowerCase().trim(); // Trim whitespace from the input
    const filteredData = dataDebug.filter(item => item.symbol.toLowerCase() === filterValue); // Compare entire name
    // clearCardContainer();
    document.getElementById('home-sect').classList.add('hidden');

    // Display the filtered results as full coin cards
    displayResults(filteredData);

    if (filteredData.length === 0) {
        alert('please type the full name of the coin you want to find');
    }
    // Check if the searched card is in reportsArray
    filteredData.forEach(item => {
        const foundInReports = reportsArray.some(reportItem => reportItem.coin.symbol === item.symbol);
        if (foundInReports) {
            console.log(`"${item.symbol}" is in the reports array.`);
        } else {
            // If no match is found, log a message
            console.log(`"${item.symbol}" is not in the reports array.`);
        }
    });

    // Iterate over filtered data to attach event listeners
    filteredData.forEach((item, index) => {
        const toggleSwitch = $(`#toggle-switch-${index}`);
        toggleSwitch.on('change', function (event) {
            handleToggleSwitchChange(index, event.target.checked, item);
        });

        const moreInfoButton = document.querySelector(`.more-info-btn-${index}`);
        moreInfoButton.addEventListener('click', async (ev) => {
            const btnTarget = ev.target.getAttribute('data-bs-target');
            console.log($(btnTarget).prop('class'));
            setTimeout(() => getMyCollapse(btnTarget), 500);
            await getCoinInfo(item.id, `coin-info-id-${index}`);
        });
    });


    document.getElementById('filterInput').value = '';
}


function displayResults(results) {
    const resultList = document.getElementById('resultList');

    results.forEach((item, index) => {
        if (document.querySelector(`#card-coin-output-${item.id}`)) {
            alert("This card is already displayed!"); // Alert when skipping a card

            return; // Skip if the card is already displayed
        }
        const cardOutput = document.createElement('div');
        cardOutput.setAttribute('class', 'cardOutputStyle mb-3 col-md-4');
        // cardOutput.setAttribute('id', `card-coin-output-${index}`);
        cardOutput.setAttribute('id', `card-coin-output-${item.id}`);

        cardOutput.setAttribute('coin-id', item.id);

        cardOutput.innerHTML = `
            <div class="card mb-3 custom-card-style" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="../assets/card-logo.png" class="img-fluid rounded-start" alt="a logo picture">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body text-bg-light text-dark">
                            <label class="toggle-switch" id="toggle-button-${index}">
                            <input type="checkbox" id="toggle-switch-${index}" ${isInReports(item.id) ? 'checked' : ''}>
                            <span class="slider"></span>
                            </label>
                            <h5 class="card-title">${item.symbol}</h5>
                            <p class="card-text">${item.name}</p>
                            <p>
                                <button class="btn btn-dark btn-sm more-info-btn-${index}" data-bs-target="#collapseExample${index}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample${index}" aria-expanded="false" aria-controls="collapseExample${index}">
                                    more info
                                </button>
                            </p>
                            <div class="collapse multi-collapse" aria-expanded="false" id="collapseExample${index}">
                                <div class="card card-body cardIndex${index}" id="coin-info-id-${index}">
                                    <!-- Additional coin info can be inserted here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        resultList.appendChild(cardOutput);
    });
}
// unction to check if a card is in the reports array
function isInReports(coinId) {
    return reportsArray.some(reportItem => reportItem.coin.id === coinId);
}

function showAll() {
    document.getElementById('filterInput').value = ''; // Clear the filter input
    const resultList = document.getElementById('resultList');
    resultList.innerHTML = ''; // Clear the UI output

    document.getElementById('home-sect').classList.remove('hidden');

}



$(document).ready(function () {
    // Initialize the popover
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});


async function fetchCoinPrices(coinSymbols) {
    await generateModalContent();

    if (coinSymbols === undefined || coinSymbols.length === 0) coinSymbols = reportsArray.map(item => item.coin.symbol).join(',');
    console.log('Coin symbols:', coinSymbols); // Log the coin symbols

    try {
        const response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinSymbols}&tsyms=USD`);
        const data = await response.json();
        console.log('Fetched coin prices:', data); // Log the fetched items

        const usdPrices = Object.keys(data).map((symbol) => ({ symbol: symbol, price: data[symbol].USD }));
        console.log('USD prices array:', usdPrices); // Log USD prices array
        initializeChart(usdPrices);

        return data; // Return the entire data object
    } catch (error) {
        console.error('Error fetching coin prices:', error);
        return {};
    }
}


async function initializeChart(coinPrices) {
    console.log('chart works:');

    // Ensure coinPrices is an object
    if (!Array.isArray(coinPrices)) {
        console.error('coinPrices is not a valid array:', coinPrices);
        return;
    }

    // Extract data points from the fetched coin prices
    const dataSeries = coinPrices.map(item => ({
        type: "spline",
        name: item.symbol, // Use the coin symbol as the series name
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,##0.########", // Display all digits after the decimal point
        dataPoints: [{ x: new Date(), y: item.price }] // Initialize with the first data point
    }));

    console.log('Data series:', dataSeries);

    let options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Coin Prices to USD"
        },
        subtitles: [{
            text: "Click Legend to Hide or Unhide Data Series"
        }],
        axisX: {
            title: "Time",
            // minimum: new Date().getTime(),
            // maximum: new Date().getTime() + 7000 
        },
        axisY: {
            title: "Price (USD)",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            minimum: 0, // Set minimum y-axis value to 0
            maximum: 7000
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: dataSeries // Use the fetched data series here
    };

    let chart = new CanvasJS.Chart("chartContainer", options);
    chart.render();
    
    
    

    
    
    // Define the toggleDataSeries function
    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    return chart;
}






document.addEventListener('DOMContentLoaded', function () {
    // Get a reference to the button
    var backToTopBtn = document.getElementById('back-to-top-btn');

    // Add a click event listener to scroll to the top when clicked
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Add smooth scrolling behavior
        });
    });

    // Add a scroll event listener to show/hide the button based on scroll position
    window.addEventListener('scroll', function () {
        // Show the button when scrolling down past 200 pixels
        if (window.pageYOffset > 200) {
            backToTopBtn.classList.remove('d-none');
        } else {
            backToTopBtn.classList.add('d-none');
        }
    });
});


