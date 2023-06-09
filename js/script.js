let weatherData, userInput, userInput2;
const apiKey = "235bfae9a77f01372c79720bbdbd549a"

const $city = $('#city');
const $temp = $('#temp');
const $country = $('#country');
const $weather = $('#weather');
const $feels = $('#feels');
const $input = $('.text1');
// const $input2 = $('.text2');

$('form').on('submit', handleGetData);

function handleGetData(event) {
    event.preventDefault();
       // calling preventDefault() on a 'submit' event will prevent a page refresh  
    userInput = $input.val();
    // userInput1 = $input2.val();
      // getting the user input
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${apiKey}`
        // url:`https://api.openweathermap.org/data/3.0/onecall?lat=${userInput1}&lon=${userInput2}&exclude=hourly,daily&appid=${apiKey}`
      }).then(
        (data) => {
         weatherData = data;
         render();
        },
        (error) => {
         console.log('bad request', error);
        }
    );    
}

const convert = function(k) {
    let f = (k - 273.15)*1.8 + 32;
    return `${f.toFixed(2)}\u00B0 F`;
}

const firstLetterUppercase = function(word) {
  const firstLetter = word.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = word.slice(1)
  const capitalizedWord = firstLetterCap + remainingLetters
  return capitalizedWord;
}

function render() {
    $city.text(weatherData.name);
    $country.text(weatherData.sys.country);
    $temp.text(convert(weatherData.main.temp));
    $feels.text(convert(weatherData.main.feels_like));
    $weather.text(firstLetterUppercase(weatherData.weather[0].description));
 }