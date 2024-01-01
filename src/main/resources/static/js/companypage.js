function logOut(){

}

function editAboutUs(){
    document.getElementById('aboutUsEdit').contentEditable = "true";
    document.getElementById('aboutUsEdit').style.padding = "15px";
    document.getElementById('about-us-save-button').style.display = "block";
    document.getElementById('aboutUsEdit').style.border = "1.5px solid black";
}

function editInformations(){
    document.getElementById('addresEdit').contentEditable = "true";
    document.getElementById('cityEdit').contentEditable = "true";
    document.getElementById('emailEdit').contentEditable = "true";
    document.getElementById('phoneEdit').contentEditable = "true";

    document.getElementById('addresEdit').style.border = "1.5px solid black";
    document.getElementById('cityEdit').style.border = "1.5px solid black";
    document.getElementById('emailEdit').style.border = "1.5px solid black";
    document.getElementById('phoneEdit').style.border = "1.5px solid black";

    document.getElementById('addresEdit').style.padding = "5px";
    document.getElementById('cityEdit').style.padding = "5px";
    document.getElementById('emailEdit').style.padding = "5px";
    document.getElementById('phoneEdit').style.padding = "5px";

    document.getElementById('informations-save-button').style.display = "block";
}


//* *******************/
//* **** BUTTONS ******/
//* *******************/

function aboutUsSave() {
    document.getElementById('aboutUsEdit').contentEditable = "false";
    document.getElementById('about-us-save-button').style.display = "none";
    document.getElementById('aboutUsEdit').style.border = "none";
    document.getElementById('aboutUsEdit').style.padding = "0px";
}

function editInformationsSave(){
    document.getElementById('addresEdit').contentEditable = "false";
    document.getElementById('cityEdit').contentEditable = "false";
    document.getElementById('emailEdit').contentEditable = "false";
    document.getElementById('phoneEdit').contentEditable = "false";

    document.getElementById('addresEdit').style.border = "none";
    document.getElementById('cityEdit').style.border = "none";
    document.getElementById('emailEdit').style.border = "none";
    document.getElementById('phoneEdit').style.border = "none";

    document.getElementById('addresEdit').style.padding = "0px";
    document.getElementById('cityEdit').style.padding = "0px";
    document.getElementById('emailEdit').style.padding = "0px";
    document.getElementById('phoneEdit').style.padding = "0px";

    document.getElementById('informations-save-button').style.display = "none";
}

// const tagSelector = document.getElementById('dynamicSelect');
// const tagsContainer = document.getElementById('tagsContainer');

// // Function to add a tag
// function addTag(tagText) {
//     const tag = document.createElement('div');
//     tag.classList.add('tag');
//     tag.textContent = tagText;
//     tagsContainer.appendChild(tag);
// }

// // Function to add the selected tag from the dropdown
// function addSelectedTag() {
//     const selectedTag = tagSelector.value;
//     if (selectedTag !== '') {
//         addTag(selectedTag);
//     }
// }

// function addOptions() {
//     // Get the select element
//     var select = document.getElementById("dynamicSelect");

//     // List of options
//     var optionsList = ["Option 1", "Option 2", "Option 3", "Option 4"];

//     // Loop through the options and add them to the select element
//     for (var i = 0; i < optionsList.length; i++) {
//         var option = document.createElement("option");
//         option.value = optionsList[i];
//         option.textContent = optionsList[i];
//         select.appendChild(option);
//     }
// }
// window.onload = addOptions;

const jobTitles = ['Barber', 'Cleaner', 'Developer', 'Designer', 'Chef', 'Beauty', 'Hair', 'Nails', 'Therapist', 'Physical Teraphist', 'Dentist', 'Veterinarian', 'Architect', 'Insurance', 'Education', 'Plumner', 'Electritian', 'Carpenter', 'Painter', 'Glazier']; 
let selectedJobs = [];
let editMode = false;

function showJobs() {
    const tagContainer = document.getElementById('tagContainer');
    tagContainer.innerHTML = '';

    const jobsToShow = editMode ? jobTitles : selectedJobs;
    jobsToShow.sort();

    jobsToShow.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.classList.add('tag');
        if (selectedJobs.includes(job)) {
            jobElement.classList.add('selected');
        }
        jobElement.textContent = job;
        jobElement.addEventListener('click', () => toggleJob(job));
        tagContainer.appendChild(jobElement);
    });
}

function toggleJob(job) {
    if (editMode) {
        if (selectedJobs.includes(job)) {
            selectedJobs = selectedJobs.filter(selectedJob => selectedJob !== job);
        } else {
            selectedJobs.push(job);
        }
        showJobs();
    }
}

function showEditTags() {
    jobTitles.sort();
    document.getElementById('tags-save-button').style.display = "block";
    editMode = true;
    showJobs();
}

function saveTags() {
    document.getElementById('tags-save-button').style.display = "none";
    editMode = false;
    showJobs();
}

showJobs();

//* about us
//* address
//* city
//* email
//* telephone
//* tags
var companyId;

function loadCompanyData() {

    const urlParams = new URLSearchParams(window.location.search);
    companyId = urlParams.get('companyId');

    console.log(companyId);


    fetch(`/getCompanyData/${companyId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(results => {
            // add fetching company name
            document.getElementById('aboutUsEdit').innerText = results.aboutus;
            document.getElementById('addressDiv').innerText = results.address;
            document.getElementById('cityDiv').innerText = results.city;
            document.getElementById('emailDiv').innerText = results.email;
            document.getElementById('phoneDiv').innerText = results.telephone;
        })
        .catch(error => {
            console.error('Search error:', error);
        });
}

// function openAddEmployeeForm() {
//     document.getElementById('addEmpDialog').showModal();
// }

var dialog = document.getElementById('addEmpDialog');
var addEmp = document.getElementById('confirmBtn');
var cancleEmp = document.getElementById('cancelBtn');

document.getElementById('addEmployeeButton').addEventListener("click", () => {
  dialog.showModal();
});

function createEmployee(fname, lname) {

  const employeediv = document.createElement("div");

  employeediv.classList.add("emp-tile");

  var div1 = document.createElement("div");
  div1.classList.add("row-it");

  var p1 = document.createElement("p");
  p1.classList.add("paragraph"); 
  p1.textContent = fname;
  var p2 = document.createElement("p");
  p2.classList.add("paragraph"); 
  p2.textContent = lname;
  
  div1.appendChild(p1);
  div1.appendChild(p2);

  employeediv.appendChild(div1);

  const button = document.createElement("button");
  button.classList.add('cancle-app-btn');
  button.innerHTML = "X"; // Set the button text or content
  button.addEventListener("click", function() {
      
      
      // send to db data about this event so it can update user db and events for company
      var confirmDelete = window.confirm("Are you sure you want to delete this employee?");

      if (confirmDelete) {
          // Get the parent container of the button (itemDiv) and remove it
          document.getElementById('employeeContainer').removeChild(employeediv);
      }
  });
  employeediv.appendChild(button);

  return employeediv;
}

addEmp.addEventListener('click', () => {
  var fname = document.getElementById("fname");
  var lname = document.getElementById("lname");

  // sent data to server to update DB 
  alert("This form has been successfully submitted!");
  var paragraphElement = createEmployee(fname.value, lname.value);
  
  var container = document.getElementById('employeeContainer');
  container.appendChild(paragraphElement);
  fname.value = "";
  lname.value = "";
  dialog.close();
})

cancleEmp.addEventListener("click", (e) => {
  e.preventDefault();
  dialog.close();
});

var toAccList = document.getElementById('listToAccept');

function createToAcceptDiv(username, time, date) {
  var toAcceptDiv = document.createElement("div");
  toAcceptDiv.classList.add("to-accept-div");

  var words = document.createElement("div");
  words.classList.add("make-words-row");


  //* add userName
  var paragraph = document.createElement("p");
  paragraph.textContent = username;
  words.appendChild(paragraph);

  //* add time
  var paragraph2 = document.createElement("p");
  paragraph2.textContent = time;
  words.appendChild(paragraph2);

  //* add date
  var paragraph3 = document.createElement("p");
  paragraph3.textContent = date;
  words.appendChild(paragraph3);

  toAcceptDiv.appendChild(words);

  var helpdiv = document.createElement("div");
  helpdiv.classList.add("a-x-buttons");
  var acceptButton = document.createElement("button");
  acceptButton.classList.add("acceptButton");
  acceptButton.textContent = "A";
  helpdiv.appendChild(acceptButton);

  var rejectButton = document.createElement("button");
  rejectButton.classList.add("rejectButton");
  rejectButton.textContent = "X";
  helpdiv.appendChild(rejectButton);

  toAcceptDiv.appendChild(helpdiv);

  return toAcceptDiv;
}

toAccList.addEventListener("click", function(event) {
  
  if (event.target.classList.contains("rejectButton")) {
    // if not accepted send rejected to db
      var toAcceptDiv = event.target.closest(".to-accept-div");
      if (toAcceptDiv) {
          toAcceptDiv.remove();
      }
  } else  if (event.target.classList.contains("acceptbutton")) {
    // if accept send accepted to db 
    var toAcceptDiv = event.target.closest(".to-accept-div");
    if (toAcceptDiv) {
      toAcceptDiv.style = "    background-color: blue;";
    }
}
});

function loadEmployeeList() {
    const urlParams = new URLSearchParams(window.location.search);
    companyId = urlParams.get('companyId');

    console.log(companyId);


    fetch(`/getCompanyEmployeeList/${companyId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(results => {
           

            console.log(results);
            // loop throgh elements add add to div 
            // add delete button
        })
        .catch(error => {
            console.error('Search error:', error);
        });
}

function loadReservationToAccept() {

  // var toAccList = document.getElementById('listToAccept');
  // have function to create to-accept-divs
  const urlParams = new URLSearchParams(window.location.search);
  companyId = urlParams.get('companyId');

  console.log(companyId);


  fetch(`/getCompanyReservationToAccept/${companyId}`)
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(results => {

        console.log(results);
         
        // results.forEach(res => {
        //   // var listToAccept = document.createElement("div");
        //   // listToAccept.classList.add("list-to-accept");

        //   // // Add multiple "to-accept-div" elements
        //   // for (var i = 1; i <= 3; i++) {
        //   //     var toAcceptDiv = createToAcceptDiv("to accediv t " + i);
        //   //     listToAccept.appendChild(toAcceptDiv);
        //   // }

        //   // // Add click event listener to handle reject button clicks
        //   // listToAccept.addEventListener("click", function(event) {
        //   //     if (event.target.classList.contains("rejectButton")) {
        //   //         var toAcceptDiv = event.target.closest(".to-accept-div");
        //   //         if (toAcceptDiv) {
        //   //             toAcceptDiv.remove();
        //   //         }
        //   //     }
        //   // });

        //   // document.body.appendChild(listToAccept);
        // })

      })
      .catch(error => {
          console.error('Search error:', error);
      });
  
    //* Load reservation and put them into div

    // name, date, time, userName and 2 buttons with confirmation
    // * get reservation id
    // * when accepted send accepted to db for user with id ?
    // * when rejected send rejected with i guess id ?
}

function testloadReservationToAccept() {
    const urlParams = new URLSearchParams(window.location.search);
    companyId = urlParams.get('companyId');

    var toAcc = createToAcceptDiv("daniel kowak", "12:30", "01-03-2024");
    toAccList.appendChild(toAcc);
    toAcc = createToAcceptDiv("bartek berek", "11:30", "14-06-2024");
    toAccList.appendChild(toAcc);
    toAcc = createToAcceptDiv("marcin daniel", "10:00", "22-02-2024");
    toAccList.appendChild(toAcc);
    toAcc = createToAcceptDiv("ania anna", "17:45", "26-12-2024");
    toAccList.appendChild(toAcc);
    toAcc = createToAcceptDiv("bartek berek", "11:30", "14-06-2024");
    toAccList.appendChild(toAcc);
    toAcc = createToAcceptDiv("marcin daniel", "10:00", "22-02-2024");
    toAccList.appendChild(toAcc);
    toAcc = createToAcceptDiv("ania anna", "17:45", "26-12-2024");
    toAccList.appendChild(toAcc);
}

function testloadEmployeeList() {
    const urlParams = new URLSearchParams(window.location.search);
    companyId = urlParams.get('companyId');


}

window.onload = function() {
    loadCompanyData();
    loadEmployeeList();
    loadReservationToAccept();
    testloadReservationToAccept();
    testloadEmployeeList();
};

document.getElementById('calendarhref').addEventListener('click', function() {
    window.location.href = `/redirectToCalendar/${companyId}`;
})