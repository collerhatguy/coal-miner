export const currency = {
  OWNED_LOCAL_STORAGE_KEY: "Coalminer.money",
  save: function (money) {
    localStorage.setItem(this.OWNED_LOCAL_STORAGE_KEY, JSON.stringify(money));
  },
};
