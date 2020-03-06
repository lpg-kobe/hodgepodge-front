/**
* @desc 快排 三行
* @param {Array} arr 参与排序数组
* @author pika
*/
const qSort = arr => arr.length <= 1 ? arr : qSort(arr.filter(el => el < arr[0])).concat(arr.filter(el => el === arr[0]), qSort(arr.filter(el => el > arr[0])))

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
function qSortA (arr, i, j) {
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
})()

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
    parseInt (Number, binary): ['字母', '数字']组合Number低进制位转高进制binary,
    Number.toString(binary): 将十进制Number转binary进制数值
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
})()

