function drawGraphs(paramWords, paramOccurrences, forceDataSet) {

    removeDOMs();
    
    // cloning all the params
    let words = [...paramWords];
    let occurrences = [...paramOccurrences];

    // 2) create new array of words and occurrences based on checkbox values
    let checked = new Array();
    // 1) read checkbox values

    const checkboxItems = document.querySelectorAll("input[type=checkbox]");
    checkboxItems.forEach(item => {
        if (item.checked) {
            // 2)
            checked.push(item.value);
        }
    });

    // 2') remove words are not checked (in checked array)
    let j = 0;
    for (let i = 0; i < 20; i++) {
        if (!checked.includes(words[j])) { 
            words.splice(j, 1); 
            occurrences.splice(j, 1);
            j--;
        }      
        j++;
    }

    let sumOcc = calculateSumOcc(occurrences);

    const objArr = createObjArr(words, occurrences);
    wordCloud(objArr, sumOcc);

    // hr.classList.remove("dsp-none");

    while(words.length > 100) {
        words.pop();
        occurrences.pop();
    }

    // create list of links
    let links = new Array ();
    for (let index = 0; index < (forceDataSet.length-1); index++) {
        if(words.includes(forceDataSet[index]) && (words.includes(forceDataSet[index+1]))) {
            var obj = Object.create({
                source: forceDataSet[index],
                target: forceDataSet[index+1]
            });
            links.push(obj);
        }
    }

    // create list of nodes
    let nodes = new Array();
    for (let index = 0; index < words.length; index++) {
        var obj = Object.create({
            id: words[index],
            size: occurrences[index]
        });
        nodes.push(obj);
    }

    forceDirected(links, nodes, sumOcc);   
}