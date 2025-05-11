// Peak data array containing information about 10 Himalayan peaks
const peaks = [
    {
        id: 1,
        name: 'Mount Everest',
        elevation: '8,848m',
        location: 'Nepal/China',
        difficulty: 'Extreme',
        bestSeason: 'April-May, September-October',
        description: 'The highest peak on Earth, Mount Everest is the ultimate challenge for mountaineers. The journey to the summit tests physical endurance and mental strength like no other mountain.',
        image: 'https://cdn.britannica.com/17/83817-050-67C814CD/Mount-Everest.jpg',
        price: 45000
    },
    {
        id: 2,
        name: 'Kangchenjunga',
        elevation: '8,586m',
        location: 'Nepal/India',
        difficulty: 'Extreme',
        bestSeason: 'April-May, September-October',
        description: 'The third highest mountain in the world, Kangchenjunga is known for its remote location and challenging climbing conditions.',
        image: 'https://media.istockphoto.com/id/543183018/photo/sunrise-on-mount-kanchenjugha-at-dawn-sikkim.jpg?s=612x612&w=0&k=20&c=ONnlaZ9ny-HD9P3li-5t0tzpm0dHdahYRdmN_WxrMsc=',
        price: 38000
    },
    {
        id: 3,
        name: 'Annapurna I',
        elevation: '8,091m',
        location: 'Nepal',
        difficulty: 'Extreme',
        bestSeason: 'April-May, October-November',
        description: 'One of the deadliest mountains to climb, Annapurna I is revered for both its beauty and its danger. It offers stunning views and treacherous terrain.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/South_Face_of_Annapurna_I_%28Main%29.jpg',
        price: 36000
    },
    {
        id: 4,
        name: 'Nanga Parbat',
        elevation: '8,126m',
        location: 'Pakistan',
        difficulty: 'Extreme',
        bestSeason: 'June-August',
        description: 'Known as the "Killer Mountain", Nanga Parbat is one of the most challenging peaks with its long, difficult routes and extreme weather conditions.',
        image: 'https://media.istockphoto.com/id/543183018/photo/sunrise-on-mount-kanchenjugha-at-dawn-sikkim.jpg?s=612x612&w=0&k=20&c=ONnlaZ9ny-HD9P3li-5t0tzpm0dHdahYRdmN_WxrMsc=',
        price: 40000
    },
    {
        id: 5,
        name: 'K2',
        elevation: '8,611m',
        location: 'Pakistan-China Border',
        difficulty: 'Extreme',
        bestSeason: 'July-August',
        description: 'The second highest mountain in the world, K2 is famed for its severe climbing difficulty and harsh conditions. It is often considered a more technical climb than Everest.',
        image: 'https://cdn.britannica.com/14/75514-120-05A119F2/K2-district-Karakoram-Range-portion-Gilgit-Baltistan-region.jpg',
        price: 45000
    },
    {
        id: 6,
        name: 'Makalu',
        elevation: '8,485m',
        location: 'Nepal-China Border',
        difficulty: 'Very High',
        bestSeason: 'April-May',
        description: 'The fifth highest mountain in the world, Makalu is known for its isolated location and steep pyramid shape, posing a serious challenge even to experienced climbers.',
        image: 'https://www.dreamersdestination.com/images/packages/mt-makalu.jpg',
        price: 40000
    },
    {
        id: 7,
        name: 'Dhaulagiri',
        elevation: '8,167m',
        location: 'Nepal',
        difficulty: 'High',
        bestSeason: 'April-May',
        description: 'The seventh highest mountain in the world, Dhaulagiri is massive and remote, offering stunning views and a demanding ascent for mountaineers.',
        image: 'https://s3.amazonaws.com/www.explorersweb.com/wp-content/uploads/2021/04/23233243/shutterstock_1889702587.jpg',
        price: 35000
    },
    {
        id: 8,
        name: 'Manaslu',
        elevation: '8,163m',
        location: 'Nepal',
        difficulty: 'High',
        bestSeason: 'September-October',
        description: 'Known as the "Mountain of the Spirit," Manaslu is the eighth highest peak and offers a quieter, yet equally majestic alternative to Everest.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Sunrise%2C_Manaslu.jpg/1200px-Sunrise%2C_Manaslu.jpg',
        price: 30000
    }
];
    


// DOM Elements
const peakContainer = document.getElementById('peakContainer');
const peakDetailSection = document.getElementById('peak-details');
const peakDetailContent = document.getElementById('peakDetailContent');
const backButton = document.getElementById('backButton');

// Display all peaks
function displayPeaks() {
    peakContainer.innerHTML = '';
    peaks.forEach(peak => {
        const peakCard = document.createElement('div');
        peakCard.className = 'peak-card';
        peakCard.innerHTML = `
            <img src="${peak.image}" alt="${peak.name}">
            <div class="peak-info">
                <h3>${peak.name}</h3>
                <p><i class="fas fa-mountain"></i> ${peak.elevation}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${peak.location}</p>
                <p><i class="fas fa-tachometer-alt"></i> ${peak.difficulty}</p>
                <button class="view-details" data-id="${peak.id}">View Details</button>
            </div>
        `;
        peakContainer.appendChild(peakCard);
    });

    // Add event listeners to view details buttons
    document.querySelectorAll('.view-details').forEach(button => {
        button.addEventListener('click', (e) => {
            const peakId = parseInt(e.target.getAttribute('data-id'));
            showPeakDetails(peakId);
        });
    });
}

// Show peak details
function showPeakDetails(peakId) {
    const peak = peaks.find(p => p.id === peakId);
    if (!peak) return;

    // Hide the main content and show the details section
    document.querySelector('main > section:first-child').classList.add('hidden');
    peakDetailSection.classList.remove('hidden');

    // Populate peak details
    peakDetailContent.innerHTML = `
        <div class="peak-detail-container">
            <div class="peak-detail-image">
                <img src="${peak.image}" alt="${peak.name}">
            </div>
            <div class="peak-detail-info">
                <h2>${peak.name}</h2>
                <p class="elevation"><i class="fas fa-mountain"></i> Elevation: ${peak.elevation}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> Location: ${peak.location}</p>
                <p class="difficulty"><i class="fas fa-tachometer-alt"></i> Difficulty: ${peak.difficulty}</p>
                <p class="season"><i class="far fa-calendar-alt"></i> Best Season: ${peak.bestSeason}</p>
                <p class="price"><i class="fas fa-tag"></i> Starting from: $${peak.price}</p>
                <p class="description">${peak.description}</p>
                
                <div class="booking-form">
                    <h3>Book Your Adventure</h3>
                    <form id="bookingForm">
                        <input type="hidden" id="peakName" value="${peak.name}">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="date">Preferred Date</label>
                            <input type="date" id="date" required>
                        </div>
                        <div class="form-group">
                            <label for="participants">Number of Participants</label>
                            <input type="number" id="participants" min="1" value="1" required>
                        </div>
                        <div class="form-group">
                            <label for="notes">Special Requirements</label>
                            <textarea id="notes" rows="3"></textarea>
                        </div>
                        <button type="submit" class="book-now">Book Now</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Add event listener to the booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }
}

// Handle booking form submission
function handleBooking(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const participants = document.getElementById('participants').value;
    const notes = document.getElementById('notes').value;
    const peakName = document.getElementById('peakName').value;

    // In a real application, you would send this data to a server
    alert(`Thank you, ${name}! Your booking for ${peakName} on ${date} for ${participants} participant(s) has been received. We'll contact you at ${email} to confirm your adventure!`);

    // Reset form
    e.target.reset();

    // Go back to peaks list
    backToPeaks();
}

// Go back to peaks list
function backToPeaks() {
    peakDetailSection.classList.add('hidden');
    document.querySelector('main > section:first-child').classList.remove('hidden');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayPeaks();

    // Back button
    if (backButton) {
        backButton.addEventListener('click', backToPeaks);
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});
