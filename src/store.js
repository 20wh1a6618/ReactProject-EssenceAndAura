import { configureStore, createSlice } from "@reduxjs/toolkit";

// Product slice
const productSlice = createSlice({
    name: 'products',
    initialState: {
        women: [
            { brand: "Chanel", name: "Coco Mademoiselle", price: 150, image: "public/images/Chanel - Bleu de Chanel.jpg"},
            { brand: "Dior", name: "J'adore", price: 135, image: "public/images/Dior - J'adore.jpg" },
            { brand: "Yves Saint Laurent", name: "Black Opium", price: 130, image: "public/images/Yves Saint Laurent - Black Opium.jpg" },
            { brand: "Tom Ford", name: "Black Orchid", price: 180, image: "public/images/Tom Ford - Black Orchid.jpg" },
            { brand: "Lancôme", name: "La Vie Est Belle", price: 125, image: "public/images/Lancôme - La Vie Est Belle.jpg" },
            { brand: "Gucci", name: "Bloom", price: 120, image: "public/images/Gucci - Bloom.jpg" },
            { brand: "Viktor & Rolf", name: "Flowerbomb", price: 165, image: "public/images/Viktor & Rolf - Flowerbomb.jpg" },
            { brand: "Dolce & Gabbana", name: "Light Blue", price: 100, image: "public/images/Dolce & Gabbana - Light Blue.jpg" },
            { brand: "Jo Malone", name: "English Pear & Freesia", price: 144, image: "public/images/Jo Malone - English Pear & Freesia.jpg" },
            { brand: "Hermès", name: "Twilly d'Hermès", price: 145, image: "public/images/Hermès - Twilly d'Hermès.jpg" }
        ],
        men: [
            { brand: "Creed", name: "Aventus", price: 445, image: "public/images/Creed - Aventus.jpg" },
            { brand: "Dior", name: "Sauvage Eau de Parfum", price: 125, image: "public/images/Dior - Sauvage Eau de Parfum.jpg" },
            { brand: "Tom Ford", name: "Oud Wood", price: 270, image: "public/images/Tom Ford - Oud Wood.jpg" },
            { brand: "Chanel", name: "Bleu de Chanel", price: 150, image: "public/images/Chanel - Bleu de Chanel.jpg" },
            { brand: "Giorgio Armani", name: "Acqua di Gio Profumo", price: 135, image: "public/images/Giorgio Armani - Acqua di Gio Profumo.jpg" },
            { brand: "Yves Saint Laurent", name: "La Nuit de l'Homme", price: 95, image: "public/images/Yves Saint Laurent - La Nuit de l'Homme.jpg" },
            { brand: "Hermès", name: "Terre d’Hermès", price: 135, image: "public/images/Hermès - Terre d’Hermès.jpg" },
            { brand: "Versace", name: "Eros", price: 105, image: "public/images/Versace - Eros.jpg" },
            { brand: "Paco Rabanne", name: "1 Million", price: 95, image: "public/images/Paco Rabanne - 1 Million.jpg" },
            { brand: "Jean Paul Gaultier", name: "Le Male", price: 95, image: "public/images/Jean Paul Gaultier - Le Male.jpg" }
        ]
    }
});

// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [], discount: 0, couponDiscount: 0 },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1; // Increment quantity if item exists
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // Add new item
            }
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.name === action.payload.name);
            if (index > -1) {
                state.items.splice(index, 1); // Remove item from cart
            }
        },
        incrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity += 1; // Increment the quantity of the item
            }
        },
        decrementQuantity: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1; // Decrement the quantity if greater than 1
            } else if (existingItem && existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.name !== action.payload.name);
            }
        },
        applyDiscount: (state, action) => {
            state.discount = action.payload; // Sets the discount percentage
        },
        applyCoupon: (state, action) => {
            switch (action.payload) {
                case 'sundaysale':
                    state.couponDiscount = 5;
                    break;
                case 'festivesale':
                    state.couponDiscount = 10;
                    break;
                case 'newyearsale':
                    state.couponDiscount = 15;
                    break;
                default:
                    state.couponDiscount = 0; // Reset if invalid
                    break;
            }
        },
        clearCart: (state) => {
            state.items = []; // Clear all items in the cart
            state.discount = 0; // Reset discount
            state.couponDiscount = 0; // Reset coupon discount
        },
    },
});

// Purchase History Slice
const purchaseHistorySlice = createSlice({
    name: 'purchaseHistory',
    initialState: [],
    reducers: {
        addPurchase: (state, action) => {
            state.push(action.payload);
        }
    }
});

const store = configureStore({
    reducer: {
        products: productSlice.reducer,
        cart: cartSlice.reducer,
        purchaseHistory: purchaseHistorySlice.reducer
    }
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, applyDiscount, applyCoupon, clearCart } = cartSlice.actions;
export const { addPurchase } = purchaseHistorySlice.actions;
export default store;
