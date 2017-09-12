' use strict ';
var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
};
var _mm = {
    request:function(param){
        var _this = this;
        $.ajax({
            type:param.method || 'get',
            url:param.url || '',
            dataType:param.type || 'json',
            data:param.data || '',
            //请求成功
            success:function(res){
                if(res.status === 0){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登陆
                else if(res.status === 10){
                    _this.doLoginin();
                }
                //请求数据错误
                else if(res.status === 1){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error:function(err){
                typeof param.error === 'function' && param.error(err.statusText);                
            }
        });
    },
    // 获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    //获取URL的参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染Html模板
    renderHtml: function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    // 成功提示
    successTips: function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips: function(msg){
        alert(msg || '哪里出了问题~');
    },
    // 字段验证
    validate: function(value,type){
        var values = $.trim(value);
        //非空验证
        if('require' === type){
            return !!values;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(values);
        }
        // 邮箱验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(values);
        }
    },
    doLoginin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome: function(){
        window.location.href = './index.html';
    }
};

module.exports = _mm;