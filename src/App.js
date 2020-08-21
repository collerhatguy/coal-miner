import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const MONEY_LOCAL_STORAGE_KEY = "coalMiner.money";
  const OWNED_MINERS_LOCAL_STORAGE_KEY = "coalMiner.miners";
  const [money, setMoney] = useState(
    // JSON.parse(localStorage.getItem(MONEY_LOCAL_STORAGE_KEY)) || 1
    10
  );
  const [ownedMiners, setOwnedMiners] = useState(
    // JSON.parse(localStorage.getItem(OWNED_MINERS_LOCAL_STORAGE_KEY)) || 0
    0
  );
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
  const buyMiner = () => {
    if (money < 10) return;
    setMoney(money - 10);
    setOwnedMiners(ownedMiners + 1);
  }
  const mining = () => {
    setMoney(money + ownedMiners * 1);
  }
  // function buyMiner() {
  //   if (money < 10) return;
  //   setMoney(money - 10);
  //   setOwnedMiners(ownedMiners + 1);
  // }
  // function mining() {
  //   setMoney(money + ownedMiners * 1);
  // }
  setInterval(mining, 1000);
  return (
    <>
      <h1>Money: {money}</h1>
      <h1>Miners: {ownedMiners}</h1>
      <button onClick={buyMiner}>Buy Miner (10M)</button>
    </>
  );
}

export default App;
