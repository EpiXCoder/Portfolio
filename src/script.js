// require('dotenv').config();
// const apiKey = 'process.env.API_KEY'

function updateWeatherWidget(lat, lon) {
    const apiKey = '709e9d4073db39c9a6cf45d1f865949a'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)} °C`;
            document.getElementById('weather-info').textContent = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
            document.getElementById('weather-icon').src = iconUrl;
            console.log(data)
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function updateLocalTime() {
    const localTime = new Date();

    const optionsDate = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = localTime.toLocaleDateString('en-US', optionsDate);
    const formattedTime = localTime.toLocaleTimeString('en-US', optionsTime);

    const finalDateTime = formattedDate.replace(/,/g, '') + ' ' + formattedTime;

    document.getElementById('local-time').textContent = finalDateTime;
    console.log(finalDateTime);
}

function startClock() {
    updateLocalTime(); 
    setInterval(() => {
        updateLocalTime();
    }, 60000); // Update every minute
}

function fetchUserLocationAndWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('Latitude:', position.coords.latitude, 'Longitude:', position.coords.longitude); // Debugging log
            updateWeatherWidget(position.coords.latitude, position.coords.longitude);
        }, () => {
            console.error('Error getting location');
            // Handle error or provide a default location
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
        // Handle browser support issue or provide a default location
    }
}

function openMyProjectsWindow() {
    document.getElementById('about-me-window').classList.remove('app-window-active');
    document.getElementById('my-projects-window').classList.add('my-projects-window-open');
    document.querySelector('.finder').textContent = 'My Projects'; // Update the finder text
    document.getElementById('my-projects-window').classList.add('app-window-active');

  }
  
  function closeMyProjectsWindow() {
    document.getElementById('my-projects-window').classList.remove('my-projects-window-open');
    document.querySelector('.finder').textContent = 'Finder'; // Revert the finder text to original
  }

  function openContactWindow() {
    document.getElementById('contact-window').classList.add('app-window-active');
    document.getElementById('about-me-window').classList.remove('app-window-active');
    document.getElementById('contact-window').style.display = 'block';
    document.querySelector('.finder').textContent = 'Contact'; // Update the finder text
  }
  
  function closeContactWindow() {
    document.getElementById('contact-window').style.display = 'none';
    document.querySelector('.finder').textContent = 'Finder'; // Revert the finder text to original
  }
  
  // Assuming you have a contact icon with id 'contact-icon'
document.getElementById('contact-icon').addEventListener('click', openContactWindow);

// Event listener to close the app window when clicking outside of it
window.addEventListener('click', function(event) {
    const appWindow = document.getElementById('my-projects-window');
    if (event.target === appWindow) {
      closeMyProjectsWindow();
    }
  });
  
  // Prevent the event listener from closing the window when clicking inside the window
  document.querySelector('.my-projects-window-content').addEventListener('click', function(event) {
    event.stopPropagation();
  });

  function openAboutMeWindow() {
    document.getElementById('about-me-window').style.display = 'block';
  }
  
  function closeAboutMeWindow() {
    const aboutMeWindow = document.getElementById('about-me-window');
    aboutMeWindow.style.display = 'none';
    aboutMeWindow.classList.remove('app-window-active');
  }

//   document.addEventListener('DOMContentLoaded', (event) => {
//     openAboutMeWindow();
//   });

  document.getElementById('about-me-link').addEventListener('click', openAboutMeWindow);

  document.getElementById('mode-toggle').addEventListener('change', function(event) {
    if (event.target.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
  
  // Save the dark mode preference
function updateDarkMode(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode ? 'on' : 'off');
    document.body.classList.toggle('dark-mode', isDarkMode);
  }
  
  // Restore the dark mode preference on page load
  document.addEventListener('DOMContentLoaded', function() {
    const darkMode = localStorage.getItem('darkMode');
    document.getElementById('mode-toggle').checked = (darkMode === 'on');
    updateDarkMode(darkMode === 'on');
  });
  
  // Event listener for the toggle
  document.getElementById('mode-toggle').addEventListener('change', function(event) {
    updateDarkMode(event.target.checked);
  });

startClock();
fetchUserLocationAndWeather();
