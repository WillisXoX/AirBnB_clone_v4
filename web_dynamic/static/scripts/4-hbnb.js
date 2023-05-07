
$(document).ready(() => {

    // Get amenities checked list
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
            console.log(amenities_obj);
        });
    }

    // Get all places from api
    const places_search = 'http://127.0.0.1:5001/api/v1/places_search';

    $.ajax({
        url: places_search,
        type: "POST",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json"
        })
        .done((data) => {
            // Get user from user_id
            let data_size = Object.keys(data).length;
            for (let i = 0; i < data_size; i++) {
                let user_api = 'http://127.0.0.1:5001/api/v1/users/' + data[i].user_id;

                $.ajax({
                    url: user_api,
                    dataType: 'json'
                }).done((user) => {
                    data[i].first_name = user['first_name'];
                    data[i].last_name = user['last_name'];
                });
            }
            articles_data(data);
    });

    // Get status from api
    const status_api = 'http://127.0.0.1:5001/api/v1/status/';
    $.ajax({
        url: status_api,
        dataType: 'json'
      }).done((data) => {
        if (data['status'] === "OK"){
            console.log(data);
            $('div#api_status').addClass('available');
        }
    });

    // Get places by amineties
    $('button').click(() => {
        $.ajax({
            url: places_search,
            type: "POST",
            data: JSON.stringify({"amenities": amenities_obj}),
            dataType: "json",
            contentType: "application/json"
            })
            .done((data) => {
                // Get user from user_id
                let data_size = Object.keys(data).length;
                for (let i = 0; i < data_size; i++) {
                    let user_api = 'http://127.0.0.1:5001/api/v1/users/' + data[i].user_id;
                    $.ajax({
                        url: user_api,
                        dataType: 'json'
                    }).done((user) => {
                        data[i].first_name = user['first_name'];
                        data[i].last_name = user['last_name'];
                    });
                }
                $('.places').empty();
                articles_data(data);
        });
    });

    function articles_data(place){
        let places = $('.places');

        let place_size = Object.keys(place).length;
        for (let i = 0; i < place_size; i++) {

            // Articles block
            const articles = $("<article></article>");

            // Title box block
            const title_box = $("<div></div>").addClass('title_box');
            const title_box_h2 = $("<h2></h2>").text(place[i].name);
            const title_box_price_by_night = $("<div></div>").addClass('price_by_night').text('$' + place[i].price_by_night);

            title_box.append(title_box_h2);
            title_box.append(title_box_price_by_night);

            // Information block
            const information = $("<div></div>").addClass('information');

            let guests = '';
            if (place[i].max_guest > 1){
                guests = 'Guests';
            }else{
                guests = 'Guest';
            }
            const information_max_guest = $("<div></div>").addClass('max_guest').text(place[i].max_guest + ' ' + guests);

            let rooms = '';
            if (place[i].number_rooms > 1){
                rooms= 'Rooms';
            }else{
                rooms = 'Room';
            }
            const information_number_rooms = $("<div></div>").addClass('number_rooms').text(place[i].number_rooms + ' ' +rooms);

            let bathrooms = '';
            if (place[i].number_bathrooms > 1){
                bathrooms = 'Bathrooms';
            }else{
                bathrooms = 'Bathroom';
            }
            const information_number_bathrooms = $("<div></div>").addClass('number_bathrooms').text(place[i].number_bathrooms + ' ' + bathrooms);

            information.append(information_max_guest);
            information.append(information_number_rooms);
            information.append(information_number_bathrooms);

            // User block
            const user = $("<div></div>").addClass('user');
            const user_b = $("<b></b>").text('Owner: ');

            user.append(user_b);

            const first_name = place[i].first_name || 'None';
            const last_name = place[i].last_name || 'None';
            user.append(first_name + ' ' + last_name);

            // Description block
            const description = $("<div></div>").addClass('description');
            description.append(place[i].description || 'None');
            
            articles.append(title_box);
            articles.append(information);
            articles.append(user);
            articles.append(description);

            places.append(articles);
        }
    }

});