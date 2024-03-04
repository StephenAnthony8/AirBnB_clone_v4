/* documentation script */
/* function placeconstruct (place) {
  let rtnHtml;

  for (x in place) {
    eachConstruct(x).then(
      function (value) { rtnHtml += value; }
    );
  }
  $('section.places').html(rtnHtml);
}
async function eachConstruct (place) {
  const nArticle = $('<article></article>');
  const ndivpbn = $('<div></div>').addClass('price_by_night');
  const userUrl = 'http://0.0.0.0:5001/api/v1/users/' + place.user_id;

  const userName = $.get(userUrl, (data, status) => {
    if (status === 'success') {
      return (data.first_name + ' ' + data.last_name);
    } else {
      return ('unavailable');
    }
  });

  const ndivs = [
    $('<div></div>').addClass('title_box'),
    $('<div></div>').addClass('information'),
    $('<div></div>').addClass('user').html('<b>Owner:</b>'),
    $('<div></div>').addClass('description')
  ];
  const infodivs = [
    $('<div></div>').addClass('max_guest').html(('Guest' + (place.max_guest != 1 ? '' : 's'))),
    $('<div></div>').addClass('number_rooms').html(('Bedroom' + (place.number_rooms != 1 ? '' : 's'))),
    $('<div></div>').addClass('number_bathrooms').html(('Bathroom' + (place.number_bathrooms != 1 ? '' : 's')))
  ]; */
/* 0 */
// ndivs[0].append(('<h2>' + place.name + '</h2>')).append(ndivpbn.append(place.price_by_night));

/* 1 */
/* infodivs.forEach(function (item) {
    ndivs[1].append(item);
  }); */

/* 2 */
/* ndivs[2].append(userName); */

/* 3 */
/* ndivs[3].append((place.description ? place.description : 'None')); */

/* ndivs.forEach(function (divitem) {
    nArticle.append(divitem);
  });
  return (nArticle);
} */

/* function jsonRetriever (appendUrl, json_item) {
} */
/* function postStatus (localUrl) {
  const postUrl = localUrl + 'places_search/';
  const postData = JSON.stringify({});
  const postHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  $.ajax({
    headers: postHeaders,
    type: 'POST',
    url: postUrl,
    data: postData,
    success: function (result) {
      /* alert(result.length); */
/* placeconstruct(result);
    },
    error: function (error) {
      alert('error');
    }
  });
} */
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

  // postStatus(localUrl);

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
