var setValue = function(elem, value, inc, shift, speed){
  var interval = false; 
  speed = 40;
  shift = Math.round(Math.abs((value - price_old) / 10));
  if (parseInt(elem.text()) < value) {
    inc = true;
  } else {
    inc = false;
  }
  if (inc) {
      interval = setInterval(function(){
          if (parseInt(elem.text())*1+shift >= value) {
              elem.text(value);
              clearInterval(interval);
          } else {
              elem.text(parseInt(elem.text())*1+shift);
          }
      }, speed);
  } else {
      interval = setInterval(function(){
          if (parseInt(elem.text())*1-shift <= value) {
              elem.text(value);
              clearInterval(interval);
          } else {
              elem.text(parseInt(elem.text())*1-shift);
          }
      }, speed);
  }
  
};



jQuery(function($){

  /*Цена за 1м2 по типам*/
  var price_PD39 = 4830,
      price_PD45 = 5150,
      price_PD55 = 5570,
      price_PD77 = 7930,
      price_AER44 = 7240,
      price_AER55 = 7670,
      price_AERG56 = 10200,
      price_AERG84 = 18354;
  
  /*Шаг стоимости*/
  var step_PD39 = 1100,
      step_PD45 = 1220,
      step_PD55 = 1360,
      step_PD77 = 2180,
      step_AER44 = 1950,
      step_AER55 = 2100,
      step_AERG56 = 2900;
      step_AERG84 = 2900;
  
  //Стоимость пружины
  var spring = 1600;

  //Стоимость электропривода относительно пружины
  var eldrive_PD39 = 2010,
      eldrive_PD45 = 2000,
      eldrive_PD55 = 2450,
      eldrive_PD77 = 3000,
      eldrive_AER44 = 2900,
      eldrive_AER55 = 3000,
      eldrive_AERG56 = 3700,
      eldrive_AERG84 = 6900;

  //Cтоимость кардана относительно пружины
  var kardan_PD39 = 1410,
      kardan_PD45 = 1400,
      kardan_PD55 = 1370,
      kardan_PD77 = 1200,
      kardan_AER44 = 1200,
      kardan_AER55 = 1300,
      kardan_AERG56 = 1400,
      kardan_AERG84 = 1600;

  //Стоимость ленты
  var lenta_PD39 = -770,
      lenta_PD45 = -760,
      lenta_PD55 = -750,
      lenta_PD77 = -700,
      lenta_AER44 = -740,
      lenta_AER55 = -750,
      lenta_AERG56 = -850,
      lenta_AERG84 = -880;

  //Переменные
  var 
    //ширина
    width = 1000,
    //высота
    height = 1000,
    //площадь
    area = width * height,
    //выбранный профиль
		profile = 'PD/39',
		//тип управления
		manage = 0, //0-ручной, 1-пружина, 2-кардан, 3-лента, 4-электропривод
		//тип блокировки
		lock = 0; //0-без блокировки, 1-замок в планку, 2-ВБР, 3-задвижка боковая
		//цена, исходя из параметров
    price = 4830, //изначально цена 1м2 профиля PD/39 с ручным управлением и без блокировки
    price_old = price,
    deliv = 500, //стоимость доставки
    //скидка
    sale = 20,
    //количество деталей
    count = 1;
    // $("#price-span").text(price * count);
    var el, el_sale;
    $("#sale").text(sale);

    if (sale > 0) {
      $(".calc__price--old").show();
      $(".border-block__sale").show();
      el_sale = $("#price-span");
      el = $("#sale-price");
    } else {
      $(".calc__price--old").hide();
      $(".border-block__sale").hide();
      el = $("#price-span");
      el_sale = $("#sale-price");
    }
    setValue(el, price*count,true,10,2);
    setValue(el_sale, Math.floor(price*count*(1 - sale/100)),true,10,2);



$("input[name='montazh']").on("change", function(){
  $("#montazh").text($("input[name='montazh']:checked").parents(".radio").find(".radio__text").text());
  $("#prof-img-big").attr("src", $(this).parents(".radio").find(".radio__custom").attr("data-img"));
});
$("input[name='manage']").on("change", function(){
	$("#type-m").text($("input[name='manage']:checked").parents(".radio").find(".radio__text").text());
  manage = $("input[name='manage']:checked").attr('data-type');
  calculate();
});
$("input[name='lock']").on("change", function(){
	$("#lock").text($("input[name='lock']:checked").parents(".radio").find(".radio__text").text());
	lock = $("input[name='manage']:checked").attr('data-type');
});
$("input[name='color']").on("change", function(){
  $("#color").text($("input[name='color']:checked").parents(".radio").find(".radio__text").text());
  $("#prof-img-big").attr("src", $(this).parents(".radio").find(".radio__custom").attr("data-img"));
});
$("input[name='image']").on("change", function(){
  $("#photoprint").text($("input[name='image']:checked").parents(".radio").find(".radio__text").text());
});
$("input[name='lak']").on("change", function(){
    if ($("input[name='lak']").prop("checked")) {
        $("#lak").text("Да");
    } else {
        $("#lak").text("Нет");
    }
});

$("input[name='deliv']").on("change", function(){
  if ($("input[name='deliv']:checked").attr("data-deliv") == "true") {
    $("#deliv-value").show();
    $("#deliv-value .calc__price--red").text(deliv);
} else {
  $("#deliv-value").hide();
}
});

$("input[name='profile']").on("change", function(){
  profile = $("input[name='profile']:checked").parents(".radio-img").find(".radio-img__text").text();
  $("#profile").text(profile);
  $("#prof-img img").attr("src", $(this).parents(".radio-img").find(".radio-img__custom").attr("data-img"));
	profile_max();

  calculate();
});

$("#width").on("input", function(){
	width = parseInt($(this).val());
	if (width < 100) {
		$(this).val(100);
		width = 100;
	}
	profile_max();

  calculate();
});

$("#height").on("input", function(){
	height = parseInt($(this).val());
	if (height < 100) {
		$(this).val(100);
		height = 100;
	}
	if (height > 6000) {
		$(this).val(6000);
		height = 6000;
	}
  $("#razmer-h").text(height);

  calculate();
});


function profile_max() {
	if ((profile=="PD/45")&&(width > 2500)) {
		width = 2500;
	}
	if ((profile=="PD/39")&&(width > 2600)) {
		width = 2600;
	}
	if ((profile=="PD/55")&&(width > 2700)) {
		width = 2700;
	}
	if ((profile=="AER44/s")&&(width > 3200)) {
		width = 3200;
	}
	if ((profile=="AERG56")&&(width > 4200)) {
		width = 4200;
	}
	if ((profile=="AER55")&&(width > 4500)) {
		width = 4500;
	}
	if ((profile=="PD/77")&&(width > 5200)) {
		width = 5200;
	}
	if ((profile=="AERG84")&&(width > 5300)) {
		width = 5300;
	}
	$("#width").val(width);
	$("#razmer-w").text(width);
}

$(".calc__count--minus").click(function(){
  var inp = $(this).parents(".calc__count").find(".calc__count_input");
  if (inp.val() > 1) inp.val(parseInt(inp.val()) - 1);
  count = parseInt(inp.val());
  // $("#price-span").text(price * count);
 setValue(el, price*count,true,10,2);
    setValue(el_sale, Math.floor(price*count*(1 - sale/100)),true,10,2);
  price_old = price * count;
});
$(".calc__count--plus").click(function(){
  var inp = $(this).parents(".calc__count").find(".calc__count_input");
  inp.val(parseInt(inp.val()) + 1);
  count = parseInt(inp.val());
  // $("#price-span").text(price * count);
  setValue(el, price*count,true,10,2);
    setValue(el_sale, Math.floor(price*count*(1 - sale/100)),true,10,2);
  price_old = price * count;
});


function calculate(){
	var area_span = 0; // площадь без первого квадрата
  area = width * height / 1000000;
  console.log(area);
	if (area > 1) {
		area_span = area - 1;
		area = 1;
	} else {
		area_span = 0;
  }
  price = 0;


  switch (profile) {
    case ("PD/39"): {
      price = area * price_PD39 + area_span * step_PD39;
      switch (manage) {
        case ("1"): {
          price += spring;
          break;
        }
        case ("2"): {
          price +=  spring + kardan_PD39;
          break;
        }
        case ("3"): {
          price +=  spring + lenta_PD39;
          break;
        }
        case ("4"): {
          price +=  spring + eldrive_PD39;
          break;
        }
      }
      break;
    }
    case ("PD/45"): {
      price = area * price_PD45 + area_span * step_PD45;
      switch (manage) {
        case (1): {
          price += spring;
          break;
        }
        case (2): {
          price +=  spring + kardan_PD45;
          break;
        }
        case (3): {
          price +=  spring + lenta_PD45;
          break;
        }
        case (4): {
          price +=  spring + eldrive_PD45;
          break;
        }
        default: {
          console.log(price);
          break;
        }
      }
      break;
    }
    case ("PD/55"): {
      price = area * price_PD55 + area_span * step_PD55;
      switch (manage) {
        case ("1"): {
          price += spring;
          break;
        }
        case ("2"): {
          price +=  spring + kardan_PD55;
          break;
        }
        case ("3"): {
          price +=  spring + lenta_PD55;
          break;
        }
        case ("4"): {
          price +=  spring + eldrive_PD55;
          break;
        }
      }
      break;
    }
    case ("PD/77"): {
      price = area * price_PD77 + area_span * step_PD77;
      switch (manage) {
        case ("1"): {
          price += spring;
          break;
        }
        case ("2"): {
          price +=  spring + kardan_PD77;
          break;
        }
        case ("3"): {
          price +=  spring + lenta_PD77;
          break;
        }
        case ("4"): {
          price +=  spring + eldrive_PD77;
          break;
        }
      }
      break;
    }
    case ("AER44/s"): {
      price = area * price_AER44 + area_span * step_AER44;
      switch (manage) {
        case ("1"): {
          price += spring;
          break;
        }
        case ("2"): {
          price +=  spring + kardan_AER44;
          break;
        }
        case ("3"): {
          price +=  spring + lenta_AER44;
          break;
        }
        case ("4"): {
          price +=  spring + eldrive_AER44;
          break;
        }
      }
      break;
    }
    case ("AER55"): {
      price = area * price_AER55 + area_span * step_AER55;
      switch (manage) {
        case ("1"): {
          price += spring;
          break;
        }
        case ("2"): {
          price +=  spring + kardan_AER55;
          break;
        }
        case ("3"): {
          price +=  spring + lenta_AER55;
          break;
        }
        case ("4"): {
          price +=  spring + eldrive_AER55;
          break;
        }
      }
      break;
    }
    case ("AERG56"): {
      price = area * price_AERG56 + area_span * step_AERG56;
      switch (manage) {
        case ("1"): {
          price += spring;
          break;
        }
        case ("2"): {
          price +=  spring + kardan_AERG56;
          break;
        }
        case ("3"): {
          price +=  spring + lenta_AERG56;
          break;
        }
        case ("4"): {
          price +=  spring + eldrive_AERG56;
          break;
        }
      }
      break;
    }
    case ("AERG84"): {
      price = area * price_AERG84 + area_span * step_AERG84;
      switch (manage) {
        case ("1"): {
          price += spring;
          break;
        }
        case ("2"): {
          price +=  spring + kardan_AERG84;
          break;
        }
        case ("3"): {
          price +=  spring + lenta_AERG84;
          break;
        }
        case ("4"): {
          price +=  spring + eldrive_AERG84;
          break;
        }
      }
      break;
    }
    default: {
      break;
    }
  }

  setValue(el, price*count,true,10,2);
    setValue(el_sale, Math.floor(price*count*(1 - sale/100)),true,10,2);
  price_old = price * count;
  // $("#price-span").text(price * count);
  
}








})