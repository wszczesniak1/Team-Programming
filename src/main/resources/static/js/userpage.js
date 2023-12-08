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
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    console.log(searchTerm);

    // Clear previous results
    resultsContainer.innerHTML = '';
    // Filter data based on search term
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.Location.toLowerCase().includes(searchTerm) ||
        item.phone.toLowerCase().includes(searchTerm)
    );

    // Display results
    filteredData.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <strong>${item.name}</strong><br>
            Location: ${item.Location}<br>
            Phone number: ${item.phone}
        `;
        resultsContainer.appendChild(resultItem);
    });
}

const appointData = [
    { name: 'Item 1', Location: 'Value 1', date: 'date', time: '10:31' },
    { name: 'Item 2', Location: 'Value 3', date: 'date', time: '10:31' },
    { name: 'Item 3', Location: 'Value 5', date: 'date', time: '10:31' },
]

function getFutureAppointments() {
    var appointmentsContainer = document.getElementById('appointmentsContainer');

    appointData.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('appointment-item');
        resultItem.innerHTML = `
            <strong>${item.name}</strong><br>
            Location: ${item.Location}<br>
            Date: ${item.date}<br>
            Time: ${item.time}
        `;
        appointmentsContainer.appendChild(resultItem);
    });
}

window.onload = function() {
    // Your JavaScript function
    getFutureAppointments();
};