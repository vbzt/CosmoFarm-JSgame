let dirtyEnergy = 0
let cleanEnergy = 0
let oreCount = 0
let moneyCount = 0
let currencyValue = 1

let solarPrice = 10
let solarUpgrade = 1

let cleanPrice = 40
let cleanOrePrice = 10
let cleanUpgrade = 1

let oreCleanPrice = 30
let orePrice = 100
let oreUpgrade = 1

let rebirthValue = 25000


const energyOutput = document.querySelector("#valEnergy")
const cleanOutput = document.querySelector("#valClean")
const oreOutput = document.querySelector("#valOre")
const moneyOutput = document.querySelector("#valMoney")
const outputSolarUp = document.querySelector("#pannelUp-cost")
const outputCleanUp = document.querySelector("#cleanUp-cost")
const outputOreUp = document.querySelector("#oreUp-cost")
const sellOreOutput = document.querySelector("#money-cost")
const rebirthOutput = document.querySelector("#rebirth-cost")


function getEnergy(){
  dirtyEnergy += 1 * solarUpgrade
    energyOutput.innerHTML = dirtyEnergy
    saveData()
}

function cleanE(){ 
    if(dirtyEnergy >= 10){
        dirtyEnergy -= 10;
        cleanEnergy += 5 * cleanUpgrade ;
        energyOutput.innerHTML = dirtyEnergy
        cleanOutput.innerHTML = cleanEnergy
        saveData()
    }else{
      alerta(`You don't have enought dirty energys to clean!`, 2000)
  }
}

function getOres(){ 
  if(cleanEnergy >= 5){
      cleanEnergy -= 5;
      oreCount += 1 * oreUpgrade ;
      oreOutput.innerHTML = oreCount
      cleanOutput.innerHTML = cleanEnergy
      saveData()
  }else{
    alerta(`You don't have enough clean energy to run the machines!`, 2000)}
}

function sellOres(event){
    let buttonClicked = event.target.id
    switch (buttonClicked){
      case "sell-1": 
        if(oreCount >= 1){
          oreCount -= 1
          moneyCount += 2 * currencyValue
          break;
        }else{
          alerta(`You don't have enough ores to sell!`, 2000)
      }


      case "sell-10":
        if(oreCount >= 10){
          oreCount -= 10
          moneyCount += 2 * currencyValue
          break;
        }else{
          alerta(`You don't have enough ores to sell!`, 2000)
        }
       
      case "sell-all":
        moneyCount += oreCount * 2 * currencyValue
        oreCount -= oreCount
        break;
    }
    saveData()
}


function upgradeSolar(){
  header.style.transform = "translateY(0%)";
  
  if(moneyCount >= solarPrice){
     moneyCount = moneyCount - solarPrice
    solarUpgrade += Math.ceil(solarUpgrade * 2) / 10;
    solarPrice += Math.ceil(solarPrice * 1.5) / 10;

    outputSolarUp.innerHTML =  `(${solarPrice.toFixed(1)} CosmoCoins)`
   

    saveData()
    saveUpgrades()
    saveUpgradeValues()
  
  }else{
    alerta("You need more CosmoCoins to upgrade the solar panels!", 2000)
  }
}

function upgradeClean(){
  header.style.transform = "translateY(0%)";
  if(moneyCount >= cleanPrice && oreCount >= cleanOrePrice){
    moneyCount -= cleanPrice
    oreCount -= cleanOrePrice

    cleanUpgrade += Math.ceil(cleanUpgrade * 0.3);
    cleanPrice += Math.ceil(cleanPrice * 0.3);
    cleanOrePrice +=  Math.ceil(cleanOrePrice * 0.3) ;

    outputCleanUp.innerHTML =  `(${cleanPrice.toFixed(1)} CosmoCoins and ${cleanOrePrice.toFixed(1)} ores)`
   
    saveData()
    saveUpgrades()
    saveUpgradeValues()
  
  }else{
    alerta("You dont have enough materials to upgrade the factories!", 2000)
  }
}

function upgradeOre(){
  header.style.transform = "translateY(0%)";
  if(moneyCount >= orePrice && cleanEnergy >= oreCleanPrice){
    moneyCount -= orePrice
    cleanEnergy -= oreCleanPrice

    oreUpgrade += Math.ceil(oreUpgrade * 0.15);
    orePrice += Math.ceil(solarPrice * 0.2);
    oreCleanPrice +=  Math.ceil(oreCleanPrice * 0.2);

    outputOreUp.innerHTML =  `(${orePrice.toFixed(1)} CosmoCoins and ${oreCleanPrice.toFixed(1)} clean energys)`
   
    saveData()
    saveUpgrades()
    saveUpgradeValues()
  
  }else{
    alerta("You dont have enough materials to upgrade the machines!", 2000)
  }
}

function rebirth(){
  if(moneyCount >= rebirthValue * 0.4 && oreCount >= rebirthValue * 0.4 && cleanEnergy >= rebirthValue * 0.2 ){
  dirtyEnergy = 0
  cleanEnergy = 0
  oreCount = 0
  moneyCount = 0
  currencyValue *= 1.5

  solarPrice = 10
  solarUpgrade = 1

  cleanPrice = 40
  cleanOrePrice = 10
  cleanUpgrade = 1

  oreCleanPrice = 30
  orePrice = 100
  oreUpgrade = 1
  rebirthValue = rebirthValue * 1.75
  rebirthOutput.innerHTML = `(${(rebirthValue * 0.4).toFixed(1)} CosmoCoins, ${(rebirthValue * 0.4).toFixed(1)} ores and ${(rebirthValue * 0.2).toFixed(1)} clean energys)`
  saveData()
  saveUpgradeValues()
  saveUpgrades()
  saveCurrencyValue()}
  else{
    alerta("You are not ready to travel around the space!", 2000)
  }

}

function saveData() {
    let saveDirty = dirtyEnergy;
    let saveClean = cleanEnergy;
    let saveOre = oreCount;
    let saveMoney = moneyCount;
    energyOutput.innerHTML = `${dirtyEnergy.toFixed(1)} ` 
    cleanOutput.innerHTML = `${cleanEnergy.toFixed(1)} ` 
    oreOutput.innerHTML = `${oreCount.toFixed(1)} `
    moneyOutput.innerHTML = `${moneyCount.toFixed(1)} ` 
    let arrayData = [];
    arrayData.push(saveDirty, saveClean, saveOre, saveMoney);
    let dataToJson = JSON.stringify(arrayData);
    localStorage.setItem("data", dataToJson);
}

function saveUpgrades(){
  let saveSolarUpgrade = solarUpgrade
  let saveCleanUpgrade = cleanUpgrade
  let saveOreUpgrade = oreUpgrade
  let arrayUpgrades = []
  arrayUpgrades.push(saveSolarUpgrade, saveCleanUpgrade, saveOreUpgrade)
  let upgradeToJson = JSON.stringify(arrayUpgrades)
  localStorage.setItem("upgrades", upgradeToJson )
}

function saveUpgradeValues(){
  let saveSolarUpgradeVal = solarPrice

  let saveCleanUpgradeVal = cleanPrice
  let saveCleanOreUpgradeVal = cleanOrePrice

  let saveOreUpgradeVal = orePrice
  let saveOreCleanUpgradeVal = oreCleanPrice

  let saveRebirthVal = rebirthValue

  let arrayUpgradesValues = []
  arrayUpgradesValues.push(saveSolarUpgradeVal, saveCleanUpgradeVal, saveCleanOreUpgradeVal, saveOreUpgradeVal, saveOreCleanUpgradeVal, saveRebirthVal)
  let upgradeToJson = JSON.stringify(arrayUpgradesValues)
  localStorage.setItem("upgrade-values", upgradeToJson )
}

function saveCurrencyValue(){
  let saveCurrencyVal = currencyValue
  sellOreOutput.innerHTML = `(1 ore = ${(2 * currencyValue).toFixed(1)} CosmoCoins)`
  let arrayCurrency = []
  arrayCurrency.push(saveCurrencyVal)
  let currencyToJSON = JSON.stringify(arrayCurrency)
  localStorage.setItem("currency-value", currencyToJSON)
}

function recoverData() {
  
  var data = localStorage.getItem("data");
  var upgrade = localStorage.getItem("upgrades")
  var upgradeValues = localStorage.getItem("upgrade-values")
  var currencyValues = localStorage.getItem("currency-value")
  var dataToArray = JSON.parse(data);
  var upgradeToArray = JSON.parse(upgrade)
  var upgradeValueToArray = JSON.parse(upgradeValues)
  var currencyValueToArray = JSON.parse(currencyValues)

  if (Array.isArray(dataToArray) && dataToArray.length === 4 && Array.isArray(upgradeToArray) && upgradeToArray.length === 3 && Array.isArray(upgradeValueToArray) && upgradeValueToArray.length === 6 && Array.isArray(currencyValueToArray) && currencyValueToArray.length === 1) {
    dirtyEnergy = dataToArray[0];
    cleanEnergy = dataToArray[1];
    oreCount = dataToArray[2];
    moneyCount = dataToArray[3];

    solarUpgrade = upgradeToArray[0]
    cleanUpgrade = upgradeToArray[1]
    oreUpgrade = upgradeToArray[2]

    solarPrice = upgradeValueToArray[0]
    cleanPrice = upgradeValueToArray[1]
    cleanOrePrice = upgradeValueToArray[2]
    orePrice = upgradeValueToArray[3]
    oreCleanPrice = upgradeValueToArray[4]
    rebirthValue = upgradeValueToArray[5]

    currencyValue = currencyValueToArray[0]

    outputSolarUp.innerHTML = `(${solarPrice.toFixed(1)} CosmoCoins)`
    outputCleanUp.innerHTML =  `(${cleanPrice.toFixed(1)} CosmoCoins and ${cleanOrePrice.toFixed(1)} ores)`
    energyOutput.innerHTML = dirtyEnergy.toFixed(1);
    cleanOutput.innerHTML = cleanEnergy.toFixed(1);
    oreOutput.innerHTML = oreCount.toFixed(1);
    moneyOutput.innerHTML = moneyCount.toFixed(1);
    sellOreOutput.innerHTML = `(1 ore = ${(2 * currencyValue).toFixed(1)} CosmoCoins)`
    rebirthOutput.innerHTML = `(${(rebirthValue * 0.4).toFixed(1)} CosmoCoins, ${(rebirthValue * 0.4).toFixed(1)} ores and ${(rebirthValue * 0.2).toFixed(1)} clean energys)`
    
  }else{
    alerta("Welcome To CosmoFarm!",3000)
    saveData()
    saveUpgrades()
    saveUpgradeValues()
    saveCurrencyValue()
  }
}


document.addEventListener("DOMContentLoaded", function() {
  recoverData();
});


const header = document.querySelector(".wallet");
let lastScroll = 0;
window.addEventListener("scroll", function() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;
    if (currentScroll > lastScroll) {
      // Scroll para baixo
      header.style.transform = "translateY(-100%)";
  } else {
      // Scroll para cima
      header.style.transform = "translateY(0%)";
  }

    lastScroll = currentScroll;
});


function alerta(texto, tempo) {
  var divAlerta = document.createElement("div");
  var pAlerta = document.createElement("p");

  pAlerta.innerHTML = texto;

  divAlerta.classList.add("alerta");

  document.body.appendChild(divAlerta);
  divAlerta.appendChild(pAlerta);

  setTimeout(() => {
      divAlerta.remove();
  }, tempo);
}

