require.config({
  paths: {
    jquery: '../lib/jquery-1.12.4.min',
    template: '../lib/template-web',
    bootstrap: '../bootstrap/js/bootstrap.min',
    category: '../utils/category',
    article: '../utils/article',
    config: '../utils/config',
    longtime: '../utils/longtime'
  }
});

require(['jquery', 'template', 'bootstrap', 'category', 'article', 'longtime'], function($, template, bootstrap, category, article) {
  // 设置左侧菜单
  $('#release_btn').click(function() {
    window.parent.setMenu(1, 1);
  });

  $(function() {
    var id = -1;
    id = window.location.search.substr(4);

    // 获取分类的信息
    category.show(function(res) {
      if (res.code === 200) {
        // 数据渲染
        var htmlStr = template('tmpCategory', res);
        // console.log(htmlStr);
        $('#selCategory').html(htmlStr);
      }
    });

    getAndShow();

    $('#btnSave').click(function() {
      var fd = new FormData($('#myform')[0]);
      fd.set('content', tinyMCE.activeEditor.getContent());
      fd.append('id', id);
      article.edit(fd, function(res) {
        console.log(res);
      });
    });

    // 查询文章
    function getAndShow() {
      article.show({ id: id }, function(res) {
        if (res.code === 200) {
          // 显示原文章内容
          $('#article_title').val(res.data.title);
          // $('#rich_content').val(res.data.content);
          $('#dateinput').val(res.data.date);
          $('#selCategory').val(res.data.type);

          tinyMCE.activeEditor.setContent(res.data.content);
        }
      });
    }
  });
});
