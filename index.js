var max_num = 11;
var res_fontsize = 60;

window.onload = function(){
	var res = document.getElementById('result');
	var exp = document.getElementById('exp');
	
	document.getElementById('bt1').onclick = function(){
		res.value = res.value + "7";
		reset_res();
	}
	document.getElementById('bt2').onclick = function(){
		res.value = res.value + "8";
		reset_res();
	}
	document.getElementById('bt3').onclick = function(){
		res.value = res.value + "9";
		reset_res();
	}
	document.getElementById('bt4').onclick = function(){
		res.value = res.value + "/";
		reset_res();
	}
	document.getElementById('bt5').onclick = function(){
		res.value = res.value + "4";
		reset_res();
	}
	document.getElementById('bt6').onclick = function(){
		res.value = res.value + "5";
		reset_res();
	}
	document.getElementById('bt7').onclick = function(){
		res.value = res.value + "6";
		reset_res();
	}
	document.getElementById('bt8').onclick = function(){
		res.value = res.value + "*";
		reset_res();
	}
	document.getElementById('bt9').onclick = function(){
		res.value = res.value + "1";
		reset_res();
	}
	document.getElementById('bt10').onclick = function(){
		res.value = res.value + "2";
		reset_res();
	}
	document.getElementById('bt11').onclick = function(){
		res.value = res.value + "3";
		reset_res();
	}
	document.getElementById('bt12').onclick = function(){
		res.value = res.value + "-";
		reset_res();
	}
	document.getElementById('bt13').onclick = function(){
		res.value = res.value + "0";
		reset_res();
	}
	document.getElementById('bt14').onclick = function(){
		res.value = res.value + ".";
		reset_res();
	}
	document.getElementById('bt15').onclick = function(){
		res.value = res.value.substr(0, res.value.length - 1);
		reset_res();
	}
	document.getElementById('bt16').onclick = function(){
		res.value = res.value + "+";
		reset_res();
	}
	document.getElementById('bt17').onclick = function(){
		res.value = res.value + "(";
		reset_res();
	}
	document.getElementById('bt18').onclick = function(){
		res.value = res.value + ")";
		reset_res();
	}
	document.getElementById('bt19').onclick = function(){
		res.value = "";
		document.getElementById('exp').innerHTML = "";
	}
	document.getElementById('bt20').onclick = function(){
		var classVal = exp.getAttribute('class');
		classVal = classVal.replace("append","");
		exp.setAttribute("class",classVal );
		try{
			exp.innerHTML = res.value + "=";	
			classVal = classVal.concat(" append");
			exp.setAttribute("class",classVal );	
			//res.value = eval(res.value);
			/*
			if(res.value.length > max_num){
				if(res_fontsize == 60){res.style.fontSize = res_fontsize/2 +"px";max_num = 18;}
				else{res.style.fontSize = "15px";max_num = 32;}

			}
			*/
			
			res.value = calculate(toRpolish(res.value));
		}catch(e){
			alert('Invalid expression!');
			res.value = "";
			exp.innerHTML = "";
		}
	}
	
}


function reset_res(){
	var classVal = exp.getAttribute('class');
	classVal = classVal.replace("append","");
	exp.setAttribute("class",classVal );
}

function toRpolish(expression){
	var obj = {'+': 0, '-': 0, '*': 1, '/': 1, '(': -1};
	var arr = [];
	var str = '';
	var copy = '';
	if(expression[0] == '+' || expression[0] == '-'){
		expression = 0 + expression;
	}
	for(var i = 0; i < expression.length; i++){
		copy = copy + expression[i];
		if(expression[i] == '(' && expression[i+1].match(/\+|\-/)){
			copy = copy + '0';
		}
	}
	console.log(copy)
	expression = copy;


	var regex = /(\d+(\.)?\d+)||(\(|\)|\+|\-|\*|\/)+/;
	console.log(expression.split(regex));

	var temp_arr = expression.split(regex);
	var new_arr = [];
	for (var i = 0; i < temp_arr.length; i++) {
		if(temp_arr[i] == undefined || temp_arr[i] == "."){
			continue;
		}
		new_arr.push(temp_arr[i]);
	}

	console.log(new_arr);

	for (var i = 0; i < expression.length; i++) {
	    var curChar = expression[i];
	    if (curChar == ' ') {
	        continue;
	    }
	    var num = /^\d$/.test(curChar);
	    if (num) {
	        str = str + curChar + ' ';
	        continue;
	    } else if (curChar == '(') {
	        arr.push(curChar);
	    } else if (curChar == ')') {
	        var len = arr.length;
	        for (var j = 0; j < len; j++) {
	            var pop = arr.pop();
	            if (pop != '(') {
	                str = str + pop + ' ';
	            } else {
	                break;
	            }
	        }
	    } else {
	        if (arr.length > 0) {
	            var stack_top = arr[arr.length - 1];
	            if (obj[curChar] > obj[stack_top]) {
	                arr.push(curChar);
	            } else {
	                var pop = arr.pop();
	                arr.push(curChar);
	                str = str + pop + ' ';
	            }
	        } else {
	            arr.push(curChar);
	        }
	    }
	}
	for(var i=arr.length-1;i>=0;i--){
	    str = str + arr[i] + ' ';
	}
	console.log(Trim(str).split(' '))
	return Trim(str).split(' ');
}



function Trim(str){ 
     return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

function calculate(RPolishArray){
    var result = 0;
    var tempArray = new Array(100);
    var tempNum = -1;
    for(i = 0;i < RPolishArray.length;i++){
        if(RPolishArray[i].match(/\d/)){
            tempNum++;
            tempArray[tempNum] = RPolishArray[i];
        }else{
            switch(RPolishArray[i]){
                case '+':
                    result = (tempArray[tempNum-1] *1) + (tempArray[tempNum] * 1);
                    tempNum--;
                    tempArray[tempNum] = result;
                    break;
                case '-':
                    result = (tempArray[tempNum-1] *1) - (tempArray[tempNum] * 1);
                    tempNum--;
                    tempArray[tempNum] = result;
                    break;
                case '*':
                    result = (tempArray[tempNum-1] *1) * (tempArray[tempNum] * 1);
                    tempNum--;
                    tempArray[tempNum] = result;
                    break;
                case '/':
                    result = (tempArray[tempNum-1] *1) / (tempArray[tempNum] * 1);
                    tempNum--;
                    tempArray[tempNum] = result;
                    break;
            }
        }
    }
    result = tempArray[tempNum];    
    return result;  
}