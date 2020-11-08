


### 中国联合网络通信集团有限公司
        http://www.chinaunicombidding.cn/jsp/cnceb/web/info1/detailNotice.jsp?id=4404703300000008133
        
        http://www.chinaunicombidding.cn/jsp/cnceb/web/index_parent.jsp
#### 问题
    ret = _$kD.call(_$fA, _$No);
    console.log('ret', ret);
    
    _$No    代码格式化有问题
    
    c2da524.js
        js文件可通过迅雷下载， 复制进来，不需要打开，
            不然 ret = _$kD.call(_$fA, _$No); _$No 内容格式化异常
    
    再一步步debugger 调试
    
    jsdom 调试不行， 可能有指纹参数不行 不能debug 调试
        jsdom_test  测试
    先用index_update 看有哪些指纹， 设置好
    
    本地调试代码    index_update.html
    
    没有检测浏览器指纹
        主要
            content， ret -> js 代码， 
            取消定时器setInterval
                1、代码替换  2、重写setInterval方法