var searchField = document.getElementById('search-field');
var searchResults = document.getElementById("search-results");
var productsContent = document.getElementById("products-content");

console.log(searchField);

function search() {
    var value = searchField.value;

    if (value === "") {
        productsContent.style.display = null;
        searchResults.style.display = null;
    } else {
        productsContent.style.display = "none";
        searchResults.style.display = "block";
    }

    console.log(value);
}