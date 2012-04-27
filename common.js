/**
   This javascript file has functions that are common to all parts of
   the application

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

// this constant denotes the number of kWh used by an 
// average american household
avg = 10900;

/* 
This function takes a number and returns a string with commas every
third digit.  
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

/*
This function takes two numbers: a number to be rounded, and the
number of decimals to which it should be rounded. Returns the rounded
number.
*/
function roundN(num, decimals){
    var tens = Math.pow(10, decimals);
    return (Math.round(num * tens)/tens);
}

/*
This function combines the rounding and comma adding functions. It
takes the same parameters as roundN, and returns a String
representation of the number.
*/
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
	
	// try to convert the String to a number.
	var x = Number(y[i]);
	
	// if it cannot be read as number, do the fail function and exit
	if(isNaN(x)){
	    g(y);
	    return;
	}
	else{
	    // add the value to the new array
	    retArray.push(x);
	}
    }
    
    // all are valid, so do the success function
    f(retArray);
    return;
}

