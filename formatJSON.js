/**
 * 对对象格式化 
 * 注意：没有对循环引用作任何处理 
 *
 * @param o  要转换的对象
 * @param {number} space 空格个数 代表一个tab 
 * @return {string} 返回格式化的字符串
 **/
function formatJSON(o,space = 2) {
  let f = function (n,o) {
    let str = '';
    const tab = ' '.repeat(space);
    const tabs = tab.repeat(n);
    let type = typeof o;
    if (type === 'object' && Array.isArray(o)) type = 'array';
    switch (type) {
      case 'array':
        return str += '[' + o.map(m => f(n + 1,m)).join() + ']';
      case 'number':
        return o;
      case 'string':
        return JSON.stringify(o);
      case 'object':
        let ks = Object.keys(o);
        return str += '{\n' + tabs + ks.map(m => '  "' + m + '":'
          + f(n + 1,o[m])).join(',\n' + tabs)
          + '\n' + tabs + '}'
    }
  };
  return f(0,o);
}

