const socket = io.connect('http://localhost:5000')

socket.on('display_output', function(data) {
  console.log(data.output); // Aquí, muestra la salida o manipula el DOM como prefieras
  // Por ejemplo, puedes actualizar un elemento del DOM con la salida
  // document.getElementById("tuElementoID").innerText = data.output;
});

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

function uploadToServer(file) {
  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(result => {
      alert(result);
      // Aquí es donde puedes enviar el comando a tu servidor Flask a través de Socket.IO
      socket.emit('send_command', { command: 'tu_comando_aqui' }); 
  })
  .catch(error => {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
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

function processFile(file) {
  const docType = file.type;
  const validExtensions = ['text/csv'];

  if(validExtensions.includes(docType)){
      // Pregunta al usuario si quiere guardar el archivo en el servidor
      const shouldSave = confirm("¿Desea guardar este archivo en el servidor?");
      if (shouldSave) {
          uploadToServer(file);
      }
  } else{
      alert('That is not a valid .csv file!');
  }
}

function uploadToServer(file) {
  const formData = new FormData();
  formData.append('file', file);

  fetch('/upload', {
      method: 'POST',
      body: formData
  })
  .then(response => response.text())
  .then(result => {
      alert(result);
  })
  .catch(error => {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
  });
}