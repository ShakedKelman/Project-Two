

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
headerLogo.appendChild(mainHeader);

document.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const parallaxSpeed = 0.5; // Adjust this value to control the parallax speed
    mainHeader.style.transform = `translateY(${scrollTop * parallaxSpeed}px)`;
});


const navbarContainer = document.getElementById("navbar-container");


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
            // const moreInfoButton = cardOutput.querySelector(`.more-info-btn-${index}`);
            // moreInfoButton.addEventListener('click', async (ev) => {
            //     const btnTarget = ev.target.getAttribute('data-bs-target')
            //     console.log($(btnTarget).prop('class'))
            //     setTimeout(() => getMyCollapse(btnTarget), 500)
            //     await getCoinInfo(coin.id, coinInfoId);

            // });
            const moreInfoButton = cardOutput.querySelector(`.more-info-btn-${index}`);
            moreInfoButton.addEventListener('click', async (ev) => {
                const btnTarget = ev.target.getAttribute('data-bs-target');
                const collapseElement = document.querySelector(btnTarget);
                
                // Check if the collapse element is opening
                if (!$(collapseElement).hasClass('show')) {
                    console.log($(btnTarget).prop('class'));
                    setTimeout(() => getMyCollapse(btnTarget), 500);
                    startProgress(); // Call startProgress only when the collapse is opening
                    await getCoinInfo(coin.id, coinInfoId);
                }
            });
            
        });
        document.body.style.height = `${window.innerHeight}px`;

        return first25Coins;

    } catch (err) {
        console.log('an error happened', err);
    }

}

getCoins();

// const getMyCollapse = (elem = '#collapseExample1') => {
//     console.log($(elem).prop('class'))
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

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
    const cards = document.querySelectorAll('#home-sect .cardOutputStyle'); // Get all card elements within the home-sect

    cards.forEach(card => {
        const symbol = card.querySelector('.card-title').innerText.toLowerCase();
        if (symbol === filterValue) {
            card.style.display = 'block'; // Show matching cards
        } else {
            card.style.display = 'none'; // Hide non-matching cards
        }
    });
    document.getElementById('filterInput').value = '';


}


function showAll() {
    const cards = document.querySelectorAll('.cardOutputStyle'); // Get all card elements

    cards.forEach(card => {
        card.style.display = 'block'; // Show all cards
    });
}

$(document).ready(function () {
    // Initialize the popover
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});


let archive_data = { };

async function fetchCoinPrices(coinSymbols) {
    await generateModalContent();

    if (coinSymbols === undefined || coinSymbols.length === 0) coinSymbols = reportsArray.map(item => item.coin.symbol).join(',');
    console.log('Coin symbols:', coinSymbols); // Log the coin symbols
    if (coinSymbols.length !== 0) {
        try {
            const response = await fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coinSymbols}&tsyms=USD`);
            const data = await response.json();
            console.log('Fetched coin prices:', data); // Log the fetched items

            //const prices = Object.keys(data).map( symbol => )
            
            Object.keys(data).forEach((symbol) => {
                if (archive_data[symbol] === undefined) archive_data[symbol] = [];
                archive_data[symbol].push( { price: data[symbol].USD, time: new Date() } );
            });
            //archive_data = Object.keys(data).map((symbol) => ({ [symbol] : Object.assign( [], ... archive_data[symbol], { price: data[symbol].USD, time: new Date() } ) } ));
            const usdPrices = archive_data;
            console.log('USD prices array:', usdPrices); // Log USD prices array

            initializeChart(usdPrices);

            return data; // Return the entire data object
        } catch (error) {
            console.error('Error fetching coin prices:', error);
            return {};
        }
    }
}


// // trying]

let chart; // Declare chart variable in the global scope

async function initializeChart(coinPrices, symbol = 'ZCN') {
    console.log('chart works:');

    // Ensure coinPrices is a valid object
    if (Object.keys(coinPrices).length === 0)
    //if (!Array.isArray(coinPrices))
    {
        console.error('coinPrices is not a valid array:', coinPrices);
        return;
    }

    // create an array of arrays. symbol is the key, data is a series
    const dataPoints = Object.keys(coinPrices)
        .map(
            ky => ({
                symbol: ky,
                data: coinPrices[ky].map( item => ( {x : item.time, y: item.price }) )
                })
        );
    
    //const now = new Date().getTime();
    //const dataPoints = [];
    //for (let i = 0; i < coinPrices.length; i++) {
    //    const pointTime = now - (coinPrices.length - i - 1) * 2000; // Set each data point 2 seconds apart
    //    dataPoints.push({ x: new Date(pointTime), y: coinPrices[i].price });
    //}
    
    // Extract data points from the fetched coin prices
    const dataSeries0 = {
        type: "spline",
        showInLegend: true,
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,##0.########", // Display all digits after the decimal point
    };

    // an array of objects. Each is a data series of a symbol
    const dataSeries = Object.keys(dataPoints).map(
        ky => Object.assign(
            {},
            dataSeries0,
            { dataPoints: dataPoints[ky].data, name: dataPoints[ky].symbol }
        )
    );
    //dataPoints // Use the data points created

    console.log('all data series:', dataSeries);

    const allYValues = Object.assign( [], ...Object.values(dataPoints).map( ({data}) => data ) ).map( ({y}) => y );
        
    const minYValue = 0; // Start from 0
    const maxYValue = allYValues.reduce( (a,b)=>{ return (a<b) ? a : b } ) * 1.01; // Add 1% to the maximum value

    const allXValues = Object.assign( [], ...Object.values(dataPoints).map( ({data}) => data ) ).map( ({x}) => x );
    const minXValue = allXValues.reduce( (a,b)=>{ return (a>b) ? a : b } );
    const maxXValue = allXValues.reduce( (a,b)=>{ return (a<b) ? a : b } );
    
    console.log('Min Y Value:', minYValue);
    console.log('Max Y Value:', maxYValue);

    console.log('Min X Value:', minXValue);
    console.log('Max X Value:', maxXValue);
    
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
            valueFormatString: "HH:mm:ss",
            minimum: minXValue, // Display data from the past based on the number of data points
            maximum: maxXValue // Set maximum to 2 seconds in the future
        },
        
        axisY: {
            title: "Price (USD)",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC",
            minimum: minYValue, // Set minimum y-axis value dynamically
            maximum: maxYValue //
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [dataSeries, dataSeries2] // Use the fetched data series here
    };
    
    if (typeof chart === 'undefined') {
        chart = new CanvasJS.Chart("chartContainer", options); // Assign chart to the global variable
    } else {
        chart.options.axisX.maximum = maxXValue;
        chart.options.data = [ dataSeries, dataSeries2 ];
    }
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

// Function to add new data points to the chart
function addDataPoints(newDataPoints) {
    if (!chart) {
        console.error('Chart is not initialized.');
        return;
    }

    // Convert new data points to the correct format
    const formattedDataPoints = newDataPoints.map(item => ({
        x: new Date(item.time), // Convert item.time to a Date object
        y: item.price
    }));

    // Get the first data series in the chart
    const dataSeries = chart.options.data[0];

    // Add new data points to the data series
    dataSeries.dataPoints.push(...formattedDataPoints);

    // Update the maximum X axis value
    const maxXValue = Math.max(...dataSeries.dataPoints.map(dp => dp.x));
    chart.options.axisX.maximum = maxXValue;

    // Update the chart with new data points
    chart.render();
}


// Call fetchCoinPrices every 2 seconds
setInterval(async () => {
    // Call fetchCoinPrices to fetch new coin prices
    await fetchCoinPrices();
}, 2000);


// Update the chart data every two seconds
// setInterval(async () => {
//     // Call fetchCoinPrices to fetch new coin prices
//     const newData = await fetchCoinPrices();
    
//     // Ensure newData is an array
//     // if (!Array.isArray(newData)) {
//     //     console.error('Invalid data format:', newData);
//     //     return;
//     // }

//     // Get the current time
//     let currentTime = new Date();
    
//     // Update the x-axis labels with the current time and the previous time
//     chart.options.axisX.labelFormatter = function (e) {
//         let prevTime = new Date(currentTime);
//         prevTime.setSeconds(currentTime.getSeconds() - 2); // Subtract 2 seconds to get the previous time
//         return CanvasJS.formatDate(prevTime, "HH:mm:ss") + " - " + CanvasJS.formatDate(currentTime, "HH:mm:ss");
//     };

//     // Update the data points with the new time and price
//     chart.options.data.forEach(series => {
//         // Find the corresponding item in newData
//         const newItem = newData.find(item => item.symbol === series.name);
//         // If newItem is found, push the new data point
//         if (newItem) {
//             // Increment the x-coordinate by one unit
//             const newX = series.dataPoints.length > 0 ? series.dataPoints[series.dataPoints.length - 1].x.getTime() + 1000 : currentTime.getTime();
//             series.dataPoints.push({ x: new Date(newX), y: newItem.price });
//         }
//     });

//     // Render the updated chart
//     chart.render();
// }, 2000);







// trying

