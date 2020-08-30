export const miner = {
  cost: 10,
  speed: 10000,
  speedUpgradeCost: 5000,
  speedUpgradeRate: 100,
  speedUpgradeCap: null, //localStorage.getItem(this.UPGRADE_CAP_LOCAL_STORAGE_KEY),
  OWNED_LOCAL_STORAGE_KEY: "Coalminer.ownedMiners",
  UPGRADE_CAP_LOCAL_STORAGE_KEY: "Coalminer.minerCapLimit",
  saveAmount: function (ownedDrills) {
    localStorage.setItem(
      this.OWNED_LOCAL_STORAGE_KEY,
      JSON.stringify(ownedDrills)
    );
  },
};
