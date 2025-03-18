# My Website Project: A Hub for Personal and Collaborative Projects

## Introduction

Welcome to my website! This project is a personal endeavor to create a dynamic online space that showcases my own work and the collaborative efforts of my friends.  I envision this website as a constantly evolving platform, a place where we can share our passions, experiments, and creative projects with the world.

As a solo developer and a non-professional web developer, I'm building this site from the ground up. This means that certain features might be under development, and you might encounter "coming soon" placeholders. I'm dedicated to its growth, and I'm always eager to hear your feedback and suggestions! If you're interested in contributing, please don't hesitate to reach out. This site is a passion project, and every contribution is welcome.

## Key Features

This website offers a range of features designed to enhance user experience and functionality. Here's a breakdown:

### Navigation

*   **Navbar:** A fixed navigation bar at the top of every page, ensuring easy access to all sections of the site.
*   **Logo:** A clickable logo that serves as a visual anchor and a quick link back to the homepage. Users can also toggle the logo's visibility in the settings.
*   **Login Button:** Provides access to a secure (simulated) login/account creation popup, allowing for personalized experiences.
*   **Settings Button:** Opens the settings menu, where users can customize their experience, adjust website behaviour, and manage account information.

### Content Presentation

*   **Welcome Message:** A friendly, personalized greeting message that acknowledges the user's presence on the site. The welcome message adapts to whether the user is logged in or not.
*   **Description:** A concise introduction to the website, its purpose, and what visitors can expect to find.
*   **Game Container:** A designated section to feature interactive games and other web-based projects.
*   **Game Buttons:** Five distinct containers, each featuring a title and an image representing a specific project or project category. These buttons serve as quick links to explore different areas of interest.

### Interactive Popups

*   **Settings Popup:** A user-friendly popup menu that allows users to fine-tune their website experience. Users can manage theme preferences, logo visibility, animation control, and account settings all in one place.
*   **Login Popup:** Facilitates user login and account creation through a sleek and intuitive popup.

### Core Functionality

*   **Theme Switching:** Users can seamlessly switch between light and dark themes, tailoring the site's appearance to their preferences.
*   **Logo Visibility:** Offers users the ability to show or hide the website logo, customizing their viewing experience.
*   **Animation Control:** Provides users with the choice to enable or disable animations, catering to those who prefer a more static experience or have concerns about performance.
*   **Lazy Loading:** Images are loaded dynamically as they enter the viewport, improving initial page load times and overall performance. This improves the loading of the page, which results in a better user experience.
*   **Simulated Account System:** Implements a simulated account system that allows users to create a profile or log in, mimicking a full account system without requiring server-side data storage.
*   **Username Persistence:** Usernames are remembered between sessions, providing a personalized experience without full database integration.
*   **Logout:** Users can log out of their simulated accounts, ensuring privacy and security when multiple users share a device.
*   **Password Encryption:** While simulated, the system demonstrates basic password encryption for security.
*   **Settings Menu:** A single location for managing all user preferences, simplifying navigation and customization.
*   **Game Visibility Toggle:** An option (primarily for development purposes) to toggle the game container section on or off, which is useful for testing or focusing on other parts of the site.
*   **Version Display:** Displays the current website version in the settings menu, enabling users to be aware of the current build and any associated changes.
*   **Overlay:** A semi-transparent overlay that enhances the focus on popups, like the settings and login menus, while subtly dimming the background.

### Core Pages

*   **Home Page:** The main entry point for the website. This is where users first land and will have most of the features available.

### User Experience

*   **Responsive Design:** The website is built to adapt to various screen sizes and devices, ensuring a consistent and enjoyable experience for all users, regardless of their device.
*   **Light/Dark Theme:** Users can switch between light and dark themes to match their preferences and viewing conditions, ensuring a comfortable user experience.
*   **Persistent Theme:** The user's chosen theme is saved in local storage and remembered across sessions, providing a personalized experience.
*   **Customizable Logo:** Users can choose to show or hide the website logo, customizing their viewing experience.
*   **Animation Control:** Users can enable or disable animations, catering to those who prefer a more static experience or have concerns about performance.
*   **Lazy Loading:** Images are loaded only when they come into view, improving performance and initial page load time.

### Account & Settings

*   **Simulated Account System:** Users can create a simulated account or log in, allowing for a personalized experience without the complexities of a full database.
*   **Username Persistence:** The logged-in username is remembered across sessions, providing a seamless and personalized experience.
*   **Logout:** Users can easily log out of their account, ensuring privacy and security when necessary.
*   **Password Encryption:** Passwords are encrypted for security using a basic, simulated encryption method.
*   **Settings Menu:** A centralized location to manage theme, logo visibility, animations, and account settings, streamlining customization options.

### Development Features

*   **Game Visibility Toggle:** A development-focused feature to hide or show the game container section, aiding in testing and development workflows.
*   **Version Display:** The current website version is displayed in the settings menu, keeping users informed of the latest build and its potential changes.
*   **Overlay:** A semi-transparent overlay is used to highlight the settings and login popups, focusing user attention on these interactive elements.

## Technologies Used

This website is meticulously crafted using the following technologies, chosen for their effectiveness and the learning opportunities they offer:

### Core Web Technologies

*   **HTML5:** The foundational language for structuring the content of the website. I leverage semantic HTML5 elements to ensure proper document structure and accessibility.
*   **CSS3:** Used for styling and layout, with a focus on responsive design. I utilize CSS variables for theming and flexbox/grid for flexible layouts.
*   **JavaScript (ES6+):** The dynamic heart of the website, providing interactivity, dynamic features, and all of the website's logic. The code is well-commented and organized into functional modules.

### Libraries/Frameworks

*   **Vanilla JavaScript (No External Libraries):** This project is intentionally built without external JavaScript libraries or frameworks. This decision was made to deepen my understanding of core JavaScript principles and DOM manipulation. It also minimizes dependencies and improves control over performance.

### Tools & Services

*   **Google Fonts:** Used for custom typography to enhance the visual appeal and readability of the website. I carefully chose fonts that align with the website's design language.
*   **GitHub:** The cornerstone of version control and collaboration. I use GitHub to track changes, manage different branches, and facilitate code reviews.
*   **Vercel:** Employed for real-time hosting and deployment, Vercel provides fast, reliable hosting and seamless integration with GitHub.

### Techniques

*   **Local Storage:** Used for persisting user preferences (e.g., theme, logo visibility) and account information. Local storage allows the website to retain user settings across sessions without relying on server-side databases.
*   **DOM Manipulation:** Leveraged to dynamically update the page content based on user interactions and preferences. JavaScript is used to efficiently modify elements in the DOM.
*   **CSS Classes:** Used extensively for styling and toggling visibility, making it easy to dynamically change the state and appearance of elements.
*   **Encryption:** While basic and simulated, encryption is used to demonstrate password security and to show an understanding of its importance.
*   **Intersection Observer:** This powerful API is used to implement lazy loading, ensuring images are only loaded when they come into the viewport, significantly improving performance and load times.
*   **Reflow Management:** Techniques are applied to minimize reflows and repaints, ensuring smooth transitions and a responsive user experience.
*   **Event Handling:** An integral part of the JavaScript code, enabling the website to respond to user interactions and provide a dynamic experience.
*   **Resolve Path:** Implemented for correctly resolving relative paths to assets, ensuring that images and other resources are loaded correctly.
* **Media Queries:** Used to apply styles for different screen sizes.

## Setup and Installation (For Contributors)

If you're interested in running this website locally or contributing to its development, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/CazyUndee/My-Website.git
    cd My-Website
    ```

2.  **Open in Browser:**
    *Open the `index.html` file in your preferred web browser. There are no special requirements, and no need to run a local web server.

## Contribution Guidelines

I welcome contributions to this project! If you'd like to help improve the website, please follow these guidelines:

1.  **Fork the Repository:** Start by forking the repository to your own GitHub account.
2.  **Create a Branch:** Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
    or
     ```bash
    git checkout -b fix/your-fix-name
    ```
3.  **Coding Standards:**
    *   Use clear and concise variable and function names.
    *   Comment your code to explain complex logic.
    *   Indent your code consistently (2 spaces are preferred).
    *   Follow existing code patterns and style.
4.  **Testing:** Thoroughly test your changes to ensure they work as expected and don't introduce new issues.
5.  **Commit Messages:** Write clear, informative commit messages that explain what you changed and why.
6.  **Submit a Pull Request:** Once your changes are ready, submit a pull request to the `main` branch. I'll review it and merge it if it meets the project's quality standards.

## Future Plans/Roadmap

Here are some of my goals for the website's future:

*   **Expand Content:** Add more games, projects, and collaborative work.
*   **Full Account System:** Implement a real account system with database integration for storing user data.
*   **More Customization:** Provide users with even more ways to customize their experience, such as custom color schemes or advanced layout options.
*   **Community Features:** Add elements like a forum or comment sections to foster interaction.
*   **Performance Enhancements:** Continue optimizing the website for faster loading times and improved performance.
* **SEO:** Improve the SEO.
* **Accessibility:** Focus on accessibility, making the website available to all.

## Images/GIFs

![image of the site](https://via.placeholder.com/800x400?text=Website+Screenshot)
*Add an image of the site here*
![gif of the site](https://via.placeholder.com/800x400?text=Website+GIF)
*Add a GIF showing the features*

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

## Acknowledgments

*   [GitHub](https://github.com/)
*   [Google Fonts](https://fonts.google.com/)

**## Forking and Contributing**

**Forking this repository is not just a way to contribute—it's a celebration of collaborative creativity! If you find yourself inspired to modify, experiment, or build upon this project, I encourage you to fork it. Here's why and how:**

**### Why Fork?**

*   **Experimentation:** Forking creates a personal copy of the project where you can freely experiment with changes without affecting the main project.
*   **Personalization:** You can tailor the website to your liking, adding your own features or modifying existing ones.
*   **Contribution:** Forking is the first step towards potentially contributing your improvements back to the main project.
*   **Learning:** It's a fantastic way to learn more about web development by modifying and extending an existing project.

**### How to Fork**

1.  **GitHub Account:** Make sure you have a GitHub account.
2.  **Fork Button:** Go to the project's GitHub page (https://github.com/CazyUndee/My-Website) and click the "Fork" button in the top-right corner.
3.  **Your Copy:** This will create a copy of the project in your GitHub account.
4. **Clone your Fork:** Clone your forked repository to your local machine.
    ```bash
    git clone https://github.com/your-username/My-Website.git
    cd My-Website
    ```
5. **Make changes:** Make any changes you want.
6. **Create a Pull request:** Create a pull request to the original repository.

**### Showcasing Your Fork**

**I believe in celebrating every effort, big or small. If you fork this repository and create something interesting, whether it's a significant feature, a minor tweak, or a complete redesign, I'd love to showcase it here!  After you've made your modifications, please feel free to:**

1.  **Create a Pull Request:** If you'd like to contribute your changes back to the main project, please create a pull request.
2.  **Contact me:** Let me know about your forked version (email [cazyundee@gmail.com](mailto:cazyundee@gmail.com)) and a brief description of what you've done.
3.  **Add to Fork list:** If it is a good project, i'll add a link to your forked repository to a special section in this README, where it will be visible to other users!
**I'm excited to see what you create!**

## Contact

If you would like to contact me, please email me at [cazyundee@gmail.com](mailto:cazyundee@gmail.com)

Thanks for reading this README! I hope you enjoy exploring my website! If you have any feedback or suggestions, please feel free to contact me. I am always happy to hear from you.
