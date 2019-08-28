$(function(){
  function buildHTML(message) {
    var content = message.content? `${ message.content }` : "";
    var img = message.image? `<img src= ${message.image.url}>`: "";
    var html = `<div class="message" data-message-id="${ message.id }"
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
  
    var reloadMessages = function(){
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data('message-id');
        $.ajax({
          url: 'api/messages',
          type: 'get',
          dataType: 'json',
          data: {last_id: last_message_id}
        })

        .done(function(messages){
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        })

        .fail(function(){
          alert('メッセージの更新に失敗しました');
        }); 
      }
    };
    setInterval(reloadMessages,5000);   
  });
});