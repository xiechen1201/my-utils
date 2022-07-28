/**
 * @description 将文件流下载成文件
 * @param {Object} 文件流
 * */
const downloadFile = async () => {
  const [err, res] = await request({
    url: "xxx",
    responseType: "blbo",
  });

  if (err) {
    alert(err);
    return;
  }

  const blbo = new Blob([res], {
    type: res.type,
  });

  const url = window.URL.createObjectURL(blbo);

  const elA = document.createElement("a");
  elA.style.display = "none";
  elA.href = url;
  elA.download = res.filename;

  document.body.appendChild(elA);
  elA.click();
  elA.remove();
};

export { downloadFile };
