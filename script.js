document.addEventListener("DOMContentLoaded", () => {
    updateTotal();

    document.body.addEventListener("click", event => {
        if (event.target.classList.contains("quantity-btn")) {
            const isIncrement = event.target.classList.contains("plus");
            const item = event.target.closest(".item");
            if (!item) return;

            const quantityElement = item.querySelector(".quantity");
            if (!quantityElement) return;

            let quantity = parseInt(quantityElement.textContent) || 0;
            quantity = isIncrement ? quantity + 1 : Math.max(1, quantity - 1);
            quantityElement.textContent = quantity;
            updateTotal();
        }

        if (event.target.classList.contains("delete-btn")) {
            const item = event.target.closest(".item");
            if (item) {
                item.remove();
                updateTotal();
            }
        }

        if (event.target.classList.contains("heart-btn")) {
            event.target.classList.toggle("liked");
        }
    });
});

function updateTotal() {
    let total = 0;
    document.querySelectorAll(".item").forEach(item => {
        const priceElement = item.querySelector(".price");
        const quantityElement = item.querySelector(".quantity");
        if (!priceElement || !quantityElement) return;

        const price = parseFloat(priceElement.textContent.replace("€", "")) || 0;
        const quantity = parseInt(quantityElement.textContent) || 0;
        total += price * quantity;
    });
    const totalElement = document.querySelector(".total-price");
    if (totalElement) {
        totalElement.textContent = `Total: ${total.toFixed(2)}€`;
    }
}
