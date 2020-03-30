var searchField = document.getElementById('search-field');
var searchResults = document.getElementById("search-results");
var other = document.getElementById("other-content");
var nameAdd = document.getElementById("nameAdd");
var descriptionAdd = document.getElementById("descriptionAdd");
var priceAdd = document.getElementById("priceAdd");
var quantityAdd = document.getElementById("quantityAdd");
var imagesAdd = document.getElementById("imagesAdd");
var addStatus = document.getElementById("addStatus")
var productTemplate = document.getElementById('products-template').innerHTML;


$(document).ready(function () {
    var map = null;
    var myMarker;
    var myLatlng;
    function initializeGMap(lat, lng) {
        myLatlng = new google.maps.LatLng(lat, lng);

        var myOptions = {
            zoom: 12,
            zoomControl: true,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

        myMarker = new google.maps.Marker({
            position: myLatlng
        });
        myMarker.setMap(map);
    }
    $('#myModal').on('show.bs.modal', function (event) {
        console.log("show map")
        var button = $(event.relatedTarget);
        initializeGMap(button.data('lat'), button.data('lng'));
        $("#location-map").css("width", "100%");
        $("#map_canvas").css("width", "100%");
    });

    // Trigger map resize event after modal shown
    $('#myModal').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, "resize");
        map.setCenter(myLatlng);
    });
});

function search() {
    var value = searchField.value;
    if (value === "") {
        other.style.display = null;
        searchResults.style.display = null;
    } else {
        other.style.display = "none";
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

function addProduct(){
    
    var product = ""; 
    product = JSON.stringify({
        "name": nameAdd.value,
        "description": descriptionAdd.value,
        "price": priceAdd.value,
        "quantity": quantityAdd.value,
        "images": imagesAdd.value.replace(/\s/g,""),
    })
    console.log(product);
    fetch('/api/product/add', {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "product": product
        })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson['status'] === "register/success") {
                addStatus.style.display = "block";
                $('#myModal').modal({
                    show: false
                })
                addStatus.innerHTML = "Thanks for signing in";
            } else {
                addStatus.style.display = "block";
                addStatus.innerHTML = responseJson['status'];
            }
        });
}
