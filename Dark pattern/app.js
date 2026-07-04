// ==========================================
// 1. SETUP & STATE
// ==========================================
const API_URL = 'https://dummyjson.com/products';

// Global numeric data stores
let basePrice = 0;
let hiddenFees = 0;

// UI Control Toggles
const scarcityToggle = document.getElementById('scarcity-toggle');
const dripToggle = document.getElementById('drip-toggle');
const socialToggle = document.getElementById('social-toggle');

// Layout HTML targets
const apiLoader = document.getElementById('api-loader');
const simulatorInterface = document.getElementById('simulator-interface');
const urgencyBanner = document.getElementById('urgency-banner');
const socialProofToast = document.getElementById('social-proof-toast');
const feeRow = document.getElementById('fee-row');

// Product Bindings
const productImg = document.getElementById('product-img');
const productCategory = document.getElementById('product-category');
const productTitle = document.getElementById('product-title');
const basePriceLabel = document.getElementById('base-price-label');
const livePrice = document.getElementById('live-price');
const subtotalLabel = document.getElementById('subtotal-label');
const feeLabel = document.getElementById('fee-label');
const totalLabel = document.getElementById('total-label');
const analysisText = document.getElementById('analysis-text');
const timerSpan = document.getElementById('timer');
const stockCountSpan = document.getElementById('stock-count');

// ==========================================
// 2. LIVE DATA FETCH (ON INITIAL BOOT)
// ==========================================
async function fetchLiveProductData() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        // Extract a completely random index item from the network list
        const randomIndex = Math.floor(Math.random() * data.products.length);
        const product = data.products[randomIndex];

        // Process pricing structures dynamically based on item cost
        basePrice = product.price;
        hiddenFees = parseFloat((basePrice * 0.45).toFixed(2)); // Hidden fee defaults to 45% of standard retail cost

        // Write live data values into visual elements
        productImg.src = product.thumbnail;
        productCategory.innerText = product.category.toUpperCase();
        productTitle.innerText = product.title;
        basePriceLabel.innerText = `$${basePrice.toFixed(2)}`;
        feeLabel.innerText = `$${hiddenFees.toFixed(2)}`;

        // Swap layout overlay views
        apiLoader.classList.add('d-none');
        simulatorInterface.classList.remove('d-none');

        // Fire initial calculation layout
        updateSimulatorState();

    } catch (error) {
        console.error("Failed to sync store stock inventory data:", error);
        apiLoader.innerHTML = `<p class="text-danger fw-bold">Market connection lost. Please verify internet access or reload the page.</p>`;
    }
}

// ==========================================
// 3. ENGINE PROCESSING MATRIX
// ==========================================
function updateSimulatorState() {
    let currentTotal = basePrice;
    let activatedTricksCount = 0;

    // Trick 1: Scarcity Banner Check
    if (scarcityToggle.checked) {
        urgencyBanner.classList.remove('d-none');
        activatedTricksCount++;
    } else {
        urgencyBanner.classList.add('d-none');
    }

    // Trick 2: Inventory Alert Check (Your new custom low stock tracker!)
    if (socialToggle.checked) {
        socialProofToast.classList.remove('d-none');
        activatedTricksCount++;
    } else {
        socialProofToast.classList.add('d-none');
    }

    // Trick 3: Hidden Drip Pricing Invoice Integration
    if (dripToggle.checked) {
        feeRow.classList.remove('d-none');
        currentTotal += hiddenFees;
        activatedTricksCount++;
    } else {
        feeRow.classList.add('d-none');
    }

    // Update monetary labels globally
    livePrice.innerText = `$${basePrice.toFixed(2)}`;
    subtotalLabel.innerText = `$${basePrice.toFixed(2)}`;
    totalLabel.innerText = `$${currentTotal.toFixed(2)}`;

    // Pass configuration score count down to analyzer panel
    updateAnalysisText(activatedTricksCount);
}

// ==========================================
// 4. BEHAVIORAL ANALYSIS COMPILER
// ==========================================
function updateAnalysisText(count) {
    if (count === 0) {
        analysisText.innerHTML = "<strong>Ethical Configuration:</strong> Price transparency matches ideal market models. Conversion rates are lower, but customer lifetime value (LTV) increases due to established platform trust.";
    } else if (count === 1) {
        analysisText.innerHTML = "<strong>Mild Psychological Friction:</strong> One behavioral trigger active. This setup pushes immediate impulse spending, but introduces transaction friction.";
    } else {
        analysisText.innerHTML = "<strong>Aggressive Dark Pattern Setup:</strong> Total price increases by <b>" + ((hiddenFees / basePrice) * 100).toFixed(0) + "%</b> invisibly. High inventory anxiety combines with forced hidden fee markups. Highly manipulative.";
    }
}

// Attach operational event listeners to switches
scarcityToggle.addEventListener('change', updateSimulatorState);
dripToggle.addEventListener('change', updateSimulatorState);
socialToggle.addEventListener('change', updateSimulatorState);

// Run initial loading block
fetchLiveProductData();

// Timer loop
let time = 300; 
setInterval(() => {
    let min = Math.floor(time / 60);
    let sec = time % 60;
    if (timerSpan) timerSpan.innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    if (time > 0) time--;
}, 1000);