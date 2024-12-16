const API_BASE_URL = "http://localhost:3000";
// Show Signup Form
function showSignup() {
  document.getElementById("signup-form").style.display = "block";
  document.getElementById("login-form").style.display = "none";
}

// Show Login Form
function showLogin() {
  document.getElementById("signup-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}

// Signup Logic
async function signup() {
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      alert("Signup successful! Please login.");
      showLogin();
    } else {
      const error = await response.text();
      alert(`Signup failed: ${error}`);
    }
  } catch (err) {
    alert("Error during signup. Please try again.");
  }
}

// Login Logic
async function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Login successful!");
      console.log("Token:", data.token);
      // Save the token for future requests (optional)
      localStorage.setItem("token", data.token);
    } else {
      const error = await response.text();
      alert(`Login failed: ${error}`);
    }
  } catch (err) {
    alert("Error during login. Please try again.");
  }
}
