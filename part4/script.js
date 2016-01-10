/**                                                                           
These are the functions specific to part four. First are the functions
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
function allow4(arr){
    $('#submit4').attr('data-transition', 'slide');
    $('#submit4').attr('data-rel', 'page');
    $('#submit4').attr('href', '#results4');
}

/*                                                                            
If the user input is bad, change the link tarket to the error page,            
and make it pop up when clicked.                                               
*/
function fail4(arr){
    $('#submit4').attr('data-transition', 'pop');
    $('#submit4').attr('data-rel', 'dialog');
    $('#submit4').attr('href', '../errors/error2.html');
}

/*                                                                            
If the input is good, and the link is clicked, not only do the "allow"
routine, but do the computation.
*/
function do4(arr){
    allow4(null);
    part4Calc(arr);
}

/*                                                                            
Event handlers for input change. Either allow/fail the links.  
*/
$('#part4').live('pageinit',function(){
    decider(new Array($("#fourthValue1").val(), 
		      $("#fourthValue2").val(), 
		      $("#fourthValue3").val()),
	    allow4, fail4);
    
    // on the click, "do", rather than allow
    $("#submit4").bind('vclick', function(){
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


/* function to do the energy compuatons */
function part4Calc(arr){

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

    // fill in the results
    $('#4a').text(numpanelsf);
    $('#4b').text(wattagef);
    $('#4c').text(sunhoursf);
    $('#4d').text(energymade);
    $('#4e').text(house4);

    $('#debrief4a').text(numpanelsf);
    $('#debrief4b').text(wattagef);
    $('#debrief4c').text(sunhoursf);
    $('#debrief4d').text(energymade);
    $('#debrief4e').text(house4);
}

// if we go straight to the page, try to evaluate.
$('#results4').live('pageinit',function(){
    decider(new Array($("#fourthValue1").val(), 
		      $("#fourthValue2").val(), 
		      $("#fourthValue3").val()),
	    part4Calc, fail4);
});
