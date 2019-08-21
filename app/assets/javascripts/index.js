$(function(){

  var search_list = $("#user-search-result")

  function appendUser(user) {
    var html = 
    `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}"data-user-name="${user.name}">追加</div>
      </div>
    `
    search_list.append(html)
  }

  function noSearchResult(msg) {
    var html = 
      `<div class="chat-group-user clearfix">
         <p　class="chat-group-user__name">${ msg }</p>
       </div>`
    search_list.append(html);
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
      var preUsers;
      if (users != preUsers && input.length !== 0) {
        if(users.length !== 0 ){
          $(".user-search-result").empty();
          users.forEach(function(user){
            appendUser(user)
          });
        } else {
          $(".user-search-result").empty();
          noSearchResult("一致するユーザーが見つかりません");
        }
        preUsers = user
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
});