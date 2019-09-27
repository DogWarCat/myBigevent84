var user={
	login:function(user_name,password,callback){
		$.post(URL_LIST.user_login,{
						user_name: user_name,
						password: password
					}, function(res){
						callback(res);
					});
	},
	outLogin:function(callback){
		$.post(URL_LIST.user_logout,function(res){
			console.log(res);
			callback(res);
		});
	},
	getInfo:function(callback){
		$.get(URL_LIST.user_getuser,function(res){
			callback(res);
		})
	}
}
