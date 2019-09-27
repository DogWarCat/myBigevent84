//获取url参数id
		function formatId(){
			var search=window.location.search;
			console.log(search);
			var obj={};
			search=search.replace('?','');
			var everyArr=search.split('&');
			everyArr.forEach(function(item,i){
				var itemArr=item.split('=');
				obj[itemArr[0]]=itemArr[1];
			});
			return obj['id'];
		}