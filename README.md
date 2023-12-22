# libreoffice-tool

libreoffice工具

### EXAMPLE

```js
const Office = require('libreoffice-tool');
const office = new Office({
    libreofficePath: '', // 可选
});

(async function() {
    try {
        /**
        *  convert
        *  @param {string} inputPath 输入文件路径
        *  @param {string} type 需要转换完成的文件格式
        *  @param {string} newPath 输出文件路径,可选，默认为系统临时文件夹
        *  @returns {libreInfo, file}
        *    - libreInfo 转换信息
        *    - file 转换完成的文件名称
        **/
        const pdfDoc = await office.convert('./Gyb9LHYDAA.doc', 'pdf', './');
    }catch(err) {
        console.log(err);
    }
})();
```
