const axios = require("axios");
const { parse } = require("node-html-parser");

const validCarriers = ["BuyBackWorld", "iBuyLocked"];

const phonePidUrl = "https://flipsy.com/sell/";
const carrierTableUrl = (pids) =>
  `https://flipsy.com/carriertable.php?pids=${pids}&ps=`;

async function getPhonePid(phone) {
  const url = `${phonePidUrl}${phone}`;

  try {
    const response = await axios.get(url);
    const { data } = response;
    const dom = parse(data);
    const frame = dom.querySelector(".ifr");
    const { rawAttrs } = frame;
    const attrs = rawAttrs.split(" ");
    const src = attrs.find((item) => item.includes("src="));
    if (!src) throw new Error("No Src found");
    const pids = src.split("pids=")[1].split("&amp")[0];
    return pids;
  } catch (e) {
    throw e;
  }
}

async function getCarrierPrices(pids) {
  try {
    const url = carrierTableUrl(pids);
    const response = await axios.get(url);
    const { data } = response;
    const dom = parse(data);

    const rows = dom.querySelectorAll(".offer-row");

    const carrierTable = [];

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (!row.rawAttrs.includes('class="offer-row"')) continue;
      const vendorEl = row.querySelector(".vendor-col");
      const vendor = vendorEl.innerText.trim();

      if (!validCarriers.includes(vendor)) continue;

      const sellPriceEl = row.querySelector(".sell-price");
      const h6 = sellPriceEl.querySelector("h6");
      const conditionAnchor = sellPriceEl.querySelector("a");

      const price = h6.innerText.replace(/ /g, "");
      const condition = conditionAnchor.innerText;

      carrierTable.push({
        vendor,
        price,
        condition,
      });
    }

    return carrierTable;
  } catch (e) {
    throw e;
  }
}

exports.handler = async (event) => {
  const { phone } = event;
  try {
    const pids = await getPhonePid(phone);
    const carrierPrices = await getCarrierPrices(pids);

    console.log("carrierPrices: ", carrierPrices);
    return carrierPrices;
  } catch (e) {
    console.log("ERROR: ", e);
  }
};
