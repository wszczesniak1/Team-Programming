var searchBar = document.getElementById('searchBar');
var cityTags = document.getElementById('cityTagsSearch');
var sectionElement = document.getElementById('mainSearchSection');
var wrapperElement = document.getElementById('toBlur');

document.getElementById('searchBar').addEventListener('click', function () {
    cityTags.style = "visibility: true";
    document.getElementById('cancleSearch').style = "display:block"
    sectionElement.classList.add('shifted');
});

function cancleSearch() {
    cityTags.style = "visibility: hidden";
    document.getElementById('cancleSearch').style = "display:none"
    document.getElementById('searchInput').value = '';
    sectionElement.classList.remove('shifted');
}
