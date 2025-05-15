// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAlKJEz_F0bfuPvuyFqwRxmvpzqInzc66c",
  authDomain: "fir-project-cc625.firebaseapp.com",
  databaseURL: "https://fir-project-cc625-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-project-cc625",
  storageBucket: "fir-project-cc625.firebasestorage.app",
  messagingSenderId: "638635005703",
  appId: "1:638635005703:web:3433da7c8c6627447797a2",
  measurementId: "G-9QEPJMF6CX"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// CREATE
userForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const userRef = db.ref('users').push();
  userRef.set({ name, email });
  userForm.reset();
});

// READ & DISPLAY
function renderUsers() {
  db.ref('users').on('value', snapshot => {
    userList.innerHTML = '';
    snapshot.forEach(child => {
      const user = child.val();
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${user.name}</strong> (${user.email})
        <button onclick="editUser('${child.key}', '${user.name}', '${user.email}')">Edit</button>
        <button onclick="deleteUser('${child.key}')">Delete</button>
      `;
      userList.appendChild(li);
    });
  });
}
renderUsers();

// UPDATE
window.editUser = function(key, name, email) {
  const newName = prompt("Edit name:", name);
  const newEmail = prompt("Edit email:", email);
  if (newName && newEmail) {
    db.ref('users/' + key).update({ name: newName, email: newEmail });
  }
};

// DELETE
window.deleteUser = function(key) {
  if (confirm("Are you sure you want to delete this user?")) {
    db.ref('users/' + key).remove();
  }
};