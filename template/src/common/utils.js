export function getCurrentMenu(path, menuList) {
  if (!!menuList) {
    for (let i = 0; i < menuList.length; i++) {
      const menu = menuList[i]
      const childNavs = menu.child_navs
      if (!!childNavs && childNavs.length > 0) {
        const returnMenu = getCurrentMenu(path, childNavs)
        if (null != returnMenu) {
          return returnMenu
        }
      } else {
        if (menu.nav_url == path) {
          return menu
        }
      }
    }
  }
  return null;
}


export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 // 月份
    "d+": this.getDate(),                    // 日
    "h+": this.getHours(),                   // 小时
    "m+": this.getMinutes(),                 // 分
    "s+": this.getSeconds(),                 // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds()             // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}