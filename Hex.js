
class HexTools {
  /**生成自增数组 */
  getGenerateArray(start, end) {
    return Array.from(new Array(end).keys()).slice(start);
  }

  //16进制转10进制
  hexToDecimal(hex) {
    return parseInt(hex, 16)
  }

  /**十进制转十六进制 */
  decimalToHex(num) {
    return (num).toString(16);
  }

  /**16进制转字符串 */
  hexToStr(str) {
    let hex = str.toString();
    let res = '';
    for (let n = 0; n < hex.length; n += 2) {
      res += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return res;
  }

  /**字符串转16进制 */
  strToHex(str) {
    let arr = [];
    arr.push('0x');
    for (let i = 0; i < str.length; i++) {
      arr.push(str.charCodeAt(i).toString(16));
    }
    return arr.join('');
  }

  /**十六进制字符串转base64 */
  hexToBase64(hexStr) {
    return btoa([...hexStr].reduce((acc, _, i) =>
      acc += !(i - 1 & 1) ? String.fromCharCode(parseInt(hexStr.substring(i - 1, i + 1), 16)) : "", ""));
  }

}