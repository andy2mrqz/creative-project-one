function splitter(s) { // Credit for this function goes to Goran Andersson from Stack Overflow
    var middle = Math.floor(s.length / 2);
    var before = s.lastIndexOf(' ', middle);
    var after = s.indexOf(' ', middle + 1);

    if (before == -1 || (after != -1 && middle - before >= after - middle)) {
        middle = after;
    } else {
        middle = before;
    }

    var s1 = s.substr(0, middle);
    var s2 = s.substr(middle + 1);

    return {s1, s2};
}

function renderMemeCanvas(memeImg) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    canvas.width = memeImg.width;
    canvas.height = memeImg.height;
    context.drawImage(memeImg, 0, 0);
    
    // Add text, if there is any
    words = splitter(memeText.value);
    t1 = words["s1"]
    t2 = words["s2"]
    width = 30;
    tooWide = true;
    while (tooWide) {
        context.font = width.toString() + "px " + "Sans-serif";
        context.strokeStyle = "black";
        context.lineWidth = 4;
        t1Width = context.measureText(t1).width;
        t2Width = context.measureText(t2).width;
        tooWide = t1Width > canvas.width || t2Width > canvas.width;
        if (tooWide) {
            width -= 2;
        }
    }
    
    context.fillStyle = "white"
    context.strokeText(t1, (canvas.width - t1Width) / 2, width);
    context.fillText(t1, (canvas.width - t1Width) / 2, width);
    context.strokeText(t2, (canvas.width - t2Width) / 2, canvas.height - width);
    context.fillText(t2, (canvas.width - t2Width) / 2, canvas.height - width);
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
            originalInput.disabled = true;
            warningText.style.color = 'green';
            warningText.innerHTML = 'File upload successful! If you would like to make another meme, refresh the page'
            renderMemeCanvas(preview);
        }
        reader.readAsDataURL(imgFile);
    } else {
       warningText.innerHTML = 'Invalid file type.  Please choose a jpeg, png, or gif';
    }
}

window.onload = function() {
    var preview = document.getElementById('preview');
    var originalInput = document.getElementById('originalInput');
    var memeText = document.getElementById('memeText');
    originalInput.addEventListener("change", previewImage);
    memeText.addEventListener("change", previewImage);
};