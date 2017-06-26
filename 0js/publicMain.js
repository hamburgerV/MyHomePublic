function strTOjson(str){ // 转json
	var arr = str.split('&');
	var json = {};
	for(var i = 0;i<arr.length; i++){
		json[arr[i].split(':')[0]] = arr[i].split(':')[1];
	}
	return json;
}
function jsonTOstr(json){ // 转str
	var arr = [];
	for(var name in json){
		arr.push(name+':'+json[name]);
	}
	return arr.join('&');
}
function todou(n){ // 补零
	return n > 10 ? '' + n : '0' + n; 
}
function findInArr(n,arr){
	for(var i = 0; i<arr.length; i++){
		if(n == arr[i]){
			return true;
		}
	}
	return false;
}
function randomF(m,n){
	return parseInt((Math.random()*(m-n)+n));
}
function Repeat1(arr){  // 数组去重1 限制是可以排序的数组
	arr.sort();
	for(var i = 0; i<arr.length; i++){
		if(arr[i] == arr[i+1]){
			arr.splice(i,1);
			i--
		}
	}
	return arr
}
function Repeat2(arr){ // 数组去重2 json
	var json = {};
	var arr1 = [];
	for(var i = 0; i<arr.length; i++){
		if(!json[arr[i]]){
			arr1.push(arr[i]);
		}
	}
	return arr1
}
function Repeat3(arr){ // 数组去重3 利用其他方法
	var arr1 = [];
	for(var i = 0; i<arr.length; i++){
		if(findInArr(arr[i],arr1) == false){
			arr1.push(arr[i])
		}
	}
	return arr1
}
function sum(){
	var num = 0;
	for(var i = 0; i<arguments.length; i++){
		num += arguments[i]
	}
	return num
}
function getByClass(oP,oC){
	if(oP.getElementsByClassName){
		return oP.getElementsByClassName(oC);
	}else{
		var aEle = oP.getElementsByTagName('*');
		var arr = [];
		for(var i = 0; i<aEle.length; i++){
			var tmp = aEle[i].className.split(' ');
			if(findInArr(oC,tmp)){
				arr.push(aEle[i])
			}
		}
		return arr
	}
}







