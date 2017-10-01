$(() => {


/////////////////////// poll

  $(".submitoptions").on("click", function(event) {

    var orderArray = [];
    $("li").each(function() {
      orderArray.push($(this).attr("rel"));
    });
    console.log(orderArray);
    //orderArray now returns the order submitted!!!!!
    //use rel not id in html
    $.ajax({
      method: 'POST',
      url: '/poll',
      data: {
       options: orderArray
      },
      success() {
        $(window).attr('location','/thankyou')
      }
    })
  });

//////////////////////// createpoll
  let counter = 1;
  $(".creatediv").on("click", function(event) {
    event.preventDefault();
    $(".options_section").append(`
      <div class="option_container">
        <button class="delete-option"> x </button>
        <input name="option_name_${counter}" class="option_name form-control" placeholder="Enter option"></input>
        <textarea name="option_desc_${counter}" class="option_desc form-control" placeholder="Enter description (optional)"></textarea>
        <div class="row text-sm-left upload">
          <div class="col-sm-5">
            <label class="text-info">image:</label>
          </div>
          <div class="col-sm-7">
            <input type="file" name="image_url_${counter}" class="text-info file">
          </div>
        </div>
      </div>`)
      counter++;
      console.log(counter)
  });



  $('.options_section').on('click', '.delete-option', function(){
    $(this).closest('.option_container').remove();
  });


});

$('#cameraInput').on('change', function(e){
 $data = e.originalEvent.target.files[0];
  $reader = new FileReader();
  reader.onload = function(evt){
  $('#your_img_id').attr('src',evt.target.result);
  reader.readAsDataUrl($data);
}});


//////////////////////// results




/*
 *  Function to update results options with new
 *  data from AJAX GET request
 */

 function getNewVotesAndUpdate(id) {
  $.ajax({
    method: 'GET',
    url: `/results/${id}/json`,
    success(data) {
      let resultsTable = $('.results-table > tbody');
      resultsTable.empty();
      let currRow = 1;
      data.poll.options.forEach(function (o) {
        resultsTable
          .append($('<tr>')
            .append($('<td>')
              .text(currRow)
            )
            .append($('<td>')
              .text(unescape(o.option_name))
            )
            .append($('<td>')
              .text(o.sum)
            )
          )
        currRow = currRow + 1;
      });
    },
    error(data) {
      console.log("Error")
    }
  })
 }





