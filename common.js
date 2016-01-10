/**
   This javascript file has functions that are common to all parts of
   the application

This file is part of Panels and Turbines
Copyright (C) 2016  Max Galloway webmaster@pwipw.com

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

