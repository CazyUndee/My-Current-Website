let settingsPopup = null;
let loginPopup = null;
let overlay = document.getElementById('overlay');
let currentTheme = localStorage.getItem('theme') || 'dark';
let isLogoVisible = true;
let isGameContainerVisible = localStorage.getItem('gameVisible') !== 'false';
let loggedInUsername = localStorage.getItem('loggedInUsername') || null;
let isAnimationsEnabled = localStorage.getItem('animationsEnabled') !== 'false';
const favicon = document.getElementById('favicon');
const root = document.documentElement;
const VERSION = '1.8.2 (Beta)';

function encryptData(password) {
    // Using a fixed salt and simple encryption is not secure for production.
    // This is only for demonstration purposes.
    let salt = "YOUR_CUSTOM_SALT_VALUE";
    let passwordWithSalt = password + salt;
    let encryptedPassword = "";
    for (let i = 0; i < passwordWithSalt.length; i++) {
        let charCode = passwordWithSalt.charCodeAt(i);
        encryptedPassword += String.fromCharCode(charCode + (i % 5));
    }
    return btoa(encryptedPassword);
}

function decryptData(encryptedPassword) {
    // Using a fixed salt and simple decryption is not secure for production.
    // This is only for demonstration purposes.
    let salt = "YOUR_CUSTOM_SALT_VALUE";
    let decryptedBytes = atob(encryptedPassword);
    let decryptedPassword = "";
    for (let i = 0; i < decryptedBytes.length; i++) {
        let charCode = decryptedBytes.charCodeAt(i);
        decryptedPassword += String.fromCharCode(charCode - (i % 5));
    }
    return decryptedPassword.slice(0, decryptedPassword.length - salt.length);
}

function updateWelcomeMessage() {
    const welcomeMessageElement = document.querySelector('.welcome-message');
    if (loggedInUsername) {
        welcomeMessageElement.textContent = `Welcome, ${loggedInUsername}!`;
    } else {
        welcomeMessageElement.textContent = "Welcome!";
    }
}

function applySettingsPopupTheme(theme) {
    const popup = document.getElementById('settingsPopup');
    if (popup) {
        popup.classList.remove('dark-mode', 'light-mode');
        popup.classList.add(theme + '-mode');
    }
}

function applyLoginPopupTheme(theme) {
    const popup = document.getElementById('loginPopup');
    if (popup) {
        popup.classList.remove('dark-mode', 'light-mode');
        popup.classList.add(theme + '-mode');
    }
}

function openSettingsMenu() {
    if (!document.getElementById('settingsPopup')) {
        settingsPopup = document.createElement('div');
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
        // Force a reflow
        settingsPopup.offsetHeight;
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

function onThemeSwitchChange(checkbox) {
    const theme = checkbox.checked ? 'light' : 'dark';
    setTheme(theme);
    currentTheme = theme;
    localStorage.setItem('theme', theme);
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

function setTheme(theme) {
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const navbarLogo = document.getElementById('navbarLogo');
    const games = document.querySelectorAll('.game');
    const favicon = document.getElementById('favicon');
    
    if (isAnimationsEnabled) {
        body.classList.remove('animations-off');
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(theme + '-mode');
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
        setTimeout(() => {
            navbarLogo.classList.remove('logo-animate');
        }, 250);
    } else {
        body.classList.add('animations-off');
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(theme + '-mode');
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

function toggleAnimations(enabled) {
    const body = document.body;
    body.classList.toggle('animations-off', !enabled);
    setTheme(currentTheme);
}

function toggleLogoVisibility(visible) {
    const logoContainer = document.querySelector('.navbar .logo-container');
    logoContainer.classList.toggle('hidden-logo', !visible);
}

function toggleGameVisibility(visible) {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.classList.toggle('hidden-games', !visible);
}

function closeLoginPopup() {
    const loginPopup = document.getElementById('loginPopup');
    const overlay = document.getElementById('overlay');
    
    // Remove active classes first
    overlay.classList.remove('overlay-active');
    loginPopup.classList.remove('login-popup-active');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
        // Reset z-index after hiding
        overlay.style.zIndex = '1000';
    }, 300);
}

function toggleLoginPopup() {
    const loginPopup = document.getElementById('loginPopup');
    const overlay = document.getElementById('overlay');
    
    if (loginPopup.style.display === 'none' || loginPopup.style.display === '') {
        // Show popup
        overlay.style.display = 'block';
        loginPopup.style.display = 'block';
        // Force reflow
        loginPopup.offsetHeight;
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
    
    // Remove active classes first
    overlay.classList.remove('overlay-active');
    loginPopup.classList.remove('login-popup-active');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        loginPopup.style.display = 'none';
        overlay.style.display = 'none';
        // Ensure overlay isn't blocking interactions
        overlay.style.pointerEvents = 'none';
    }, 300);
}

function createAccount() {
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const username = usernameInput.value;
    const password = passwordInput.value;
    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }
    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different username or login.");
        return;
    }
    const encryptedPassword = encryptData(password);
    localStorage.setItem(username, encryptedPassword);
    alert(`Account created for username: ${username} (simulated).\nYou can now login.`);
    usernameInput.value = '';
    passwordInput.value = '';
}

function login() {
    const usernameInput = document.getElementById('loginUsername');
    const passwordInput = document.getElementById('loginPassword');
    const username = usernameInput.value;
    const password = passwordInput.value;
    const storedEncryptedPassword = localStorage.getItem(username);
    if (storedEncryptedPassword) {
        const storedPassword = decryptData(storedEncryptedPassword);
        if (storedPassword === password) {
            alert(`Login successful for user: ${username} (simulated).`);
            loggedInUsername = username;
            localStorage.setItem('loggedInUsername', loggedInUsername);
            updateWelcomeMessage();
            closeLoginPopup();
            openSettingsMenu();
            return;
        }
    }
    alert("Login failed. Invalid username or password.");
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

function handleOverlayClick(e) {
    const settingsPopup = document.getElementById('settingsPopup');
    const loginPopup = document.getElementById('loginPopup');
    
    if (e.target.id === 'overlay') {
        if (settingsPopup && settingsPopup.classList.contains('active')) {
            toggleSettingsMenu();
        }
        if (loginPopup && loginPopup.style.display === 'block') {
            closeLoginPopup();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
    document.getElementById('logoVisibilityToggle').checked = isLogoVisible;
    document.getElementById('animationsToggle').checked = isAnimationsEnabled;
    document.getElementById('overlay').addEventListener('click', handleOverlayClick);
});