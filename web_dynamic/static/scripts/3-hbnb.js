/* documentation script */

function eachConstruct (place, userName) {
  const nArticle = $('<article></article>');
  const ndivpbn = $('<div></div>').addClass('price_by_night');

  const ndivs = ['title_box', 'information', 'user', 'description'].map((x) => {
    return $('<div></div>').addClass(x);
  });
  const infodivs = {
    max_guest: 'Guest',
    number_rooms: 'Bedroom',
    number_bathrooms: 'Bathroom'
  };
  for (const x in infodivs) {
    const stringAmenity = place[x].toString() + ' ' + infodivs[x] + (place[x] !== 1 ? 's' : '');
    infodivs[x] = $('<div></div>').addClass(x).html(stringAmenity);
  }

  /* 0 */
  const usdNightPrice = '$' + place.price_by_night.toString();
  ndivs[0].append(('<h2>' + place.name + '</h2>')).append(ndivpbn.append(usdNightPrice));

  /* 1 */
  for (const x in infodivs) {
    ndivs[1].append(infodivs[x]);
  }

  /* 2 */
  ndivs[2].append('<b>Owner:</b>').append(' ' + userName);

  /* 3 */
  ndivs[3].append((place.description ? place.description : 'None'));

  ndivs.map(function (divitem) {
    return (nArticle.append(divitem));
  });

  return (nArticle);
}

const postStatus = new Promise(function (postSuccess, postFail) {
  const postUrl = 'http://0.0.0.0:5001/api/v1/places_search/';
  const postData = JSON.stringify({});
  const postHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
  $.ajax({
    headers: postHeaders,
    type: 'POST',
    url: postUrl,
    data: postData
  }).done((data, status) => {
    if (status === 'success') {
      postSuccess(data);
    }
  }).fail(() => {
    postFail('Error encountered');
  });
});

/* get function */
function getStatus (localUrl) {
  const urlstatus = localUrl + 'status';

  $.get(urlstatus, (data, success) => {
    if (success === 'success') {
      $('div.unavailable').removeClass('unavailable');
    } else {
      $('div.available').removeClass('available');
    }
  });
}
$(document).ready(() => {
  const localUrl = 'http://0.0.0.0:5001/api/v1/';
  const amenityMap = new Map();

  getStatus(localUrl);

  let namePlace = [];
  postStatus.then((data) => {
    namePlace = data.slice();

    Promise.all(data.map((place) => {
      const userlink = localUrl + 'users/' + place.user_id;
      return ($.get(userlink));
    }))
      .then((responses) => {
        for (const x in responses) {
          const userName = responses[x].first_name + ' ' + responses[x].last_name;

          $('section.places').append(eachConstruct(namePlace[x], userName));
        }
      });
  });

  $('input[type=checkbox]').change(function () {
    const amenityName = $(this).data('name').slice(1);
    const amenityId = $(this).data('id');

    if ($(this).is(':checked')) {
      amenityMap.set(amenityName, amenityId);
    } else {
      amenityMap.delete(amenityName);
    }

    let h4String = amenityMap.size > 0 ? '' : '&nbsp;';
    let count = 0;

    for (const x of amenityMap.keys()) {
      h4String = count === 0 ? x : h4String + ', ' + x;
      count++;
    }
    $('div.amenities > h4').html(h4String);
  });
  /* deal with overflow later */
});
