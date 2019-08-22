$(function(){

  var search_result = $("#user-search-result")
  var member_list = $(".chat-group-users");

  function appendUser(user) {
    var html = 
      `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}"data-user-name="${user.name}">追加</div>
       </div>`
    search_result.append(html)
  }

  function appendUserToMemberList(name, user_id) {
    var html = 
      `<div class='chat-group-user'>
        <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
        <p class='chat-group-user__name'>${ name }</p>
        <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
       </div>`
    member_list.append(html);
    html.reset();
  }

  function noSearchResult(msg) {
    var html = 
      `<div class="chat-group-user clearfix">
         <p　class="chat-group-user__name">${ msg }</p>
       </div>`
    search_result.append(html);
  }

  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){ 
      $("#user-search-result").empty();
      var preUsers;
      if (users != preUsers && input.length !== 0) {
        if(users.length !== 0 ){
          
          users.forEach(function(user){
            appendUser(user)
          });
        } else {
          noSearchResult("一致するユーザーが見つかりません");
        }
        preUsers = users
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });

    $(function(){
      $(document).on('click','.user-search-add',function(){
        var name = $(this).attr("data-user-name");
        var user_id = $(this).attr("data-user-id");
        appendUserToMemberList(name, user_id);
        $(this).parent().remove();
      });

      $(document).on("click",'.user-search-remove', function(){
        $(this).parent().remove();
      });
    });
  });
});