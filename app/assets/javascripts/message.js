$(function(){
  function buildHTML(message) {
    var content = message.content? `${ message.content }` : "";
    var img = message.image? `<img src= ${message.image}>`: "";
    var html = `<div class="message" data-id="${ message.id }"
                <div class="message-info">
                  <p class="message-info__user-name">
                    ${ message.user_name }
                  </p>
                  <p class="message-info__date">
                    ${ message.date }
                  </p>
                  <p class="message-body">
                    ${ content }
                    ${ img }
                  </p>
                </div>`
    return html;
  }
  $(document).on('turbolinks:load', function() {
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this); 
      var url = window.location.href
      $.ajax({
        url: url,
        type: 'POST',
        data: message,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $( ".form__submit").prop( "disabled", false );
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        $('#new_message')[0].reset();
      })
      .fail(function(){
        alert('メッセージ送信に失敗しました。')
      })
    });
  });
});