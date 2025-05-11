document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const trekForm = document.getElementById('trekForm');
    const budgetOptions = document.querySelectorAll('.budget-option');
    const experienceOptions = document.querySelectorAll('.experience-option');
    const resultSection = document.getElementById('result');
    const planContent = document.getElementById('plan-content');
    const backBtn = document.getElementById('back-btn');
    
    let selectedBudget = null;
    let selectedExperience = null;

    // Handle budget option selection
    budgetOptions.forEach(option => {
        option.addEventListener('click', function() {
            budgetOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedBudget = this.getAttribute('data-value');
        });
    });

    // Handle experience option selection
    experienceOptions.forEach(option => {
        option.addEventListener('click', function() {
            experienceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedExperience = this.getAttribute('data-value');
        });
    });

    // Handle form submission
    trekForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const destination = document.getElementById('destination').value;
        const days = document.getElementById('days').value;
        const trekDate = document.getElementById('trekDate').value;
        
        // Validate all fields are filled
        if (!destination || !days || !selectedBudget || !selectedExperience || !trekDate) {
            alert('Please fill in all fields to generate your trek plan.');
            return;
        }
        
        // Show loading indicator
        planContent.innerHTML = '<div class="loading"><p>Generating your personalized trek plan...</p><div class="spinner"></div></div>';
        trekForm.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        // Hide the header
        document.querySelector('header').classList.add('hidden');
        
        try {
            // Get the destination name for display
            const destinationName = destinationNames[destination];
            
            // Format date for display
            const formattedDate = new Date(trekDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            // Try to generate plan with Gemini API
            if (typeof window.generateTrekPlanWithGemini === 'function') {
                const geminiPlan = await window.generateTrekPlanWithGemini(
                    destinationName,
                    days,
                    selectedBudget,
                    selectedExperience,
                    formattedDate
                );
                
                // Format the Gemini response into HTML
                const formattedPlan = formatGeminiResponse(geminiPlan, destination, days, selectedBudget, selectedExperience, trekDate);
                planContent.innerHTML = formattedPlan;
            } else {
                // Fallback to the original plan generator if Gemini API is not available
                const plan = generateTrekPlan(destination, days, selectedBudget, selectedExperience, trekDate);
                planContent.innerHTML = plan;
            }
        } catch (error) {
            console.error('Error generating trek plan:', error);
            // Fallback to the original plan generator if there's an error
            const plan = generateTrekPlan(destination, days, selectedBudget, selectedExperience, trekDate);
            planContent.innerHTML = plan;
        }
    });
    
    // Function to format the Gemini API response into HTML
    function formatGeminiResponse(response, destination, days, budget, experience, date) {
        // Get the destination name for display
        const destinationName = destinationNames[destination];
        
        // Format date for display
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create a header for the plan
        const header = `
            <div class="trek-plan-header">
                <p><strong>Destination:</strong> ${destinationName}</p>
                <p><strong>Duration:</strong> ${days} days</p>
                <p><strong>Starting Date:</strong> ${formattedDate}</p>
                <p><strong>Experience Level:</strong> ${experience.charAt(0).toUpperCase() + experience.slice(1)}</p>
                <p><strong>Budget Category:</strong> ${budget.charAt(0).toUpperCase() + budget.slice(1)}</p>
            </div>
        `;
        
        // Convert the plain text response to HTML with proper formatting
        let htmlContent = response.replace(/\n\n/g, '</p><p>');
        htmlContent = htmlContent.replace(/\n/g, '<br>');
        
        // Add special formatting for headings and lists
        htmlContent = htmlContent.replace(/([0-9]+\.)\s([^\n]+)/g, '<strong>$1</strong> $2');
        
        // Wrap the content in a div
        return `
            <div class="trek-plan">
                ${header}
                <div class="trek-plan-content">
                    <p>${htmlContent}</p>
                </div>
            </div>
        `;
    }
    
    // Handle back button
    backBtn.addEventListener('click', function() {
        trekForm.classList.remove('hidden');
        resultSection.classList.add('hidden');
        trekForm.reset();
        budgetOptions.forEach(opt => opt.classList.remove('selected'));
        experienceOptions.forEach(opt => opt.classList.remove('selected'));
        selectedBudget = null;
        selectedExperience = null;
        
        // Show the header again
        document.querySelector('header').classList.remove('hidden');
    });
    
    // Function to generate trek plan based on user preferences
    function generateTrekPlan(destination, days, budget, experience, date) {
        // Trek data by destination
        const trekData = {
            nun_peak: {
                beginner: ['Nun Peak Base Camp Trek', 'Nun Peak Viewpoint Trek', 'Nun Base Area Exploration'],
                intermediate: ['Nun Peak Advanced Base Camp', 'Nun Glacier Trek', 'Nun-Kun Saddle Trek'],
                advanced: ['Nun Peak Summit Expedition', 'Nun Peak Technical Climb', 'Nun-Kun Traverse']
            },
            kun_peak: {
                beginner: ['Kun Peak Base Camp Trek', 'Kun Peak Viewpoint Trek', 'Kun Base Area Exploration'],
                intermediate: ['Kun Peak Advanced Base Camp', 'Kun Glacier Trek', 'Kun Ridge Trek'],
                advanced: ['Kun Peak Summit Expedition', 'Kun Peak Technical Climb', 'Kun-Nun Traverse']
            },
            saltoro_kangri: {
                beginner: ['Saltoro Kangri Base Trek', 'Saltoro Range Exploration', 'Saltoro Valley Trek'],
                intermediate: ['Saltoro Kangri Base Camp Trek', 'Saltoro Glacier Trek', 'Saltoro Ridge Trek'],
                advanced: ['Saltoro Kangri Expedition', 'Saltoro Technical Climb', 'Saltoro High Altitude Trek']
            },
            saser_kangri: {
                beginner: ['Saser Kangri Viewpoint Trek', 'Saser Valley Trek', 'Saser Base Area Trek'],
                intermediate: ['Saser Kangri Base Camp Trek', 'Saser Glacier Trek', 'Saser Ridge Exploration'],
                advanced: ['Saser Kangri Expedition', 'Saser Technical Climb', 'Saser High Altitude Trek']
            },
            stok_kangri: {
                beginner: ['Stok Kangri Base Camp Trek', 'Stok Village to Base Camp', 'Stok Valley Exploration'],
                intermediate: ['Stok Kangri Advanced Base Camp', 'Stok Glacier Trek', 'Stok Ridge Trek'],
                advanced: ['Stok Kangri Summit Trek', 'Stok Kangri Technical Climb', 'Stok-Gulap Traverse']
            },
            mamostong_kangri: {
                beginner: ['Mamostong Kangri Base Trek', 'Mamostong Valley Trek', 'Mamostong Viewpoint Trek'],
                intermediate: ['Mamostong Kangri Base Camp Trek', 'Mamostong Glacier Trek', 'Mamostong Ridge Trek'],
                advanced: ['Mamostong Kangri Expedition', 'Mamostong Technical Climb', 'Mamostong High Altitude Trek']
            },
            rimo_i: {
                beginner: ['Rimo Base Area Trek', 'Rimo Valley Exploration', 'Rimo Viewpoint Trek'],
                intermediate: ['Rimo I Base Camp Trek', 'Rimo Glacier Trek', 'Rimo Ridge Exploration'],
                advanced: ['Rimo I Expedition', 'Rimo Technical Climb', 'Rimo High Altitude Trek']
            },
            hanuman_tibba: {
                beginner: ['Hanuman Tibba Base Camp', 'Beas Kund Trek', 'Solang Valley Trek'],
                intermediate: ['Hanuman Tibba Advanced Base Camp', 'Tentu Pass Trek', 'Lady Leg Pass Trek'],
                advanced: ['Hanuman Tibba Summit Trek', 'Hanuman Tibba Technical Climb', 'Seven Sisters Traverse']
            },
            deo_tibba: {
                beginner: ['Deo Tibba Base Camp Trek', 'Chikka to Seri Trek', 'Hampta Pass Trek'],
                intermediate: ['Deo Tibba Advanced Base Camp', 'Deo Tibba Glacier Trek', 'Chandratal Lake Trek'],
                advanced: ['Deo Tibba Summit Trek', 'Deo Tibba Technical Climb', 'Deo Tibba-Indrasan Traverse']
            },
            indrasan: {
                beginner: ['Indrasan Base Camp Trek', 'Jobra to Chikka Trek', 'Hampta Circle Trek'],
                intermediate: ['Indrasan Advanced Base Camp', 'Indrasan Glacier Trek', 'Indrasan Ridge Trek'],
                advanced: ['Indrasan Summit Expedition', 'Indrasan Technical Climb', 'Indrasan-Deo Tibba Traverse']
            },
            friendship_peak: {
                beginner: ['Friendship Peak Base Camp Trek', 'Beas Kund Trek', 'Dhundi Trek'],
                intermediate: ['Friendship Peak Advanced Camp', 'Friendship Glacier Trek', 'Friendship Ridge Trek'],
                advanced: ['Friendship Peak Summit Trek', 'Friendship Peak Technical Climb', 'Friendship-Hanuman Traverse']
            },
            shilla_peak: {
                beginner: ['Shilla Base Camp Trek', 'Shilla Valley Trek', 'Shilla Viewpoint Trek'],
                intermediate: ['Shilla Advanced Base Camp', 'Shilla Glacier Trek', 'Shilla Ridge Trek'],
                advanced: ['Shilla Peak Summit Trek', 'Shilla Peak Technical Climb', 'Shilla High Altitude Trek']
            },
            nanda_devi: {
                beginner: ['Nanda Devi Base Area Trek', 'Nanda Devi Sanctuary Trek', 'Nanda Devi Viewpoint Trek'],
                intermediate: ['Nanda Devi Base Camp Trek', 'Nanda Devi East Base Camp', 'Nanda Devi Glacier Trek'],
                advanced: ['Nanda Devi Base Camp Expedition', 'Nanda Devi East Base Camp Trek', 'Nanda Devi Sanctuary Circuit']
            },
            kamet: {
                beginner: ['Kamet Base Area Trek', 'Kamet Viewpoint Trek', 'Kamet Valley Trek'],
                intermediate: ['Kamet Base Camp Trek', 'Kamet Glacier Trek', 'Kamet Ridge Trek'],
                advanced: ['Kamet Expedition', 'Kamet Technical Climb', 'Kamet-Abi Gamin Traverse']
            },
            trisul: {
                beginner: ['Trisul Base Area Trek', 'Trisul Viewpoint Trek', 'Bedni Bugyal Trek'],
                intermediate: ['Trisul Base Camp Trek', 'Trisul Glacier Trek', 'Ronti Saddle Trek'],
                advanced: ['Trisul Expedition', 'Trisul Technical Climb', 'Trisul High Altitude Trek']
            },
            kedarnath: {
                beginner: ['Kedarnath Temple Trek', 'Kedarnath Valley Trek', 'Kedarnath Wildlife Sanctuary Trek'],
                intermediate: ['Kedarnath Peak Base Camp', 'Kedar Tal Trek', 'Vasuki Tal Trek'],
                advanced: ['Kedarnath Peak Expedition', 'Kedarnath Range Trek', 'Kedarnath-Chaukhamba Traverse']
            },
            chaukhamba: {
                beginner: ['Chaukhamba Viewpoint Trek', 'Chaukhamba Base Area Trek', 'Deoria Tal Trek'],
                intermediate: ['Chaukhamba Base Camp Trek', 'Chaukhamba Glacier Trek', 'Panpatia Col Trek'],
                advanced: ['Chaukhamba Expedition', 'Chaukhamba Technical Climb', 'Chaukhamba High Altitude Trek']
            },
            shivling: {
                beginner: ['Shivling Viewpoint Trek', 'Gangotri to Gaumukh Trek', 'Tapovan Trek'],
                intermediate: ['Shivling Base Camp Trek', 'Shivling Glacier Trek', 'Kedar Tal Trek'],
                advanced: ['Shivling Expedition', 'Shivling Technical Climb', 'Shivling-Meru Traverse']
            },
            bhagirathi_i: {
                beginner: ['Bhagirathi Viewpoint Trek', 'Gangotri to Nandanvan Trek', 'Bhagirathi Base Area Trek'],
                intermediate: ['Bhagirathi Base Camp Trek', 'Bhagirathi Glacier Trek', 'Bhagirathi Col Trek'],
                advanced: ['Bhagirathi I Expedition', 'Bhagirathi Technical Climb', 'Bhagirathi Peaks Traverse']
            },
            dunagiri: {
                beginner: ['Dunagiri Base Area Trek', 'Dunagiri Viewpoint Trek', 'Dunagiri Valley Trek'],
                intermediate: ['Dunagiri Base Camp Trek', 'Dunagiri Glacier Trek', 'Dunagiri Ridge Trek'],
                advanced: ['Dunagiri Expedition', 'Dunagiri Technical Climb', 'Dunagiri-Changabang Traverse']
            },
            panchachuli: {
                beginner: ['Panchachuli Base Area Trek', 'Panchachuli Viewpoint Trek', 'Darma Valley Trek'],
                intermediate: ['Panchachuli Base Camp Trek', 'Panchachuli Glacier Trek', 'Panchachuli Ridge Trek'],
                advanced: ['Panchachuli Expedition', 'Panchachuli Technical Climb', 'Panchachuli High Altitude Trek']
            },
            hardeol: {
                beginner: ['Hardeol Base Area Trek', 'Hardeol Viewpoint Trek', 'Milam Glacier Trek'],
                intermediate: ['Hardeol Base Camp Trek', 'Hardeol Glacier Trek', 'Hardeol Ridge Trek'],
                advanced: ['Hardeol Expedition', 'Hardeol Technical Climb', 'Hardeol-Tirsuli Traverse']
            },
            bandarpunch: {
                beginner: ['Bandarpunch Base Area Trek', 'Bandarpunch Viewpoint Trek', 'Dayara Bugyal Trek'],
                intermediate: ['Bandarpunch Base Camp Trek', 'Bandarpunch Glacier Trek', 'Bandarpunch Ridge Trek'],
                advanced: ['Bandarpunch Expedition', 'Bandarpunch Technical Climb', 'Bandarpunch-Kalanag Traverse']
            },
            neelkanth: {
                beginner: ['Neelkanth Base Area Trek', 'Neelkanth Viewpoint Trek', 'Badrinath to Satopanth Trek'],
                intermediate: ['Neelkanth Base Camp Trek', 'Neelkanth Glacier Trek', 'Satopanth Tal Trek'],
                advanced: ['Neelkanth Expedition', 'Neelkanth Technical Climb', 'Neelkanth-Chaukhamba Traverse']
            },
            kanchenjunga: {
                beginner: ['Kanchenjunga Base Area Trek', 'Kanchenjunga Viewpoint Trek', 'Goecha La Trek'],
                intermediate: ['Kanchenjunga Base Camp Trek', 'Kanchenjunga Glacier Trek', 'Green Lake Trek'],
                advanced: ['Kanchenjunga Expedition', 'Kanchenjunga Technical Climb', 'Kanchenjunga High Altitude Trek']
            },
            kabru: {
                beginner: ['Kabru Base Area Trek', 'Kabru Viewpoint Trek', 'Dzongri Trek'],
                intermediate: ['Kabru Base Camp Trek', 'Kabru Glacier Trek', 'Kabru Ridge Trek'],
                advanced: ['Kabru Expedition', 'Kabru Technical Climb', 'Kabru-Rathong Traverse']
            },
            pandim: {
                beginner: ['Pandim Base Area Trek', 'Pandim Viewpoint Trek', 'Dzongri-Goecha La Trek'],
                intermediate: ['Pandim Base Camp Trek', 'Pandim Glacier Trek', 'Pandim Ridge Trek'],
                advanced: ['Pandim Expedition', 'Pandim Technical Climb', 'Pandim-Kabru Traverse']
            },
            simvo: {
                beginner: ['Simvo Base Area Trek', 'Simvo Viewpoint Trek', 'Green Lake Trek'],
                intermediate: ['Simvo Base Camp Trek', 'Simvo Glacier Trek', 'Simvo Ridge Trek'],
                advanced: ['Simvo Expedition', 'Simvo Technical Climb', 'Simvo-Siniolchu Traverse']
            },
            kangto: {
                beginner: ['Kangto Base Area Trek', 'Kangto Viewpoint Trek', 'Kangto Valley Trek'],
                intermediate: ['Kangto Base Camp Trek', 'Kangto Glacier Trek', 'Kangto Ridge Trek'],
                advanced: ['Kangto Expedition', 'Kangto Technical Climb', 'Kangto High Altitude Trek']
            },
            gorichen: {
                beginner: ['Gorichen Base Camp Trek', 'Gorichen Viewpoint Trek', 'Gorichen Valley Trek'],
                intermediate: ['Gorichen Advanced Base Camp', 'Gorichen Glacier Trek', 'Gorichen Ridge Trek'],
                advanced: ['Gorichen Summit Trek', 'Gorichen Technical Climb', 'Gorichen High Altitude Trek']
            },
            sandakphu: {
                beginner: ['Sandakphu Trek', 'Singalila Ridge Trek', 'Sandakphu-Phalut Trek'],
                intermediate: ['Sandakphu-Gurdum-Rimbik Trek', 'Sandakphu-Phalut-Rimbik Trek', 'Singalila Ridge Circuit'],
                advanced: ['Sandakphu-Phalut-Singalila Extended Trek', 'Kanchenjunga View Trek via Sandakphu', 'Everest-Kanchenjunga Panorama Trek']
            },
            phalut: {
                beginner: ['Phalut Trek', 'Sandakphu-Phalut Trek', 'Phalut Viewpoint Trek'],
                intermediate: ['Phalut-Gorkhey-Rimbik Trek', 'Sandakphu-Phalut-Gorkhey Trek', 'Phalut Ridge Trek'],
                advanced: ['Phalut-Singalila Extended Trek', 'Phalut-Kanchenjunga View Trek', 'Singalila Ridge Complete Trek']
            },
            guru_shikhar: {
                beginner: ['Guru Shikhar Trek', 'Mount Abu Wildlife Trek', 'Guru Shikhar Viewpoint Trek'],
                intermediate: ['Guru Shikhar Circuit Trek', 'Guru Shikhar-Achalgarh Trek', 'Mount Abu Wilderness Trek'],
                advanced: ['Aravalli Range Trek via Guru Shikhar', 'Guru Shikhar Extended Trek', 'Mount Abu Complete Circuit']
            },
            kalsubai: {
                beginner: ['Kalsubai Peak Trek', 'Kalsubai Temple Trek', 'Kalsubai Viewpoint Trek'],
                intermediate: ['Kalsubai-Ratangad Traverse', 'Kalsubai-Alang-Madan-Kulang Trek', 'Bhandardara-Kalsubai Circuit'],
                advanced: ['Sahyadri Range Trek via Kalsubai', 'Kalsubai-Harishchandragad Traverse', 'Kalsubai Extended Expedition']
            },
            harishchandragad: {
                beginner: ['Harishchandragad Fort Trek', 'Konkan Kada Trek', 'Taramati Peak Trek'],
                intermediate: ['Harishchandragad via Nalichi Vaat', 'Harishchandragad via Khireshwar', 'Harishchandragad-Ajoba Trek'],
                advanced: ['Harishchandragad-Kalsubai Traverse', 'Harishchandragad via Pachnai', 'Sahyadri Range Trek via Harishchandragad']
            },
            rajmachi: {
                beginner: ['Rajmachi Fort Trek', 'Rajmachi Viewpoint Trek', 'Lonavala-Rajmachi Trek'],
                intermediate: ['Rajmachi-Kondane Caves Trek', 'Karjat-Rajmachi-Lonavala Trek', 'Rajmachi-Shrivardhan Fort Trek'],
                advanced: ['Rajmachi-Torna Traverse', 'Western Ghats Trek via Rajmachi', 'Rajmachi Extended Expedition']
            },
            mahabaleshwar: {
                beginner: ['Mahabaleshwar Plateau Trek', 'Arthur\'s Seat Trek', 'Lingmala Waterfall Trek'],
                intermediate: ['Mahabaleshwar-Pratapgad Trek', 'Mahabaleshwar-Panchgani Trek', 'Wilson Point Circuit'],
                advanced: ['Mahabaleshwar-Raigad Traverse', 'Western Ghats Trek via Mahabaleshwar', 'Mahabaleshwar Extended Expedition']
            },
            matheran: {
                beginner: ['Matheran Panorama Trek', 'One Tree Hill Trek', 'Louisa Point Trek'],
                intermediate: ['Matheran via Garbett Plateau', 'Matheran-Prabalgad Trek', 'Matheran Complete Circuit'],
                advanced: ['Matheran-Karjat Traverse', 'Western Ghats Trek via Matheran', 'Matheran Extended Expedition']
            },
            saputara_hill: {
                beginner: ['Saputara Hill Trek', 'Saputara Lake Trek', 'Sunset Point Trek'],
                intermediate: ['Saputara-Hatgad Fort Trek', 'Saputara Wildlife Trek', 'Saputara Valley Trek'],
                advanced: ['Western Ghats Trek via Saputara', 'Saputara-Nasik Traverse', 'Saputara Extended Expedition']
            },
            anamudi: {
                beginner: ['Anamudi Base Trek', 'Eravikulam National Park Trek', 'Anamudi Viewpoint Trek'],
                intermediate: ['Anamudi Shola Trek', 'Anamudi Base Camp Trek', 'Anamudi-Meesapulimala Trek'],
                advanced: ['Anamudi Summit Trek', 'Western Ghats Trek via Anamudi', 'Anamudi-Silent Valley Traverse']
            },
            agasthyarkoodam: {
                beginner: ['Agasthyarkoodam Base Trek', 'Bonacaud-Agasthyarkoodam Trek', 'Agasthyarkoodam Viewpoint Trek'],
                intermediate: ['Agasthyarkoodam Peak Trek', 'Agasthyarkoodam-Peppara Trek', 'Agasthyarkoodam Forest Trek'],
                advanced: ['Agasthyarkoodam-Ponmudi Traverse', 'Western Ghats Trek via Agasthyarkoodam', 'Agasthyarkoodam Extended Expedition']
            },
            doddabetta: {
                beginner: ['Doddabetta Peak Trek', 'Doddabetta Tea Estate Trek', 'Doddabetta Viewpoint Trek'],
                intermediate: ['Doddabetta-Ooty Trek', 'Doddabetta-Kotagiri Trek', 'Nilgiri Hills Trek via Doddabetta'],
                advanced: ['Doddabetta-Mukurthi Traverse', 'Western Ghats Trek via Doddabetta', 'Doddabetta Extended Expedition']
            },
            mukurthi_peak: {
                beginner: ['Mukurthi Base Trek', 'Mukurthi National Park Trek', 'Mukurthi Viewpoint Trek'],
                intermediate: ['Mukurthi Peak Trek', 'Mukurthi-Avalanche Lake Trek', 'Mukurthi-Pykara Trek'],
                advanced: ['Mukurthi-Doddabetta Traverse', 'Western Ghats Trek via Mukurthi', 'Mukurthi Extended Expedition']
            },
            mullayanagiri: {
                beginner: ['Mullayanagiri Peak Trek', 'Mullayanagiri Temple Trek', 'Mullayanagiri Viewpoint Trek'],
                intermediate: ['Mullayanagiri-Baba Budangiri Trek', 'Mullayanagiri-Kemmanagundi Trek', 'Chikmagalur Hills Trek'],
                advanced: ['Mullayanagiri-Kudremukh Traverse', 'Western Ghats Trek via Mullayanagiri', 'Mullayanagiri Extended Expedition']
            },
            kudremukh: {
                beginner: ['Kudremukh Base Trek', 'Kudremukh National Park Trek', 'Kudremukh Viewpoint Trek'],
                intermediate: ['Kudremukh Peak Trek', 'Kudremukh-Kalasa Trek', 'Kudremukh Forest Trek'],
                advanced: ['Kudremukh-Mullayanagiri Traverse', 'Western Ghats Trek via Kudremukh', 'Kudremukh Extended Expedition']
            },
            mahendragiri: {
                beginner: ['Mahendragiri Base Trek', 'Mahendragiri Temple Trek', 'Mahendragiri Viewpoint Trek'],
                intermediate: ['Mahendragiri Peak Trek', 'Mahendragiri-Devagiri Trek', 'Eastern Ghats Trek via Mahendragiri'],
                advanced: ['Mahendragiri-Arma Konda Traverse', 'Eastern Ghats Extended Trek', 'Mahendragiri Expedition']
            },
            arma_konda: {
                beginner: ['Arma Konda Base Trek', 'Arma Konda Valley Trek', 'Arma Konda Viewpoint Trek'],
                intermediate: ['Arma Konda Peak Trek', 'Arma Konda-Jindhagada Peak Trek', 'Eastern Ghats Trek via Arma Konda'],
                advanced: ['Arma Konda-Mahendragiri Traverse', 'Eastern Ghats Extended Trek', 'Arma Konda Expedition']
            },
            phawngpui: {
                beginner: ['Phawngpui Base Trek', 'Blue Mountain National Park Trek', 'Phawngpui Viewpoint Trek'],
                intermediate: ['Phawngpui Peak Trek', 'Phawngpui-Sangau Trek', 'Mizoram Hills Trek via Phawngpui'],
                advanced: ['Phawngpui-Mount Saramati Traverse', 'Northeast Frontier Trek', 'Phawngpui Extended Expedition']
            },
            mount_saramati: {
                beginner: ['Mount Saramati Base Trek', 'Nagaland Hills Trek', 'Mount Saramati Viewpoint Trek'],
                intermediate: ['Mount Saramati Peak Trek', 'Mount Saramati-Dzukou Valley Trek', 'Northeast Hills Trek'],
                advanced: ['Mount Saramati-Phawngpui Traverse', 'Northeast Frontier Extended Trek', 'Mount Saramati Expedition']
            },
            shillong_peak: {
                beginner: ['Shillong Peak Trek', 'Elephant Falls Trek', 'Shillong Peak Viewpoint Trek'],
                intermediate: ['Shillong Peak-Laitlum Canyon Trek', 'Shillong-Cherrapunji Trek', 'Khasi Hills Trek'],
                advanced: ['Meghalaya Peak-to-Peak Trek', 'Living Root Bridges Extended Trek', 'Shillong Peak Extended Expedition']
            }
        };

        // Budget options with approximate costs per day (in INR)
        const budgetCosts = {
            budget: {
                min: 1500,
                max: 2500,
                accommodation: 'Basic guesthouses or camping',
                food: 'Local meals at small eateries',
                transport: 'Public transport or shared jeeps'
            },
            moderate: {
                min: 2500,
                max: 4500,
                accommodation: 'Mid-range hotels or comfortable camping',
                food: 'Mix of local and standard restaurants',
                transport: 'Private jeeps or taxis'
            },
            luxury: {
                min: 4500,
                max: 10000,
                accommodation: 'Luxury hotels where available or premium camping',
                food: 'Best available restaurants and specialized meals',
                transport: 'Premium vehicles with experienced drivers'
            }
        };

        // Format date
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Get destination name for display
        const destinationNames = {
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
        
        // Select appropriate treks based on experience level
        const appropriateTreks = trekData[destination][experience];
        const recommendedTrek = appropriateTreks[Math.floor(Math.random() * appropriateTreks.length)];
        
        // Calculate budget
        const totalBudgetMin = budgetCosts[budget].min * days;
        const totalBudgetMax = budgetCosts[budget].max * days;
        
        // Generate itinerary
        let itinerary = '';
        for (let i = 1; i <= Math.min(days, 7); i++) {
            let activity = '';
            if (i === 1) {
                activity = `Arrive at base camp, acclimatization walks, and orientation.`;
            } else if (i === parseInt(days)) {
                activity = `Return to base camp, farewell dinner, and departure preparations.`;
            } else if (i === 2) {
                activity = `Begin trek to first checkpoint, enjoy scenic views and local culture.`;
            } else if (i === parseInt(days) - 1) {
                activity = `Final leg of the trek, celebration at the highest point.`;
            } else {
                const activities = [
                    `Trek to the next camp, explore local flora and fauna.`,
                    `Continue ascending, visit nearby waterfalls or viewpoints.`,
                    `Rest day with optional short hikes to nearby attractions.`,
                    `Trek through dense forests and cross mountain streams.`,
                    `Visit local villages and experience authentic mountain culture.`
                ];
                activity = activities[Math.floor(Math.random() * activities.length)];
            }
            itinerary += `<p><strong>Day ${i}:</strong> ${activity}</p>`;
        }
        
        // Generate the complete plan
        return `
            <div class="trek-plan">
                <p><strong>Destination:</strong> ${destinationNames[destination]}</p>
                <p><strong>Recommended Trek:</strong> ${recommendedTrek}</p>
                <p><strong>Duration:</strong> ${days} days</p>
                <p><strong>Starting Date:</strong> ${formattedDate}</p>
                <p><strong>Experience Level:</strong> ${experience.charAt(0).toUpperCase() + experience.slice(1)}</p>
                <p><strong>Budget Category:</strong> ${budget.charAt(0).toUpperCase() + budget.slice(1)}</p>
                <p><strong>Estimated Cost:</strong> ₹${totalBudgetMin.toLocaleString()} - ₹${totalBudgetMax.toLocaleString()}</p>
                
                <h3>Accommodation:</h3>
                <p>${budgetCosts[budget].accommodation}</p>
                
                <h3>Food:</h3>
                <p>${budgetCosts[budget].food}</p>
                
                <h3>Transportation:</h3>
                <p>${budgetCosts[budget].transport}</p>
                
                <h3>Daily Itinerary:</h3>
                ${itinerary}
                
                <h3>What to Pack:</h3>
                <ul>
                    <li>Trekking boots and comfortable hiking clothes</li>
                    <li>Warm layers (even in summer, mountains get cold)</li>
                    <li>Rain protection</li>
                    <li>Headlamp and extra batteries</li>
                    <li>First aid kit and personal medications</li>
                    <li>Water bottles and purification tablets</li>
                    <li>Sunscreen, sunglasses, and hat</li>
                    <li>Trekking poles (recommended for ${experience} treks)</li>
                </ul>
                
                <h3>Best Season:</h3>
                <p>${getBestSeason(destination)}</p>
                
                <p class="note"><strong>Note:</strong> This is a suggested plan. We recommend consulting with local guides for the most up-to-date information about trail conditions and permits.</p>
            </div>
        `;
    }
    
    // Function to get best season for trekking based on destination
    function getBestSeason(destination) {
        const seasons = {
            nun_peak: 'July to September, when the weather is most stable for high-altitude climbing.',
            kun_peak: 'July to September, when the weather is most stable for high-altitude climbing.',
            saltoro_kangri: 'June to September, with July and August being the most favorable months.',
            saser_kangri: 'June to September, with July and August being the most favorable months.',
            stok_kangri: 'June to September, with July and August being ideal for summit attempts.',
            mamostong_kangri: 'June to September, when the weather is most stable for high-altitude climbing.',
            rimo_i: 'June to September, with July and August being the most favorable months.',
            hanuman_tibba: 'May to October, with June to September being ideal for most treks.',
            deo_tibba: 'May to October, with June to September being ideal for most treks.',
            indrasan: 'May to October, with June to September being ideal for most treks.',
            friendship_peak: 'May to October, with June to September being ideal for most treks.',
            shilla_peak: 'May to October, with June to September being ideal for most treks.',
            nanda_devi: 'May to October, with June to September being the best months for trekking.',
            kamet: 'May to October, with June to September being the best months for trekking.',
            trisul: 'May to October, with June to September being the best months for trekking.',
            kedarnath: 'April to June and September to November. Avoid monsoon season (July-August).',
            chaukhamba: 'May to October, with June to September being the best months for trekking.',
            shivling: 'May to October, with June to September being the best months for trekking.',
            bhagirathi_i: 'May to October, with June to September being the best months for trekking.',
            dunagiri: 'May to October, with June to September being the best months for trekking.',
            panchachuli: 'April to June and September to November. Avoid monsoon season (July-August).',
            hardeol: 'May to October, with June to September being the best months for trekking.',
            bandarpunch: 'May to October, with June to September being the best months for trekking.',
            neelkanth: 'May to October, with June to September being the best months for trekking.',
            kanchenjunga: 'March to May and October to November. Avoid monsoon season (June-September).',
            kabru: 'March to May and October to November. Avoid monsoon season (June-September).',
            pandim: 'March to May and October to November. Avoid monsoon season (June-September).',
            simvo: 'March to May and October to November. Avoid monsoon season (June-September).',
            kangto: 'October to April is the best time, avoiding the monsoon season.',
            gorichen: 'October to April is the best time, avoiding the monsoon season.',
            sandakphu: 'March to May and October to December. Avoid monsoon season (June-September).',
            phalut: 'March to May and October to December. Avoid monsoon season (June-September).',
            guru_shikhar: 'October to March, avoiding the extreme desert heat of summer months.',
            kalsubai: 'October to February is the best time for trekking in the Sahyadri range.',
            harishchandragad: 'October to February is the best time for trekking in the Sahyadri range.',
            rajmachi: 'October to February is the best time for trekking in the Sahyadri range.',
            mahabaleshwar: 'October to February is the best time for trekking in the Sahyadri range.',
            matheran: 'October to February is the best time for trekking in the Sahyadri range.',
            saputara_hill: 'October to February is the best time for trekking in the Western Ghats.',
            anamudi: 'October to February, after the monsoon when the Western Ghats are lush and green.',
            agasthyarkoodam: 'December to February is the permitted trekking season by the Forest Department.',
            doddabetta: 'October to March, after the monsoon and before the intense summer heat.',
            mukurthi_peak: 'October to March, after the monsoon and before the intense summer heat.',
            mullayanagiri: 'October to March is ideal for trekking in the Western Ghats of Karnataka.',
            kudremukh: 'October to March is ideal for trekking in the Western Ghats of Karnataka.',
            mahendragiri: 'October to February, when the weather is pleasant in the Eastern Ghats.',
            arma_konda: 'October to February, when the weather is pleasant in the Eastern Ghats.',
            phawngpui: 'November to March is ideal, with clear skies and moderate temperatures.',
            mount_saramati: 'November to March is ideal, with clear skies and moderate temperatures.',
            shillong_peak: 'October to May, though some trails are accessible year-round.'
        };
        
        return seasons[destination];
    }
});
