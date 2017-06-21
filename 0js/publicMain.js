/*
	strTOjson        jsonTOstr          todou        findInArr           randomF    
	Repeat1	  		 Repeat2  			Repeat3		 sum				 move
	getStyle     	 ajax        		read         jsonp
	
 */ 

function read(fn){
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",function(){
			fn && fn();
		},false);
	}else{
		document.onreadystatechange = function(){
			if(document.readyState == 'complete'){
				fn && fn();
			}
		};
	}
}
function pStrToJson(json,cbName){
	json.cb = cbName;
	var arr = [];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function jsonp(json){
	if(!jsin.url)return false;
	json = json || {};
	json.data = json.data || {};

	var fnName = 'jsonp_'+Math.random();
	fnName = fnName.replace('.','');
	window[fnName] = function(data){
		json.success && json.success(data);

		oHead.removeChild(oS);
	};
	var oS = document.createElement('script');
	var oHead = document.getElementsByTagName('head')[0];

	oHead.appendChild(oS);
	oS.src = json.url +'?'+pStrToJson(json.data,fnName);
}
function aStrToJson(json){
	json.t = Math.random();
	var arr = [];
	for(var name in json){
		arr.push(name+'='+encodeURIComponent(json[name]));
	}
	return arr.join('&');
}
function ajax(json){
	if(!json.url)return false;
	json.time = json.time || 10000;
	json.data = json.data || {};
	json.type = json.type || 'GET';
	json.catch = json.catch || true;

	if(window.XMLHttpRequest){
		var oAjax = new XMLHttpRequest();
	}else{
		var oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	}

	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+aStrToJson(json.data),json.catch);
			oAjax.send();
		break;
		case 'post':
			oAjax.open('POST',json.url,json.catch);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(aStrToJson(json.data));
		break;
	}
	json.loading && json.loading();
	var timer = setTimeout(function(){
		json.complete && json.complete();
		json.error && json.error();
		oAjax.onreadystatechange = null;
	},json.time);
	oAjax.onreadystatechange = function(){
		if(oAjax.readyState == 4){
			if(oAjax.status >=200 && oAjax.status < 300 || oAjax/status == 304){
				clearTimeout(timer);
				json.success && json.success(oAjax.responseText);
				json.complete && json.complete();
			}else{
				clearTimeout(timer);
				json.error && json.error()
				json.complete && json.complete(oAjax.status);

			}
		}
	};
}
function move(obj,json,complete){
	clearInterval(obj.timer);

	complete = complete || {};
	complete.time = complete.time || 1000;
	complete.easeing = complete.easeing || 'linear';

	var dis = {};
	var start = {};

	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}

	var count = parseInt(complete.time/30);
	var n = 0;
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(complete.easeing){
				case 'linear':
					var a = n/count;
					var cur = start[name] + dis[name]*a;
				break;
				case 'ease-in':
					var a = n/count;
					var cur = start[name] + dis[name]*a*a*a;
				break;
				case 'ease-out':
					var a = 1 - n/count;
					var cur = start[name] - dis[name]*(1-a*a*a);
				break;
			}
			if(name == 'opacity'){
				obj.style.opacity = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name] = cur + 'px';
			}
		}
		if(n == count){
			clearInterval(obj.timer);
			complete.fn && complete.fn();
		}
	},30);
}
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
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
function sum(){ // 基础求和
	var num = 0;
	for(var i = 0; i<arguments.length; i++){
		num += arguments[i]
	}
	return num
}








