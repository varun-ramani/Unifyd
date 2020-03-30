var searchField = document.getElementById('search-field');
var searchResults = document.getElementById("search-results");
var other = document.getElementById("other-content");
var nameAdd = document.getElementById("nameAdd");
var categoryAdd = document.getElementById("categoryAdd");
var descriptionAdd = document.getElementById("descriptionAdd");
var priceSAdd = document.getElementById("priceSAdd");
var priceEAdd = document.getElementById("priceEAdd");

var limitAdd = document.getElementById("limitAdd");
var imagesAdd = document.getElementById("imagesAdd");
var addStatus = document.getElementById("addStatus")
var productTemplate = document.getElementById('products-template').innerHTML;


function search() {
    var value = searchField.value;
    if (value === "") {
        searchResults.style.display = null;
    } else {
        searchResults.style.display = "flex";

        fetch("/api/products/search?query=" + encodeURIComponent(value))
            .then(response => response.json())
            .then(responseJson => {
                var productList = responseJson['products'];
                var newHTML = "";

                for (var index in productList) {
                    console.log(productList[index])
                    var carimg = ""
                    var categories = ""
                    for (var i = 0; i < productList[index]['images'].length; i++) {
                        if (i == 0) {
                            carimg += "<div class='carousel-item img-hover-zoom active'><img style='align-middle' class='card-img-top' src='" + productList[index]['images'][i] + "'></div>"
                        } else {
                            carimg += "<div class='carousel-item img-hover-zoom'><img style='align-middle' class='card-img-top' src='" + productList[index]['images'][i] + "'></div>"
                        }
                    }
                    for (var i = 0; i < productList[index]['categories'].length; i++) {
                        categories += "<span class='badge badge-info mr-1 my-0'>" + productList[index]['categories'][i] + "</span>"
                    }
                    newHTML += productTemplate
                        .replace(/Num/g, index)
                        .replace(/imgsrc/g, productList[index]['images'][0])
                        .replace(/categories/g, categories)
                        .replace(/productName/g, productList[index]['name'])
                        .replace(/priceStart/g, productList[index]['priceStart'].toFixed(2))
                        .replace(/priceEnd/g, productList[index]['priceEnd'].toFixed(2))
                        .replace(/description/g, productList[index]['description'])
                        .replace(/limit/g, productList[index]['limit'])
                        .replace(/CarImg/g, carimg)
                        .replace(/style="display: none"/g, "")
                }


                searchResults.innerHTML = newHTML;

            });

    }
}

function addProduct() {
    addStatus.style.display = "none";

    var product = "";
    product = JSON.stringify({
        "name": nameAdd.value,
        "description": descriptionAdd.value,
        "priceStart": parseFloat(priceSAdd.value),
        "priceEnd": parseFloat(priceEAdd.value),
        "limit": parseInt(limitAdd.value),
        "images": imagesAdd.value.replace(/\s/g, ""),
        "categories": categoryAdd.value.replace(/\s/g, "")
    })

    console.log(product);
    fetch('/api/products/add', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": product
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson['status'] == "success") {
                location.href = "/dashboard";
            } else {
                addStatus.style.display = "block";
                addStatus.innerHTML = responseJson['status'];
            }
        });
}
