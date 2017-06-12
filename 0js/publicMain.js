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


