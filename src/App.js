import React, { useState, useEffect } from "react";
import { miner } from "./miner";
import { drill } from "./drill";
import "./app.css";

function App() {
  const MONEY_LOCAL_STORAGE_KEY = "coalMiner.money";
  const OWNED_MINERS_LOCAL_STORAGE_KEY = "coalMiner.miners";
  const OWNED_DRILLS_LOCAL_STORAGE_KEY = "coalMiner.drills";

  const [money, setMoney] = useState(10);
  const [ownedMiners, setOwnedMiners] = useState(0);
  const [ownedDrills, setOwnedDrills] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  useEffect(
    function () {
      localStorage.setItem(MONEY_LOCAL_STORAGE_KEY, JSON.stringify(money));
    },
    [money]
  );
  useEffect(
    function () {
      localStorage.setItem(
        OWNED_MINERS_LOCAL_STORAGE_KEY,
        JSON.stringify(ownedMiners)
      );
    },
    [ownedMiners]
  );
  useEffect(
    function () {
      localStorage.setItem(
        OWNED_DRILLS_LOCAL_STORAGE_KEY,
        JSON.stringify(ownedDrills)
      );
    },
    [ownedDrills]
  );
  const setMultiplier1 = () => {
    setMultiplier(1);
  };
  const setMultiplier10 = () => {
    setMultiplier(10);
  };
  const setMultiplier100 = () => {
    setMultiplier(100);
  };
  const buyMiner = () => {
    if (money < miner.cost * multiplier) return;
    setMoney(money - miner.cost * multiplier);
    setOwnedMiners(ownedMiners + multiplier);
    miner.cost += multiplier;
  };
  const buyDrill = () => {
    if (money < drill.cost * multiplier) return;
    setMoney(money - drill.cost * multiplier);
    setOwnedDrills(ownedDrills + multiplier);
    drill.cost += multiplier;
  };
  const miningMiners = () => {
    setMoney((prevMoney) => prevMoney + ownedMiners);
  };
  const miningDrills = () => {
    setMoney((prevMoney) => prevMoney + ownedDrills * 10);
  };
  const upgradeMinerSpeed = () => {
    if (money >= miner.speedUpgradeCost) {
      setMoney(money - miner.speedUpgradeCost);
      miner.speed = miner.speed - miner.speedUpgradeRate;
      miner.speedUpgradeCost += miner.speedUpgradeCost;
      if (miner.speed - miner.speedUpgradeRate <= 0) {
        document.getElementById("minerSpeedUpgradeButton").remove();
      }
    }
  };
  const upgradeDrillSpeed = () => {
    if (money >= drill.speedUpgradeCost) {
      setMoney(money - drill.speedUpgradeCost);
      drill.speed = drill.speed - drill.speedUpgradeRate;
      drill.speedUpgradeCost += drill.speedUpgradeCost;
      if (drill.speed - drill.speedUpgradeRate <= 0) {
        document.getElementById("drillSpeedUpgradeButton").remove();
      }
    }
  };
  const minerProgress = document.getElementById("minerProgress");
  setInterval(() => {
    const computedStyle = getComputedStyle(minerProgress);
    const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;
    minerProgress.style.setProperty("--width", width + 0.1);
  }, 5);
  setInterval(miningMiners, miner.speed);
  setInterval(miningDrills, drill.speed);
  return (
    <>
      <div id="display">
        <h1>Money: {money}</h1>
        <h1>Miners: {ownedMiners}</h1>
        <div class="progressBar" id="minerProgress"></div>
        <h1>Drills: {ownedDrills}</h1>
        <div class="progressBar" id="drillProgress"></div>
      </div>
      <div id="buyContainer">
        <button onClick={buyMiner}>
          Buy Miner ({miner.cost * multiplier}M)
        </button>
        <button onClick={buyDrill}>
          Buy Drill ({drill.cost * multiplier}M)
        </button>
      </div>
      <div id="upgradeContainer">
        <button id="minerSpeedUpgradeButtpn" onClick={upgradeMinerSpeed}>
          Upgrade Miner Speed (5,000M)
        </button>
        <button id="drillSpeedUpgradeButtpn" onClick={upgradeDrillSpeed}>
          Upgrade Drill Speed (50,000M)
        </button>
      </div>
      <div id="multiplierContainer">
        <input
          type="radio"
          value="1"
          id="1multiplier"
          name="multiplier"
          onClick={setMultiplier1}
        ></input>
        <label for="1multiplier">1x</label>
        <input
          type="radio"
          value="10"
          id="10multiplier"
          name="multiplier"
          onClick={setMultiplier10}
        ></input>
        <label for="10multiplier">10x</label>
        <input
          type="radio"
          value="100"
          id="100multiplier"
          name="multiplier"
          onClick={setMultiplier100}
        ></input>
        <label for="100multiplier">100x</label>
      </div>
    </>
  );
}

export default App;
