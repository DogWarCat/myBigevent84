var category={
   show:function(callback){
   	//设置ajax异步
	//$.ajaxSettings.async = false;
        $.get(URL_LIST.category_search,function(res){
            callback(res);
        });
	//$.ajaxSettings.async = true;
   },
   addAticle:function(name,slug,callback){
   	$.post(URL_LIST.category_add,{
   		name:name,
   		slug:slug
   	},function(res){
   		callback(res);
   	})
   },
   editAticle:function(id,name,slug,callback){
   	$.post(URL_LIST.category_edit,{
   		id:id,
   		name:name,
   		slug:slug
   	},function(res){
   		callback(res);
   	});
   },
   delArticle:function(id,callback){
   		$.post(URL_LIST.category_delete,{id:id},function(res){
   			callback(res);
   		});
   }
}