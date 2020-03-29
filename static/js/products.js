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
                        .replace(/itemOid/g, productList[index]["itemOid"]);
                }


                searchResults.innerHTML = newHTML;

            });

    }
}

function addItem(modalNum, itemOid) {
    var priceInput = document.getElementById(`modal-${modalNum}-price`);
    var quantityInput = document.getElementById(`modal-${modalNum}-quantity`);
    fetch("/api/cart/addItem", {
        "method": "POST",
        "body": JSON.stringify({
            'price': priceInput.value,
            'quantity': quantityInput.value,
            'itemOid': itemOid
        }),
        "headers": {
            "Content-type": "application/json"
        }
    })
    .then(response => response.json())
    .then(responseJson => console.log(responseJson));
}

fetch("/api/products/popular")
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

        popularNow.innerHTML = newHTML;
    });