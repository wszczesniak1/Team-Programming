function logOut(){

}

function editAboutUs(){
    document.getElementById('aboutUsEdit').contentEditable = "true";
    document.getElementById('aboutUsEdit').style.padding = "15px";
    document.getElementById('about-us-save-button').style.display = "block";
    document.getElementById('aboutUsEdit').style.border = "3px solid black";
}

function editLocation(){

}

function editTags(){

}

function aboutUsSave() {
    document.getElementById('aboutUsEdit').contentEditable = "false";
    document.getElementById('about-us-save-button').style.display = "none";
    document.getElementById('aboutUsEdit').style.border = "none";
    document.getElementById('aboutUsEdit').style.padding = "0px";
}