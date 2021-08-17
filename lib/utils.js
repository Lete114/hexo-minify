
/**
 * 
 * 目前处于测试阶段
 * 当前需要突破的问题：
 *  1. png透明处被填充为黑色的bug
 *  2. gif至渲染第一帧的bug
 * 
 */


const path = require("path");
const fs = require("fs");
const sizeOf = require("image-size");
const { createCanvas, Image } = require("canvas");

function reader_image(public_dir, reg) {
  if (!fs.existsSync(public_dir)) return;
  let results = [];
  const list = fs.readdirSync(public_dir);
  list.forEach((file) => {
    file = path.resolve(`${public_dir}/${file}`);
    var stat = fs.statSync(file);
    if (stat.isDirectory()) { // 如果是文件夹则递归
      results = results.concat(reader_image(file, reg));
    } else {
      const extname = path.extname(file);
      const regexp = new RegExp(reg);
      if (regexp.test(extname)) {
        results.push(path.resolve(file));
      }
    }
  });
  return results;
}

/**
 * 
 * @param {*} public_dir 生成目录
 * @param {*} quality 质量(画质)
 * @param {*} RegExp 匹配的正则
 */
function minify_image(public_dir, quality, RegExp) {
  let result = reader_image(public_dir, RegExp);
  result.forEach((item) => {
    let image_buffer = fs.readFileSync(item); // 读取图片
    const { width, height } = sizeOf(item); // 获取图片宽高

    let img = new Image();
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    img.onload = () => context.drawImage(img, 0, 0);
    img.src = image_buffer;
    let base64 = canvas.toDataURL("image/jpeg", quality); // 降低画质
    var result_base64 = base64.replace(/^data:image\/\w+;base64,/, ""); //移除base64前部分的data:image/png;base64
    var data_Buffer = Buffer.from(result_base64, "base64");
    fs.writeFile(item, data_Buffer, (err) => {
      if (err) console.log(err);
    });
  });
}
module.exports = { minify_image };
