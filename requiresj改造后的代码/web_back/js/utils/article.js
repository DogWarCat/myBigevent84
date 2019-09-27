define(['config'], function(URLIST) {
  var article = {
    /**
     *
     * @param {*} paramObj {type:1,state:'草稿'}
     * @param {*} callBack
     */
    show: function(paramObj, callBack) {
      $.get(URLIST.article_show, paramObj, function(res) {
        callBack(res);
      });
    },

    del: function(id, callBack) {
      $.get(URLIST.article_delete, { id: id }, function(res) {
        callBack(res);
      });
    },
    add: function(fd, callBack) {
      $.ajax({
        type: 'post',
        url: URLIST.article_add,
        data: fd,
        processData: false, // 不要去处理formData的数据
        contentType: false, // 不要额外设置请求头，formData有自带的请求头
        success: function(res) {
          callBack(res);
        }
      });
    },
    edit: function(fd, callBack) {
      $.ajax({
        type: 'post',
        url: URLIST.article_edit,
        data: fd,
        processData: false, // 不要去处理formData的数据
        contentType: false, // 不要额外设置请求头，formData有自带的请求头
        success: function(res) {
          callBack(res);
        }
      });
    }
  };
  return article;
});
