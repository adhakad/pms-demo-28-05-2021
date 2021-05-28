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
        student_name : $("#student_name").val(),
        student_id : $("#student_id").val(),
        password : $("#password").val(),
        confpassword : $("#confpassword").val(),
      }
      
      // DO POST
      $.ajax({
      type : "POST",
      contentType : "application/json",
      url : window.location +"/post",
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
       $("#student_name").val("");
       $("#student_id").val("");
       $("#password").val("");
       $("#confpassword").val("");
      }
})