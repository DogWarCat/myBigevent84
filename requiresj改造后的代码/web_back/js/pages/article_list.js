require.config({
  paths: {
    jquery: '../lib/jquery-1.12.4.min',
    template: '../lib/template-web',
    twbsPagination: '../lib/jquery.twbsPagination.min',
    bootstrap: '../bootstrap/js/bootstrap.min',
    category: '../utils/category',
    article: '../utils/article',
    config: '../utils/config'
  }
});

require(['jquery', 'template', 'bootstrap', 'category', 'article', 'twbsPagination'], function($, template, bootstrap, category, article) {
  // 设置左侧菜单
  $('#release_btn').click(function() {
    window.parent.setMenu(1, 1);
  });

  $(function() {
    var currentPage = 1, // 当前显示第几页
      currentType = '', //文章的类型编号
      currentState = '', //文章的状态
      currentTotalPage = '';

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

    // 筛选
    $('#btnSearch').click(function() {
      // 更新 用户选择的 类型 和 状态
      currentType = $('#selCategory').val();
      currentState = $('#selStatus').val();

      // 重置起始页
      currentPage = 1;
      getAndShow();
    });

    // 删除操作
    $('#articleContent').on('click', '.del', function() {
      //
      //   通过自定义属性去拿到id
      //   console.log(this);
      //   var id = $(this).attr('data-id');
      //   var id1 = $(this).data();
      // if (window.confirm('你确定要删除吗？')) {
      //   var id = $(this).data('id');
      //   article.del(id, function(res) {
      //     if (res.code === 200) {
      //       // 删除成功，重新获取数据
      //       getAndShow();
      //     } else {
      //       // todo: 模态框去提示
      //       alert(res.msg);
      //     }
      //   });
      // }

      // 尽早退出
      if (!window.confirm('你确定要删除吗？')) {
        return;
      }

      var id = $(this).data('id');
      article.del(id, function(res) {
        if (res.code === 200) {
          // 删除成功，重新获取数据
          getAndShow();
        } else {
          // todo: 模态框去提示
          alert(res.msg);
        }
      });
    });
    // 查询文章
    function getAndShow() {
      article.show({ type: currentType, state: currentState, page: currentPage }, function(res) {
        if (res.code === 200) {
          // 1. 去渲染页面
          var htmlStr = template('tmpArticle', res);
          //   console.log(htmlStr);
          $('#articleContent').html(htmlStr);

          // 由于分页插件对于totalPages的变化不敏感，所以我们这里要特殊处理
          // 如果总页数变化了，就销毁

          console.log('当前的总页码：' + currentTotalPage + ',本次请求的总页码' + res.totalPage);
          if (currentTotalPage != res.totalPage) {
            currentTotalPage = res.totalPage;
            $('.pagination').twbsPagination('destroy');
          }

          // 2. 生成分页
          $('.pagination').twbsPagination({
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            totalPages: res.totalPage, //设置总页数
            visiblePages: 7,
            initiateStartPageClick: false, //初始化不要点击页码
            onPageClick: function(event, page) {
              // page就是当前被选中的页码
              // 更新变量
              currentPage = page;
              // 按page的值去 重新查询
              getAndShow();
            }
          });
        }
      });
    }
  });
});
