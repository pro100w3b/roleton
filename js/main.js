$(document).ready(function(){
  $(".js-call-open").click(function(){
    $("#popup-call").addClass("popup--show");
  });
  $(".js-zamer-open").click(function(){
    $("#popup-zamer").addClass("popup--show");
  });
  $(".js-cart-open").click(function(){
    $("#popup-cart").addClass("popup--show");
  });
  $(".popup-bg").click(function(){
    $(this).parent(".popup").removeClass("popup--show");
  });

  $(".menu__catalog").click(function(){
    $(".menu__drop").toggleClass("menu__drop--show");
    $(".drop").removeClass("drop--show");
    $(".menu__drop--show .menu__drop_item:first-child .drop").addClass("drop--show");

    $(".drop2").removeClass("drop--show");
    $(".menu__drop--show .drop__item:first-child .drop2").addClass("drop--show");

    $(".drop-card").removeClass("drop--show");
    $(".menu__drop--show .drop2__item:first-child .drop-card").addClass("drop--show");
    
    $(".menu__drop_link").removeClass("drop--active");
    $(".menu__drop_item:first-child .menu__drop_link").addClass("drop--active");
    $(".drop__item_link").removeClass("drop--active2");
    $(".drop__item:first-child .drop__item_link").addClass("drop--active2");
    $(".drop2__item_link").removeClass("drop--active2");
    $(".drop2__item:first-child .drop2__item_link").addClass("drop--active2");
  });

  $(".menu__drop_link").click(function(){
    $(".drop").removeClass("drop--show");
    $(".drop2").removeClass("drop--show");
    $(".drop-card").removeClass("drop--show");
    $(".menu__drop_link").removeClass("drop--active");
    $(".drop__item_link").removeClass("drop--active2");
    $(".drop2__item_link").removeClass("drop--active2");
    $(this).parents(".menu__drop_item").find(".drop").addClass("drop--show");
    $(this).addClass('drop--active');
  });
  $(".drop__item_link").click(function(){
    $(".drop2").removeClass("drop--show");
    $(".drop-card").removeClass("drop--show");
    $(".drop__item_link").removeClass("drop--active2");
    $(".drop2__item_link").removeClass("drop--active2");
    $(this).parents(".drop__item").find(".drop2").addClass("drop--show");
    $(this).addClass('drop--active2');
  });
  $(".drop2__item_link").click(function(){
    $(".drop-card").removeClass("drop--show");
    $(".drop2__item_link").removeClass("drop--active2");
    $(this).parents(".drop2__item").find(".drop-card").addClass("drop--show");
    $(this).addClass('drop--active2');
  });

  

  $(".calc__show-btn").click(function(){
    $(".calc__block").css("max-height", "20000px");
    $(".calc__block").css("padding-bottom", "40px");
    $(this).hide();
  });

var kol = 0;
var itogPrice = 0;
$("div").on('click','.cart__table_item--delete',function(){
  $(this).parent("div").parent(".cart__table_item").remove();
  kol -= 1;
  $("#cart__count").text(kol);
 
  
  itogPrice -= parseInt($(this).parents(".cart__table_item").find(".cart-item-price").text());
  $("#itog").text(itogPrice);
});



$("#toCart").click(function(){
  kol += 1;
  $("#cart__count").text(kol);
  $('<div>', {
    class: 'cart__table_item',
    append: $('<div>', { 
                  class: 'cart__table-w20',
                  append: $('<span>', {
                    class: 'cart__table_text',
                    text: 'Рольставни'
                  })
              })
            .add($('<div>', { 
              class: 'cart__table-w30',
              append: $('<span>', {
                class: 'cart__table_text',
                text: $("#profile").text() + ', ' +
                      $("#montazh").text() + ', ' +
                      $("#type-m").text() + ', ' +
                      $("#color").text() + ', ' +
                      $("#lock").text()
              })
            }))
            .add($('<div>', { 
              class: 'cart__table-w10',
              append: $('<span>', {
                class: 'cart__table_text',
                text: $("#razmer-w").text()
              })
            }))
            .add($('<div>', { 
              class: 'cart__table-w10',
              append: $('<span>', {
                class: 'cart__table_text',
                text: $("#razmer-h").text()
              })
            }))
            .add($('<div>', { 
              class: 'cart__table-w10',
              append: $('<span>', {
                class: 'cart__table_text',
                text: $(".calc__count_input").val()
              })
            }))
            .add($('<div>', { 
              class: 'cart__table-w10',
              append: $('<span>', {
                class: 'cart__table_text cart-item-price',
                text: $("#price-span").text(),
                append: $('<img>', {
                  src: 'images/icons/r.png'
                })
              })
            }))
            .add($('<div>', { 
              class: 'cart__table-w10',
              append: $('<span>', {
                class: 'cart__table_item--delete'
              })
            }))
})
.appendTo('.cart--items');
    itogPrice += parseInt($("#price-span").text());
    $("#itog").text(itogPrice);
});















  $(window).scroll(function(){
    if ($(this).scrollTop() > 200) {
      if ($("body").width() > 600) {
        
          $(".menu .cart").appendTo(".top-menu-btn-cart");
          $(".cart").addClass("cart--top");
          
    $(".top-menu__btn").addClass("top-menu__btn--top");
        }
      } else {
        if ($("body").width() > 600) {
          $(".top-menu-btn-cart .cart").appendTo(".menu");
          $(".cart").removeClass("cart--top");
          
    $(".top-menu__btn").removeClass("top-menu__btn--top");
        }
      }
  });

  $(".butter").click(function(){
    $(".menu__links").addClass("menu__links--open");
  });
  $(".close-menu").click(function(){
    $(".menu__links").removeClass("menu__links--open");
  });

  if ($("body").width() < 600) {
    $(".menu .cart").appendTo(".top-menu-btn-cart");
    $(".cart").addClass("cart--top");
  }
  $(window).resize(function(){
    if ($("body").width() < 600) {
      $(".menu .cart").appendTo(".top-menu-btn-cart");
      $(".cart").addClass("cart--top");
    } else {
      $(".top-menu-btn-cart .cart").appendTo(".menu");
      $(".cart").removeClass("cart--top");
    }
  });

  $(function(){
    $("a[href^='#']").click(function(){
      var _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
    });
});

$(".offer__slider").slick({
  dots: true,
  arrows: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1
});
  $(".brands__list").slick({
    dots: true,
    infinite: false,
    arrows: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1
        }
      }
    ]
});
  
  
  $(function() {
    $("[type=tel]").mask("+7 (999) 999-99-99");
  });

  $('.popup__form input[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
      $(this).parents("form").find("button[type='submit']").attr("disabled", false);
    } else {
      $(this).parents("form").find("button[type='submit']").attr("disabled", true);
    }
  });



  /*date script*/
  Date.prototype.getDaysInMonth = function()
    {
        return (new Date(this.getFullYear(), this.getMonth() + 1, 0)).getDate();
    };

    var now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1,
        day = now.getDate(),
        doDayNum = 15,
        dayInMonth = now.getDaysInMonth(),
        text = '';

    if ((day < 15) || (day == dayInMonth)) {
      if (day == dayInMonth) {
        month += 1;
      }
      if (month > 12) {
        month = 1;
        year += 1;
      }
      if (month < 10) {
        month = '0' + month;
      }
      text = '15.' + month + '.' + year;
      doDayNum = 15;
    } else {
      if (month <= 9) {
        month = '0' + month;
      }
      text = dayInMonth + '.' + month + '.' + year;
      doDayNum = dayInMonth;
    }
    var dateArray = document.getElementsByClassName('date');
    var index;
    for (index = 0; index < dateArray.length; ++index) {
        dateArray[index].textContent = text;
    }
    var date1 = now;
    var date2 = new Date(year,month - 1,doDayNum);
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffHours = Math.ceil(timeDiff / (1000 * 3600)); 
    if (diffHours > 72) {
      $(".offer__text").hide();
    } else {
      $(".offer__text").show();
      $("#day-count").text(Math.floor(diffHours / 24));
      $("#hour-count").text(diffHours - Math.floor(diffHours / 24) * 24);
    }
    
  /*end date script */
 


  if ($("#map").length > 0) {
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
              center: [55.685066, 37.696040],
              zoom: 17,
              controls: []
          }, {
              searchControlProvider: 'yandex#search'
          }),

          // Создаём макет содержимого.
          MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
              '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
          ),

          myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
              hintContent: 'улица Речников, 7с1',
              balloonContent: 'улица Речников, 7с1'
          });

      myMap.geoObjects
        .add(myPlacemark)
    });
  }





  //E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Сообщение отправлено!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
  
});