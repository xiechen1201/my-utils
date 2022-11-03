/**
 * 防抖函数
 * */
function debounce(fn, time, triggleNow) {
  var t = null;
  var res;

  var debounced = function () {
    var _self = this;
    var arg = arguments;

    if (t) {
      clearTimeout(t);
    }

    if (triggleNow) {
      var exec = !t;
      t = setTimeout(function () {
        t = null;
      }, time);
      if (exec) {
        res = fn.apply(_self, arg);
      }
    } else {
      t = setTimeout(function () {
        res = fn.apply(_self, arg);
      }, time);
    }

    return res;
  };

  debounced.remove = function () {
    clearTimeout(t);
    t = null;
  };

  return debounced;
}
