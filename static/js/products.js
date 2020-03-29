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

                var bootstrapColor = "";
                var textColor = "";

                switch (productList[index]['category']) {
                    case "Cleaning":
                        bootstrapColor = "light";
                        textColor = "black";
                        break;
                    case "Food":
                        bootstrapColor = "warning";
                        textColor = "black";
                        break;
                    case "Medical":
                        bootstrapColor = "danger";
                        textColor = "white";
                        break;
                    case "Bathroom":
                        bootstrapColor = "success";
                        textColor = "white";
                        break;
                }
                
                newHTML += productTemplate
                           .replace("imgsrc", "wigga")
                           .replace("productName", productList[index]['name'])
                           .replace("priceRange", productList[index]['priceRange'])
                           .replace("bootstrapColor", bootstrapColor)
                           .replace("textColor", textColor);
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

        var bootstrapColor = "";
        var textColor = "";

        switch (productList[index]['category']) {
            case "Cleaning":
                bootstrapColor = "light";
                textColor = "black";
                break;
            case "Food":
                bootstrapColor = "warning";
                textColor = "black";
                break;
            case "Medical":
                bootstrapColor = "danger";
                textColor = "white";
                break;
            case "Bathroom":
                bootstrapColor = "success";
                textColor = "white";
                break;
        }
        
        newHTML += productTemplate
                    .replace("productName", productList[index]['name'])
                    .replace("priceRange", productList[index]['priceRange'])
                    .replace("bootstrapColor", bootstrapColor)
                    .replace("textColor", textColor);
    }

    popularNow.innerHTML = newHTML;
});