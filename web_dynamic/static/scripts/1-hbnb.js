/* documentation script */
$(document).ready(() => {
  const amenityMap = new Map();
  /* $('div.amenities').find('h4'); */

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
