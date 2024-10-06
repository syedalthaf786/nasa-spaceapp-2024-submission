const apiKey = '5hKvIYlcpTxBk8EWxEDJA8gH9dRFAeI8hqpLsodz';
const baseUrl = 'http://api.nasa.gov/neo/rest/v1/feed';

let startDate = '2015-09-07';
let endDate = '2015-09-08';
let currentPage = 0; // Track the current page
const itemsPerPage = 3; // Number of NEOs to display per page

async function fetchNeoData(startDate, endDate) {
    const apiUrl = `${baseUrl}?start_date=${startDate}&end_date=${endDate}&detailed=false&api_key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.near_earth_objects;
    } catch (error) {
        console.error('Error fetching NEO data:', error);
    }
}

async function displayNeoData(neos) {
    const neoContainer = document.getElementById('neo-container');

    if (!neos || Object.keys(neos).length === 0) {
        neoContainer.innerHTML = `<p>No NEOs found for the selected date range.</p>`;
        return;
    }

    neoContainer.innerHTML = ''; // Clear existing content

    // Calculate the start and end index for the current page
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Extract the NEOs for the current page
    const currentNeos = [];
    for (const date in neos) {
        currentNeos.push(...neos[date]); // Flatten the array
    }
    
    const paginatedNeos = currentNeos.slice(startIndex, endIndex);

    // Display the NEOs for the current page
    paginatedNeos.forEach(neo => {
        const neoCard = document.createElement('div');
        neoCard.className = 'card mb-2 mx-2';
        neoCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${neo.name}</h5>
                <p class="card-text">ID: ${neo.neo_reference_id}</p>
                <p class="card-text">Magnitude: ${neo.absolute_magnitude_h}</p>
                <p class="card-text">Diameter (min): ${neo.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} km</p>
                <p class="card-text">Diameter (max): ${neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</p>
                <p class="card-text">Potentially Hazardous: ${neo.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                <p class="card-text">Close Approach Date: ${neo.close_approach_data[0].close_approach_date_full}</p>
                <p class="card-text">Relative Velocity: ${neo.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
                <p class="card-text">Miss Distance: ${neo.close_approach_data[0].miss_distance.kilometers} km</p>
                <p class="card-text">Orbiting Body: ${neo.close_approach_data[0].orbiting_body}</p>
                <a href="${neo.nasa_jpl_url}" target="_blank" class="btn btn-primary">More Info</a>
            </div>
        `;
        neoContainer.appendChild(neoCard);
    });

    // Manage button visibility based on current page
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    prevButton.style.display = currentPage > 0 ? 'inline-block' : 'none';
    nextButton.style.display = (endIndex < currentNeos.length) ? 'inline-block' : 'none';
}

// Handle search button click
document.getElementById('searchButton').addEventListener('click', async () => {
    const startDateInput = document.getElementById('startDate').value;
    const endDateInput = document.getElementById('endDate').value;

    // Check if the selected range exceeds 3 days
    const start = new Date(startDateInput);
    const end = new Date(endDateInput);
    const timeDiff = end - start;
    const dayDiff = timeDiff / (1000 * 3600 * 24);

    if (dayDiff > 3 || dayDiff < 0) {
        Toastify({
            text: "Please select a valid date range within 3 days..",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }).showToast();

        return;
    }

    startDate = startDateInput;
    endDate = endDateInput;
    currentPage = 0; // Reset to the first page

    const neos = await fetchNeoData(startDate, endDate);
    displayNeoData(neos);
});

// Handle previous button click
document.addEventListener('DOMContentLoaded', async () => {
    const neos = await fetchNeoData(startDate, endDate);
    displayNeoData(neos);

    const buttonContainer = document.getElementById('button-container');
    
    const prevButton = document.createElement('button');
    prevButton.id = 'prevButton';
    prevButton.className = 'btn btn-secondary';
    prevButton.textContent = 'Previous';
    prevButton.onclick = () => {
        if (currentPage > 0) {
            currentPage--;
            displayNeoData(neos);
        }
    };
    buttonContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.id = 'nextButton';
    nextButton.className = 'btn btn-secondary';
    nextButton.textContent = 'Next';
    nextButton.onclick = () => {
        const totalNeos = Object.values(neos).flat().length;
        if ((currentPage + 1) * itemsPerPage < totalNeos) {
            currentPage++;
            displayNeoData(neos);
        }
    };
    buttonContainer.appendChild(nextButton);
});
