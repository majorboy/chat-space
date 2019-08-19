$(function(){
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var message = new FormData(this); 
    var url = window.location.href + '/messages'
    $.ajax({
      url: url,
      type: 'POST',
      data: message,
      dataType: 'json',
      processData: false,
      contentType: false
    })
  })
});