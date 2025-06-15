document.addEventListener('DOMContentLoaded', () => {

    // --- tsParticles Initialization ---
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("particles-js", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse", // or "grab", "bubble"
                    },
                    onClick: {
                        enable: true,
                        mode: "push", // or "remove", "bubble"
                    },
                    resize: true,
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                    repulse: { distance: 100, duration: 0.4 }, // Adjust distance
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 },
                },
            },
            particles: {
                number: {
                    value: 80, // Adjust particle count
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                },
                color: {
                    value: ["#38bdf8", "#a78bfa", "#ec4899"], // Use theme colors
                },
                shape: {
                    type: "circle", // or "edge", "triangle", "polygon", "star"
                },
                opacity: {
                    value: 0.6, // Adjust opacity
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false,
                    },
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false,
                    },
                },
                links: {
                    enable: true,
                    distance: 120, // Adjust link distance
                    color: "#ffffff", // Link color
                    opacity: 0.2, // Link opacity
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2, // Adjust speed
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out", // How particles behave at edges
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200,
                    },
                },
            },
            detectRetina: true,
        });
    } else {
        console.error("tsParticles library not loaded.");
    }


    // --- Smooth Scrolling --- (Keep from previous version)
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    // Consider dynamic header height if it changes size
                    const headerOffset = document.querySelector('header nav')?.offsetHeight || 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset - 20; // Extra offset

                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }
        });
    });


    // --- Scroll Animations with Intersection Observer ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing after animation to save resources
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove class to re-animate on scroll up
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
        // rootMargin: "-50px 0px -50px 0px" // Adjust trigger point
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- Typing Effect ---
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        const textToType = typingTextElement.getAttribute('data-text');
        let index = 0;
        typingTextElement.textContent = ''; // Clear initial content

        function type() {
            if (index < textToType.length) {
                typingTextElement.textContent += textToType.charAt(index);
                index++;
                setTimeout(type, 80 + Math.random() * 50); // Adjust typing speed
            } else {
                // Optional: Remove cursor after typing
                const cursor = document.querySelector('.cursor');
                if(cursor) cursor.style.display = 'none';
            }
        }
        // Start typing after a short delay (allows other animations to start)
        setTimeout(type, 1200);
    }

    // --- Text Reveal Animation (Handled by CSS, JS only needed if more complex) ---
    // Ensure span structure is correct in HTML

    // --- Chatbot Functionality --- (Keep mostly the same logic)
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('open');
        if (chatbotContainer.classList.contains('open')) {
             setTimeout(() => chatbotInput.focus(), 300); // Delay focus until animation finishes
        }
    });

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;
        displayMessage(userMessage, 'user');
        chatbotInput.value = '';
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            displayMessage(botResponse, 'bot');
        }, 600 + Math.random() * 600); // Slightly longer delay
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        // Sanitize message basic - replace with a proper library for production
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        const lowerCaseInput = userInput.toLowerCase();
    
        // Akshit Sharma Specific Responses
        if (lowerCaseInput.match(/hello|hi|hey|greetings|sup/)) {
            return "System online. Akshit's portfolio assistant at your service! Ask about skills, projects, or contact info.";
        }
        if (lowerCaseInput.match(/how are you|status report/)) {
            return "All systems operational. Ready to provide info about Akshit Sharma.";
        }
        if (lowerCaseInput.match(/skill|tech|know|proficient|stack/)) {
            // Updated skills response
            return "Akshit is skilled in: Languages (Python, C++, Java), Web Dev (HTML, CSS, JS, Bootstrap, React.js), UI/UX, Databases (MySQL), Cloud (IBM Cloud), and Developer Tools (Git, GitHub, Render). Check the 'Skills' section for details!";
        }
        if (lowerCaseInput.match(/project|work|portfolio|show me|case stud/)) {
             // Updated projects response
            return "Akshit has worked on several projects including Nike & Apple website clones (React, GSAP), 15+ C++ OpenGL games, and various interactive front-end projects. See the 'Featured Projects' section for demos and code links!";
        }
        if (lowerCaseInput.match(/contact|email|linkedin|hire|connect|reach out/)) {
            // Updated contact response
            return "You can connect with Akshit via Email (asharma53858@gmail.com), LinkedIn (linkedin.com/in/aksharma127), or GitHub (github.com/Aksharma127). See the 'Let's Connect' section!";
        }
        if (lowerCaseInput.match(/available|job|opportunity|hiring/)) {
            return "Akshit is actively exploring new opportunities! Please use the contact information provided to discuss potential roles or collaborations.";
        }
        if (lowerCaseInput.match(/thanks|thank you|cool|awesome|nice/)) {
             return "You're welcome! Happy to provide information about Akshit's work.";
        }
        if (lowerCaseInput.match(/bye|goodbye|later|disconnect/)) {
            return "Session terminated. Have a great day!";
        }
    
        // Fallback remains the same or customize further
        const fallbacks = [
            "My circuits are buzzing, but I didn't quite parse that. Try rephrasing?",
            "Query unclear. Could you ask about Akshit's skills, projects, or contact details?",
            "Processing... Please ask about Akshit's technical capabilities or projects.",
            "I can tell you about Akshit's experience with React, C++, or his projects. Try asking about those!"
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

}); // End DOMContentLoaded
