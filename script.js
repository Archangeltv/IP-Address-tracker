const searchBar = document.querySelector("#search");
const btn = document.querySelector("button");
const ip = document.querySelector(".ip");
const theLocation = document.querySelector(".location");
const timezone = document.querySelector(".timezone");
const isp = document.querySelector(".isp");
const theMapp = document.querySelector("#map");
const personal = document.querySelector(".personal");
const middle = document.querySelector(".middle");
const tiny = document.querySelector(".tiny");
const close = document.querySelector(".close");

middle.classList.add("none");
middle.classList.remove("tiny");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3f4bd6b374mshea401b28d158bf1p13b8ddjsn9091f7ec62a9",
    "X-RapidAPI-Host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
  },
};

const BASE_URL = "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/";

const getIpLocation = async () => {
  const barValue = searchBar.value;
  const response = await fetch(`${BASE_URL}?ip=${barValue}`, options);
  const data = await response.json();

  ip.innerHTML = data.ip;
  theLocation.innerHTML = `${data.country_capital}, ${data.region}, ${data.city}`;
  timezone.innerHTML = data.timezone;
  isp.innerHTML = data.isp;

  mapboxgl.accessToken =
    "pk.eyJ1IjoiYXJjaGFuZ2VsMDAxIiwiYSI6ImNsY2kwMDI2cDBpd28zcHM1bjVkNWc3dDYifQ.zZT86s3_772WavE2HONSxg";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [data.longitude, data.latitude],
    zoom: 10,
  });
  middle.classList.remove("none");
  middle.classList.remove("tiny");
};

personal.onclick = () => {
  function text(url) {
    return fetch(url).then((res) => res.text());
  }

  text("https://www.cloudflare.com/cdn-cgi/trace").then((data) => {
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
    let theip = data.match(ipRegex)[0];
    console.log(theip);
    searchBar.value = theip;

    getIpLocation();
  });
};

close.onclick = () => {
  middle.classList.add("tiny");
};
