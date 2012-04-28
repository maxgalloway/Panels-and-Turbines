/**                                                                           
These are the functions specific to part two. First are the functions
that either allow or disallow continuation to the result page,
depending on user input. Then are the handlers for user input. Last is
part that actually does the computation and fills in the results.

This file is part of Panels and Turbines
Copyright (C) 2012  Peter Schwartzman and Max Galloway-Carson

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

email me at: maxvgc@gmail.com
*/

/*                                                                            
If the user input is good, change the link target to the result page,
and let it transition in a normal way.
*/
function allow2(arr){
    $('#submit2').attr('data-transition', 'slide');
    $('#submit2').attr('data-rel', 'page');
    $('#submit2').attr('href', '#result2');
}

/*                                                                            
If the user input is bad, change the link tarket to the error page,
and make it pop up when clicked.
*/
function fail2(arr){
    $('#submit2').attr('data-transition', 'pop');
    $('#submit2').attr('data-rel', 'dialog');
    $('#submit2').attr('href', '../errors/error2.html');
}  

/*                                                                            
If the input is good, and the link is clicked, not only do the "allow"
routine, but do the computation.  
*/
function do2(arr){
    allow2(null);
    part2Calc(arr);
}

/*                                                                            
Event handlers for input change. Either allow/fail the links.                 
*/
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

    // in case others fail, bind to click, but "do" rather than "allow"
    $('#submit2').bind('vclick',function(){
	decider(new Array($('#secondValue1').val(), 
			  $('#secondValue2').val()), do2, fail2);
    });
  
});

/*
Function to actually do the energy computation.
*/
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

// if we go straight to the page, try to evaluate.
$('#result2').live('pageinit',function(){

    decider(new Array($('#secondValue1').val(),
		      $('#secondValue2').val()),part2Calc,fail2);
});
