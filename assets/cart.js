$(function() {
  $('#js-add-to-cart-btn').on('click', function() {
    const $form = $(this).closest('form');

    const variantId = $form.find('select[name="variant_id"]').val();
    const quantity = $form.find('input[name="quantity"]').val();
    const cartIndex = $form.find('input[name="cart_index"]').val();

    $.ajax({
      url: '/cart/add.js',
      type: 'POST',
      dataType: 'json',
      data: {
        id: variantId,
        quantity: quantity,
        properties: {
          cart_index: cartIndex
        }
      },
      success: function(data) {
        const cartItemCount = parseInt(cartIndex) + data.quantity;
        $form.find('input[name="cart_index"]').val(cartItemCount);
        $('#js-cart-item-count-badge').text(cartItemCount);
        alert(`You've added ${data.quantity} item(s) to cart`);
      },
      error: function() {
        alert('Add item to cart failed');
      }
    });
  });
});
