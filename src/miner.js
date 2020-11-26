export const miner = {
  cost: 10,
  speed: 10000,
  speedUpgradeCost: 5000,
  speedUpgradeRate: 100,
  OWNED_LOCAL_STORAGE_KEY: "Coalminer.ownedMiners",
  save: function () {
    localStorage.setItem(
      this.OWNED_LOCAL_STORAGE_KEY,
      JSON.stringify(ownedDrills)
    );
  },
};
