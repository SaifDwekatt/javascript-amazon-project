// Initialize the cart from localStorage or set it to default values if not found
export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2,
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1,
}];

// Function to save the cart to localStorage
function saveToStorage() {
  // Store the current cart in localStorage as a JSON string
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart
export function addToCart(productId) {
  let matchingItem;

  // Check if the product is already in the cart
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem; // If found, set matchingItem to the existing cart item
    }
  });

  // If the item is found, increase its quantity
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    // If not found, add a new item to the cart with quantity 1
    cart.push({
      productId: productId,
      quantity: 1,
    });
  }

  // Save the updated cart to localStorage
  saveToStorage();
}

// Function to remove a product from the cart
export function removeFromCart(productId) {
  // Create a new array excluding the product to be removed
  const newCart = cart.filter((cartItem) => cartItem.productId !== productId);

  // Update the cart with the new array
  cart = newCart;

  // Save the updated cart to localStorage
  saveToStorage();
}
