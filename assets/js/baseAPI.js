$(function () {
    $.ajaxPrefilter(function (options) {
        options.url =  'http://ajax.frontend.itheima.net' + options.url 

        // 统一为有权限接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers= {
             Authorization: localStorage.getItem('token') || '' 
        }
        }
        

        options.complete = function (res) {
             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失 败！'){
                // 强制清空token
                localStorage.removeItem('token')
                // 强制跳转到登录页面
                location.href = '/login.html' 
            }
        }
    })



    
})