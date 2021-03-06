
let firstDate = "2019-09-01";
let lastDate = "2019-10-01";
let currency = "USD";

document.getElementById("filter").onclick = () => {
    firstDate = document.getElementById("firstInput").value;
    lastDate = document.getElementById("lastInput").value;
    currency = document.getElementById("currency").value;
    getInfo();
}


function getInfo() {
    axios
        .create({baseURL: `http://api.coindesk.com/v1/bpi/historical/close.json?start=${firstDate}&end=${lastDate}&currency=${currency}`})
        .get()
        .then(responseFromAPI => printTheChart(responseFromAPI.data.bpi))
        .catch(err => console.log("Error is: ", err));
}

function printTheChart(priceData) {
    const ctx = document.getElementById("myChart").getContext("2d");
    const priceDates = Object.keys(priceData);
    const priceValues = Object.values(priceData);
 
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: priceDates,
            datasets: [{
                label: "Stock Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: priceValues
            }]
        }
    })
    
    document.getElementById("min").innerHTML = `MIN: ${Math.min(...priceValues)}`;
    document.getElementById("max").innerHTML = `MAX: ${Math.max(...priceValues)}`;

};