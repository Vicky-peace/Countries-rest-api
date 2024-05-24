document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('region-filter');
    const countryContainer = document.getElementById('country-container');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Check and apply the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayCountries(data);
            setupEventListeners(data);
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayCountries(countries) {
        countryContainer.innerHTML = '';
        countries.forEach(country => {
            const countryCard = document.createElement('div');
            countryCard.classList.add('country-card');
            countryCard.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name} flag">
                <h2>${country.name}</h2>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Region:</strong> ${country.region}</p>
                <p><strong>Capital:</strong> ${country.capital}</p>
            `;
            countryContainer.appendChild(countryCard);
        });
    }

    function setupEventListeners(countries) {
        searchInput.addEventListener('input', () => filterCountries(countries));
        regionFilter.addEventListener('change', () => filterCountries(countries));
    }

    function filterCountries(countries) {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedRegion = regionFilter.value;

        const filteredCountries = countries.filter(country => {
            const matchesSearch = country.name.toLowerCase().includes(searchTerm);
            const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
            return matchesSearch && matchesRegion;
        });

        displayCountries(filteredCountries);
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            searchInput.classList.add('dark-mode');
            searchInput.classList.remove('light-mode');
            regionFilter.classList.add('dark-mode');
            regionFilter.classList.remove('light-mode');
            themeToggleBtn.classList.add('dark-mode');
            themeToggleBtn.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            searchInput.classList.add('light-mode');
            searchInput.classList.remove('dark-mode');
            regionFilter.classList.add('light-mode');
            regionFilter.classList.remove('dark-mode');
            themeToggleBtn.classList.add('light-mode');
            themeToggleBtn.classList.remove('dark-mode');
        }
    }
});


