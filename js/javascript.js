$(document).ready(function(){
  function handleInputColor(self){
    if($(self).val() === '1'){
      $(self).css({
        'background': '#000000',
        'color': '#FFFFFF'
      });
    } else{
      $(self).css({
        'background': '#FFFFFF',
        'color': '#000000'
      });
    }
  }
  
  $('.input').change(function(){
    handleInputColor(this);
  });

  $('.input').click(function(){
    if($(this).val() === '0'){
      $(this).val('1');
    } else{
      $(this).val('0');
    }

    handleInputColor(this);
  });

  $('#resetInput').click(function(){
    $('.input').val('0');
    $('.input').css({
      'background': '#FFFFFF',
      'color': '#000000'
    });
  });

  $('#runNet').click(function(){
    run();
  });
});
