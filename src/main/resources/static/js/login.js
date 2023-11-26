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

function userLogin() {
  var email = document.getElementById('user_email').value;
  var password = document.getElementById('user_password').value;
  alert('email : ' + email + '\npassword: '+ password);
  return true;
}

function companyLogin() {
  var email = document.getElementById('company_email').value;
  var password = document.getElementById('company_password').value;
  alert('email : ' + email + '\npassword: '+ password);
  return true;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('companybutton').style.backgroundColor = '#f0f0f0';
  });
  