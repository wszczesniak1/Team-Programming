const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

let date1 = new Date(),
currYear1 = date.getFullYear(),
currMonth1 = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


const renderCalendar = () => {

    document.getElementById('noDay').textContent = date1.getDate();
    document.getElementById('nameOfDay').textContent = weekdays[date1.getDay() +1];
    document.getElementById('nameOfMonth').textContent = months[currMonth1];
    document.getElementById('noYear').textContent = currYear1;

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

var addEventButton = document.getElementById('addEventBtn');
var dialog = document.getElementById('addEventDialog');
var addEmp = document.getElementById('confirmBtn');
var cancleEmp = document.getElementById('cancelBtn');

addEventButton.addEventListener('click', () => {
  dialog.showModal();
  // add dialog with 
  // name of event
  // date, time
  // select employee from list
  // price
  // add button and cancle button 
})
var eventsContainer = document.getElementById("eventsContainer");

var companyId = 1;



addEmp.addEventListener('click', (event) => {
  // let fname = document.getElementById("fname");
  // let lname = document.getElementById("lname");
  event.preventDefault();
  // sent data to server to update DB 
  alert("This form has been successfully submitted!");

  startTimeValue = document.getElementById("time1").value;
  endTimeValue = document.getElementById("duration").value;

  // Create Date objects with a common date (January 1, 1970) and the retrieved time values
  startDate = new Date(`1970-01-01T${startTimeValue}`);
  endDate = new Date(`1970-01-01T${endTimeValue}`);

  // Calculate the time difference in milliseconds
  timeDifferenceMillis = endDate - startDate;

  // Convert milliseconds to hours and minutes
  hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
  minutes = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));


  dataToSend = {
    title: document.getElementById('title').value,
    startTime: document.getElementById('time1').value,
    duration: hours*60 + minutes,
    price: document.getElementById('price').value
    // employeeID? employeeName:
  };

  var eventDiv = document.createElement("div");
  eventDiv.classList.add("event-container");

  // Create elements for the event details
  var titleElement = document.createElement("h2");
  titleElement.textContent = dataToSend.title;

  var startTimeElement = document.createElement("p");
  startTimeElement.textContent = `Start Time: ${dataToSend.startTime}`;

  var endTimeElement = document.createElement("p");
  endTimeElement.textContent = `End Time: ${dataToSend.duration}`;

  var priceElement = document.createElement("p");
  priceElement.textContent = `Price: ${dataToSend.price}`;

  // userNameElement = document.createElement("p");
  // userNameElement.textContent = `User: ${dataToSend.userName}`;

  // Append elements to the event div
  eventDiv.appendChild(titleElement);
  eventDiv.appendChild(startTimeElement);
  eventDiv.appendChild(endTimeElement);
  eventDiv.appendChild(priceElement);
  // eventDiv.appendChild(userNameElement);

  // Append the event div to the container
  eventsContainer.appendChild(eventDiv);
  // fetch(`/putEventToDatabase?companyId=${companyID}`, {
  //   method: "POST",
  //   headers: {
  //       "Content-Type": "application/json"
  //   },
  //   body: JSON.stringify(dataToSend)
  // })
  // .then(response => {
  //     if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.text();
  // })
  // .then(responseText => {
  //     console.log(responseText); // Process the response from the server
  // })
  // .catch(error => {
  //     console.error("Fetch error:", error);
  // });

  // te info tez trzeba wyslac jako date na serwer
  console.log(document.getElementById('noDay').textContent);
  console.log(currMonth + 1);
  console.log(document.getElementById('noYear').textContent);
  console.log(dataToSend);

  dialog.close();
})

cancleEmp.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

// load all events and add to array
function loadAllEvents() {
    fetch(`/getEventsFromCompany/${companyId}`)
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

// get events on specific day from array
function getEvent(day, month, year) {

}

document.getElementById('aboutusonclick').addEventListener('click', () => {
    window.location.href = `/redirectToCompany/${companyId}`;
})


loadAllEvents();