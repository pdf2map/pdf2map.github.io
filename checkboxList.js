function createCheckboxList(words) {

    const dpDiv = document.createElement("div");
    dpDiv.classList.add("dropdown");

    const dpBtn = document.createElement("button");
    dpBtn.classList.add("btn", "btn-secondary", "dropdown-toggle");
    dpBtn.type = "button";
    dpBtn.id = "dropdownMenuButton";
    dpBtn.setAttribute("data-toggle", "dropdown");
    dpBtn.innerHTML = "List of words";

    const dpMenu = document.createElement("div");
    dpMenu.classList.add("dropdown-menu");

    for(let i = 0; i < 20; i++) {
        const dpItem = document.createElement("button");
        dpItem.classList.add("dropdown-item");
        dpItem.type = "button";
        dpItem.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.firstChild.checked = !e.target.firstChild.checked;
        }
        const inputItem = document.createElement("input");
        inputItem.type = "checkbox";
        inputItem.checked = true;
        dpItem.innerText = words[i];
        inputItem.value = words[i];
        dpItem.prepend(inputItem);    

        dpMenu.appendChild(dpItem);
    }

    dpDiv.appendChild(dpBtn);
    dpDiv.appendChild(dpMenu);
 
    const container = document.querySelector(".container");
    const cloudFrame = document.querySelector("#cloud");
    container.insertBefore(dpDiv, cloudFrame);


    // to delete
    const drawBtn = document.createElement("button");
    drawBtn.classList.add("btn", "btn-primary", "btn-draw");
    drawBtn.id = "btn-default";
    drawBtn.innerText = "Generate Maps";
    
    const graphIcon = document.createElement("i");
    graphIcon.classList.add("fas", "fa-project-diagram");
    graphIcon.style = "margin-right: 5px";
    drawBtn.prepend(graphIcon);
    
    dpDiv.appendChild(drawBtn);
}
