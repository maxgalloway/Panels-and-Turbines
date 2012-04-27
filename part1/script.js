/**
These are the functions specific to part one. First are the functions
that either allow or disallow continuation to the result page,
depending on user input. Then are the handlers for user input. Last is
part that actually does the computation and fills in the results.

Copyright 2012 Maxwell Galloway-Carson

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
If the user input is good, change the link target to the result page,
and let it transition in a normal way.
*/
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

/*
If the user input is bad, change the link tarket to the error page,
and make it pop up when clicked.
*/
    function fail1a(arr){
	$('#submit1a').attr('data-transition', 'pop');
	$('#submit1a').attr('data-rel', 'dialog');
	$('#submit1a').attr('href', '../errors/error1.html');
    }

    function fail1b(arr){
	$('#submit1b').attr('data-transition', 'pop');
	$('#submit1b').attr('data-rel', 'dialog');
	$('#submit1b').attr('href', '../errors/error1.html');
    }

/*
If the input is good, and the link is clicked, not only do the "allow"
routine, but do the computation.
*/
    function do1a(arr){
	allow1a(null);
	method1a(arr);
    }
    function do1b(arr){
	allow1b(null);
	method1b(arr);
    }

/*
Event handlers for input change. Either allow/fail the links.
*/
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


    // if all else fails, bind to the click. But if clicked, rather
    // than allow, do.
    $('#submit1a').bind('vclick',function(){
	decider(new Array($('#firstvalue2').val()), do1a, fail1a);
    });

    $('#submit1b').bind('vclick',function(){
	decider(new Array($('#firstvalue1').val()), do1b, fail1a);
    });
});
    
/*
This is the function that does the computation, and fills the values
into the result page. (if user picks the first option)
*/
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
This is the function that does the computation, and fills the values
into the result page. (if user picks the second option)
*/
function method1b(arr){

    var power = arr[0];
    
    var energy = format(power * 8760, 0);  
    var house = format((power * 8760) / avg, 1);

  // add data to result table
  $("#1a").text(power);
  $("#1b").text(energy);
  $("#1c").text(house);
  
  // add data to result explanation
  $("#debrief1a").text(power);
  $("#debrief1b").text(energy);
  $("#debrief1c").text(house);
}
