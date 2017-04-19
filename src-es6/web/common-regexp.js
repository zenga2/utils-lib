// 常用正则
let ipRegExp = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.)$/;
let urlRegExp = /^https?:\/\/[-\w.]+(:\d+)?(\/([\w/#_.]*)?)?$/;
let emailRegExp = /^(\w+\.)*\w+@(\w+\.)+[A-Za-z]+$/;

export {ipRegExp, urlRegExp, emailRegExp}
