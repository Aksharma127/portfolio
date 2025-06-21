document.addEventListener('DOMContentLoaded', () => {

    // --- tsParticles Initialization (Delayed for performance) ---
    // This part is crucial for performance. tsParticles can be heavy.
    // We'll initialize it only if the element exists and the library is loaded.
    // Consider adding a check for low-end devices or connection speed here
    // to skip particles for a truly lightweight experience.
   // --- tsParticles Initialization (Delayed for performance with fade-in) ---
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer && typeof tsParticles !== 'undefined') {
            const initParticles = () => {
                tsParticles.load("particles-js", {
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onHover: { enable: true, mode: "repulse" },
                            onClick: { enable: true, mode: "push" },
                            resize: true,
                        },
                        modes: {
                            grab: { distance: 140, line_linked: { opacity: 1 } },
                            bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
                            repulse: { distance: 100, duration: 0.4 },
                            push: { particles_nb: 4 },
                            remove: { particles_nb: 2 },
                        },
                    },
                    particles: {
                        number: { value: 60, density: { enable: true, value_area: 800 } },
                        color: { value: ["#38bdf8", "#a78bfa", "#ec4899"] },
                        shape: { type: "circle" },
                        opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
                        size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
                        links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.2, width: 1 },
                        move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } },
                    },
                    detectRetina: true,
                }).then(() => {
                    // After particles are loaded and ready, fade them in
                    if (particlesContainer) {
                        particlesContainer.style.opacity = '1';
                    }
                });
            };
    
            // Delay particle loading slightly after initial content is visible
            // Adjust this delay as needed for desired effect. 500ms or 1000ms is a good start.
            setTimeout(initParticles, 800); // Increased delay slightly to allow for content to settle
                                          // and then a smooth fade-in
        } else {
            console.warn("tsParticles container or library not found. Skipping particle background.");
        }

    // --- Smooth Scrolling ---
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== "") {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerOffset = document.querySelector('header nav')?.offsetHeight || 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset - 20;
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
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Start animating slightly before element is fully in viewport
    });

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // --- Typing Effect ---
    const typingTextElement = document.querySelector('.typing-text');
    if (typingTextElement) {
        const textToType = typingTextElement.getAttribute('data-text');
        let index = 0;
        const cursor = document.querySelector('.cursor');
        
        // Use a flag to ensure typing starts only once
        let typingStarted = false;

        const startTyping = () => {
            if (typingStarted) return;
            typingStarted = true;
            typingTextElement.textContent = ''; // Clear initial content

            const typeChar = () => {
                if (index < textToType.length) {
                    typingTextElement.textContent += textToType.charAt(index);
                    index++;
                    setTimeout(typeChar, 80 + Math.random() * 50);
                } else {
                    if(cursor) cursor.style.display = 'none';
                }
            };
            typeChar();
        };

        // Observe the hero-title to start typing when it enters the viewport
        const heroTitleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !typingStarted) {
                    startTyping();
                    heroTitleObserver.unobserve(entry.target); // Stop observing once typing starts
                }
            });
        }, { threshold: 0.8 }); // Trigger when 80% of the title is visible

        heroTitleObserver.observe(typingTextElement.parentElement); // Observe the parent of typing-text (hero-title)
    }

    // --- Chatbot Functionality ---
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');

    // Simple debounce for send button to prevent rapid clicks
    let isSending = false;

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('open');
        if (chatbotContainer.classList.contains('open')) {
             setTimeout(() => chatbotInput.focus(), 300);
        }
    });

    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });

    function sendMessage() {
        if (isSending) return; // Prevent sending if already processing

        const userMessage = chatbotInput.value.trim();
        if (userMessage === '') return;

        isSending = true; // Set flag
        chatbotInput.disabled = true; // Disable input while sending
        chatbotSend.disabled = true; // Disable send button

        displayMessage(userMessage, 'user');
        chatbotInput.value = '';

        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            displayMessage(botResponse, 'bot');
            isSending = false; // Reset flag
            chatbotInput.disabled = false; // Re-enable input
            chatbotSend.disabled = false; // Re-enable send button
            chatbotInput.focus(); // Re-focus
        }, 800 + Math.random() * 800); // Slightly adjusted delay for a more natural feel
    }

    function displayMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(userInput) {
        const lowerCaseInput = userInput.toLowerCase();
        
        if (lowerCaseInput.match(/hello|hi|hey|greetings|sup/)) {
            return "System online. Akshit's portfolio assistant at your service! Ask about skills, projects, or contact info.";
        }
        if (lowerCaseInput.match(/how are you|status report/)) {
            return "All systems operational. Ready to provide info about Akshit Sharma.";
        }
        if (lowerCaseInput.match(/skill|tech|know|proficient|stack/)) {
            return "Akshit is skilled in: Languages (Python, C++, Java), Web Dev (HTML, CSS, JS, Bootstrap, React.js), UI/UX, Databases (MySQL), Cloud (IBM Cloud), and Developer Tools (Git, GitHub, Render). Check the 'Skills' section for details!";
        }
        if (lowerCaseInput.match(/project|work|portfolio|show me|case stud/)) {
            return "Akshit has worked on several projects including Nike & Apple website clones (React, GSAP), 15+ C++ OpenGL games, and various interactive front-end projects. See the 'Featured Projects' section for demos and code links!";
        }
        if (lowerCaseInput.match(/contact|email|linkedin|hire|connect|reach out/)) {
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
        
        const fallbacks = [
            "My circuits are buzzing, but I didn't quite parse that. Try rephrasing?",
            "Query unclear. Could you ask about Akshit's skills, projects, or contact details?",
            "Processing... Please ask about Akshit's technical capabilities or projects.",
            "I can tell you about Akshit's experience with React, C++, or his projects. Try asking about those!"
        ];
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

});
