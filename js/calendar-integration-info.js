// Skrypt dodający blok integracji z kalendarzami
document.addEventListener('DOMContentLoaded', function() {
    // Znajdź sekcję kalendarza
    const calendarSection = document.getElementById('calendar-integration');
    
    // Stwórz nowy element div dla bloku integracji
    const integrationInfoBlock = document.createElement('div');
    integrationInfoBlock.className = 'calendar-integration-info';
    integrationInfoBlock.style.position = 'relative';
    integrationInfoBlock.style.zIndex = '3'; // Wyższy z-index niż maska (0) i container (2)
    
    // Dodaj zawartość HTML do bloku integracji
    integrationInfoBlock.innerHTML = `
        <div class="integration-header">
            <h3>Współpracuje z:</h3>
        </div>
        <div class="integration-logos">
            <!-- Google Calendar Logo -->
            <div class="integration-logo-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="60px" height="60px"><rect width="22" height="22" x="13" y="13" fill="#fff"/><polygon fill="#1e88e5" points="25.68,20.92 26.688,22.36 28.272,21.208 28.272,29.56 30,29.56 30,18.616 28.56,18.616"/><path fill="#1e88e5" d="M22.943,23.745c0.625-0.574,1.013-1.37,1.013-2.249c0-1.747-1.533-3.168-3.417-3.168 c-1.602,0-2.972,1.009-3.33,2.453l1.657,0.421c0.165-0.664,0.868-1.146,1.673-1.146c0.942,0,1.709,0.646,1.709,1.44 c0,0.794-0.767,1.44-1.709,1.44h-0.997v1.728h0.997c1.081,0,1.993,0.751,1.993,1.64c0,0.904-0.866,1.64-1.931,1.64 c-0.962,0-1.784-0.61-1.914-1.418L17,26.802c0.262,1.636,1.81,2.87,3.6,2.87c2.007,0,3.64-1.511,3.64-3.368 C24.24,25.281,23.736,24.363,22.943,23.745z"/><polygon fill="#fbc02d" points="34,42 14,42 13,38 14,34 34,34 35,38"/><polygon fill="#4caf50" points="38,35 42,34 42,14 38,13 34,14 34,34"/><path fill="#1e88e5" d="M34,14l1-4l-1-4H9C7.343,6,6,7.343,6,9v25l4,1l4-1V14H34z"/><polygon fill="#e53935" points="34,34 34,42 42,34"/><path fill="#1565c0" d="M39,6h-5v8h8V9C42,7.343,40.657,6,39,6z"/><path fill="#1565c0" d="M9,42h5v-8H6v5C6,40.657,7.343,42,9,42z"/></svg>
                <span>Google Calendar</span>
            </div>
            
            <!-- Microsoft Outlook Logo -->
            <div class="integration-logo-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="60px" height="60px"><path fill="#0078d4" d="M44,19.5v-14c0-0.827-0.673-1.5-1.5-1.5H24c-0.827,0-1.5,0.673-1.5,1.5v14c0,0.827,0.673,1.5,1.5,1.5h18.5C43.327,21,44,20.327,44,19.5z"/><path fill="#0078d4" d="M44,42.5v-14c0-0.827-0.673-1.5-1.5-1.5H24c-0.827,0-1.5,0.673-1.5,1.5v14c0,0.827,0.673,1.5,1.5,1.5h18.5C43.327,44,44,43.327,44,42.5z"/><path fill="#0078d4" d="M22.5,21H4c-0.827,0-1.5-0.673-1.5-1.5v-14C2.5,4.673,3.173,4,4,4h18.5c0.827,0,1.5,0.673,1.5,1.5v14C24,20.327,23.327,21,22.5,21z"/><path fill="#0078d4" d="M22.5,44H4c-0.827,0-1.5-0.673-1.5-1.5v-14C2.5,27.673,3.173,27,4,27h18.5c0.827,0,1.5,0.673,1.5,1.5v14C24,43.327,23.327,44,22.5,44z"/></svg>
                <span>Microsoft Outlook</span>
            </div>
        </div>
        <div class="integration-note">
            <p>Integracja zajmuje mniej niż 2 minuty i nie wymaga wsparcia IT.</p>
        </div>
    `;
    
    // Dodaj blok integracji bezpośrednio do sekcji kalendarza, przed kontenerem
    calendarSection.appendChild(integrationInfoBlock);
    
    // Przesuń blok na odpowiednią pozycję (nad maską)
    integrationInfoBlock.style.position = 'absolute';
    integrationInfoBlock.style.bottom = '100px';
    integrationInfoBlock.style.left = '50%';
    integrationInfoBlock.style.transform = 'translateX(-50%)';
    integrationInfoBlock.style.width = '600px';
    integrationInfoBlock.style.maxWidth = '80%';
    integrationInfoBlock.style.marginTop = '30px';
    
    // Dodaj margines do sekcji testimonials, aby zrobić miejsce dla bloku
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
        testimonialsSection.style.paddingTop = '80px';
    }
});
