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
  const url = "https://corona.coollabs.work/country/indonesia";

  return fetch(url, {
    method: "GET",
    mode: "cors",
  }).then((response) => response.json());
}

async function storeData() {
  const value = await getData();
  let dataCovid = {
    Confirmed: value.Confirmed,
    Recovered: value.Recovered,
    Active: value.Active,
    Deaths: value.Deaths,
  };
  return dataCovid;
}

document.addEventListener("DOMContentLoaded", updateUI);

function updateUI() {
  const values = storeData();

  values
    .then((value) => {
      myChart.data.datasets[0].data.push(
        value.Confirmed,
        value.Recovered,
        value.Active,
        value.Deaths
      );
      myChart.update();
    })
    .catch((err) => {
      console.log(err);
    });
}
