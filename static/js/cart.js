var cart = document.getElementById('cart-items');
var productTemplate = document.getElementById('products-template').innerHTML;

fetch("/api/products/popular") // get endpoitn
    .then(response => response.json())
    .then(responseJson => {
        var productList = responseJson['products'];

        var newHTML = "";

        for (var index in productList) {
            newHTML += productTemplate
                .replace(/imgsrc/g, productList[index]['imageSource'][0])
                .replace(/productName/g, productList[index]['name'])
                .replace(/priceStart/g, productList[index]['priceStart'].toFixed(2))
                .replace(/priceEnd/g, productList[index]['priceEnd'].toFixed(2))
                .replace(/description/g, productList[index]['description'])
                .replace(/style="display: none"/g, "")
        }

        cart.innerHTML = newHTML;
    });