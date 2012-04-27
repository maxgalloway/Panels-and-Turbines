/**                                                                           
These are the functions specific to part five. First are the functions
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
function allow5(arr){
    $('#submit5').attr('data-transition', 'slide');
    $('#submit5').attr('data-rel', 'page');
    $('#submit5').attr('href', '#results5');
}

/*                                                                            
If the user input is bad, change the link tarket to the error page,
and make it pop up when clicked.  
*/
function fail5(arr){
    $('#submit5').attr('data-transition', 'pop');
    $('#submit5').attr('data-rel', 'dialog');
    $('#submit5').attr('href', '../errors/error2.html');
}

/*                                                                            
If the input is good, and the link is clicked, not only do the "allow"
routine, but do the computation.  
*/
function do5(arr){
    allow5(null);
    part5Calc(arr);
}

/*Event handlers for input change. Either allow/fail the links.*/
$('#part5').live('pageinit',function(){


    // for click, not only "allow" but "do"
    $("#submit5").bind('vclick', function(){
	decider(new Array($("#value5a").val(), 
			  $("#value5b").val(), 
			  $("#value5c").val()),
		allow5, fail5);
    });
  
    $(".part5").keyup(function(){
	decider(new Array($("#value5a").val(), 
			  $("#value5b").val(), 
			  $("#value5c").val()),
		allow5, fail5);
    });

    $(".part5").change(function(){
	decider(new Array($("#value5a").val(), 
			  $("#value5b").val(), 
			  $("#value5c").val()),
		allow5, fail5);
    });

    decider(new Array($("#value5a").val(), 
		      $("#value5b").val(), 
		      $("#value5c").val()),
	    allow5, fail5);

});

/* do the energy computation*/
function part5Calc(arr){
    var numpanelsb = arr[0];
    var wattageb = arr[1];
    var sunhoursb = arr[2];

    var wattagefb = format(wattageb, 0);
    var numpanelsfb = format(numpanelsb, 0);
    var sunhoursfb = format(sunhoursb, 2);
    var energymadeb = format(wattageb * sunhoursb * numpanelsb * 365 * 24, 0);
    var house5 = format((wattageb * sunhoursb * numpanelsb * 365 * 24) 
			 / avg, 1);
    
    // fill in the results.
    $('#5a').text(numpanelsfb);
    $('#5b').text(wattagefb);
    $('#5c').text(sunhoursfb);
    $('#5d').text(energymadeb);
    $('#5e').text(house5);
    
    $('#debrief5a').text(numpanelsfb)
    $('#debrief5b').text(wattageb)
    $('#debrief5c').text(sunhoursb)
    $('#debrief5d').text(energymadeb)
    $('#debrief5e').text(house5)
}

// if we go straigt to the page, try to evaluate.
$('#results5').live('pageinit',function(){
    decider(new Array($("#value5a").val(), 
		      $("#value5b").val(), 
		      $("#value5c").val()),
	    part5Calc, fail5);
});