require.config({
  paths: {
    jquery: '../lib/jquery-1.12.4.min',
    template: '../lib/template-web',
    bootstrap: '../bootstrap/js/bootstrap.min',
    category: '../utils/category',
    user: '../utils/user',
    config: '../utils/config'
  }
});

require(['jquery', 'template', 'bootstrap', 'user'], function($, template, bootstrap, user) {
  var $level01 = $('.level01');
  var $subli = $('.level02 li');
  $level01.click(function() {
    $level01.not($(this)).removeClass('active');
    $(this).addClass('active');

    if (
      $(this)
        .next()
        .hasClass('level02')
    ) {
      $(this)
        .next()
        .slideToggle();
      $(this)
        .find('b')
        .toggleClass('rotate0');
    } else {
      $subli.removeClass('active');
    }
  });

  $subli.click(function() {
    $subli.not($(this)).removeClass('active');
    $(this).addClass('active');

    if (
      !$(this)
        .parent()
        .prev()
        .hasClass('active')
    ) {
      $level01.removeClass('active');
      $(this)
        .parent()
        .prev()
        .addClass('active');
    }
  });

  function resizeFrame() {
    var frame_w = $('#main_body').outerWidth();
    var frame_h = $('#main_body').outerHeight();
    $('#main_frame').css({ width: frame_w, height: frame_h });
  }

  resizeFrame();

  $(window).resize(function() {
    resizeFrame();
  });

  function setMenu(m, n) {
    $level01
      .eq(m)
      .addClass('active')
      .siblings()
      .not('.level02')
      .removeClass('active');
    if (m != 1) {
      $('.level02').slideUp();
    } else {
      $('.level02').slideDown();
      $('.level02')
        .children()
        .eq(n)
        .addClass('active')
        .siblings()
        .removeClass('active');
    }
  }

  $(function() {
    user.getInfo(function(res) {
      console.log(res);
      if (res.code === 200) {
        $('#userName').text(res.data.nickname);
        $('#userImg').prop('src', res.data.user_pic);
      }
    });
  });

  $('#btnLogout').click(function() {
    //用户 退出
    $('.modal').modal('show');
  });

  $('#btnDoLogout').click(function() {
    user.logout(function(res) {
      if (res.code === 200) {
        window.location.href = './login.html';
      }
    });
  });

  require.config({
    paths: {
      jquery: '../lib/jquery-1.12.4.min',
      template: '../lib/template-web',
      bootstrap: '../bootstrap/js/bootstrap.min',
      category: '../utils/category',
      config: '../utils/config'
    }
  });
});
