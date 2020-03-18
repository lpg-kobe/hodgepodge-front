/**
* @desc 冒泡排序（基础版）
* @param {arr} 排序数组
* @author pika
*/
function bubbleSort (arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = temp
      }
    }
  }
  return arr
}
/**
* @desc 冒泡排序（改进版1）,循环结束至最后一次交换位置
* @param {arr} 排序数组
* @from [https://github.com/damonare/Sorts]
* @author pika
*/
function bubbleSortA (arr) {
  let sortIndex = arr.length - 1
  while (sortIndex > 0) {
    // 初始化对比时的索引
    let pos = 0
    for (let i = 0; i < sortIndex; i++) {
      if (arr[i] > arr[i + 1]) {
        // 记录交换时的索引
        pos = i
        let temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
    sortIndex = pos
  }
  return arr
}

/**
* @desc 冒泡排序（改进版2）,左右冒泡
* @param {arr} 排序数组
* @author pika
*/
function bubbleSortB (arr) {
  let min = 0, max = arr.length - 1, index, temp;
  while (min < max) {
    // 正向冒泡
    for (index = min; index < max; index++) {
      if (arr[index] > arr[index + 1]) {
        temp = arr[index]
        arr[index] = arr[index + 1]
        arr[index + 1] = temp
      }
    }
    max--
    // 反向冒泡
    for (index = max; index > min; index--) {
      if (arr[index] < arr[index - 1]) {
        temp = arr[index]
        arr[index] = arr[index - 1]
        arr[index - 1] = temp
      }
    }
    min++
  }
  return arr
}

/**
* @desc 选择排序（任何情况下时间复杂度都为O(n2)）
* @param {Array} arr 排序数组
* @author pika
*/
function selectSort (arr) {
  let len = arr.length
  let minIndex = 0
  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    let temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

/**
* @desc 插入排序，类似抓牌依次将当前牌跟之前的作对比，往右位移大牌
* @param {Array} arr 要排序的数组
* @author pika
*/
function insertSort (arr) {
  for (let i = 1, len = arr.length; i < len; i++) {
    let current = arr[i]
    let j = i
    // 将当前牌跟之前的牌依次比对大小
    while (j - 1 >= 0 && arr[j - 1] > current) {
      // 将每个牌的位置往后挪
      arr[j] = arr[j - 1]
      j--
    }
    // 插入当前牌
    arr[j] = current
  }
  return arr
}

/**
* @desc 归并排序，将左右分治经典运用
* @param {Array} arr 要排序的数组
* @author pika
*/
function mergeSort (arr) {
  let len = arr.length;
  if (len <= 1) {
    return arr;
  }
  let middle = Math.floor(len / 2)
  let left = arr.slice(0, middle)
  let right = arr.slice(middle)
  return merge(mergeSort(left), mergeSort(right))
  function merge (left, right) {
    let result = []
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        result.push(left.shift())
      } else {
        result.push(right.shift())
      }
    }
    while (left.length) {
      result.push(left.shift())
    }
    while (right.length) {
      result.push(right.shift())
    }
    return result
  }
}

/**
* @desc 快排 三行
* @param {Array} arr 参与排序数组
* @author pika
*/
const qSort = arr => arr.length <= 1 ? arr : qSort(arr.filter(el => el < arr[0])).concat(arr.filter(el => el === arr[0]), qSort(arr.filter(el => el > arr[0])))

/**
* @desc 快排（经典思维）,左右推入
* @param {Array} arr 参与排序数组
* @author pika
*/
function quickSort (arr) {
  if (arr.length <= 1) { return arr }
  let left = []
  let right = []
  let pivotIndex = Math.floor(arr.length / 2)
  let pivot = arr.splice(pivotIndex, 1)[0]
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i] > pivot) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }
  return quickSort(left).concat([pivot], quickSort(right))
}

/**
* @desc 快排常规，基数取数组第一个数，时间复杂度最高
* @param {Array} arr 参与排序数组
* @param {String} i 排序筛选位移，左边
* @param {String} j 排序筛选位移，右边
* @author pika
*/
function qSortA (arr, i, j) {
  if (i < j) {
    var left = i;
    var right = j;
    var pivot = arr[left];
    while (i < j) {
      while (i < j && arr[j] > pivot) {
        j--
      }
      if (i < j) {
        arr[i++] = arr[j]
      }
      while (i < j && arr[i] <= pivot) {
        i++
      }
      if (i < j) {
        arr[j--] = arr[i]
      }
    }
    arr[i] = pivot;
    qSortA(arr, left, i - 1);
    qSortA(arr, i + 1, right);
    return arr;
  }
}

/**
* @desc 快排常规，基数取数组中间数，时间复杂度最低
* @param {Array} arr 参与排序数组
* @param {String} i 排序筛选位移，左边
* @param {String} j 排序筛选位移，右边
* @author pika
*/
function qSortB (arr, i, j) {
  if (i < j) {
    var left = i;
    var right = j;
    // 取中间元素并交换首个元素
    var mid = Math.floor(arr.length / 2);
    var temp = arr[left];
    arr[left] = arr[mid];
    arr[mid] = temp;
    var pivot = arr[left];
    while (i < j) {
      while (i < j && arr[j] > pivot) {
        j--
      }
      if (i < j) {
        arr[i++] = arr[j]
      }
      while (i < j && arr[i] <= pivot) {
        i++
      }
      if (i < j) {
        arr[j--] = arr[i]
      }
    }
    arr[i] = pivot;
    qSortA(arr, left, i - 1);
    qSortA(arr, i + 1, right);
    return arr;
  }
}

/**
* @desc 经典爬楼梯，步长为1/2
* @param {Number} n 楼梯阶级 
* @description F(1)=>step(0-1) //1
               F(2)=>step(0-1-2)|step(0-2) //2
               F(3)=>step(0-1-2-3)|step(0-1-3)|step(0-2-3) //3
               F(4)=>step(0-1-2-3-4)|step(0-1-2-4)|step(0-1-3-4)|step(0-2-3-4)|step(0-2-4) //5
               由此推导F(n)=>F(n-1)+F(n-2),边界条件为n=1|n=2|n<1
* @author pika
*/
function climb (n) {
  if (n < 1) {
    return 0
  }
  if (n === 1) {
    return 1
  }
  if (n === 2) {
    return 2
  }
  return climb(n - 1) + climb(n - 2)
}
/**
* @desc 改进版爬楼梯1，将递归重复出现的F(XX)保存起来并直接取值
* @param {Number} n 楼梯阶级
* @author pika
*/
let map = new Map()
function climbMap (n) {
  if (n < 1) {
    return 0
  }
  if (n < 1) {
    return 1
  }
  if (n < 2) {
    return 2
  }
  if (map.has(n)) {
    return map.get(n)
  } else {
    let value = climb(n - 1) + climb(n - 2)
    map.set(n, value)
    return value
  }
}
/**
* @desc 改进版爬楼梯end，最终值只依赖前面两个的值，可以从第三个位置开始后每次迭代都将最终值与前面两个值交换,参考https://mp.weixin.qq.com/s?__biz=MzI1MTIzMzI2MA==&mid=2650561168&idx=1&sn=9d1c6f7ba6d651c75399c4aa5254a7d8&chksm=f1feec13c6896505f7886d9455278ad39749d377a63908c59c1fdceb11241e577ff6d66931e4&scene=21#wechat_redirect
* @param {Number} n 楼梯阶级
* @author pika
*/
function climbSwap (n) {
  if (n < 1) {
    return 0
  }
  if (n < 1) {
    return 1
  }
  if (n < 2) {
    return 2
  }
  let a = 1
  let b = 2
  let temp = 0
  for (let i = 3; i <= n; i++) {
    temp = a + b
    a = b
    b = temp
  }
  return temp
}

(() => {
  // this作用域解析 exp
  // this绑定权重优先级:{
  // 1.new Function 绑定this到该对象
  // 2.call/apply/bind调用 绑定this到调用的对象
  // 3.绑定调用该函数的上下文对象
  // 4.严格模式默认绑定undefined/非严格模式默认绑定window全局
  // other.箭头函数this作用域寻找不受上述任何绑定影响
  //}
  var num = 20;
  var obj = {
    num: 30,
    fn: (function (num) {
      // this => 块级作用域跟window.obj同级指向window
      this.num *= 3;
      num += 15;
      var num = 45;
      return function () {
        // this => 调用该函数的Object,否则为window
        this.num *= 4;
        num += 20;
        console.log(this.key, num);
      }
    })(num),
    foo: ((num) => {
      num += 666;
      return () => {
        console.log(this.key)
        // this => 箭头函数不携带this作用域向上寻找，直到找到普通函数声明作用域的this，否则为window
        this.num = window.number === 60 + 666;
      }
    })(num)
  }
  var fn = obj.fn;// window.num * 3 = 60
  fn();// window.num = 60*4=240 num = 65
  obj.fn();// obj.num*4 = 120 ; num = 85 
  obj.foo();// window.num + 666 =  726;
  obj.fn.call({ key: 'newKey' }) // key => obj.key => newKey 
  obj.foo.call({ key: 'newKey' }) // key => window.key => undefined,箭头函数的this不受call显示绑定影响  
})();

(() => {
  /**
  * @desc 继承之原型链继承与构造函数继承
  * @author pika
  */
  function Parent (name) {
    this.name = name
  }
  function Son (name, color) {
    // call/apply调用父类构造函数实现继承
    Parent.apply(this, arguments)
    this.color = color
  }
  // 原型链继承之原型共享
  Son.prototype = new Parent()
  // 寄生组合继承，子类原型复用父类原型副本并将构造指向子类自身
  Son.prototype = Object.create(Parent.prototype)
  Son.prototype.constructor = Son

  // exp
  // 构造函数产生的对象属性访问的都是实例化新的构造函数之前该构造函数原型：
  function Foo () { }
  var foo = new Foo()
  Foo.prototype.name = 'Foo'
  foo.name // Foo => foo原型永远指向实例化构造函数Foo原型
  Foo.prototype = { name: '' } // Foo原型被重写成Object但并未实例化成新对象
  foo.name // Foo => 访问实例化之前的构造函数原型Foo而非Object
  var fn = new Foo() // 实例化新的构造函数，生成对象fn原型指向被重写的原型Object
  fn.name // '' => 访问新的原型Object

  /**
  * @desc new 操作符实现
  * @author pika
  */
  function objectFactory (...args) {
    // 截取构造函数并识别类型
    let constructor = Array.prototype.shift.call(arguments)
    if (typeof constructor !== 'function') {
      console.error('type erro,fn is not a costructor')
      return false
    }
    // 新建对象并将原型指向构造函数原型
    let newObj = Object.create(constructor.prototype)
    // 将this指向该新建的对象
    let result = constructor.apply(newObj, arguments)
    // 判断函数返回值类型，无返回值/返回基本类型值则返回该对象本身，返回值为引用类型则返回该引用类型=> exp:new Foo(){return ''||0} = Foo,new Foo(){return function fn(){}||{key:value}} = fn||{key:value}
    let flag = result && (typeof result === "object" || typeof result === "function")
    return flag ? result : newObj
    // exp:操作运算符优先级 => 取值xxx.Fn|xxx[Fn] = new Fn()带参> new Fn不带参 = 函数调用
  }

  /**
  * @desc 模拟call实现
  * @param {Object} context 绑定的上下文对象
  * @author pika
  */
  Function.prototype.mockCall = function (context) {
    if (typeof this !== 'function') {
      console.error('type error,fail to mockCall by not function')
      return false
    }
    // 截取第一个参数后面的参数
    const args = [...arguments].slice(1)
    // 初始化上下文参数
    context = context || window
    // 将该函数this/Function.prototype作为上下文context的fn属性并执行fn，此时this将指向context上下文,exp:
    // function bar(){console.log(this.name)}
    // var obj = {name:'obj.name'}
    // obj.fn = bar
    // obj.fn => // obj.name = 'obj.name'
    // 绑定完成后删除多余的fn属性
    context.fn = this // this => Function.prototype
    const result = context.fn(...args)
    delete context.fn
    return result
  }
  /**
  * @desc 模拟apply实现
  * @param {Object} context 绑定的上下文对象
  * @author pika
  */
  Function.prototype.mockApply = function (context) {
    if (typeof this !== 'function') {
      console.error('type error,fail to mockApply by not function')
      return false
    }
    // 初始化上下文参数
    context = context || window
    // 将函数设为对象context的方法fn
    context.fn = this
    // 根据第二个参数调用该对象的方法
    const result = arguments[1] ? context.fn(...arguments[1]) : context.fn()
    // 删除对象的fn函数引用
    delete context.fn
    return result
  }
  /**
   * @desc 模拟bind实现
   * @param {Object} context 绑定的上下文对象
   * @author pika
   */
  Function.prototype.mockBind = function (context) {
    if (typeof this !== 'function') {
      console.error('type error,fail to mockBind by not function')
      return false
    }
    // 截取传入的参数
    const args = [...arguments].slice(1)
    // 返回函数引用并根据调用方式传入不同值
    return function Fn () {
      return this.apply(this instanceof Fn ? this : context, [...args, ...arguments])
    }
  }
})

/**
* @desc 函数防抖 在频繁触发条件下只取最后一次操作,用于搜索联想，频繁点赞等限制
* @param {Number} wait 操作间隔
* @param {Function} fn 回调函数
* @param {Boolean} Immediate 是否立即执行
* @author pika
*/
function debounce (fn, wait = 50, immediate) {
  var timer = null;
  return function () {
    if (immediate) {
      fn.apply(this, arguments)
    }
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }
}

/**
* @desc 函数节流 在频繁触发条件下限定固定时间内执行一次,用于滚动等场景
* @param {Number} delay 延迟时长
* @param {Function} fn 回调函数
* @author pika
*/
function throttle (fn, delay) {
  var timer = null;
  var prev = new Date().getTime();
  return function () {
    var cur = new Date().getTime();
    if (cur - prev > delay) {
      fn.apply(this, arguments)
      prev = new Date().getTime()
    }
  }
}
(() => {
  // 数据层级转换
  var menu_list = [{
    id: '1',
    menu_name: '设置',
    menu_url: 'setting',
    pId: 0
  }, {
    id: '1-1',
    menu_name: '权限设置',
    menu_url: 'setting.permission',
    pId: '1'
  }, {
    id: '1-1-1',
    menu_name: '用户管理列表',
    menu_url: 'setting.permission.user_list',
    pId: '1-1'
  }, {
    id: '1-1-2',
    menu_name: '用户管理新增',
    menu_url: 'setting.permission.user_add',
    pId: '1-1'
  }, {
    id: '1-1-3',
    menu_name: '角色管理列表',
    menu_url: 'setting.permission.role_list',
    pId: '1-1'
  }, {
    id: '1-2',
    menu_name: '菜单设置',
    menu_url: 'setting.menu',
    pId: '1'
  }, {
    id: '1-2-1',
    menu_name: '菜单列表',
    menu_url: 'setting.menu.menu_list',
    pId: '1-2'
  }, {
    id: '1-2-2',
    menu_name: '菜单添加',
    menu_url: 'setting.menu.menu_add',
    pId: '1-2'
  }, {
    id: '2',
    menu_name: '订单',
    menu_url: 'order',
    pId: 0
  }, {
    id: '2-1',
    menu_name: '报单审核',
    menu_url: 'order.orderreview',
    pId: '2'
  }, {
    id: '2-2',
    menu_name: '退款管理',
    menu_url: 'order.refundmanagement',
    pId: '2'
  }
  ]
  /**
  * @desc 平级转树OBJ
  * @param {Array} arr 平级数组
  * @author pika
  */
  function toTree (arr) {
    var keyObj = {};
    var tree = {};
    for (var key in arr) {
      keyObj[arr[key].id] = arr[key]
    }
    for (var id in keyObj) {
      if (keyObj[id].pId) {
        keyObj[keyObj[id].pId].children = {
          [keyObj[id].id]: keyObj[id]
        }
      } else {
        tree[id] = keyObj[id];
      }
    }
    return tree;
  }
  /**
  * @desc 平级转树Array 递归
  * @param {Array} arr 平级数组
  * @param {pId} 顶级父id
  * @author pika
  */
  function treeLoop (arr, pid) {
    var list = [];
    for (var i in arr) {
      var item = arr[i];
      if (item.pId === pid) {
        item.children = treeLoop(arr, item.id);
        list.push(item)
      }
    }
    return list
  }
  // console.log(toTree(menu_list))
  console.log(treeLoop(menu_list, 0))
})();

(() => {
  /**
  * @desc 位运算
  * @author pika
  */
  return {
    0b00: '二进制标识',
    0100: '八进制标识',
    0x00: '十六进制标识',
    '&': '按位与', // 相同位均为1则1, 否则为0
    '|': '按位或', // 相同位有1为1
    '^': '按位异或', // 相同位不同为1，相同为0
    '~': '按位取反',// 0为1,1为0
    '<< X': '进制有效位左移X位',
    '>> X': '进制有效位右移X位',
    parseInt (Number, binary): ['字母', '数字']组合Number低进制位转高进制binary, binary为0默认以10进制转换, 且Number参数不能大于等于binary, 否则返回NaN
    Number.toString(binary): 将十进制Number转binary进制数值
    // 原码、反码与补码
    原码: // 正数原码  [+3] => 0000 0011
      // 负数原码符号位为1 [-3] => 1000 0011
      反码: // 正数反码同原码
    // 负数反码符号位为1,数值部分原码取反 [-3] => 1111 1100
    补码: // 正数补码同原码
         // 负数补码为反码加1 [-3] => 1111 1101
}
  // 位运算运用场景之权限管理
  exp: 假定管理系统拥有增(0001) 、删(0010) 、查(0100) 、改(1000)四个权限
  给user添加某种权限可以使用 | 运算
  0001 | 0010 = 0011 // 0011代表user拥有增(0001) 、删(0010)权限
  给user删除某个权限可以使用 ^ 运算, 上文user权限为0011
  0011 ^ 0010 = 0001 // 这里表示删除user的删除(0010)权限
  判断user是否拥有某种权限可以使用 & 运算
  0011 & 1000 = 0000 // 为0代表user没有改(1000)的权限
  0011 & 0001 = 0001 // 权限0001代表user拥有增(0001)的权限
})();

(() => {
  /**
  * @desc 如何让Object对象也可以使用for of 遍历每个值
  * @description 改写{}.Symbol.iterator方法
  * @author pika
  */
  let obj = {
    [Symbol.iterator]: () => {
      let index = 0;
      let keys = Object.keys(obj);
      return {
        next: () => {
          return {
            value: obj[keys[index++]],
            done: index > keys.length
          }
        },
      }
    }
  }
})();

(() => {
  /**
  * @desc Promise模拟实现
  * @param {Function} fn 上下文执行栈
  * @author pika
  */
  function myPromise (fn) {
    this.status = 'pending'
    this.value = null
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    resolve = value => {
      // 若传入promise对象则等待并callback，=>myPromise.then(()=>{new myPromise})
      if (value instanceof myPromise) {
        return value.then(resolve, reject)
      }
      // 确保宏任务回调
      setTimeout(() => {
        if (this.status === 'pending') {
          this.status = 'resolve'
          this.value = value
          this.resolveCallbacks.forEach(cb => {
            cb(value)
          });
        }
      }, 0)
    }
    reject = value => {
      // 确保宏任务回调
      setTimeout(() => {
        if (this.status === 'pending') {
          this.status = 'reject'
          this.value = value
          this.rejectCallbacks.forEach(cb => {
            cb(value)
          });
        }
      }, 0)
    }
    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  myPromise.prototype.then = function (res, rej) {
    res = typeof res === "function" ? res : value => value;
    rej = typeof rej === "function" ? rej : error => {
      throw error;
    };
    if (this.state === 'pending') {
      this.resolveCallbacks.push(res);
      this.rejectCallbacks.push(rej);
    };
    // 状态回调
    let cbFn = {
      'resolve': () => {
        res(this.value)
      },
      'rej': () => {
        rej(this.value)
      },
    }
    cbFn[this.status] && cbFn[this.status]()
  }
})()
