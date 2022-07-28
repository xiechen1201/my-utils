/**
 * 描述：封装 Ajax 请求
 *  */

var $ = (function () {
  // 兼容 IE5、IE6
  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");

  if (!xhr) {
    throw new Error("浏览器不支持异步发起 HTTP 请求！");
  }

  // 对象序列化
  function formatData(object) {
    var str = "";
    for (const key in object) {
      str += key + "=" + object[key] + "&";
    }
    return str.replace(/&$/, "");
  }

  // 处理 Ajax 请求
  function _doAjax(opt) {
    var opt = opt || {},
      type = (opt.type || "GET").toUpperCase(),
      url = opt.url,
      async = opt.async || true,
      data = opt.data || null,
      success = opt.success || function () {},
      error = opt.error || function () {},
      complete = opt.complete || function () {};

    if (!url) {
      throw new Error("url 不能为空！");
    }

    xhr.open(type, url, async);
    if (type === "POST") {
      // 如果是 post 请求需要设置请求头为表单
      // 因为 post 默认就是表单提交
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    if (type === "GET") {
      xhr.send();
    } else {
      var str = formatData(data);
      xhr.send(str);
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        success(JSON.parse(xhr.responseText));
        complete();
      } else {
        error();
        complete();
      }
    };
  }

  return {
    ajax: function (opt) {
      _doAjax(opt);
    },
    get: function (url, successCallback, errorCallback) {
      _doAjax({
        url,
        type: "GET",
        success: successCallback,
        error: errorCallback,
      });
    },
    post: function (url, data, successCallback, errorCallback) {
      _doAjax({
        url,
        type: "POST",
        data,
        success: successCallback,
        error: errorCallback,
      });
    },
  };
})();

// 调用 ajax
$.ajax({
  url: "user/list",
  type: "POST",
  data: {
    a: 1,
    b: 2,
  },
  success: function (res) {
    console.log("success");
  },
  error: function (res) {
    console.log("error");
  },
});

// 调用 GET
$.get(
  "user/detail",
  function (res) {
    console.log("success");
  },
  function (res) {
    console.log("error");
  }
);

// 调用 POST
$.post(
  "/user/edit",
  {
    a: 1,
    b: 2,
  },
  function (res) {
    console.log("success");
  },
  function (res) {
    console.log("error");
  }
);
