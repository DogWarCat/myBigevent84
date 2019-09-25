var article={
    show:function(param,callBack){
        $.get(URL_LIST.article_search,param,function(res){
            callBack(res);
        });
    },
    delete:function(id,callBack){
    	$.get(URL_LIST.article_delete,{id:id},function(res){
    		callBack(res);
    	});
    },
	publish:function(param,callBack){
		$.ajax({
			type:"post",
			url:URL_LIST.article_publish,
			async:true,
			contentType:false,
			processData:false,
			data:param,
			success:function(res){
				callBack(res);
			}
		});
		}
    
}