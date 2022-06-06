// DOM ELEMENTS
const body = document.getElementsByTagName('body')[0];

const dropArea = document.querySelector(".drag-area"),
dragText = document.querySelector(".drag-text h2"),
btnContainerTouchScreen = document.querySelector(".container-touch-screen");

let inputFile, spin;

let file;

// check if device is touchscreen
if (!("ontouchstart" in document.documentElement)) {
    body.classList.add("can-hover");
    dropArea.classList.remove("dsp-none");
    btnContainerTouchScreen.classList.add("dsp-none");
    inputFile = document.querySelectorAll('#file')[0];
    spin = document.querySelectorAll('#spinner')[0];
} else {
    inputFile = document.querySelectorAll('#file')[1];
    spin = document.querySelectorAll('#spinner')[1];
}

function startSpinBtn() {
    spin.classList.add('spinner-border');
    spin.classList.add('spinner-border-sm');
}

function stopSpinBtn() {
    spin.classList.remove('spinner-border');
    spin.classList.remove('spinner-border-sm');
}

function scrollToGraphs() {
    location.hash = '#cloud';
}


// disable loading button
let fileBtn = document.querySelector(".btn-file");  
fileBtn.addEventListener("click", function() {
    this.classList.add('disabled');
    this.classList.add('nohover');
    this.disabled = true;

    // maybe implementing a delay here
    // inputDOMelement.disabled = true;
});

// DRAG AND DROP FUNCTION AREA
dropArea.addEventListener("change", () => {
    //file = this.files[0];
    console.log("PRESO");
});

dropArea.addEventListener("dragover", function(e) {
    //e.stopPropagation();
    e.preventDefault();
    dropArea.classList.add("dragover");
    dragText.textContent = 'Drop your PDF here';
}, false);

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
    dragText.textContent = 'Drag & drop your PDF here';
});

dropArea.addEventListener("drop", function(e) {
    //e.stopPropagation();
    e.target.preventDeafault();
    dropArea.classList.add("drop");
    dragText.textContent = 'Uploading...';
    file = e.dataTransfer.files[0];
    console.log(file);
}, false);

// does not work
dropArea.addEventListener("dragenter dragstart dragend dragleave dragover drag drop", function (e) {
    e.preventDefault();
    e.stopPropagation();
});

function sanitize(a){
    // merge array of arrays
    let merged = [].concat.apply([], a);
    
    // to keep only words
    let filtered_ = merged.filter(function(el) {
        return (/^[a-z]+$/i.test(el));
    });
    
    // to remove falsy value (null, undefiened, "", NaN, false)
    let filtered_bool = filtered_.filter(Boolean);
    
    // to convert all strings to lowercase
    let converted_lowercase = filtered_bool.map(el => {
        return el.toLowerCase();
    });
    
    // to remove stopwords
    sanitized = removeStopWords(converted_lowercase);
    return sanitized;
}

// to count occurrences
function occ(final) {
let a = [], b = [], arr = final , prev;

arr.sort();
for (let element of arr) {
    if (element !== prev) {
    a.push(element);
    b.push(1);
    }
    else ++b[b.length - 1];
    prev = element;
}

return [a, b];
}    

// sort based on occurrences
function sortOcc(words, occurrences) {
//1) combine the arrays:
var list = [];
for (var j = 0; j < words.length; j++) 
    list.push({'word': words[j], 'occ': occurrences[j]});

//2) sort:
list.sort(function(a, b) {
    return ((a.occ > b.occ) ? -1 : ((a.occ == b.occ) ? 0 : 1));  //> was <
});

//3) separate them back out:
for (var k = 0; k < list.length; k++) {
    words[k] = list[k].word;
    occurrences[k] = list[k].occ;
}

// return words, occurrences;
}

// array of words to list w/ size and links
function createObjArr(words, occurrences) 
{
    let objArr = new Array();

    // create new obj w/ cusstom fields
    for (let index = 0; index < words.length; index++) {
        var obj = Object.create({
            node: words[index],
            size: occurrences[index]
        });
        objArr.push(obj);
    }

    return objArr;
}

function addHeading(id, headingText) {
    var cloudContainer = document.querySelector("#" + id);
    var headingContainer = document.createElement("div");
    var heading = document.createElement("h2");
    var downloadBtn = document.createElement("button");
    var downloadIcon = document.createElement("i");

    downloadIcon.classList.add("far", "fa-arrow-alt-circle-down");
    downloadIcon.style.marginRight = "5px";

    downloadBtn.classList.add("btn", "btn-secondary", "btn-download", "download-"+id);
    downloadBtn.innerText = "PNG"

    heading.innerText = headingText;
    headingContainer.classList.add("hd-container-" + id);
    headingContainer.classList.add("hd-container");

    downloadBtn.insertBefore(downloadIcon, downloadBtn.firstChild);
    headingContainer.appendChild(heading);
    headingContainer.appendChild(downloadBtn); 
    cloudContainer.insertBefore(headingContainer, cloudContainer.firstChild);
}

function removeDOMs() {
    const frames = document.querySelectorAll(".frame");
    frames.forEach((el) => {
        while(el.firstChild) { 
            el.removeChild(el.firstChild);
        }
    });
}

function calculateSumOcc(occurrences) {
    const reducer = (accumulator, curr) => accumulator + curr;
    return occurrences.reduce(reducer);   
}