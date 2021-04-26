jQuery(document).ready(function ($){
  var tnum = 'en';
  $(document).click(function () {
      $('.setting-lang, .more_lang').removeClass('active');
  });
  $('.setting-lang .current_lang').click(function(e){    
      e.stopPropagation();
      $(this).parent('.setting-lang').toggleClass('active');
      
      setTimeout(function(){
        $('.more_lang').toggleClass('active');
      }, 5);
  });
  translate(tnum);

  $('.more_lang .lang').click(function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    $('.more_lang').removeClass('active');  
    
    var img = $(this).find('img').attr('src');    
    var lang = $(this).attr('data-value');
    var tnum = lang;
    translate(tnum);
    
    $('.current_lang .lang-txt').text(lang);
    $('.current_lang img').attr('src', img);
    
    if(lang == 'ar'){
      $('body').attr('dir', 'rtl');
    }else{
      $('body').attr('dir', 'ltr');
    }
    
  });
  function translate(tnum){
  }

  // Go To Top
  var btnReturnTop = ('.scrollTop');
  $(window).scroll(function () {
      var topPos = $(this).scrollTop();
      if(topPos > 400){
          $(btnReturnTop).css("opacity","0.6");
          $(btnReturnTop).css("visibility","visible");
      }else{
          $(btnReturnTop).css("opacity","0");
          $(btnReturnTop).css("visibility","hidden");
      }
  });
  $(btnReturnTop).click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 700);
      return false;
  });
  //hiển thị categories
  if($('.bar-categories').length>0){
    $(document).click('.bar-categories',function (e) {
      $('.categries-menu').addClass('active');
    });
    $(document).click(function (e) {
      var elm = $(e.target);
      if(!elm.closest('.bar-categories').length){
        $('.categries-menu').removeClass('active');
        $('.categries-menu').find('.sub-menu-categories.active').removeClass('active');
      }
    });
  }
  //show submenu-categories
  if($('.sub-menu-event').length>0){
    $('body').on('click','.sub-menu-event',function (e) {
      e.preventDefault();
      $(this).closest('.categries-menu-dropdown').find('.sub-menu-categories').toggleClass('active');
    });
  }
  //hiển thị shopcart
  if($('.icon-shopcart').length>0){
    $(document).on('click','.icon-shopcart', function(e) {
      $(this).closest('.icon-shopcart').find('.product-item').addClass('active');
      e.preventDefault();
    });
    $(document).click(function (e) {
      var elm = $(e.target);
      if(!elm.closest('.icon-shopcart').length){
        $('.product-item').removeClass('active');
      }
    });
  }
  //điếm ngược time
  if($("#countdown").length>0){
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let birthday = "Sep 30, 2021 00:00:00",
      countDown = new Date(birthday).getTime(),
      x = setInterval(function() {    

        let now = new Date().getTime(),
            distance = countDown - now;

          document.getElementById("days").innerText = Math.floor(distance / (day)),
          document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
          document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
          document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
          let countdown = document.getElementById("countdown")
          countdown.style.display = "none";
          clearInterval(x);
        }
        //seconds
      }, 0);
    }
  //list text
  var products=["Nature's Bounty Biotin","10000 MCG","Best Colon Detox Formula","Advanced Colon","Natural Factors Vitamin C"," Blueberry Rasp"," Methylcobalamin","Jarrow Formulas"];

  //function search product
  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  autocomplete(document.getElementById("myInput"), products);
  //caurosel
  let slidePosition = 0;
  const slides = document.getElementsByClassName('caurosel-item');
  const totalSlides = slides.length;
  const dots = document.getElementsByClassName('dots');
  const totalDot = dots.length;

  document.getElementById('caurosel_buton-prev').addEventListener("click",function () {
    movetoPrevSlide();
  });
  document.getElementById('caurosel_buton-next').addEventListener("click", function(){
    movetoNextSlide();
  });
  document.getElementById('dot-event').addEventListener("click",function () {
    moveDotSilde();
  });

  function updateSlidePosition() {
    for(let slide of slides){
      slide.classList.remove('active');
      slide.classList.add('caurosel-item--hidden');
    }
    for(let dot of dots){
      dot.classList.remove('active');
      dot.classList.add('dots-opacity');
    }
    slides[slidePosition].classList.add('active');
    dots[slidePosition].classList.add('active');
  }
  function moveDotSilde(){
    if(slidePosition === totalDot - 1){
      slidePosition = 0;
    }else{
      slidePosition++;
    }
    updateSlidePosition()
  }
  function movetoNextSlide() {
      if(slidePosition === totalSlides - 1){
          slidePosition = 0;
      }else{
          slidePosition++;
      }
      updateSlidePosition()
  }
  function movetoPrevSlide() {
      if(slidePosition === 0){
          slidePosition = totalSlides - 1;
      }else{
          slidePosition--;
      }
      updateSlidePosition()
  }
  //function shop cart
  let carts = document.querySelectorAll('.add-to-cart');

  let products_item = [
    {
      name: 'Natures Bounty Biotin',
      tag: 'biotin',
      price: 30,
      inCart: 0
    },
    {
      name: 'Best Colon Detox Formula',
      tag: 'formula',
      price: 30,
      inCart: 0
    },
    {
      name: 'Natural Factors Vitamin C',
      tag: 'vitamin',
      price: 30,
      inCart: 0
    },
    {
      name: 'Jarrow Formulas',
      tag: 'methylconbalamin',
      price: 30,
      inCart: 0
    },
    {
      name: 'Centrum For Women',
      tag: 'biotin',
      price: 30,
      inCart: 0
    },
    {
      name: 'Centrum Silver For Men Box',
      tag: 'formula',
      price: 30,
      inCart: 0
    },
    {
      name: 'Centrum For Men Both',
      tag: 'vitamin',
      price: 30,
      inCart: 0
    },
    {
      name: 'Orgen Osteo Care',
      tag: 'methylconbalamin',
      price: 30,
      inCart: 0
    }
  ];
  for(let i = 0; i < carts.length; i++){
    carts[i].addEventListener('click', function(){
        cartNumbers(products_item[i]);
        totalCost(products_item[i]);
    });
}

  function onLoadCartNumbers(){
      let productNumbers = localStorage.getItem('cartNumbers');

      if(productNumbers){
        document.querySelector('.count-product').textContent = productNumbers;
      }
  }

  function cartNumbers(product){

      let productNumbers = localStorage.getItem('cartNumbers');

      productNumbers = parseInt(productNumbers);

      if(productNumbers){
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector('.count-product').textContent = productNumbers + 1;
      } else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.count-product').textContent = 1;
      }

      setItems(product);
  }
  function setItems(product){
      let cartItems = localStorage.getItem('productsInCart');
      cartItems = JSON.parse(cartItems);

      if(cartItems != null){
          if(cartItems[product.tag] == undefined){
            cartItems = {
              ...cartItems,
              [product.tag]:product
            }
          }
          cartItems[product.tag].inCart += 1;
      }else{
        product.inCart = 1;
        cartItems = {
          [product.tag]: product
        }
      }
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  }

  function totalCost(product){
      let cartCost = localStorage.getItem('totalCost');
      if( cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
      }else{
        localStorage.setItem('totalCost', product.price);
      }
  }

  function displayCart(){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cartCost = localStorage.getItem('totalCost');
    let productaddtominicart = document.querySelector('.product-add-to-minicart');
    let totalproductsminicart = document.querySelector('.total-products-minicart');
    
    if(cartItems && productaddtominicart && totalproductsminicart){
        productaddtominicart.innerHTML ='';
        totalproductsminicart.innerHTML ='';
        Object.values(cartItems).map(item => {
          productaddtominicart.innerHTML += `
          <li class="product">
            <div class="img-products-minicart">
              <img src="./assets/image/${item.name}.png">
            </div>
            <div class="product-minicart-content">
              <h6 class="name-products-minicart">${item.name}</h6>
              <span class="price">
                <bdi>$${item.price}.00</bdi>
              </span>
              <span class="multi-incart">x${item.inCart}</span>
            </div>
            <div class="total-minicart">
              <span>$${item.inCart * item.price}.00</span>
            </div>
            <span class="fa fa-times"></span>
          </li>
          `;
        });
        totalproductsminicart.innerHTML +=`
        <div class="total">
          <h3 class="title-total">TOTAL: </h3>
          <span>$${cartCost}.00</span>
        </div>
        `;
      }
  }
  onLoadCartNumbers();
  displayCart();
  //menu responsive
  $('.menu-toggle').click(function (e) {
    $('.nav-menu').toggleClass('active');
    e.preventDefault();
  })
});