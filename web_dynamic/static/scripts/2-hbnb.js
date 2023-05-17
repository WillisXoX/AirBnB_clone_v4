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

    const status_api = 'http://127.0.0.1:5002/api/v1/status/';

    $.ajax({
        url: status_api,
        dataType: 'json'
      }).done((data) => {
        if (data['status'] === "OK"){
            console.log(data);
            $('div#api_status').addClass('available');
        }
      });
});