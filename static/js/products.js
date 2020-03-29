var searchField = document.getElementById('search-field');
var searchResults = document.getElementById("search-results");
var popularNow = document.getElementById('popular-now');
var productsContent = document.getElementById("products-content");

var productTemplate = document.getElementById('products-template').innerHTML;

function search() {
    var value = searchField.value;
    if (value === "") {
        productsContent.style.display = null;
        searchResults.style.display = null;
    } else {
        productsContent.style.display = "none";
        searchResults.style.display = "flex";

        fetch("/api/products/search?query=" + encodeURIComponent(value))
            .then(response => response.json())
            .then(responseJson => {
                var productList = responseJson['products'];
                var newHTML = "";

                for (var index in productList) {
                    newHTML += productTemplate
                        .replace(/imgsrc/g, productList[index]['imageSource'][0])
                        .replace(/productName/g, productList[index]['name'])
                        .replace(/priceRange/g, productList[index]['priceRange'])
                        .replace(/style="display: none"/g, "")
                        
                }

                searchResults.innerHTML = newHTML;

            });

    }
}

fetch("/api/products/popular")
    .then(response => response.json())
    .then(responseJson => {
        var productList = responseJson['products'];

        var newHTML = "";

        for (var index in productList) {
            newHTML += productTemplate
                .replace(/imgsrc/g, productList[index]['imageSource'][0])
                .replace(/productName/g, productList[index]['name'])
                .replace(/priceRange/g, productList[index]['priceRange'])
                .replace(/style="display: none"/g, "")
        }

        popularNow.innerHTML = newHTML;
    });