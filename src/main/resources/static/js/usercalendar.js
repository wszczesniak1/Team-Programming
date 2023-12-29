var companyId = 1;

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const renderCalendar = () => {

    // document.getElementById('noDay').textContent = date.getDate();
    // document.getElementById('nameOfDay').textContent = weekdays[date.getDay() +1];
    // document.getElementById('nameOfMonth').textContent = months[currMonth];
    // document.getElementById('noYear').textContent = currYear;

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" onclick="changeActiveDay(this)">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}

function changeActiveDay(clickedDay) {
    // Remove the "active" class from all days
    document.querySelectorAll(".days li").forEach((day) => {
      day.classList.remove("active");
    });
  
    // Add the "active" class to the clicked day
    clickedDay.classList.add("active");


    // Define an array of weekday names

    var selectedDay = parseInt(clickedDay.textContent);
    var selectedMonth = currMonth; // Months are zero-based, so add 1
    var selectedYear = currYear;
    var selectedDate = new Date(selectedYear, currMonth, selectedDay);
    var weekday = selectedDate.getDay() + 1;
    document.getElementById('noDay').textContent = selectedDay;
    document.getElementById('nameOfDay').textContent = weekdays[weekday];
    document.getElementById('nameOfMonth').textContent = months[selectedMonth];
    document.getElementById('noYear').textContent = currYear;
  }
  

renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});



function getCompanyEvents () {

    const urlParams = new URLSearchParams(window.location.search);
    companyId = urlParams.get('companyId');

    fetch(`/getEventsFromCompanyForUser/${companyId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(results => {


        console.log(results);
        // results.forEach(item => {
        //     // create events list with < details > 
        //     // and button to book and if book send book request to db
        // });
    })
    .catch(error => {
        console.error('Search error:', error);
    });
}

function loadPossibleEvents(day, month, year) {

    // get events from array with specific day and month
}

getCompanyEvents();
