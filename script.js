function calculateDates() {
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
  
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);
  
    const dateArray = [];
  
    while (startDate <= endDate) {
      dateArray.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
  
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = "Fechas intermedias:<br>";
  
    dateArray.forEach((date) => {
      resultElement.innerHTML += date.toDateString() + "<br>";
    });
}

const dropArea = document.querySelector(".drag-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("#upload");
const input = dropArea.querySelector("#input-file");
let files;

button.addEventListener("click", (e) => {
  input.click();
});

input.addEventListener("change", (e) => {
  files = this.files;
  dropArea.classList.add("active");
  showFiles(files);
  dropArea.classList.remove("active");
});

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Drop to upload the files";
});

dropArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropArea.classList.remove("active");
  dragText.textContent = "Drag and Drop your documents";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  files = e.dataTransfer.files;
  showFiles(files);
  dropArea.classList.remove("active");
  dragText.textContent = "Drag and Drop your documents";
});

function showFiles(files){
  if(files.length == undefined){
    processFile(files);
  } else{
    for(const file of files){
      processFile(file);
    }
  }
}

function processFile(file){
  const docType = file.type;
  const validExtensions = ['text/csv'];

  if(validExtensions.includes(docType)){
    //valid file
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(32).substring(7)}`;
  } else{
    alert('That is not a valid .csv file!');
  }
}