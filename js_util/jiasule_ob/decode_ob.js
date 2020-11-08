const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");
const generator = require("@babel/generator").default;
  
const fs = require('fs');
var express = require("express");
var bodyParser = require("body-parser");


var api = express();
api.use(bodyParser.urlencoded({
    extended: false
}));


function replace_ugly_code(path) {
    let arr_path = path.get('body.0');
    let code = arr_path.toString();
 
    let shift_path = path.get('body.1');
    let callee_path = shift_path.get('expression.callee');
    let second_arg_node = callee_path.get('params.1').node;
      
    let first_body = callee_path.get('body.body.0');
    let call_fun = first_body.node.declarations[0].id
      
    var all_next_siblings = first_body.getAllNextSiblings();
    all_next_siblings.forEach(next_sibling => {
        next_sibling.remove();
    });
      
    first_body.insertBefore(t.ExpressionStatement(t.UpdateExpression("++", second_arg_node)));
    first_body.insertAfter(t.ExpressionStatement(t.callExpression(call_fun, [second_arg_node])));
      
    code += '!' + shift_path.toString();
     
    let call_path = path.get('body.2');
    let call_name = call_path.node.declarations[0].id.name;
    call_path.traverse({
        AssignmentExpression(_path) {
            let left = _path.get('left');
            let left_code = left.toString();
             
            let right = _path.get('right');
            let right_code = right.toString();
             
            if (right_code.indexOf(call_name) === -1 ||
                right_code.indexOf(left_code) === -1 ) 
            {
                return;
            }
             
            const if_parent_path = _path.findParent(p => {
                return p.isIfStatement();
            });
            if_parent_path && if_parent_path.replaceWith(_path.node);
        },
    })
     
    code += call_path.toString();
    return {call_name,code};
}
 
const delete_extra = 
{
    StringLiteral:function(path)
    {
      delete path.node.extra;
    },
}
 
 
function replace_simple_code(path) {
     
    traverse(path.node,delete_extra)//防止所有字符串以十六进制形式展现导致查找失败。
       
    let source_code = path.toString();
    if(source_code.indexOf('removeCookie') !== -1) 
    {
        var {call_name,code} = replace_ugly_code(path);
    } 
    else
    {
        let arr_path = path.get('body.0');
        var code = arr_path.toString();
          
        let shift_path = path.get('body.1');
        code += '!' + shift_path.toString();
          
        let call_path = path.get('body.2');
        var call_name = call_path.get('declarations.0.id').toString();
        code += call_path.toString();
    }
      
    eval(code);
    
    
    let can_be_delete = true;
      
    path.traverse({
        CallExpression: function(_path) {
            let callee = _path.get('callee');
            if(callee.toString() !== call_name)
                return;
            try
            {
                let value = eval(_path.toString());
                //console.log(value);
                value !== undefined && _path.replaceWith(t.valueToNode(value))
            }
            catch(e)
            {
                can_be_delete = false;
            }
        },
    });
     
    for (let i=0 ;can_be_delete && i<3; i++)
    {
        path.get('body.0').remove();
    }   
}


//解密字符串
const decode_str = {
    "Program"(path)
    {
        replace_simple_code(path)
    },
     
};

var hash = null
var obj = null
function get_hash_function(path) {
    path.traverse({
        FunctionDeclaration(_path){
            if (_path.node.id && _path.node.id.name === "hash"){
                hash = _path
            }
        },
        FunctionExpression(_path){
            if (_path.parent && _path.parent.id && _path.parent.id.name === "hash"){
                hash = _path.parentPath.parent
            }
        },
        CallExpression(_path){
            if (_path.node.callee && _path.node.callee.name === "go"){
                obj = _path.node.arguments[0]
            }
        }
    })
}
const gethashfunction = {
    "Program"(path)
    {
        get_hash_function(path)
    }
}

//还原object
const decode_object = {
	VariableDeclarator(path)
	{
		const {id,init} = path.node;
		if (!t.isObjectExpression(init) || init.properties.length == 0) return;

		let name = id.name;
		let scope = path.scope;
		
		for (const property of init.properties)
		{
			let key   = property.key.value;
			if (key.length !== 5)
			{
				return;
			} 
			let value = property.value;
			
			if (t.isLiteral(value))
			{
				scope.traverse(scope.block,{
					MemberExpression(_path)
					{
						let _node = _path.node;
						if (!t.isIdentifier(_node.object,{name:name})) return;
						if (!t.isLiteral(_node.property, {value:key})) return;
						_path.replaceWith(value);
					},
				})
			}
			else if (t.isFunctionExpression(value))
			{
				let ret_state = value.body.body[0];
				if(!t.isReturnStatement(ret_state)) continue;
				scope.traverse(scope.block,{
					CallExpression: function(_path) {
						let {callee,arguments} = _path.node;
						if (!t.isMemberExpression(callee)) return;
						
						if (!t.isIdentifier(callee.object,{name:name})) return;
						if (!t.isLiteral(callee.property, {value:key})) return;
						
						if (t.isCallExpression(ret_state.argument) && arguments.length > 0) {
							_path.replaceWith(t.CallExpression(arguments[0], arguments.slice(1)));
            }
						else if (t.isBinaryExpression(ret_state.argument) && arguments.length === 2) 
            {
            	let replace_node = t.BinaryExpression(ret_state.argument.operator, arguments[0], arguments[1]);
            	_path.replaceWith(replace_node);
            }		
						else if (t.isLogicalExpression(ret_state.argument) && arguments.length === 2) 
            {
            	let replace_node = t.LogicalExpression(ret_state.argument.operator, arguments[0], arguments[1]);
            	_path.replaceWith(replace_node);
            }
          }
        })
      }
    }
    
    path.remove();//慎重
  },
}
var framework = fs.readFileSync("./framework.js", {
    encoding: "utf-8"
});

function decrypt(jscode) {
    let ast = parser.parse(jscode);

    traverse(ast, decode_str);
    traverse(ast, decode_object);
    traverse(ast, gethashfunction);
    if (hash.node){
        var  hash2 = generator(hash.node).code
    }else{
        var  hash2 = generator(hash).code
    }
    var obj2 = generator(obj).code
    var newcode = framework.replace("{hash}", hash2).replace("{obj}", obj2)
    return eval(newcode)
}

api.post('/api/jiasule_ob', function (req, res) {
    try {
        var result = decrypt(req.body.jscode)
        if (result == undefined) res.send("error");
        else res.send({'result': result});
    } catch (e) {
        console.log(e)
        res.send("error")
    }
});
var server = api.listen(7747, function () {
    var host = '0.0.0.0';
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});