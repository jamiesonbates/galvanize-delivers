(function() {
  'use strict';

  // Order Selection and Cashier
  let subtotal = 0;

  const cashier = function(stringPrice) {
    const price = parseFloat(stringPrice.slice(1));
    subtotal += price;
    let taxTrue = subtotal * 0.0975;
    let tax = parseFloat(taxTrue.toFixed(2));
    let total = (subtotal + tax).toFixed(2);

    let subtotalStr= '$' + subtotal;
    let taxStr = '$' + tax;
    let totalStr = '$' + total;

    $('.subtotal').text(subtotalStr);
    $('.tax').text(taxStr);
    $('.total').text(totalStr);
  };

  const createLeger = function(item, price) {
    const $tr = $('<tr>');
    const $tdItem = $('<td>').text(item);
    const $tdPrice = $('<td>').text(price);

    $tdPrice.addClass('right');

    $tr.append($tdItem);
    $tr.append($tdPrice);
    $('tbody').append($tr);
  }

  $('.card-action a').click( (event) => {
    const $cardContent = $(event.target).parent().siblings('.card-content');
    const $item = $cardContent.children('.item').text();
    const $price = $cardContent.children('.price').text();

    createLeger($item, $price);
    cashier($price);
  })


  // Order Validation and Messaging
  const dialogContent = function(message) {
    let $dialogContent = $(`<span>${message}</span>`);
    Materialize.toast($dialogContent, 5000);
  }

  const dialogs = function() {
    if (subtotal > 0 && $('.name').val() !== '' && $('.phone-number').val() !== '' && $('address').val() !== '') {
      dialogContent('Your Order was Placed!');
    }
    if (subtotal === 0) {
      dialogContent('Please select an item.');
    }
    if ($('.name').val() === '') {
      dialogContent('Please enter your name.');
    }
    if ($('.phone-number').val() === '') {
      dialogContent('Please enter your phone number.');
    }
    if ($('.address').val() === '') {
      dialogContent('Please enter your address.');
    }
  };

  $('.order-conversion button').click( () => {
    dialogs();
  })

})();
