// Chart JS Element
const ctx = document.getElementById("myChart");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Positif", "Sembuh", "Dirawat", "Meninggal"],
    datasets: [
      {
        label: "Data Persebaran COVID 19 di Indonesia",
        backgroundColor: "rgba(251,212,109,0.8)",
        data: [],
      },
    ],
  },
  options: {
    legend: {
      labels: {
        fontSize: 15,
      },
    },
    tooltips: {
      enabled: true,
      titleMarginBottom: 10,
    },
  },
});

const refresh = document.querySelector("svg.bi");

refresh.addEventListener("click", function () {
  const alertSpan = document.querySelector(".span-alert");
  refresh.classList.add("rotate");
  setTimeout(() => {
    refresh.classList.remove("rotate");
  }, 1000);
  updateUI();

  setTimeout(() => {
    alertSpan.innerHTML = `<div class="alert" role="alert">
      Data telah diperbarui
   </div>`;
  }, 3000);
  setTimeout(() => {
    alertSpan.innerHTML = "";
  }, 6000);
});

function getData() {
  const url = "https://api.kawalcorona.com/indonesia";

  return fetch(url, {
    method: "GET",
    mode: "cors",
  }).then((response) => response.json());
}

async function storeData() {
  const value = await getData();
  let dataCovid = {
    positif: value[0].positif,
    sembuh: value[0].sembuh,
    dirawat: value[0].dirawat,
    meninggal: value[0].meninggal,
  };
  return dataCovid;
}

function parseToInt(data) {
  return parseInt(data.replace(",", ""));
}

document.addEventListener("DOMContentLoaded", updateUI);

function updateUI() {
  const values = storeData();

  storeData()
    .then((values) => {
      myChart.data.datasets[0].data.push(
        parseToInt(values.positif),
        parseToInt(values.sembuh),
        parseToInt(values.dirawat),
        parseToInt(values.meninggal)
      );
      myChart.update();
    })
    .catch((err) => {
      console.log(err);
    });
}
