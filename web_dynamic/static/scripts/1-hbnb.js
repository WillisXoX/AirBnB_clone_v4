<<<<<<< HEAD
$(document).ready(() => {

    var amenities = $('.amenity-box');
    var amenities_obj = {};

    for (let i = 0; i < amenities.length; i++) {
        $(amenities[i]).change(() => {
            if ($(amenities[i]).is(':checked')){
                let id = amenities[i].getAttribute('data-id');
                let name = amenities[i].getAttribute('data-name');

                if (amenities_obj[id] === undefined){
                    amenities_obj[id] = name;
                }
            }else{
                let id = amenities[i].getAttribute('data-id');
                delete amenities_obj[id];
            }

            // Print dict elements
            var amenities_string = "";
            var size = Object.keys(amenities_obj).length;
            for(var key in amenities_obj) {
                var value = amenities_obj[key];
                if (size > 1){
                    amenities_string += amenities_obj[key] + ", ";
                }else{
                    amenities_string += amenities_obj[key];
                }
                size--;
            }
            $('.amenities_list').text(amenities_string);
            console.log(amenities_string);
        });
    }
});
=======
$( document ).ready(function () {

  /*****************************************************
    display list of checkboxes clicked
   *****************************************************/
  let ls_amen = [];
  $('input[type=checkbox]').change (function () {
    let name = $(this).attr('data-name');
      if ($(this).is(':checked')) {
	ls_amen.push(name);
      } else {
	ls_amen = ls_amen.filter(amen => amen !== name);
      }
    $('.amenities h4').text(ls_amen.join(', '));
  });

});
>>>>>>> 7935defc74ddedb01422bd63848c4da05a9eba93
