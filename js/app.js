// make sure trim is available 
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

// define our list class
function List () {

  this.add_item = function ( item ) {
    var new_item = '<li class="item"><input type="checkbox"><label>' + item + '</label></li>'
    $('#list').prepend(new_item);
  }

  this.clear_checked = function () {
    $(".checked").remove();
  }

  this.check_all = function () {
    $('input[type="checkbox"]').prop('checked',true);
    $('.item').addClass('checked');
  }

  this.uncheck_all = function () {
    $('input[type="checkbox"]').prop('checked',false);
    $('.item').removeClass('checked');
  }

}

$(document).ready(function(){

  var this_list = new List();

  // bind to all input checkbox
  $(document).on('click','input[type="checkbox"]',function () {
    $(this).parent('li').toggleClass('checked');
  });

  $('button').click(function(){
    var button_id = $(this).attr('id');

    if ( button_id === 'clear') {
      this_list.clear_checked();
    } else if ( button_id === 'check' ) {
      this_list.check_all();
    } else if ( button_id === 'uncheck' ) {
      this_list.uncheck_all();
    }
  });

  // listen to events 
  $('form').keypress( function(e) {

    // listen for enter
    if (e.keyCode === 13) {

      var item = new String($('#add-item').val());
      item = item.trim();

      if ( item ) {
        this_list.add_item(item);
        $('#add-item').val('');
      }

      // prevent form reloading
      e.preventDefault();

    }

  });
});
