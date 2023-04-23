$.ajax({
    url: "/cart/" + productId,
    type: "DELETE",
    success: function(response) {
      // handle successful response from server
    },
    error: function(xhr) {
      // handle error response from server
    }
  });