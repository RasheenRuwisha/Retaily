    $("#search-from").submit(function (e) {

        e.preventDefault();
        var searchText = $("#search-text").val();
        loadCategoryProducts(searchText)



    });


    function loadCategoryProducts(searchText) {
        $(".error").css("display","none");
        $(".search").css("display","none");
        $(".loader").css("display","block");
        $(".products-items").css("display","none");
        $("#drop-select").css("display","none");
        $(".products-items").html("");


        var categories = "";

        try {
            var settings = {
                async: true,
                crossDomain: true,
                url: "https://retaily-api.herokuapp.com/search?name="+
                searchText,
                method: "GET",
                headers: {
                    "cache-control": "no-cache",
                    "Postman-Token": "bf76efcc-d521-4586-a6cf-db51e1e69225"
                }
            };
    
            $.ajax(settings).done(function(response) {
                console.log(response);
                if(response.length > 0){
                    for (var i = 0; i < response.length; i++) {
                        categories += addProducts(
                            response[i].name,
                            response[i].price,
                            response[i].image,
                            response[i].hasDiscount,
                            response[i].productId,
                            response[i].discountPrice,
                        );
                    }
                    $(".products-items").html(categories);
                }else{
                    $(".error").css("display","block");
                }

                $("#drop-select").css("display","inline");
                $(".loader").css("display","none");
                $(".products-items").css("display","grid");
                $("#drop-select").trigger("create");
                $(".products-items").trigger("create");
            });
        } catch (err) {
            console.log("loadCategoryProducts failed");
            console.log(err);
        }
    }

    function addToCart(productid) {
        var value = $(`#qty-${productid}`).text();
        $(`#btn-${productid}`).css("display","none");
        $(`#processing-btn-${productid}`).addClass("processing-btn-important");


        var settings = {
            async: true,
            crossDomain: true,
            url: "https://retaily-api.herokuapp.com/addToCart",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "cache-control": "no-cache",
                "Postman-Token": "0db2443e-4c0b-437a-a10e-5e0659219599"
            },
            processData: false,
            data: '{\n\t"email":"' + localStorage.email + '",\n\t"productId":"' +
            productid +
            '",\n     "qty":' +
            parseInt(value) +
            "\n}\n"
        };

        $.ajax(settings).done(function(response) {
            console.log(response);
            $(`#${productid}`).popup("close");
            if (response === 2005) {
                $( `#${productid}`).on({
                    popupafterclose: function() {
                        setTimeout( function(){ $("#cart-success-message" ).popup( 'open' ) }, 100 );
                    }
                });
                setTimeout(function() {
                    $("#cart-success-message").popup("close");
                }, 2000);
            } else if (response === 3006) {
                $( `#${productid}`).on({
                    popupafterclose: function() {
                        setTimeout( function(){ $("#cart-error" ).popup( 'open' ) }, 100 );
                    }
                });
                setTimeout(function() {
                    $("#cart-error").popup("close");
                }, 2000);
            }
            $(`#btn-${productid}`).css("display","block");
            $(`#processing-btn-${productid}`).removeClass("processing-btn-important");
        }).error(function() {
            $( `#${productid}`).on({
                popupafterclose: function() {
                    setTimeout( function(){ $("#cart-error" ).popup( 'open' ) }, 100 );
                }
            });
            setTimeout(function() {
                $("#cart-error").popup("close");
            }, 2000);
            $(`#btn-${productid}`).css("display","block");
            $(`#processing-btn-${productid}`).removeClass("processing-btn-important");
        });


    }


    function addProducts(name, price, image, promotion, productId,discountPrice) {

        var popPrice = "";
        var mainPrice = "";
        var totalPrice = ""
    
        if(name.length >17){
            name = name.substr(0,17);
            name += "...";
        }
    
        if(promotion){
            popPrice += `
            <p class="price">Product Price :</p>
                      <p class="price float-price">$${price}</p>
                      <br>
                      <p class="price">Promotion Price :</p>
                      <p class="price float-price">$${discountPrice}</p>
            `;
    
            mainPrice += `  <p style="display: inline; text-decoration: line-through;" class="Product-Price">$${price}</p>
            <p style="display: inline;" class="Product-Price"><b>$${discountPrice}</b></p>`
            totalPrice += ` <p class="price float-price">$<span  id="total-${productId}">${discountPrice}</span><span id="incr-${productId}" style="display:none">${discountPrice}</span></p>`
        }else{
            popPrice += `<p class="price">Product Price :</p>
                      <p class="price float-price">$${price}</p>
                      <br></br>`;
    
            mainPrice += `  <p style="display: inline;" class="Product-Price">$${price}</p>`
            totalPrice += ` <p class="price float-price">$<span  id="total-${productId}">${price}</span><span id="incr-${productId}"  style="display:none">${price}</span></p>`
        }
    
    
    
    
            var productItem = `
            <div class="item">
              <div class="align-favourite">
                <div class="add-to-cart-button-div style=" Style="background: none !important;">
                  <a href="#popupLogin" data-rel="popup" data-position-to="window"
                    class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                      src="../images/icons/heart (1).png" border="0" /></a>  
                </div>
              </div>
              <a style="font-weight:300;color:black"   href='ProductPage.html?id=${productId}' rel='external'><img class="product-image-items-display" src="${image}" alt=" PS4" /></a>
            ${mainPrice}
    
    
              <a style="font-weight:300;color:black"  href='ProductPage.html?id=${productId}' rel='external'><p class="Product-Price Product-Name">${name}</p></a>
              <div class="align-addtocart">
                <div class="add-to-cart-button-div">
                  <a href="#${productId}" data-rel="popup" data-position-to="window"
                    class=" ui-corner-all  ui-btn-inline ui-btn-a" data-transition="pop"><img class="add-to-cart-plus-icon"
                      src="../images/icons/001-add White.png" border="0" /></a>
                  <div data-role="popup" id="${productId}" data-theme="" class="ui-corner-all">
                    <div style="padding:10px 20px; width: 200px;">
                                  <h3 class="product-addtocart-popup">${name} </h3>
                      ${popPrice}
                      <br>
                      <br>
                      <p class="price">Quantity :</p>
                      <button onclick="decrementQuantity('qty-${productId}','total-${productId}','incr-${productId}')" class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                        data-theme="none">
                        <img class="product-popup-icon" src="../images/icons/002-substract.png" border="0"
                          width="35px" height="35px" />
                      </button>
                      <p class="price float-price" id="qty-${productId}">1</p>
                      <button onclick="incrementQuantity('qty-${productId}','total-${productId}','incr-${productId}')"  class="btn-nav-bar addmore-button-quantity-popup" data-role="button" data-shadow="false"
                        data-theme="none">
                        <img class="product-popup-icon" src="../images/icons/001-add.png" border="0" width="35px"
                          height="35px" />
                      </button>
                      <br>
                      <br>
                      <p class="price">Total :</p>
                        ${totalPrice}
                        <div class=" button-container">
                        <button onclick=addToCart("${productId}") type="submit" class="login-button ui-btn ui-btn-inline rounded-button">Add to Cart</button>
                      </div>
                              
                    </div>
                  </div>
                     
                </div>
              </div>
      
      
            </div>
            `;
    
            return productItem;
    }