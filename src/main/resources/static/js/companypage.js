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