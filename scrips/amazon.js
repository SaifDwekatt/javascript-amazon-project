import { products } from '../data/products.js';
import { cart, addToCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = ''; // تصحيح اسم المتغير
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count-primary">
          ${product.rating.count}
        </div>
      </div>
      <div class="product-price">
        $${formatCurrency(product.priceCents / 100)}
      </div>
      <div class="product-quantity-container">
        <select>
          ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}
        </select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart">
        <img src="images/icons/checkmark.png"> Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// إدراج المنتجات في العنصر المحدد
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// تحديث كمية السلة
function updateCartQuantity() {
  let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// التعامل مع أزرار "إضافة إلى السلة"
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});
