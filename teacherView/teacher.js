import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZRPGtD-zXfKYRy-98FwmFlD3WEZisKno",
  authDomain: "logicalfunnyquiz.firebaseapp.com",
  projectId: "logicalfunnyquiz",
  storageBucket: "logicalfunnyquiz.appspot.com",
  messagingSenderId: "109271917334",
  appId: "1:109271917334:web:92a74c465c489e78816637",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const table = document.getElementById("table");
let html = `<tr id="tr">
<th>Nombre:</th>
<th>Puntaje:</th> 
<th>Tiempo (seg):</th>
</tr>
`;

window.addEventListener("DOMContentLoaded", () => {
  loadTable();
});

async function loadTable() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    addTable(doc.data())
  });

  table.innerHTML += html;
}

const addTable = (data) => {
  console.log(data);
  html += `
    <tr>
        <td>${data.name}</td>
        <td>${data.score}</td>
        <td>${data.time}</td>
    </tr>`;
  
};
