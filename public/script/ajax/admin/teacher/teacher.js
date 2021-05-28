$( document ).ready(function() {
  
    // SUBMIT FORM
      $("#userForm").submit(function(event) {
      // Prevent the form from submitting via the browser.
      event.preventDefault();
      ajaxPost();
    });
      
      
      function ajaxPost(){
        
        // PREPARE FORM DATA
        var formData = {
          tname : $("#tname").val(),
          teacher_uid : $("#teacher_uid").val(),
          file : $("#file").val(),
          email : $("#email").val(),
          password : $("#password").val(),
          confpassword : $("#confpassword").val(),
        }
        
        // DO POST
        $.ajax({
        type : "POST",
        contentType : "application/json",
        url : window.location + "/post",
        data : JSON.stringify(formData),
        dataType : 'json',
        success : function(result, status, xhr) { 
          $("#postResultDiv").html("<p>"+result.redirectTo+"</p>"); 
        },
  
        error : function(e) {
          $("#postResultDiv").html("<p>" + "Post Already Exist On MongoDB Database! <br>" +"</p>"); 
        }
      })
          
        // Reset FormData after Posting
        resetData();
  
      }
  
      function resetData(){
        $("#tname").val("");
        $("#teacher_uid").val("");
        $("#file").val("");
        $("#email").val("");
        $("#password").val("");
        $("#confpassword").val("");
        }
  
    //------------------------------------------------------------------------------------------------//

   
  
  
  })