define(['config'], function(URLIST) {
  var user = {
    /**
     * 用户登陆
     * @param {*} userName 用户名
     * @param {*} password 密码
     * @param {*} callBack 回调函数
     */
    login: function(userName, password, callBack) {
      $.post(
        URLIST.user_login,
        {
          user_name: userName,
          password: password
        },
        function(res) {
          // res就是响应体。是由$.post这个方法决定的。
          callBack(res);
        }
      );
    },
    /**
     * 用户退出
     * @param {*} callBack
     */
    logout: function(callBack) {
      $.post(URLIST.user_logout, function(res) {
        callBack(res);
      });
    },

    getInfo: function(callBack) {
      $.get(URLIST.user_getInfo, function(res) {
        callBack(res);
      });
    },

    editInfo: function(fd, callBack) {
      $.ajax({
        type: 'post',
        data: fd,
        url: URLIST.user_editInfo,
        contentType: false,
        processData: false,
        success: function(res) {
          callBack(res);
        }
      });
    }
  };
  return user;
});
