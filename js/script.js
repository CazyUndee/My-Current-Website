const VERSION = '1.9.6 (Beta)';

function resolvePath(relativePath) {
    const base = document.querySelector('base')?.href || window.location.origin;
    return new URL(relativePath, base).href;
}


// Global state
let currentTheme = localStorage.getItem('theme') || 'dark';
let isLogoVisible = true;
let isGameContainerVisible = localStorage.getItem('gameVisible') !== 'false';
let loggedInUsername = localStorage.getItem('loggedInUsername') || null;
let isAnimationsEnabled = localStorage.getItem('animationsEnabled') !== 'false';

// DOM references
const favicon = document.getElementById('favicon');
const root = document.documentElement;

// Encryption functions
function encryptData(password) {
    let salt = "YOUR_CUSTOM_SALT_VALUE";a
    let passwordWithSalt = password + salt;
    let encryptedPassword = "";
    for (let i = 0; i < passwordWithSalt.length; i++) {
        let charCode = passwordWithSalt.charCodeAt(i);
        encryptedPassword += String.fromCharCode(charCode + (i % 5));
    }
    return btoa(encryptedPassword);
}

function decryptData(encryptedPassword) {
    let salt = "YOUR_CUSTOM_SALT_VALUE";
    let decryptedBytes = atob(encryptedPassword);
    let decryptedPassword = "";
    for (let i = 0; i < decryptedBytes.length; i++) {
        let charCode = decryptedBytes.charCodeAt(i);
        decryptedPassword += String.fromCharCode(charCode - (i % 5));
    }
    return decryptedPassword.slice(0, decryptedPassword.length - salt.length);
}

// UI update functions
function updateWelcomeMessage() {
    const welcomeMessageElement = document.querySelector('.welcome-message');
    welcomeMessageElement.textContent = loggedInUsername ? `Welcome, ${loggedInUsername}!` : "Welcome!";
}

function applySettingsPopupTheme(theme) {
    const popup = document.getElementById('settingsPopup');
    if (popup) {
        popup.classList.remove('dark-mode', 'light-mode');
        popup.classList.add(`${theme}-mode`);
    }
}

function applyLoginPopupTheme(theme) {
    const popup = document.getElementById('loginPopup');
    if (popup) {
        popup.classList.remove('dark-mode', 'light-mode');
        popup.classList.add(`${theme}-mode`);
    }
}

// Settings menu functions
function openSettingsMenu() {
    if (!document.getElementById('settingsPopup')) {
        const settingsPopup = document.createElement('div');
        settingsPopup.id = 'settingsPopup';
        settingsPopup.innerHTML = `
            <div class="setting-section">
                <h3>Theme</h3>
                <label>
                    <span>Use Light Theme</span>
                    <label class="switch">
                        <input type="checkbox" id="themeToggle" onchange="onThemeSwitchChange(this)" ${currentTheme === 'light' ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </label>
            </div>
            <hr/>
            <div class="setting-section">
                <h3>Performance</h3>
                <label>
                    <span>Show Logo</span>
                    <label class="switch">
                        <input type="checkbox" id="logoVisibilityToggle" onchange="onLogoVisibilityChange(this)" ${isLogoVisible ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </label>
                <label>
                    <span>Animations</span>
                    <label class="switch">
                        <input type="checkbox" id="animationsToggle" onchange="onAnimationsToggleChange(this)" ${isAnimationsEnabled ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </label>
            </div>
            <hr/>
            <div class="setting-section">
                <h3>Development</h3>
                <label>
                    <span>Show Games</span>
                    <label class="switch">
                        <input type="checkbox" id="gameVisibilityToggle" onchange="onGameVisibilityChange(this)" ${isGameContainerVisible ? 'checked' : ''}>
                        <span class="slider round"></span>
                    </label>
                </label>
            </div>
            <hr/>
            ${loggedInUsername ? `
            <div class="setting-section">
                <h3>Account</h3>
                <p>Logged in as: ${loggedInUsername}</p>
                <button onclick="logout()" style="padding: 8px 15px; border-radius: 5px; border: none; background-color: #dc3545; color: white; cursor: pointer;">Logout</button>
            </div>
            <hr/>` : `
            <div class="setting-section">
                <h3>Account</h3>
                <p>Not logged in</p>
                <button onclick="toggleLoginPopup()" style="padding: 8px 15px; border-radius: 5px; border: none; background-color: #007bff; color: white; cursor: pointer;">Login/Create Account</button>
            </div>
            <hr/>`}
            <div class="setting-section">
                <h3>About</h3>
                <p>Version: ${VERSION}</p>
            </div>
        `;
        document.body.appendChild(settingsPopup);
        settingsPopup.offsetHeight; // Force reflow
        settingsPopup.style.display = 'flex';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                settingsPopup.classList.add('active');
            });
        });
        applySettingsPopupTheme(currentTheme);
    }
}

function toggleSettingsMenu() {
    const settingsPopup = document.getElementById('settingsPopup');
    
    if (!settingsPopup || !settingsPopup.classList.contains('active')) {
        openSettingsMenu();
    } else {
        settingsPopup.classList.remove('active');
        settingsPopup.classList.add('closing');
        settingsPopup.addEventListener('animationend', function handler(e) {
            if (e.animationName === 'settingsPopupClose') {
                settingsPopup.remove();
                settingsPopup.removeEventListener('animationend', handler);
            }
        });
    }
}

// Toggle handlers
function onThemeSwitchChange(checkbox) {
    currentTheme = checkbox.checked ? 'light' : 'dark';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
}

function onLogoVisibilityChange(checkbox) {
    isLogoVisible = checkbox.checked;
    toggleLogoVisibility(isLogoVisible);
    localStorage.setItem('logoVisible', isLogoVisible);
}

function onAnimationsToggleChange(checkbox) {
    isAnimationsEnabled = checkbox.checked;
    toggleAnimations(isAnimationsEnabled);
    localStorage.setItem('animationsEnabled', isAnimationsEnabled);
}

function onGameVisibilityChange(checkbox) {
    isGameContainerVisible = checkbox.checked;
    toggleGameVisibility(isGameContainerVisible);
    localStorage.setItem('gameVisible', isGameContainerVisible);
}

// Theme functions
function setTheme(theme) {
    const body = document.body;
    const navbarLogo = document.getElementById('navbarLogo');
    const games = document.querySelectorAll('.game');
    
    if (isAnimationsEnabled) {
        body.classList.remove('animations-off', 'dark-mode', 'light-mode');
        body.classList.add(`${theme}-mode`);
        navbarLogo.classList.add('logo-animate');
        
        if (theme === 'dark') {
            navbarLogo.src = 'images/dmdico.png';
            favicon.href = 'images/dmdico.png';
            games.forEach(game => {
                game.style.backgroundColor = '#444444';
                game.style.borderColor = '#ccc';
            });
        } else {
            navbarLogo.src = 'images/lmdico.png';
            favicon.href = 'images/lmdico.png';
            games.forEach(game => {
                game.style.backgroundColor = '#fff';
                game.style.borderColor = '#ccc';
            });
        }
        
        setTimeout(() => navbarLogo.classLiast.remove('logo-animate'), 250);
    } else {
        body.classList.add('animations-off');
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(`${theme}-mode`);
        
        if (theme === 'dark') {
            navbarLogo.src = 'images/dmdico.png';
            favicon.href = 'images/dmdico.png';
            games.forEach(game => {
                game.style.backgroundColor = '#444444';
                game.style.borderColor = '#ccc';
            });
        } else {
            navbarLogo.src = 'images/lmdico.png';
            favicon.href = 'images/lmdico.png';
            games.forEach(game => {
                game.style.backgroundColor = '#fff';
                game.style.borderColor = '#ccc';
            });
        }
    }

    updateFooterTheme(theme);
    applySettingsPopupTheme(theme);
    applyLoginPopupTheme(theme);
    localStorage.setItem('theme', theme);
}

// Toggle functions
function toggleAnimations(enabled) {
    document.body.classList.toggle('animations-off', !enabled);
    setTheme(currentTheme);
}

function toggleLogoVisibility(visible) {
    document.querySelector('.navbar .logo-container').classList.toggle('hidden-logo', !visible);
}

function toggleGameVisibility(visible) {
    document.getElementById('gameContainer').classList.toggle('hidden-games', !visible);
}

// Login popup functions
function toggleLoginPopup() {
    const loginPopup = document.getElementById('loginPopup');
    const overlay = document.getElementById('overlay');
    
    if (loginPopup.style.display === 'none' || loginPopup.style.display === '') {
        overlay.style.display = 'block';
        loginPopup.style.display = 'block';
        loginPopup.offsetHeight; // Force reflow
        overlay.classList.add('overlay-active');
        loginPopup.classList.add('login-popup-active');
    } else {
        closeLoginPopup();
    }
    applyLoginPopupTheme(currentTheme);
}

function closeLoginPopup() {
    const loginPopup = document.getElementById('loginPopup');
    const overlay = document.getElementById('overlay');
    
    if (!loginPopup || !overlay) return;
    
    overlay.classList.remove('overlay-active');
    loginPopup.classList.remove('login-popup-active');
    
    setTimeout(() => {
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
    }, 300);
}

// Account functions
function createAccount() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }
    
    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different username or login.");
        return;
    }
    
    localStorage.setItem(username, encryptData(password));
    alert(`Account created for username: ${username} (simulated).\nYou can now login.`);
    document.getElementById('loginUsername').value = '';
    document.getElementById('loginPassword').value = '';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const storedEncryptedPassword = localStorage.getItem(username);
    
    if (storedEncryptedPassword && decryptData(storedEncryptedPassword) === password) {
        loggedInUsername = username;
        localStorage.setItem('loggedInUsername', loggedInUsername);
        updateWelcomeMessage();
        closeLoginPopup();
        openSettingsMenu();
        alert(`Login successful for user: ${username} (simulated).`);
    } else {
        alert("Login failed. Invalid username or password.");
    }
}

function logout() {
    loggedInUsername = null;
    localStorage.removeItem('loggedInUsername');
    updateWelcomeMessage();
    const settingsPopup = document.getElementById('settingsPopup');
    if (settingsPopup) {
        settingsPopup.remove();
    }
    openSettingsMenu();
}

// Theme and overlay handlers
function updateFooterTheme(theme) {
    if (theme === 'light') {
        root.style.setProperty('--footer-bg', '#e5e5e5');
        root.style.setProperty('--footer-border', '#ccc');
        root.style.setProperty('--input-bg', '#f5f5f5');
        root.style.setProperty('--footer-text', '#333333');
    } else {
        root.style.setProperty('--footer-bg', '#1a1a1a');
        root.style.setProperty('--footer-border', '#333');
        root.style.setProperty('--input-bg', '#333');
        root.style.setProperty('--footer-text', '#e0e0e0');
    }
}

function handleOverlayClick(event) {
    if (event.target.id !== 'overlay') return;
    
    const settingsPopup = document.getElementById('settingsPopup');
    const loginPopup = document.getElementById('loginPopup');
    const overlay = document.getElementById('overlay');
    
    if (settingsPopup?.classList.contains('active')) {
        toggleSettingsMenu();
    }
    
    if (loginPopup?.style.display === 'block') {
        closeLoginPopup();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set theme
    setTheme(currentTheme);
    toggleLogoVisibility(isLogoVisible);
    toggleGameVisibility(isGameContainerVisible);
    toggleAnimations(isAnimationsEnabled);

    applySettingsPopupTheme(currentTheme);
    applyLoginPopupTheme(currentTheme);
    updateWelcomeMessage();

    if (localStorage.getItem('logoVisible') === null) {
        localStorage.setItem('logoVisible', 'true');
    }
    isLogoVisible = localStorage.getItem('logoVisible') !== 'false';
    toggleLogoVisibility(isLogoVisible);

    // Set toggle states
    const logoToggle = document.getElementById('logoVisibilityToggle');
    const animationsToggle = document.getElementById('animationsToggle');
    const gameToggle = document.getElementById('gameVisibilityToggle');
    if (logoToggle) logoToggle.checked = isLogoVisible;
    if (animationsToggle) animationsToggle.checked = isAnimationsEnabled;
    if (gameToggle) gameToggle.checked = isGameContainerVisible;

    // Set up overlay click handler
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.removeEventListener('click', handleOverlayClick);
        overlay.addEventListener('click', handleOverlayClick);
    }

    // Set up lazy loading
    const images = document.querySelectorAll('.game-image[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.onload = () => img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
});
