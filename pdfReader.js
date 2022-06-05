(function() {
    var currentFilename = '';
    inputFile.addEventListener('change', function(e) {
       // console.log(e);
    var fileReader = new FileReader();
    fileReader.onload = function(e) {
        
        // start spinning
        startSpinBtn();
    
        fileBtn.disabled = false;
        inputFile.disabled = false;   

        // remove old DOMs
        const dropdownMenu = document.querySelector(".dropdown");
        if(dropdownMenu != null) {
            dropdownMenu.parentElement.removeChild(dropdownMenu);
        }
        removeDOMs();    
    
        // to remove horiz line seperator
        let hr = document.querySelector("hr");
        // hr.classList.add("dsp-none");
    
        // the rest
        PDFJS.getDocument(e.target.result).then(function(pdf) {
        var items = [];
        var pagesRemaining = pdf.pdfInfo.numPages;
        for(var i = 1; i <= pdf.pdfInfo.numPages; i++) {
            pdf.getPage(i).then(function(page) {
            page.getTextContent().then(function(textContent) {
                var previousHeight = NaN;
                var currentString = [];
    
                for(var j = 0; j < textContent.items.length; j++) {
                    var item = textContent.items[j];
                    if(item.transform[5] != previousHeight) {
                    previousHeight = item.transform[5];
                    items.push({item: item, str: currentString.join('')});
                    currentString = [item.str];
                    } else {
                    currentString.push(item.str);  
                    }
                }
                pagesRemaining--;
                if(pagesRemaining == 0) {
                var outputContainer = document.querySelector('#output');
                var errorContainer = document.querySelector('#error');
                outputContainer.style.display = 'none';
                errorContainer.style.display = 'none';
                if(items.length) {
                    // private array declaration
                    let stringsArr = new Array();
                    items.forEach(function(item) {
                        // privare array
                        stringsArr.push(item.str); 
                        // resume of the code
                    });
    
                    // PROCESSING

                    // to split strings in the array into words
                    let wordsArr = new Array();
                    stringsArr.forEach(string => {
                        wordsArr.push(string.split(' '));
                    });

                    // sanitizing
                    const sanitized = sanitize(wordsArr);
                    const forceDataSet = [...sanitized];
                    
                    // sorting 
                    const result = occ(sanitized);
                    
                    const words = result[0];
                    const occurrences = result[1];
                    
                    if(words.length === 0) {
                        $("#errorModal").modal('show');
                    }

                    sortOcc(words, occurrences);
                    
                    while(words.length > 400) {
                        words.pop();
                        occurrences.pop();
                    }
    
                    createCheckboxList(words);
                    
                    const drawBtn = document.querySelector(".btn-draw");
                    drawBtn.addEventListener('click', function() {
                        drawGraphs(words, occurrences, forceDataSet)
                    });
                   
                    // to stop spinning
                    stopSpinBtn();
                    scrollToGraphs();
    
                    // to restore initial state
                    fileBtn.classList.remove('disabled');
                    fileBtn.classList.remove('nohover');
                    fileBtn.disabled = true;
                    inputFile.disabled = true;        
    
                    // resume of the code
                    // ga('send', 'event', 'conversion', 'success');
                } else {
                    $("#errorModal").modal('show');
                    // errorContainer.textContent = 'No text found in PDF.';  
                    // errorContainer.style.display = 'block';  
                    // ga('send', 'event', 'conversion', 'no text found');
                }
                }
            });
            });
        }
        });
    };
    //console.log(e.target.files);
    // console.log(e.target.files[0]);
    if(e.target.files && e.target.files[0]) {
        startSpinBtn();
        // ga('send', 'event', 'button', 'click', 'convert pdf to text');
        fileReader.readAsArrayBuffer(e.target.files[0]);
        currentFilename = e.target.files[0].name;
    }
    });
    })();
