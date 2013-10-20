// make sure trim is available 
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

// define our list class
function List () {

  var showed_warning = false; 

  this.show_input_warning = function () {
    $('#add-item').val('').attr('placeholder', 'Please enter an item that is NOT empty...');
    showed_warning = true; 
  }

  this.reset_add = function () {

    var $add_item = $('#add-item');

    if ( showed_warning ) {
      showed_warning = false; 
      $add_item.attr('placeholder', 'Enter an item...');
    }

    $add_item.val('');
  }

  this.check_empty = function () {
    if ( $('.item').length > 0 ) {
      $('#empty-list-msg').hide();
      $('#buttons').show();
    } else {
      $('#empty-list-msg').delay(250).fadeIn(250);
      $('#buttons').hide();
    }
  }

  this.add_item = function ( item ) {
    var new_item = '<li class="item"><input type="checkbox"><label>' + item + '</label></li>'
    $("#list").prepend(new_item);
    this.check_empty();
  }

  this.clear_checked = function () {
    $(".checked").remove();
    this.check_empty();
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

  $('form').keypress( function(e) {

    // listen for enter
    if (e.keyCode === 13) {

      console.log("got osmething");

      var item = new String($('#add-item').val());
      item = item.trim(); /* remove white space */

      if ( item ) {
        this_list.add_item(item);
        this_list.reset_add();
      } else {
        this_list.show_input_warning();
      }

      // prevent form reloading
      e.preventDefault();

    }

  });
});
