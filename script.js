const temperatureField = document.querySelector(".weather1");
const dayDate = document.querySelector(".weather2 .dayDate");
const whichCity = document.querySelector(".weather2 p");
const emoji = document.querySelector(".weather3 img");
const condition = document.querySelector(".weather3 span");

const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");


// fetch data
let inputCity="delhi";
const fetchData = async (inputCity) => {

  const url = `http://api.weatherapi.com/v1/current.json?key=a39f1f22d9d24f87b50180922230802&q=${inputCity}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    updateDom(temp_c, name, text, icon, localtime);
  } catch (error) {
    alert('location not found or provide correct spell');
  }
};

fetchData(inputCity);

// updateDom 
const updateDom = (newTemperature, cityName, text, icon, time) => {
  temperatureField.innerText = newTemperature + "°C";
  whichCity.innerText = cityName;
  emoji.src = icon;
  condition.innerText = text;

  const exactTime = time.split(" ")[1];
  const exactDate = time.split(" ")[0];

  const exactDay = new Date(exactDate).getDay();
  giveDateAndTime(exactTime, exactDay, exactDate);
};


// converting number to days
const giveDateAndTime = (exactTime, exactDay, exactDate) => {
  const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dayDate.innerText = exactTime + " " + day[exactDay] + " " + exactDate;
  dayDate.innerText = `${exactTime} ${day[exactDay]} - ${exactDate}`;
};


// getCurrentCity
const search = (e) =>{
  e.preventDefault();
  inputCity = searchField.value;
  fetchData(inputCity);
}

form.addEventListener('submit',search);