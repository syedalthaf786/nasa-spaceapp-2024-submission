const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const signupModal = document.getElementById("signupModal");
    const closeLogin = document.getElementById("closeLogin");
    const closeSignup = document.getElementById("closeSignup");
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");

    // Show login modal
    loginBtn.onclick = function () {
      loginModal.style.display = "block";
      signupModal.style.display = "none";
    }

    // Close login modal
    closeLogin.onclick = function () {
      loginModal.style.display = "none";
    }

    // Close signup modal
    closeSignup.onclick = function () {
      signupModal.style.display = "none";
    }

    // Close modals when clicking outside
    window.onclick = function (event) {
      if (event.target == loginModal || event.target == signupModal) {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
      }
    }

    // Switch to login modal from signup modal
    loginLink.onclick = function () {
      loginModal.style.display = "block";
      signupModal.style.display = "none";
    }

    // Switch to signup modal from login modal
    signupLink.onclick = function () {
      signupModal.style.display = "block";
      loginModal.style.display = "none";
    }
