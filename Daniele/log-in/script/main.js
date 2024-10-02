function handleSignIn() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  // Simula un'azione di login
  console.log("Email:", email);
  console.log("Password:", password);
  alert(`Welcome, ${email}!`);
}
function goBack() {
  window.history.back();
}
