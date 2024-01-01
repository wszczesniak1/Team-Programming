function showUserForm() {
    document.getElementById('userForm').style.display = 'block';
    document.getElementById('companyForm').style.display = 'none';
    document.getElementById('companybutton').style.backgroundColor = '#f0f0f0';
    document.getElementById('userbutton').style.backgroundColor = '#4caf50';
  }
  
function showCompanyForm() {
document.getElementById('userForm').style.display = 'none';
document.getElementById('companyForm').style.display = 'block';
document.getElementById('userbutton').style.backgroundColor = '#f0f0f0';
document.getElementById('companybutton').style.backgroundColor = '#4caf50';
}

function userRegister() {
// Handle user Register logic here (e.g., validate form inputs)
alert('User Register logic goes here');
return true;
}

function companyRegister() {
// Handle company Register logic here (e.g., validate form inputs)
alert('Company Register logic goes here');
return true;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('companybutton').style.backgroundColor = '#f0f0f0';
});

// function checkPasswordMatch() {
//     var password = document.getElementById('company_password').value;
//     var confirmPassword = document.getElementById('company_redopassword').value;

//     var passwordInput = document.getElementById('company_password');
//     var confirmPasswordInput = document.getElementById('company_redopassword');

//     if (password === confirmPassword) {
//       // Passwords match, remove red border
//       passwordInput.classList.remove('password-mismatch');
//       confirmPasswordInput.classList.remove('password-mismatch');
//     } else {
//       // Passwords do not match, add red border
//       passwordInput.classList.add('password-mismatch');
//       confirmPasswordInput.classList.add('password-mismatch');
//     }
//   }

//   // Add event listener to check on input change
//   document.getElementById('company_password').addEventListener('input', checkPasswordMatch);
//   document.getElementById('company_redopassword').addEventListener('input', checkPasswordMatch);




    