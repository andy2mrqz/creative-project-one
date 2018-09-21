function renderMemeCanvas(memeImg) {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    canvas.width = memeImg.width;
    canvas.height = memeImg.height;
    context.drawImage(memeImg, 0, 0);
}

function validateImage(file) {
    var acceptableImages = ["image/gif", "image/jpeg", "image/png"];
    if (acceptableImages.includes(file.type)) {
        return true;
    }
    return false;
}

function previewImage() {
    var warningText = document.getElementById('warning');

    if (originalInput.files && validateImage(originalInput.files[0])) {
        warningText.innerHTML = "";
        var imgFile = originalInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            renderMemeCanvas(preview)
            originalInput.disabled = true;
            warningText.style.color = 'green';
            warningText.innerHTML = 'File upload success! If you would like to make another meme, refresh the page'
        }

        reader.readAsDataURL(imgFile);
    } else {
       warningText.innerHTML = 'Invalid file type.  Please choose a jpeg, png, or gif';
    }
}

function addText() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "30px Arial";
    context.strokeText(memeText.value, 10, 30);
}

window.onload = function() {
    var preview = document.getElementById('preview')
    var originalInput = document.getElementById('originalInput');
    var memeText = document.getElementById('memeText');
    originalInput.addEventListener("change", previewImage);
    memeText.addEventListener("change", addText)
};