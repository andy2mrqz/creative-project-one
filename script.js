function validateImage(file) {
    var acceptableImages = ["image/gif", "image/jpeg", "image/png"];
    if (acceptableImages.includes(file.type)) {
        return true;
    }
    return false;
}

function updateImage() {
    var warningText = document.getElementById('warning');

    if (originalInput.files && validateImage(originalInput.files[0])) {
        warningText.innerHTML = "";
        var imgFile = originalInput.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        }

        reader.readAsDataURL(imgFile);
    } else {
       warningText.innerHTML = 'Invalid file type.  Please choose a jpeg, png, or gif';
    }
}

function addText() {
    console.log('you wrote: ' + memeText.value);
}

window.onload = function() {
    var preview = document.getElementById('preview')
    var originalInput = document.getElementById('originalInput');
    var memeText = document.getElementById('memeText');
    originalInput.addEventListener("change", updateImage);
    memeText.addEventListener("change", addText)
};