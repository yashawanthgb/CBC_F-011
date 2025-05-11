const GEMINI_API_KEY = "AIzaSyACBhs9A3606JtpOKY3lQFswddkZqEj5Nc";
window.destinationNames = {
    nun_peak: 'Nun Peak',
    kun_peak: 'Kun Peak',
    saltoro_kangri: 'Saltoro Kangri',
    saser_kangri: 'Saser Kangri',
    stok_kangri: 'Stok Kangri',
    mamostong_kangri: 'Mamostong Kangri',
    rimo_i: 'Rimo I',
    hanuman_tibba: 'Hanuman Tibba',
    deo_tibba: 'Deo Tibba',
    indrasan: 'Indrasan',
    friendship_peak: 'Friendship Peak',
    shilla_peak: 'Shilla Peak',
    nanda_devi: 'Nanda Devi',
    kamet: 'Kamet',
    trisul: 'Trisul',
    kedarnath: 'Kedarnath',
    chaukhamba: 'Chaukhamba',
    shivling: 'Shivling',
    bhagirathi_i: 'Bhagirathi I',
    dunagiri: 'Dunagiri',
    panchachuli: 'Panchachuli',
    hardeol: 'Hardeol',
    bandarpunch: 'Bandarpunch',
    neelkanth: 'Neelkanth',
    kanchenjunga: 'Kanchenjunga',
    kabru: 'Kabru',
    pandim: 'Pandim',
    simvo: 'Simvo',
    kangto: 'Kangto',
    gorichen: 'Gorichen',
    sandakphu: 'Sandakphu',
    phalut: 'Phalut',
    guru_shikhar: 'Guru Shikhar',
    kalsubai: 'Kalsubai',
    harishchandragad: 'Harishchandragad',
    rajmachi: 'Rajmachi',
    mahabaleshwar: 'Mahabaleshwar',
    matheran: 'Matheran',
    saputara_hill: 'Saputara Hill',
    anamudi: 'Anamudi',
    agasthyarkoodam: 'Agasthyarkoodam',
    doddabetta: 'Doddabetta',
    mukurthi_peak: 'Mukurthi Peak',
    mullayanagiri: 'Mullayanagiri',
    kudremukh: 'Kudremukh',
    mahendragiri: 'Mahendragiri',
    arma_konda: 'Arma Konda',
    phawngpui: 'Phawngpui',
    mount_saramati: 'Mount Saramati',
    shillong_peak: 'Shillong Peak'
};

// Function to generate a trek plan using Gemini API
async function generateTrekPlanWithGemini(destination, days, budget, experience, date) {
    // Ensure days is a number
    days = parseInt(days, 10);
    try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;
        
        // Format the prompt for Gemini
        const prompt = `Generate a detailed ${days}-day trek plan for ${destination} in India for a ${experience} level trekker with a ${budget} budget, starting on ${date}. 
        Include: 
        1. A brief introduction to the mountain/peak
        2. Day-by-day itinerary with specific locations and activities
        3. Required gear and equipment
        4. Accommodation details
        5. Transportation recommendations
        6. Estimated costs
        7. Best photo spots
        8. Local cultural insights`;
        
        // Make the API request
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048
                }
            })
        });
        
        if (!response.ok) {
            if (response.status === 429) {
                console.warn('Gemini API rate limit exceeded. Falling back to local plan generation.');
                return generateRateLimitedResponse(destination, days, budget, experience, date);
            } else {
                throw new Error(`API request failed with status: ${response.status}`);
            }
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.candidates && data.candidates[0] && data.candidates[0].finishReason === 'STOP') {
            // Handle the case where the API returns a different response format
            if (data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
                return data.candidates[0].content.parts[0].text;
            }
        }
        
        console.error('API Response:', JSON.stringify(data));
        throw new Error('No content found in API response');
    } catch (error) {
        console.error('Error generating trek plan with Gemini:', error);
        // Return a fallback plan if the API fails
        return generateFallbackPlan(destination, days, budget, experience, date);
    }
}

// Fallback function to generate a basic plan if the API fails
function generateFallbackPlan(destination, days, budget, experience, date) {
    // This is the same logic as the original generateTrekPlan function
    // It will be used as a fallback if the Gemini API call fails
    return `
        <div class="trek-plan">
            <p><strong>Note:</strong> This is a basic plan generated as a fallback. For a more detailed plan, please try again later.</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Duration:</strong> ${days} days</p>
            <p><strong>Starting Date:</strong> ${date}</p>
            <p><strong>Experience Level:</strong> ${experience}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p>Your trek plan is being generated with our local system. Please check back later for AI-generated plans.</p>
        </div>
    `;
}

// Function to generate a more detailed fallback response when rate limited
function generateRateLimitedResponse(destination, days, budget, experience, date) {
    // Create a more detailed fallback response
    let content = `# ${destination} Trek Plan\n\n`;
    content += `## Introduction\n${destination} is one of India's magnificent mountain peaks, offering breathtaking views and challenging terrain for ${experience} trekkers.\n\n`;
    
    // Add basic itinerary
    content += `## Itinerary (${days} days)\n\n`;
    content += `### Day 1\nArrival at base camp. Orientation and equipment check. Meet your guides and fellow trekkers.\n\n`;
    content += `### Day 2\nAcclimatization hike to nearby viewpoint. Learn about local flora and fauna.\n\n`;
    
    // Generate content for remaining days
    if (days > 2) {
        content += generateAdditionalDays(days - 2);
    }
    
    // Add gear information
    content += `\n## Required Gear\n\n`;
    content += `- Hiking boots with ankle support\n`;
    content += `- Weather-appropriate clothing (layers)\n`;
    content += `- Backpack (30-40L for day hikes, 50-70L for overnight)\n`;
    content += `- Trekking poles\n`;
    content += `- Headlamp with extra batteries\n`;
    content += `- Water bottles or hydration system (min. 2L capacity)\n`;
    content += `- Sun protection (hat, sunglasses, sunscreen)\n`;
    content += `- First aid kit\n`;
    content += `- Sleeping bag (appropriate for season)\n`;
    
    // Add accommodation information based on budget
    content += `\n## Accommodation\n\n${generateAccommodationInfo(budget)}\n\n`;
    
    // Add transportation information based on budget
    content += `\n## Transportation\n\n${generateTransportationInfo(budget)}\n\n`;
    
    // Add cost information based on budget and days
    content += `\n## Estimated Costs\n\n${generateCostInfo(budget, days)}\n\n`;
    
    // Add photo spots
    content += `\n## Best Photo Spots\n\n`;
    content += `- Summit viewpoint (panoramic views of surrounding peaks)\n`;
    content += `- Alpine meadows along the trail\n`;
    content += `- Sunrise/sunset from camp locations\n`;
    content += `- Mountain streams and waterfalls\n`;
    content += `- Local villages with traditional architecture\n\n`;
    
    // Add cultural insights
    content += `\n## Local Cultural Insights\n\n`;
    content += `- The region is home to traditional mountain communities with unique customs\n`;
    content += `- Local festivals may occur seasonally - ask your guide about special events\n`;
    content += `- Try the local cuisine, which often features hearty dishes suited for mountain weather\n`;
    content += `- Respect local customs regarding sacred sites and photography permissions\n`;
    
    return content;
}

// Import day arrays
// For browser: assumes nun_peak_days.js is loaded before this file
// For Node: uncomment the require line below
// const { nunPeakDays, kunPeakDays, saltoroKangriDays } = require('./nun_peak_days');

function generateAdditionalDays(remainingDays, destination) {
    let content = '';

    // Use external arrays for these destinations
    let activities;
    console.log('[generateAdditionalDays] destination:', destination);
    console.log('[generateAdditionalDays] kunPeakDays:', typeof kunPeakDays !== 'undefined' ? 'loaded' : 'undefined');
    console.log('[generateAdditionalDays] saltoroKangriDays:', typeof saltoroKangriDays !== 'undefined' ? 'loaded' : 'undefined');
    if (destination === 'nun_peak' && typeof nunPeakDays !== 'undefined') {
        activities = nunPeakDays;
    } else if (destination === 'kun_peak' && typeof kunPeakDays !== 'undefined') {
        activities = kunPeakDays;
    } else if (destination === 'saltoro_kangri' && typeof saltoroKangriDays !== 'undefined') {
        activities = saltoroKangriDays;
    } else {
        // Generic fallback activities for any destination not in the mapping
        activities = [
            'Arrival at base camp. Orientation and equipment check. Meet your guides and fellow trekkers.',
            'Acclimatization hike to a nearby viewpoint. Learn about local flora and fauna.',
            'Trek through pine forests and meadows, enjoying panoramic views of the Himalayas.',
            'Cross mountain streams and ascend to a high-altitude camp with sunset views.',
            'Acclimatization day with a short hike to a nearby ridge for photography.',
            'Visit a local village to learn about traditional mountain life and cuisine.',
            'Climb to a scenic viewpoint for sunrise, followed by a technical descent.',
            'Explore wildflower-filled meadows and spot local wildlife with your guide.',
            'Summit day! Early start for a challenging ascent and rewarding summit views.',
            'Descend through rhododendron forests and enjoy a farewell dinner at camp.',
            'Photography workshop: learn to capture mountain landscapes.',
            'Wildlife spotting: look for Himalayan birds and mammals.',
            'Campfire evening with local folklore and stories.',
            'Yoga and stretching session at sunrise.',
            'Cooking lesson: prepare traditional mountain meals.',
            'River crossing and rope skills demonstration.',
            'Glacier walk (if available) with safety briefing.',
            'Botanical walk: learn about medicinal plants.',
            'Rest and recovery day at high camp.',
            'Team games and group activities at camp.',
            'Navigation basics: using a map and compass.',
            'Night trek to observe stars and constellations.',
            'First aid and mountain safety workshop.',
            'Local handicraft demonstration and souvenir shopping.',
            'Short trek to a hidden waterfall.',
            'Birdwatching morning with a local guide.',
            'Environmental awareness and Leave No Trace session.',
            'Visit a monastery or temple en route.',
            'Farewell celebration with certificates and group photos.',
            'Buffer/rest day for weather or acclimatization.'
        ];
        // Shuffle activities for uniqueness
        for (let i = activities.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [activities[i], activities[j]] = [activities[j], activities[i]];
        }

    }
    
    // Generate content for middle days with unique activities
    for (let i = 0; i < remainingDays - 1; i++) {
        const day = i + 3; // Start from day 3
        let activityIndex = i;
        if (activityIndex >= activities.length) {
            activityIndex = i % activities.length;
        }
        const activity = activities[activityIndex];
        content += `### Day ${day}\n${activity}\n\n`;
    }
    
    // Last day - custom farewell message
    const lastDayNum = remainingDays + 2;
    content += `### Day ${lastDayNum}\nFinal trek day. Early morning departure after breakfast. Descend through changing vegetation zones as you lose altitude. Reach the road head by early afternoon where transportation awaits. Transfer to the nearest town for a special farewell dinner with your trekking team. Certificate presentation ceremony and celebration of your achievement. Prepare for departure the next day with memories to last a lifetime.`;
    
    return content;
}

// Helper function to generate accommodation information based on budget
function generateAccommodationInfo(budget) {
    switch (budget) {
        case 'budget':
            return 'Basic tents at campsites. Shared accommodations in simple guesthouses at start and end points. Sleeping bags and mats provided, but bringing your own is recommended for comfort.';
        case 'moderate':
            return 'Quality tents with better insulation at campsites. Private rooms in mid-range hotels or lodges at start and end points. Comfortable sleeping arrangements with proper bedding provided.';
        case 'luxury':
            return 'Premium tents with cots at campsites where possible. Luxury hotels or lodges at start and end points. Best available accommodations with excellent amenities and service.';
        default:
            return 'Various camping options along the trek route. Guesthouses or hotels at start and end points.';
    }
}

// Helper function to generate transportation information based on budget
function generateTransportationInfo(budget) {
    switch (budget) {
        case 'budget':
            return 'Public transportation to the trailhead. Shared jeeps or buses where available. Return by similar means.';
        case 'moderate':
            return 'Private vehicle transfers to and from the trailhead. Comfortable transportation with flexibility for stops along the way.';
        case 'luxury':
            return 'Premium private vehicles with experienced drivers. Potential for helicopter transfers where available for certain routes. Maximum comfort and convenience.';
        default:
            return 'Transportation to and from the trailhead can be arranged based on preference and availability.';
    }
}

// Helper function to generate cost information based on budget and days
function generateCostInfo(budget, days) {
    let baseCost, rangeLow, rangeHigh;
    
    switch (budget) {
        case 'budget':
            baseCost = 2000; // Base cost per day in INR
            break;
        case 'moderate':
            baseCost = 3500;
            break;
        case 'luxury':
            baseCost = 7000;
            break;
        default:
            baseCost = 3000;
    }
    
    rangeLow = (baseCost * days).toLocaleString();
    rangeHigh = (baseCost * days * 1.3).toLocaleString(); // 30% variance for high end
    
    return `Estimated total cost: ₹${rangeLow} - ₹${rangeHigh} for the ${days}-day trek.\n\nThis includes:\n- Guide and porter fees\n- Meals during the trek\n- Accommodation\n- Basic transportation\n- Permits and entry fees\n\nNot included: Personal gear, insurance, tips, and personal expenses.`;
}

// Export the function to be used in script.js
window.generateTrekPlanWithGemini = generateTrekPlanWithGemini;
