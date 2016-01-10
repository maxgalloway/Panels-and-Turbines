/**                                                                          
These are the functions specific to part three. First are the functions
that either allow or disallow continuation to the result page,
depending on user input. Then are the handlers for user input. Last is
part that actually does the computation and fills in the results.

This file is part of Panels and Turbines
Copyright (C) 2016 Max Galloway webmaster@pwipw.com

Panels and Turbines is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*                                                                            
If the user input is good, change the link target to the result page,
and let it transition in a normal way.  
*/
function allow3(arr){
    $('#submit3').attr('data-transition', 'slide');
    $('#submit3').attr('data-rel', 'page');
    $('#submit3').attr('href', '#result3');
}

/*                                                                            
If the user input is bad, change the link tarket to the error page,
and make it pop up when clicked.  
*/    
function fail3(arr){
    $('#submit3').attr('data-transition', 'pop');
    $('#submit3').attr('data-rel', 'dialog');
    $('#submit3').attr('href', '../errors/error2.html');
}

/*                                                                            
If the input is good, and the link is clicked, not only do the "allow"
routine, but do the computation. 
*/
function do3(arr){
    allow3(null);
    part3Calc(arr);
}

/*
Event handlers for input change. Either allow/fail the links.                  
*/
$('#part3').live('pageinit',function(){
    decider(new Array($("#thirdValue1").val()), allow3, fail3);
  
    // on the click, not only "allow" but "do" if input is good
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

// if we go straight to this page, try to evaluate
$('#result3').live('pageinit',function(){
    decider(new Array($('#thirdValue1').val()), 
	    part3Calc, fail3);
});

/* function to actually to the computation */
function part3Calc(arr){
    var people3 = arr[0];
    var people3a = addCommas(Math.round(people3));
    var energy3f = (people3 * avg)/2.6;
    var turbine = energy3f / 4905600;

    var acres, squa, solar, solar2, solarf, energy3ff, turbinef;

    // measured in ft/meters for very few people
    if(people3 < 101){
	acres = 'm<sup>2</sup>';
	squa = 'ft<sup>2</sup>';
	solar = energy3f/(1100 * .18);
	solar2 = format(solar * 10.7639, 0);
	solarf = format(solar, 0);
	energy3ff = format(energy3f, 0);
	turbinef = format(turbine, 3);
    }
    
    // acres and miles for enveryone else
    else{
	acres = 'acres';
	squa = 'mi<sup>2</sup>';
	solar = energy3f/(1100000000 * .18 * 1.6093 * 1.6093 * .0015625);
	solar2 = format(solar/640 , 3);
	solarf = format(solar, 1);
	energy3ff = format(energy3f, 0);
	turbinef = format(turbine, 2);
    }
    
    // fill in values
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
