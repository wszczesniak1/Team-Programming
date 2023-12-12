var searchBar = document.getElementById('searchBar');
var cityTags = document.getElementById('cityTagsSearch');
var sectionElement = document.getElementById('mainSearchSection');
var wrapperElement = document.getElementById('toBlur');
var resultsContainer = document.getElementById('searchResultContainer');

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
                    companyId: ${item.companyID}
                `;

                resultItem.addEventListener("click", function(){
                    // console.log("Company ID:", item.companyID);
                    window.location.href = `/redirectUserToCompany/${item.companyID}`;
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
    const userId = urlParams.get('userId');

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
                        <p>Company: ${item.companyName}</p>
                        <p>Location: ${item.location}</p>
                        <p>Date: ${item.date}</p>
                        <p>Time: ${item.time}</p>
                        <p>User ID: ${item.userId}</p>
                    `;
        
                    // Append the div to the container
                    appointmentsContainer.appendChild(itemDiv);
                });
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });

            
    }
}


// last time i checked
window.onload = function() {
    // getUserId();


    getFutureAppointments();
};