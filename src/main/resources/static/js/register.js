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

  // var user_fname = document.getElementById('user_fname').value;
  // var user_lname = document.getElementById('user_lname').value;
  // var user_email = document.getElementById('user_email').value;
  // var user_phone = document.getElementById('user_phone').value;
  // var user_password = document.getElementById('user_password').value;
  // alert(`register user ${user_fname}`);
  // console.log(user_fname);
  // fetch(`/userRegister/${user_fname}/${user_lname}/${user_email}/${user_phone}/${user_password}`)
  // .then(response => {
  //     if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  // })
  // .then(results => {
  //   console.log(results)
  //   if(results === "1"){
  //     window.location.href = `/login`;
  //   } else {
  //     console.log("wrong user register something")
  //   }
  // })
  // .catch(error => {
  //     console.error('Search error:', error);
  // });
}

function companyRegister() {
// Handle company Register logic here (e.g., validate form inputs)
// alert('Company Register logic goes here');
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




  


