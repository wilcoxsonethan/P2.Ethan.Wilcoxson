let capture;
let temperature = 0, futureTemp = 0;
let weather = "", futureWeather = "";
let json, newsAPI, calendarData, healthData;
let today, dd, mm, clock, hr, min, amPM;
let copyright = "";
let firstAuthor = "", secondAuthor = "", thirdAuthor = "";
let firstTitle = "", secondTitle = "", thirdTitle = "";
let firstDescription = "", secondDescription = "", thirdDescription = "";
let allNews = "";
let xStart = 0;
let calendarTime1, calendarEvent1, calendarTime2, calendarEvent2, calendarTime3, calendarEvent3;
let calendarTime4, calendarEvent4, calendarTime5, calendarEvent5;
let weight1, weight2, sleepTime1, sleepTime2;
let weatherX = 820, weatherY = 400;
let newsY = 680;
let timeX = 130, timeY = 50;
let calendarX = 718, calendarY = 80;
let dateX = 30, dateY = 50;
let healthX = 793, healthY = 270;
let colorX = 918, colorY = 610;
let color = 'black';

function preload() {
    let url = "https://api.weather.gov/gridpoints/LUB/48,32/forecast/";
    json = loadJSON(url);
    let newsUrl = "https://api.nytimes.com/svc/topstories/v2/us.json?api-key=JuVYgAwAtNqQVH3Trp60rbioxqPbLwrN"
    newsAPI = loadJSON(newsUrl);
    calendarData = loadJSON("data/calendar.json");
    healthData = loadJSON("data/weight.json");
}
function setup() {
    createCanvas(1100, 720);
    capture = createCapture(VIDEO);
    capture.size(1100, 720);
    capture.hide();
    // Weather information from Weather.gov API
    temperature = json.properties.periods[0].temperature;
    weather = json.properties.periods[0].shortForecast;
    futureTemp = json.properties.periods[1].temperature;
    futureWeather = json.properties.periods[1].shortForecast;

    //Date and Time
    today = new Date();
    dd = String(today.getDate()).padStart(2, '0');
    mm = String(today.getMonth() + 1).padStart(2, '0');
    today = mm + '/' + dd

    //News Information from New York Times API
    copyright = newsAPI.copyright;
    firstAuthor = newsAPI.results[0].byline;
    secondAuthor = newsAPI.results[1].byline;
    thirdAuthor = newsAPI.results[2].byline;
    firstTitle = newsAPI.results[0].title;
    secondTitle = newsAPI.results[1].title;
    thirdTitle = newsAPI.results[2].title;
    firstDescription = newsAPI.results[0].abstract;
    secondDescription = newsAPI.results[1].abstract;
    thirdDescription = newsAPI.results[2].abstract;
    allNews = "Top 3 Stories -- " + firstTitle + " " + firstAuthor + " - " + firstDescription + "   --   " + secondTitle
        + " " + secondAuthor + " - " + secondDescription + "   --   " + thirdTitle + " " + thirdAuthor
        + " - " + thirdDescription + "   --   " + copyright + "                                       ";

    calendarTime1 = calendarData.events[0].time;
    calendarEvent1 = calendarData.events[0].type;
    calendarTime2 = calendarData.events[1].time;
    calendarEvent2 = calendarData.events[1].type;
    calendarTime3 = calendarData.events[2].time;
    calendarEvent3 = calendarData.events[2].type;
    calendarTime4 = calendarData.events[3].time;
    calendarEvent4 = calendarData.events[3].type;
    calendarTime5 = calendarData.events[4].time;
    calendarEvent5 = calendarData.events[4].type;

    //Health data from JSON file
    weight1 = healthData.healthData[0].weight;
    weight2 = healthData.healthData[1].weight;
    sleepTime1 = healthData.healthData[0].sleepTime;
    sleepTime2 = healthData.healthData[1].sleepTime;
}
function draw() {
    hr = hour();
    min = minute();
    if (min < 10) {
        min = "0" + min;
    }
    if (hr >= 12) {
        amPM = "PM";
        if (hr !== 12) {
            hr = hr - 12;
        }
    } else {
        amPM = "AM";
        if (hr === 0) {
            hr = 12;
        }
    }
    clock = hr + ":" + min + " " + amPM;
    background(255);
    fill(0);
    translate(width,0);
    scale(-1, 1);
    image(capture,0,0, 1100, 720);
    // Display all the stuff we want to display
    translate(width,0);
    scale(-1, 1);
    fill(255,255,255,100);
    rect(weatherX - 5, weatherY - 25, 260, 160)
    rect(0, newsY-22, 1100, 30)
    rect(timeX-105, timeY-25, 205, 34);
    rect(calendarX-5, calendarY-55, 360, 185);
    rect(healthX-5, healthY-55, 285, 155);
    rect(colorX - 8, colorY - 30, 165, 70);
    fill(0);
    textSize(24)
    text("Lubbock", weatherX, weatherY);
    text("Current Weather", weatherX, weatherY + 30);
    text(temperature + "°F & " + weather, weatherX, weatherY + 60);
    text("Upcoming Weather", weatherX, weatherY + 90);
    text(futureTemp + "°F & " + futureWeather, weatherX, weatherY + 120);
    text(today, dateX, dateY);
    text(clock, timeX, timeY);
    for(let x = xStart; x < width; x+= textWidth(allNews)){
        text(allNews, x, newsY);
    }
    xStart--;
    text("Schedule", calendarX, calendarY-30);
    textSize(20);
    text(calendarTime1 + " " + calendarEvent1, calendarX, calendarY);
    text(calendarTime2 + " " + calendarEvent2, calendarX, calendarY + 30);
    text(calendarTime3 + " " + calendarEvent3, calendarX, calendarY + 60);
    text(calendarTime4 + " " + calendarEvent4, calendarX, calendarY + 90);
    text(calendarTime5 + " " + calendarEvent5, calendarX, calendarY + 120);
    textSize(24);
    text("Health Information", healthX, healthY-30 )
    textSize(20);
    text("Weight Yesterday: " + weight1, healthX, healthY);
    text("Weight Today: " + weight2, healthX, healthY + 30);
    text("Sleep Time Yesterday: " + sleepTime1, healthX, healthY + 60);
    text("Sleep Time Today: " + sleepTime2, healthX, healthY + 90);
    rect(colorX + 120, colorY, 30, 30);
    textSize(16);
    text("Select Light Color", colorX, colorY - 10);
    fill('red')
    rect(colorX + 90, colorY, 30, 30);
    fill('green')
    rect(colorX + 60, colorY, 30, 30);
    fill('blue')
    rect(colorX + 30, colorY, 30, 30);
    fill('white')
    rect(colorX, colorY, 30, 30);
    noStroke();
    fill(color);
    rect(0, 0, 1100, 20);
    rect(0, 0, 20, 720)
    rect(1080, 0, 20, 720)
    rect(0, 700, 1100, 20);
}
function mousePressed(){
    if(mouseX > colorX && mouseX < (colorX+30) && mouseY > colorY && mouseY < (colorY + 30)) {
        color = 'white';
    }
    if(mouseX > (colorX+30) && mouseX < (colorX+60) && mouseY > (colorY) && mouseY < (colorY+30)) {
        color = 'blue'
    }
    if(mouseX > (colorX+60) && mouseX < (colorX+90) && mouseY > (colorY) && mouseY < (colorY+30)){
        color = 'green';
    }
    if(mouseX > (colorX+90) && mouseX < (colorX+120) && mouseY > (colorY) && mouseY < (colorY+30)){
        color = 'red';
    }
    if(mouseX > (colorX+120) && mouseX < (colorX+150) && mouseY > (colorY) && mouseY < (colorY+30)){
        color = 'black';
    }
}



