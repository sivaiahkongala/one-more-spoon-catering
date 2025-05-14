const menuData = {
    "Starters": ["Masala Vada", "Mirapakaya Bajji", "Potato Fry", "Onion Pakoda", "Kosambari", "Banana", "Bendi Fry", "Carrot and Beans Fry", "Gobi", "Salad - Pomegranate Sweetcorn Peanut", "Baby Corn Manchurian", "Holige", "Sweet Corn Peanut Salad"],
    "Roti": ["Poori", "Chapathi"],
    "Flavoured Rice": ["White Rice", "Veg Biryani", "Mushroom Biryani", "Pudhina Rice", "Ghee Rice", "Puliyogare", "Veg Pulao", "Curd Rice (with Fruits)"],
    "Curry's": ["Dal (Palak/Methi/Berakaya/Tamoto/Gongura/Thoatkura/Dosakaya/chukkaku)", "Gutti Vankaya", "Tamato Drumstic", "Alu Tamato", "Alu Mutter", "Sambar", "Rasam", "Paneer Butter Masala", "Channa masala (Chole Masala)", "Veg curry"],
    "Pickle's": ["Mango", "Lemon", "mixed Veg", "Gongura", "Birakaya"],
    "Curd Items": ["Raitha", "Curd", "Butter milk"],
    "Sweet": ["Carrot Halwa", "Gulab Jamun", "Kesari bath", "Semiya Payasam (Kheer)"],
    "Chips": ["Papad", "Bat Appalam"],
    "Ice Cream": ["vanilla", "strawberry", "chocolate", "Butterscotch"],
    "Extras": ["Water Bottle", "Podi", "Ghee", "Sweet Paan"],
    "Break Fast": ["Idli", "Masala Vada", "Poori", "Vade", "Pongal", "Kesari bath", "Tea", "Coffee"]
};

const menuContainer = document.getElementById("menu");
const selectedItems = [];
const quantityItems = ["Idli", "Masala Vada", "Poori", "Vade"];

function renderMenu() {
    for (const category in menuData) {
        const catDiv = document.createElement("div");
        catDiv.className = "category";
        catDiv.innerHTML = `<h2>${category}</h2>`;

        menuData[category].forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.className = "item";
            if (category === "Break Fast" && quantityItems.includes(item)) {
                itemDiv.innerHTML = `
                    <label><input type="number" min="0" value="0" data-item="${item}"> ${item}</label>
                `;
            } else {
                itemDiv.innerHTML = `
                    <label><input type="checkbox" data-item="${item}"> ${item}</label>
                `;
            }
            catDiv.appendChild(itemDiv);
        });

        menuContainer.appendChild(catDiv);
    }
}

function updateSelectedItems() {
    const result = [];
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(cb => {
        if (cb.checked) result.push(cb.dataset.item);
    });

    const counts = document.querySelectorAll("input[type='number']");
    counts.forEach(cnt => {
        const val = parseInt(cnt.value);
        if (val > 0) result.push(`${cnt.dataset.item} x${val}`);
    });

    document.getElementById("selectedItems").value = result.join(", ");
    const encoded = encodeURIComponent(result.join(", "));
    const plates = document.getElementById("plates").value || 1;
    const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLSedqd7Ehih_hUHBhrubUPQao73r1nSiYqGpvqB4fKfdQ9Drew/viewform?usp=pp_url&entry.1188491729=${encoded}&entry.953007131=${plates}`;
    document.getElementById("submitBtn").href = formUrl;
}

document.addEventListener("input", updateSelectedItems);
renderMenu();
