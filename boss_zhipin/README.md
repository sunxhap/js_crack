

#### boss直聘
    https://www.zhipin.com/job_detail/?query=java&city=101280600&industry=&position=
    
#### js逆向 ob混淆
    当前目录安装  npm install @babel/core -save   
    
    1、 代码到本地 调试
    
### js 替换注意    

    ABC[Cu[b('0x209')]]['t'] = new Date()[b('0x8f')]() - CH;
    
    function ABC() {
        var Cq = {
            'QoLmS': '_$1',
            'yyZNn': '_$0'
        };
        this[Cq[b('0x1ff')]] = [[0x1, 0x1, 0x0, 0x1, 0x0], [0x1, 0x1, 0x1, 0x0, 0x0], [0x1, 0x0, 0x0, 0x1, 0x1], [0x0, 0x1, 0x0, 0x1, 0x1]];
        this[Cq[b('0x200')]] = b('0x201');
        
        this['prototype'] = {'t': null}         // todo
    }
    
### 问题点
    检测环境
    ast_after_t.js
    1、
        function bz(cr, cs) {
    
    2、
        
    
    
    1、
        function Nr(Ns, Nt) 

    源代码生成的cookie 无用， ast转换后生成的cookie 可用
    
    环境检测 模拟环境不对，生成cookie 不可用
    
### 注意点
    1、 检测浏览器各个属性
        例如 outerHeight: 824,
              innerHeight: 150,
              outerWidth: 1536,
              innerWidth: 0,
        设置成随机值
     
     environment_old  原始能过环境
     environment_full 基于 尽量不全环境
     
    注意 
    1、location  各个网站不同
    2、参数设置随机值
    
    相同ip下 调用接口 有时可以有时不可以
    
    3\

#### record
    toDataURL
        var J4 = IZ["toDataURL"]()["replace"]("data:image/png;base64,", "");
        361c8fe2
    
    不能debugger  有检测逻辑
        多次之后封ip
    
    时间 + 浏览器指纹
    
    可能问题点
        2、 一个ip 第一次生成cookie 请求不需要其他cookie，
                        后面请求需带上
                        
        3、单独的js 检测浏览器指纹逻辑， 代码检测逻辑相似
                   所有指纹核对设置随机值
               cavas 图片？
        4、仔细比对自己代码的 值 和在浏览器执行结果

            
        随机
            1、时间 生成cookie时间
                   node 生成cookie时间 大于浏览器时间，
                   但是用浏览器执行 时间短 前几次可以后面的又不行了
            2、图片 toDataURL
                    随机值 43aaa872， 361c8fe2， 43aaa872
                    图片设置随机
                    
                    和参数有关系  时间参数
                      
                    
            已设置随机值
            看正确性
    
    
        String.fromCharCode = function(a){
            if(isNaN(a)){
                  return '';
              }else{
                  return a;
              }
          };
            
          window.length = 1  
        
        '\x20': '7'
        " ": "7"
        " ": "7" 
         
        空格形式 不一致
         
        var abc_seed = 'Hh0PgWAcHD4lEh4arKAjY2iPWnBhMT2gHfNAAgMUsdc=';          // k54B?50c4B
        var abc_ts = "1596714778254";
        this.token = encodeURIComponent(new ABC().z(abc_seed, abc_ts));
        console.log('cookie', this.token);
        
        
        code_0803.js  测试 debug 文件
        
        '\x20':'7'
        ' ': '7'        只能直接一次复制结果， 二次复制不可用
        
        一个ip 空cookie 跑几次之后异常