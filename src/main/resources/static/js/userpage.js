var searchBar = document.getElementById('searchBar');
var cityTags = document.getElementById('cityTagsSearch');
var sectionElement = document.getElementById('mainSearchSection');
var wrapperElement = document.getElementById('toBlur');
var resultsContainer = document.getElementById('searchResultContainer');
var userId;

document.getElementById('searchBar').addEventListener('click', function () {
    cityTags.style = "visibility: true";
    document.getElementById('cancleSearch').style = "display:block"
    sectionElement.classList.add('shifted');
    // resultsContainer.style = "visibility: true";
    setTimeout(function () {
        resultsContainer.style = "visibility: true";
      }, 1000); 
});

function cancleSearch() {
    cityTags.style = "visibility: hidden";
    document.getElementById('cancleSearch').style = "display:none"
    document.getElementById('searchInput').value = '';
    sectionElement.classList.remove('shifted');
    resultsContainer.style.visibility = "hidden";
    resultsContainer.innerHTML = '';

}


// Sample array of data
const data = [
    { name: 'Item 1', Location: 'Value 1', phone: 'Value 2' },
    { name: 'Item 2', Location: 'Value 3', phone: 'Value 4' },
    { name: 'Item 3', Location: 'Value 5', phone: 'Value 6' },
    { name: 'Item 4', Location: 'Value 1', phone: 'Value 2' },
    { name: 'Item 5', Location: 'Value 3', phone: 'Value 4' },
    { name: 'Item 6', Location: 'Value 5', phone: 'Value 6' },
    { name: 'Item 7', Location: 'Value 1', phone: 'Value 2' },
    { name: 'Item 8', Location: 'Value 3', phone: 'Value 4' },
    { name: 'Item 9', Location: 'Value 5', phone: 'Value 6' },
];

function search() {
    // Get the search term from the input field
    const searchTerm = document.getElementById("searchInput").value;
    console.log("search term before fetch" + searchTerm);
    // Make a GET request to the server with the search term
    fetch(`/serachForCompanies?str=${searchTerm}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(results => {

            results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <strong>${item.companyName}</strong><br>
                    Location: ${item.location}<br>
                    Tags: ${item.tags}<br>
                `;

                resultItem.addEventListener("click", function(){
                    console.log("Company ID:", item.companyID);
                    const urlParams = new URLSearchParams(window.location.search);
                    userId = urlParams.get('userId');
                    window.location.href = `/redirectUserToCompany/${item.companyID}/${userId}`;
                })
                resultsContainer.appendChild(resultItem);
            });
        })
        .catch(error => {
            console.error('Search error:', error);
        });
}

const appointData = [
    { name: 'Item 1', Location: 'Value 1', date: 'date', time: '10:31' },
    { name: 'Item 2', Location: 'Value 3', date: 'date', time: '10:31' },
    { name: 'Item 3', Location: 'Value 5', date: 'date', time: '10:31' },
]

function getFutureAppointments() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');

    console.log(userId);
    if (!userId) {
        console.error('User ID not found in local storage.');
    } else {
        // Make a GET request to the server endpoint with the user ID
        fetch(`/getUserAppo/${userId}`)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
    
                // Parse the response JSON
                return response.json();
            })
            .then(itemList => {
                var appointmentsContainer = document.getElementById('appointmentsContainer');
                // Iterate through the itemList and create divs for each item
                itemList.forEach(item => {
                    // Create a div element for each item
                    const itemDiv = document.createElement("div");
                    itemDiv.classList.add('appointment-item');
                    // Set the content of the div using item properties
                    itemDiv.innerHTML = `
                        <p>Company: <br> ${item.companyName}</p>
                        <p>Location: <br>${item.location}</p>
                        <p>Date: <br>${item.date}</p>
                        <p>Time: <br>${item.time}</p>
                    `;

                    const button = document.createElement("button");
                    button.classList.add('cancle-app-btn');
                    button.innerHTML = "Cancel appointment"; // Set the button text or content
                    button.addEventListener("click", function() {
                        
                        
                        // send to db data about this event so it can update user db and events for company
                        var confirmDelete = window.confirm("Are you sure you want to cancel this appointment?");
        
                        if (confirmDelete) {
                            // Get the parent container of the button (itemDiv) and remove it
                            appointmentsContainer.removeChild(itemDiv);
                        }
                    });

                    itemDiv.appendChild(button);        
                    appointmentsContainer.appendChild(itemDiv);
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            
    }
}

function getUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('userId');

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

// last time i checked
window.onload = function() {
    // getUserId();

    getUserInfo();
    getFutureAppointments();
};

function changeButtonText(link) {
    // Get the text content of the clicked link
    var newText = link.textContent;
    // Set the text of the button to the selected link
    document.getElementById('dropdownButton').textContent = newText;
}