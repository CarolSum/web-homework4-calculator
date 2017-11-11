function getResult(){
	var res = document.getElementById('result');
	var exp = document.getElementById('exp');
	var classVal = exp.getAttribute('class');
	if (res.value != "") {
		try{
			exp.innerHTML = res.value + "=";	
			classVal = classVal.concat(" append");
			exp.setAttribute("class",classVal );	
			res.value = calculate(toRpolish(res.value));
			if(res.value == "NaN") throw e;
		}catch(e){
			alert('Invalid expression!');
			res.value = "";
			exp.innerHTML = "";
		}
	}
	
}

function add_oper(oper){
	var res = document.getElementById('result');
	if(res.value == "0" && (typeof oper == 'number') ) res.value = oper;
	else res.value = res.value + oper;
	reset_res();
}

function reset_res(){
	var classVal = exp.getAttribute('class');
	classVal = classVal.replace("append","");
	exp.setAttribute("class",classVal );
}

function backward(){
	var res = document.getElementById('result');
	res.value = res.value.substr(0, res.value.length - 1);
	reset_res();
}

function clearup(){
	document.getElementById('result').value = "0";
	document.getElementById('exp').innerHTML = "";
}

function preprocess(expression){
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
		if(temp_arr[i] == undefined || temp_arr[i] == "." || temp_arr[i] == ""){
			continue;
		}
		new_arr.push(temp_arr[i]);
	}
	console.log(new_arr);
	return new_arr;
}

function toRpolish(expression){
	var obj = {'+': 0, '-': 0, '*': 1, '/': 1, '(': -1};
	var arr = [];
	var str = '';
	var pro_exp = preprocess(expression);

	for (var i = 0; i < pro_exp.length; i++) {
	    var curChar = pro_exp[i];
	    if (curChar == " ") {
	        continue;
	    }
	    var num = /(\d+\.\d+)/.test(curChar) || /(\d+)/.test(curChar);
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
    if (tempNum > 0) {throw e;}
    console.log(String(result))
    if(String(result).indexOf(".") != -1 && String(result).length-1-String(result).indexOf(".") > 6) return result.toFixed(6);
    return result;  
}