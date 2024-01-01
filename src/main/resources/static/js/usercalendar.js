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

    document.getElementById("eventContainer").innerHTML = '';
    showEvents(selectedDay, selectedMonth+1, selectedYear);
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

function getUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');

    companyId = urlParams.get('companyId');
    console.log(companyId);
    console.log(userId);

    fetch(`/getUserInfo/${userId}`)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Parse the response JSON
                return response.json();
            })
            .then(results => {
                document.getElementById('userEmail').innerText = results.email;
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
}

function loadDate(){
    var currentDate = new Date();

    // Get the day, month, and year
    var day = currentDate.getDate();
    var weekday = currentDate.getDay();
    var month = currentDate.getMonth(); // Months are zero-based, so add 1
    var year = currentDate.getFullYear();
    document.getElementById('noDay').textContent = day;
    document.getElementById('nameOfDay').textContent = weekdays[weekday+1];
    document.getElementById('nameOfMonth').textContent = months[month];
    document.getElementById('noYear').textContent = year;
    showEvents(day, month+1, year);
}

function findEvents(day, month, year, events) {
  // Convert day, month, and year to a formatted date string
  var dateString = `${year}-${month}-${day}`;

  // console.log(dateString);

  // Look up events for the specified date
  var eventsForDate = [];

  events.forEach(function(event) {
    if(event.date === dateString) {
      eventsForDate.push(event);
      // console.log(event);
    }
  })

  return eventsForDate;
}

function compareTimes(time1, time2) {
  var [hours1, minutes1] = time1.split(':').map(Number);
  var [hours2, minutes2] = time2.split(':').map(Number);

  if (hours1 !== hours2) {
    return hours1 - hours2;
  } else {
    return minutes1 - minutes2;
  }
}

function showEvents(day, month, year) { 

  //get all events
  var events = [];

  events.push({
    date: '2024-1-1', // Get YYYY-MM-DD part of ISO string
    employee: 'employee1',
    time: '12:00',
    address: 'address 1',
    city: 'Warsaw',
    name: 'random name 1',
    price: '1122',
    eventId: '1',
  });
  events.push({
    date: '2024-1-1', // Get YYYY-MM-DD part of ISO string
    employee: 'employee1',
    time: '10:01',
    address: 'address 1',
    city: 'Brno',
    name: 'random name 1',
    price: '1122',
    eventId: '2',
  });
  events.push({
    date: '2024-1-1', // Get YYYY-MM-DD part of ISO string
    employee: 'employee123',
    time: '14:30',
    address: 'asdasd 1',
    city: 'Wroclaw',    
    name: 'respect idk',
    price: '73',
    eventId: '3',
  });
  events.push({
    date: '2024-1-2', // Get YYYY-MM-DD part of ISO string
    employee: 'employee2',
    time: '12:00',
    address: 'address 2',
    city: 'Warsaw',
    name: 'random name 2',
    price: '1111',
    eventId: '4',
  });  
  events.push({
    date: '2024-1-3', // Get YYYY-MM-DD part of ISO string
    employee: 'employee3',
    time: '12:00',
    address: 'address 3',
    city: 'Moscow',
    name: 'random name 3',
    price: '1133',
    eventId: '5',
  });  
  events.push({
    date: '2024-1-4', // Get YYYY-MM-DD part of ISO string
    employee: 'employee4',
    time: '12:00',
    address: 'address 4',
    city: 'Warsaw',
    name: 'random name 4',
    price: '21',
    eventId: '6',
  });

  var eventsToShow = findEvents(day, month, year, events)

  eventsToShow.sort(function (a, b) {
    return compareTimes(a.time, b.time);
  });

  console.log(eventsToShow);

  const container = document.getElementById("eventContainer");


  //* ##################################################################################
  //* ################# GENERATE EVENTS UI #############################################
  //* ##################################################################################

  eventsToShow.forEach(function(event) {
    const div = document.createElement('div');
    div.classList.add('event-main-div');

    var div2 = document.createElement('div');
    div2.classList.add('event-div-info');

    var p = document.createElement('p');
    p.textContent = "Name : " + event.name;
    var p2 = document.createElement('p');
    p2.textContent = "Time : " + event.time;
    var p3 = document.createElement('p');
    p3.textContent = "Price : " + event.price;
    var p4 = document.createElement('p');
    p4.textContent = "Address : " + event.address;
    var p5 = document.createElement('p');
    p5.textContent = "City : " + event.city;
    var p6 = document.createElement('p');
    p6.textContent = "Employee : " + event.employee;

    // time price
    var div3 = document.createElement('div');
    div3.classList.add('row-spacebetween');
    div3.appendChild(p2);
    div3.appendChild(p3);
    // address city
    var div4 = document.createElement('div');
    div4.classList.add('row-spacebetween');
    div4.appendChild(p4);
    div4.appendChild(p5);

    div2.appendChild(p);
    div2.appendChild(div3);
    div2.appendChild(div4);
    div2.appendChild(p6);

    const button = document.createElement("button");
    button.classList.add('reserve-btn');
    button.innerHTML = "Reserve"; // Set the button text or content
    button.addEventListener("click", function() {
        
        
        // send to db data about this event so it can update user db and events for company
        var confirmReservation = window.confirm("Are you sure you want to reserve this appointment?");

        if (confirmReservation) {
            // Get the parent container of the button (itemDiv) and remove it
            container.removeChild(div);
        }
    });
    
    var div5 = document.createElement('div');
    div5.classList.add('button-row');
    div5.appendChild(button);
    div.appendChild(div2);
    div.appendChild(div5);

    container.appendChild(div);
    
  })
}

function testgetCompanyEvents () {
  const urlParams = new URLSearchParams(window.location.search);
  userId = urlParams.get('userId');
  companyId = urlParams.get('companyId');

  var events = [];

  events.push({
    date: '2024-1-1', // Get YYYY-MM-DD part of ISO string
    title: 'title1',
    time: '12;00',
    address: 'address 1',
    city: 'Warsaw',
    name: 'random name 1',
  });
  events.push({
    date: '2024-1-2', // Get YYYY-MM-DD part of ISO string
    title: 'title2',
    time: '12;00',
    address: 'address 2',
    city: 'Warsaw',
    name: 'random name 2',
  });  
  events.push({
    date: '2024-1-3', // Get YYYY-MM-DD part of ISO string
    title: 'title3',
    time: '12;00',
    address: 'address 3',
    city: 'Warsaw',
    name: 'random name 3',
  });  
  events.push({
    date: '2024-1-4', // Get YYYY-MM-DD part of ISO string
    title: 'title4',
    time: '12;00',
    address: 'address 4',
    city: 'Warsaw',
    name: 'random name 4',
  });

  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth(); // Months are zero-based, so add 1
  var year = currentDate.getFullYear();
  var eventsToShow = findEvents(day, month+1, year, events)
  // eventsToShow.forEach(function(event) {
      
  // })
}


getUserInfo();
loadDate();
// testgetCompanyEvents();
