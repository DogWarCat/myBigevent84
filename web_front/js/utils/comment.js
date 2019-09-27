var comment={
	search:function(id,callBack){
		$.get(URL_LIST.get_comments,{id:id},function(res){
			callBack(res);
		})
	},
	add:function(param,callBack){
//		$.ajax({
//			type:"post",
//			url:"URL_LIST.post_comment",
//			async:true,
//			data:param,
//			processData:false,
//			contentType:false,
//			success:function(res){
//			callBack(res);
//		}
//		});
		$.post(URL_LIST.post_comment,param,function(res){
			callBack(res);
		});
		
	}
}
