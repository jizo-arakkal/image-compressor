const upload = document.getElementById("upload");
const qualitySlider = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");

qualitySlider.oninput = () => {
  qualityValue.textContent = qualitySlider.value;
};

function compressImage() {
  const file = upload.files[0];
  if (!file) return alert("Please upload an image");

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = e => {
    const img = new Image();
    img.src = e.target.result;

    img.onload = () => {
      document.getElementById("originalPreview").src = img.src;
      document.getElementById("originalSize").innerText =
        "Size: " + (file.size / 1024).toFixed(2) + " KB";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const quality = qualitySlider.value / 100;
      const compressedData = canvas.toDataURL("image/jpeg", quality);

      document.getElementById("compressedPreview").src = compressedData;

      const compressedSize =
        Math.round((compressedData.length * 3) / 4 / 1024);

      document.getElementById("compressedSize").innerText =
        "Size: " + compressedSize + " KB";

      const downloadBtn = document.getElementById("downloadBtn");
      downloadBtn.href = compressedData;
    };
  };
}
