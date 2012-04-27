/**
   This is a collaboration between Peter Schwartzman, professor of
Environmental Studies at Knox College, and Maxwell Galloway-Carson, a
former student at that institution.
*/

// number of kWh used by an average american household
avg = 10900;

/* 
function to break up numbers with
many digits up by commas
*/
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
// http://www.mredkj.com/javascript/numberFormat.html

function roundN(num, decimals){
    var tens = Math.pow(10, decimals);
    return (Math.round(num * tens)/tens);
}

function format(num, decs){
    return addCommas(roundN(num, decs));
}

/*
A function that takes an array of variables that might be numbers, and
a function pointer. If all the variable are indeed numbers, then they
are passed as an argument to the function. If not, then all the result
tables are hidden, and the user is expected to enter a valid input.
 */
function decider(y, f, g){
    var retArray = new Array();
    var w = y.length;
    for(var i=0; i<w; i++){
	var x = Number(y[i]);
	if(isNaN(x)){
	    g(y);
	    return;
	}
	else{
	    retArray.push(x);
	}
    }
    
    f(retArray);
    return;
}

/*
the user has given valid input for the first method of part 1. The
following function computes her energy usage.
 */
//$( document ).delegate("#part1", "pageinit", function() {

    function allow1a(arr){
	$('#submit1a').attr('data-transition', 'slide');
	$('#submit1a').attr('data-rel', 'page');
	$('#submit1a').attr('href', '#result1');
    }

    function allow1b(arr){
	$('#submit1b').attr('data-transition', 'slide');
	$('#submit1b').attr('data-rel', 'page');
	$('#submit1b').attr('href', '#result1');
    }
    function fail1a(arr){
	$('#submit1a').attr('data-transition', 'pop');
	$('#submit1a').attr('data-rel', 'dialog');
	$('#submit1a').attr('href', '#error1');
    }

    function fail1b(arr){
	$('#submit1b').attr('data-transition', 'pop');
	$('#submit1b').attr('data-rel', 'dialog');
	$('#submit1b').attr('href', '#error1');
    }

    function do1a(arr){
	allow1a(null);
	method1a(arr);
    }
    function do1b(arr){
	allow1b(null);
	method1b(arr);
    }

$('#part1').live('pageinit',function(){

    $("#firstvalue2").keyup(function(){
	decider(new Array($(this).val()), allow1a, fail1a);
    });

    $("#firstvalue1").keyup(function(){
	decider(new Array($(this).val()), allow1b, fail1b);
    });

    $("#firstvalue2").change(function(){
	decider(new Array($(this).val()), allow1a, fail1a);
    });

    $("#firstvalue1").change(function(){
	decider(new Array($(this).val()), allow1b, fail1b);
    });
    
    $('#submit1a').bind('vclick',function(){
	decider(new Array($('#firstvalue2').val()), do1a, fail1a);
    });

    $('#submit1b').bind('vclick',function(){
	decider(new Array($('#firstvalue1').val()), do1b, fail1a);
    });
});
    
function method1a(arr){
    
    var energyCost = arr[0];
  // first, some calculations that I don't understand	
  var energyfCostf = (energyCost * 10);

    var energyfCostPre = format(12 * energyfCostf, 0);
 
  
    //var powerTwoCost = Math.round( 10 * (energyfCostf * 12) / (24 * 365))/10;
    var powerTwoCost = format((energyfCostf * 12) / (24 * 365),1);

  // round to one decimal
    //var housef = Math.round(10 * (12 * energyfCostf) / avg)/10;
    var housef = format((12 * energyfCostf) / avg,1);

  // add data to result table
  $("#1a").text(powerTwoCost);
  $("#1b").text(energyfCostPre);
  $("#1c").text(housef);
  
  // add data to result explanation
  $("#debrief1a").text(powerTwoCost);
  $("#debrief1b").text(energyfCostPre);
  $("#debrief1c").text(housef);
  
  // view the result
  // jump down to result
}

/*
the user has given valid input for the second method of part 1. The
following function computes her energy usage.
 */
function method1b(arr){

    var power = arr[0];
    
    var energy = format(power * 8760, 0);  
    var house = format((power * 8760) / avg, 1);

  // can I just do that?
  /*
  var powerTwoPre = Math.floor(power);
  
  // round to one decimal...
  var powerTwo = Math.round(powerTwoPre * 10) / 10;
  var energyPre = power * 8760;

  //  var energy = addCommas(Math.floor(powerTwoPre * 8760));

  var energyPre = power * 8760;
  */

  
  // add data to result table
  $("#1a").text(power);
  $("#1b").text(energy);
  $("#1c").text(house);
  
  // add data to result explanation
  $("#debrief1a").text(power);
  $("#debrief1b").text(energy);
  $("#debrief1c").text(house);
}

function do2(arr){
    allow2(null);
    part2Calc(arr);
}

function allow2(arr){
    $('#submit2').attr('data-transition', 'slide');
    $('#submit2').attr('data-rel', 'page');
    $('#submit2').attr('href', '#result2');
}

function fail2(arr){
    $('#submit2').attr('data-transition', 'pop');
    $('#submit2').attr('data-rel', 'dialog');
    $('#submit2').attr('href', '#error2');
}  

$('#part2').live('pageinit',function(){

    decider(new Array($('#secondValue1').val(), 
		      $('#secondValue2').val()), allow2, fail2);
	
  $("#secondValue1").keyup(function(){
    decider(new Array($(this).val(),$('#secondValue2').val())
	    , allow2, fail2);
  });

  $("#secondValue2").keyup(function(){
    decider(new Array($('#secondValue1').val(),$(this).val())
	    , allow2, fail2);
  });

  $("#secondValue1").change(function(){
    decider(new Array($(this).val(),$('#secondValue2').val())
	    , allow2, fail2);
  });

  $("#secondValue2").change(function(){
    decider(new Array($('#secondValue1').val(),$(this).val())
	    , allow2, fail2);
  });
    
  $('#submit2').bind('vclick',function(){
	  decider(new Array($('#secondValue1').val(), 
			    $('#secondValue2').val()), do2, fail2);
  });
  
});

function part2Calc(arr){
    var energy2 = arr[0];
    var cost2 = arr[1];
    //    var totalCost2 = addCommas(Math.round(100 *energy2 * cost2) / 100);
    var totalCost2 = addCommas(roundN(energy2 * cost2, 2));
    var energy2f = addCommas(energy2);
    //    var cost2f = addCommas(Math.round(100 * cost2) / 100);
    var cost2f = addCommas(roundN(cost2, 2));

    // insert findings into table
    $("#2a").text(energy2f);
    $("#2b").text(cost2f);
    $("#2c").text(totalCost2);

    // insert findings into explanation
    $("#debrief2a").text(energy2f);
    $("#debrief2b").text(cost2f);
    $("#debrief2c").text(totalCost2);
    
}

$('#result2').live('pageinit',function(){

    decider(new Array($('#secondValue1').val(),
		      $('#secondValue2').val()),part2Calc,fail2);
});


$('#part3').live('pageinit',function(){
  decider(new Array($("#thirdValue1").val()), allow3, fail3);
    
  $("#submit3").bind('vclick', function(){
      decider(new Array($("#thirdValue1").val()), do3, fail3);
  });
  
  $("#thirdValue1").keyup(function(){
    decider(new Array($(this).val()), allow3, fail3);
  });

  $("#thirdValue1").change(function(){
    decider(new Array($(this).val()), allow3, fail3);
  });
});

function allow3(arr){
    $('#submit3').attr('data-transition', 'slide');
    $('#submit3').attr('data-rel', 'page');
    $('#submit3').attr('href', '#result3');
}
    
function fail3(arr){
    $('#submit3').attr('data-transition', 'pop');
    $('#submit3').attr('data-rel', 'dialog');
    $('#submit3').attr('href', '#error1');
}

function do3(arr){
    allow3(null);
    part3Calc(arr);
}

$('#result3').live('pageinit',function(){
decider(new Array($('#thirdValue1').val()), 
	part3Calc, fail3);
});

function part3Calc(arr){
    var people3 = arr[0];
    var people3a = addCommas(Math.round(people3));
    var energy3f = (people3 * avg)/2.6;
    var turbine = energy3f / 4905600;

    var acres, squa, solar, solar2, solarf, energy3ff, turbinef;

    if(people3 < 101){
	acres = 'm<sup>2</sup>';
	squa = 'ft<sup>2</sup>';
	solar = energy3f/(1100 * .18);
	solar2 = format(solar * 10.7639, 0);
	solarf = format(solar, 0);
	energy3ff = format(energy3f, 0);
	turbinef = format(turbine, 3);
    }

    else{
	acres = 'acres';
	squa = 'mi<sup>2</sup>';
	solar = energy3f/(1100000000 * .18 * 1.6093 * 1.6093 * .0015625);
	solar2 = format(solar/640 , 3);
	solarf = format(solar, 1);
	energy3ff = format(energy3f, 0);
	turbinef = format(turbine, 2);
    }
    
    $('#acresSqua').html(squa+' ('+acres+')');
    $('#3a').text(people3a);
    $('#3b').text(energy3ff);
    $('#3c').text(''+solarf+' ('+ solar2+')');
    $('#3d').text(turbinef);

    $('#3acres').html(squa);
    $('#3squa').html(acres);

    $('#debrief3a').text(people3a);
    $('#debrief3b').text(solarf);
    $('#debrief3c').text(solar2);
    $('#debrief3d').text(turbinef);
}

function allow4(arr){
    $('#submit4a').attr('data-transition', 'slide');
    $('#submit4a').attr('data-rel', 'page');
    $('#submit4a').attr('href', '#results4a');
}

function fail4(arr){
    $('#submit4a').attr('data-transition', 'pop');
    $('#submit4a').attr('data-rel', 'dialog');
    $('#submit4a').attr('href', '#error2');
}

function do4(arr){
    allow4(null);
    part4aCalc(arr);
}

$('#part4').live('pageinit',function(){
    decider(new Array($("#fourthValue1").val(), 
		      $("#fourthValue2").val(), 
		      $("#fourthValue3").val()),
	    allow4, fail4);

  $("#submit4a").bind('vclick', function(){
	  decider(new Array($("#fourthValue1").val(), 
			    $("#fourthValue2").val(), 
			    $("#fourthValue3").val()),
		  do4, fail4);
  });
  
  $(".part4").keyup(function(){
	  decider(new Array($("#fourthValue1").val(), 
			    $("#fourthValue2").val(), 
			    $("#fourthValue3").val()),
		  allow4, fail4);
  });

  $(".part4").change(function(){
	  decider(new Array($("#fourthValue1").val(), 
			    $("#fourthValue2").val(), 
			    $("#fourthValue3").val()),
		  allow4, fail4);
  });

});



function part4aCalc(arr){

    var numpanels = arr[0];
    var wattage = arr[1];
    var sunhours = arr[2];

    var wattagef = format(wattage, 1);
    var sunhoursf = format(sunhours, 1);
    var numpanelsf = format(numpanels, 0);

    var energymade = format(wattage * sunhours * numpanels * 365 * .0009 , 1);

    var top = wattage * sunhours * numpanels * 365 *.9; // .9 = derating value
    var bottom = 1000 * avg;

    var house4 = format(top / bottom, 2);


    $('#4a1').text(numpanelsf);
    $('#4a2').text(wattagef);
    $('#4a3').text(sunhoursf);
    $('#4a4').text(energymade);
    $('#4a5').text(house4);

    $('#debrief4a1').text(numpanelsf);
    $('#debrief4a2').text(wattagef);
    $('#debrief4a3').text(sunhoursf);
    $('#debrief4a4').text(energymade);
    $('#debrief4a5').text(house4);
}

$('#results4a').live('pageinit',function(){
  decider(new Array($("#fourthValue1").val(), 
		    $("#fourthValue2").val(), 
		    $("#fourthValue3").val()),
	  part4aCalc, fail4);
});

function allow5(arr){
    $('#submit4b').attr('data-transition', 'slide');
    $('#submit4b').attr('data-rel', 'page');
    $('#submit4b').attr('href', '#results4b');
}

function fail5(arr){
    $('#submit4b').attr('data-transition', 'pop');
    $('#submit4b').attr('data-rel', 'dialog');
    $('#submit4b').attr('href', '#error2');
}

function do5(arr){
    allow5(null);
    part4bCalc(arr);
}

$('#part5').live('pageinit',function(){


  $("#submit4b").bind('vclick', function(){
	  decider(new Array($("#value4b1").val(), 
			    $("#value4b2").val(), 
			    $("#value4b3").val()),
		  allow5, fail5);
  });
  
  $(".part5").keyup(function(){
	  decider(new Array($("#value4b1").val(), 
			    $("#value4b2").val(), 
			    $("#value4b3").val()),
		  allow5, fail5);
  });

  $(".part5").change(function(){
	  decider(new Array($("#value4b1").val(), 
			    $("#value4b2").val(), 
			    $("#value4b3").val()),
		  allow5, fail5);
  });

    decider(new Array($("#value4b1").val(), 
		      $("#value4b2").val(), 
		      $("#value4b3").val()),
	    allow5, fail5);

});

function part4bCalc(arr){
    var numpanelsb = arr[0];
    var wattageb = arr[1];
    var sunhoursb = arr[2];

    var wattagefb = format(wattageb, 0);
    var numpanelsfb = format(numpanelsb, 0);
    var sunhoursfb = format(sunhoursb, 2);
    var energymadeb = format(wattageb * sunhoursb * numpanelsb * 365 * 24, 0);
    var house4b = format((wattageb * sunhoursb * numpanelsb * 365 * 24) 
			 / avg, 1);
    
    $('#4b1').text(numpanelsfb);
    $('#4b2').text(wattagefb);
    $('#4b3').text(sunhoursfb);
    $('#4b4').text(energymadeb);
    $('#4b5').text(house4b);
    
    $('#debrief4b1').text(numpanelsfb)
    $('#debrief4b2').text(wattageb)
    $('#debrief4b3').text(sunhoursb)
    $('#debrief4b4').text(energymadeb)
    $('#debrief4b5').text(house4b)
}

$('#results4b').live('pageinit',function(){
    decider(new Array($("#value4b1").val(), 
		      $("#value4b2").val(), 
		      $("#value4b3").val()),
	    part4bCalc, fail5);
});