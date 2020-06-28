$(function () {
  getUserInfo();
});
var layer = layui.layer;
function getUserInfo() {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败！");
      }
      renderAvatar(res.data);
      
    },
  });
}
$(".btnLogout").on("click", function () {
    layer.confirm("确定退出", { icon: 3, title: "提示" }, function (index) {
      //do something
      // 清空本地token
      localStorage.removeItem("token");
      // 跳转页面
      location.href = "/login.html";
      layer.close(index);
    });
});
  
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $("#welcome").html("欢迎&nbsp" + name);
  if (user.user_pic !== null) {
    // 渲染图片头像
    $(".layui-nav-img").attr("src", user.user_pic).show();
    $(".text-avatar").hide();
  } else {
    // 渲染文本头像
    $(".layui-nav-img").hide();
    var first = name[0].toUpperCase();
    $(".text-avatar").html(first).show();
  }
}
