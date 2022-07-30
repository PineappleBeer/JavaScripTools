
class Crc32 {
  constructor() {
    Number.prototype.toHex = function (len) {
      if (typeof (len) === 'undefined') len = 8;
      var num = this < 0 ? (0xFFFFFFFF + this + 1) : this
      var hex = num.toString(16).toUpperCase()
      var pad = hex.length < len ? len - hex.length : 0
      return "0".repeat(pad) + hex;
    }
  }

  crc32Generate(reversedPolynomial) {
    let table = new Array();
    let i, j, n;
    for (i = 0; i < 256; i++) {
      n = i;
      for (j = 8; j > 0; j--) {
        if ((n & 1) == 1) {
          n = (n >>> 1) ^ reversedPolynomial;
        } else {
          n = n >>> 1;
        }
      }
      table[i] = n;
    }
    return table;
  }

  crc32Initial() {
    return 0xFFFFFFFF;
  }

  crc32AddByte(table, crc, byte) {
    crc = (crc >>> 8) ^ table[(byte) ^ (crc & 0x000000FF)];
    return crc;
  }

  crc32Final(crc) {
    crc = ~crc;
    crc = (crc < 0) ? (0xFFFFFFFF + crc + 1) : crc;
    return crc;
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

  /**传入16进制字符串返回16进制crc32 */
  crc32ComputeToHex(str) {
    str = this.hexToStr(str);
    let table = this.crc32Generate(parseInt('EDB88320', 16));
    let crc = 0;
    let i;
    crc = this.crc32Initial();
    for (i = 0; i < str.length; i++)
      crc = this.crc32AddByte(table, crc, str.charCodeAt(i));
    crc = this.crc32Final(crc);
    return crc.toHex().toLocaleLowerCase();
  }
}