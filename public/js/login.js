$(document).ready(function () {
    $('#logoutBtn').on('click', () => {
      $('#inputEmail').attr("disabled", false);
      $('#inputPassword').attr("disabled", false);
  
      $('#msg').removeClass('alert-danger');
      $('#msg').addClass('alert-success');
      $('#msg').html('');
      $('#msg').hide();
  
      $('#lock').attr('src', '/img/lock.png');
  
      $('#logoutBtn').hide();
      $('#submitBtn').show();
      $('#inputEmail').focus();
    });
  
    $('#form-login').on('submit', (e) => {
      e.preventDefault();
  
      let data = {
        "email": $('#inputEmail').val(),
        "password": $('#inputPassword').val()
      };
      console.log(data);
      $.post("/users/login", data, function () {
      })
        .done(function (res) {
          $('#msg').removeClass('alert-danger');
          $('#msg').addClass('alert-success');
          $('#msg').html('Success!');
    
          $('#inputEmail').val('');
          $('#inputEmail').attr("disabled", true);
          $('#inputPassword').val('');
          $('#inputPassword').attr("disabled", true);
    
          $('#lock').attr('src', 'img/unlock.png');
    
          $('#submitBtn').hide();
          $('#logoutBtn').show();
          $('#logoutBtn').focus();
        })
        .fail(function (e) {
          if (e.status === 401) {
            $('#msg').html('Account locked!');
          } else if (e.status === 403) {
            $('#msg').html('Invalid Creds!');
          } else {
            $('#msg').html(`Error: ${e.status}`);
          }
  
          $('#msg').removeClass('alert-success');
          $('#msg').addClass('alert-danger');  
          $('#inputEmail').focus();
        });
        $('#msg').show();
    });


    $('#form-register').on('submit', (e) => {
      e.preventDefault();
  
      let data = {
        "email": $('#inputEmail').val(),
        "password": $('#inputPassword').val(),
        "username": $('#inputUsername').val()
      };
      console.log(data);
      $.post("/users/register", data, function () {
      })
        .done(function (res) {
          $('#msg').removeClass('alert-danger');
          $('#msg').addClass('alert-success');
          $('#msg').html('Success!');
    
          $('#inputEmail').val('');
          $('#inputUsername').val('');
          $('#inputPassword').val('');
    
          $('#registerBtn').hide();
          window.location.href = "/users/login"
        })
        .fail(function (e) {
          if (e.status === 401) {
            $('#msg').html('Account locked!');
          } else if (e.status === 403) {
            $('#msg').html('Invalid Creds!');
          } else {
            $('#msg').html(`Error: ${e.status}`);
          }
  
          $('#msg').removeClass('alert-success');
          $('#msg').addClass('alert-danger');  
          $('#inputEmail').focus();
        });
        $('#msg').show();
    });
  });