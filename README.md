#gomall-fe
去购物，电商网站
## 【Git 篇】
## git 操作
```javascript
## 分支
git checkout [-m] [[-b]--orphan] <new_branch>] [<start_point>]
创建和切换到新的分支（<new_branch>），新的分支从<start_point>指定的提交开始创建。
git checkout -b gomall_v1.0
git branch
## 标签
git merge origin master
git tag tag-dev-initial
git push origin tag-dev-initial
```
##  Git SSH Key 生成步骤
[参考](http://blog.csdn.net/hustpzb/article/details/8230454/)
### 一 、
设置Git的user name和email：
$ git config --global user.name "xuhaiyan"
$ git config --global user.email "haiyan.xu.vip@gmail.com"

### 二、生成SSH密钥过程：
1. 查看是否已经有了ssh密钥：cd ~/.ssh
如果没有密钥则不会有此文件夹，有则备份删除
2. 生存密钥：
$ ssh-keygen -t rsa -C “haiyan.xu.vip@gmail.com”
按3个回车，密码为空。

Your identification has been saved in /home/tekkub/.ssh/id_rsa.
Your public key has been saved in /home/tekkub/.ssh/id_rsa.pub.
The key fingerprint is:
………………

最后得到了两个文件：id_rsa和id_rsa.pub

`cat ~/ .ssh/`

3. 添加密钥到ssh：ssh-add 文件名
需要之前输入密码。 

4. 在github上添加ssh密钥，这要添加的是“id_rsa.pub”里面的公钥。
打开https://github.com/ ，登陆，然后添加ssh。

5. 测试：ssh git@github.com
The authenticity of host ‘github.com (207.97.227.239)’ can’t be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added ‘github.com,207.97.227.239′ (RSA) to the list of known hosts.
ERROR: Hi tekkub! You’ve successfully authenticated, but GitHub does not provide shell access
Connection to github.com closed.

[Git学习笔记](http://www.cnblogs.com/craftor/archive/2012/11/04/2754135.html)

## 【Webpack 篇】
`npm install webpack -g`

`npm install webpack@1.15.0 --save-dev`

`webpack ./src/page/index/index.js ./dist/app.js`

`npm install css-loader style-loader --save-dev`

### 运行 webpack

## webpack.config.js
entry:     js的入口文件
externals: 外部依赖的声明
output:    目标文件
resolve:   配置别名
module:    各种文件，各种loader
plugins:   插件
```js
1. 初始构建js打包
var config = {
    entry:{
        'common': ['./src/page/common/index.js'],//后续添加
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js'],
    } ,
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
};
module.exports = config;

2. 加载Jquery
    output: {
        ...省略
    },
    externals: {
        'jquery': 'window.jQuery'
    },

3. webpack提取公共模块
var webpack = require('webpack');
    ...省略
    plugins: [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', //存储的文件名
            filename: 'js/base.js'
        })
    ]
4. common通用文件
    entry:{
        'common': ['./src/page/common/index.js'],
...省略
        plugins: [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', //这里名称对应
5. 处理样式
*先安装依赖*
`npm install css-loader style-loader --save-dev`
*后续添加*
    externals: {
        'jquery': 'window.jQuery'
    },
    module: {
        loaders:[
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
6. webpack样式分离打包【css单独打包】
`npm install extract-text-webpack-plugin --save-dev`
## 直接安装最新版3.0 会报错 故选择1.0版
`npm install extract-text-webpack-plugin@1.0.1 --save-dev`
    plugins: [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            ...省略
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin('css/[name].css'),
    此外，loader更换
        module: {
        loaders:[
            //替换 { test: /\.css$/, loader: "style-loader!css-loader" }
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") }
        ]
    },
7. webpack bundle 的 HTML 文件
`npm install html-webpack-plugin --save-dev`

`npm install html-loader --save-dev`

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name){
    return{
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common',name] //common通用模块，name当前模块
    };
};
    plugins: [
        ...省略
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
8. 图片文字等添加
`npm install url-loader --save-dev`
`npm install file-loader --save-dev`
    module: {
        loaders:[
            ...省略
            { 
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]' // [ext]扩展名
            }
        ]
    },
```
## 【 webpack-dev-server 】
## 安装新版本编译会报错，此处使用1.16.5；此外，webpack-dev-server需要全局安装，否则无法找到
`npm install webpack-dev-server@1.16.5 --save-dev`
配置： webpack-dev-server/client?http://localhost:1234
## 默认端口8080，如果占用，添加一下新端口
`webpack-dev-server --port 1234`
`webpack-dev-server --inline --port 1234`
## 为了简便，可以修改package.json里的scripts
```javascript
    "dev":"WEBPACK_ENV=dev webpack-dev-server --inline --port 1234",
    "dev_win":"set WEBPACK_ENV=dev && webpack-dev-server --inline --port 1234",
    "dist":"WEBPACK_ENV=online webpack -p",
    "dist_win":"set WEBPACK_ENV=online && webpack -p"
```
## 修改保存后，直接运行npm run dev_win (windows系统)启动
## 【项目开发篇】
1. 通用js工具的封装
util 》 mm.js (网络请求工具、获取服务器地址)
2. Fiddler 4 （跨域处理）
安装使用：
【规则制定】
EXACT:http://localhost:1234/product/list.do?keyword=1
http://happymmall.com/product/list.do?keyword=1
3. 获取URL的参数
```js
    //获取URL的参数
    getUrlParam: function(name){
        var reg = new RegExp('(^|&' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
window.location.search方法是截取当前url中“?”后面的字符串， 
例如：product/list.do?keyword=1,截取后的字符串就是keyword=1    
```
4. 渲染Html方法
`npm install hogan --save` 有误
直接 `npm install hogan.js --save` 
```js
var Hogan = require('hogan'); (X)
var Hogan = require('hogan.js'); (√)
```
5. 提示信息
```js
    // 成功提示
    successTips: function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips: function(msg){
        alert(msg || '哪里出了问题~');
    },
```
6. 字段验证
```js
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
```
7. 返回首页
```js
    goHome: function(){
        window.location.href = './index.html';
    }
```
8. 添加样式
`npm install font-awesome --save`
## 【备注】
### 关于html-webpack-plugin里ejs-loader默认加载的问题
[html-webpack-plugin详解](http://www.cnblogs.com/wonyun/p/6030090.html)
[webpack 插件： html-webpack-plugin](http://www.cnblogs.com/haogj/p/5160821.html)

## 相关页面构建
考虑到兼容性问题，项目构建没有采用ES6操作。
js及css采用require调用，HTML模板采用默认ejs。
例如：<%= require('html-loader!./layout/head.html') %>

到此，项目环境已经构建完成。
如果要启动项目
首先，npm install；然后，webpack生成dist文件夹及相关打包文件
最后，npm run dev_win 项目启动
此处，默认本地网址：http://localhost:1234/dist/view