const BASE_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


// for dropdowns of countrylist
for (let select of dropdowns) {
    for (let currcode in countryList) {    //currency code is index
        let newoptn = document.createElement("option")
        newoptn.innerText = currcode;
        newoptn.value = currcode;
        // for default selection of usd and inr
        if (select.name === "from" && currcode === "USD") {
            newoptn.selected = "selected"
        }
        else if (select.name === "to" && currcode === "INR") {
            newoptn.selected = "selected"
        }
        select.append(newoptn)
    }
    select.addEventListener("change", (evt) => {
        // evt.target is the change after selecting option.
        updateflag(evt.target);
    })
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtval = amount.value
    if (amtval === "" || amtval < 1) {
        amount.value = "1";
        amtval = 1;
    }
    // const url = `${BASE_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`
    const url = `${BASE_url}/${fromcurr.value.toLowerCase()}.json`;
    let response = await fetch(url)
    let data = await response.json()
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
    let finalamt = amtval * rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalamt} ${tocurr.value}`
}
const updateflag = (element) => {   //there is our select under our element.
    let currcode = element.value;//extracting currency code from element
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    // here we are going in the parent of select which is select-container but find the id of img.
    let img = element.parentElement.querySelector("img")//parent of select is found.
    img.src = newsrc;
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault()
    updateExchangeRate()
})
// at the time of loading exchange rate should be updated.
window.addEventListener("load", () => {
    updateExchangeRate()
})


