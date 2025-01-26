// Smooth scroll to a section
const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
};

// Add "show" animation to elements
const showWithAnimation = (element) => {
    if (element) {
        element.classList.add('show');
        element.classList.remove('hidden');
    }
};

// Hide an element
const hideWithAnimation = (element) => {
    if (element) {
        element.classList.remove('show');
        element.classList.add('hidden');
    }
};

// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        { button: 'scroll-btn-1', next: 'section-2', message: 'message-1', image: 'section-2 .image' },
        { button: 'scroll-btn-2', next: 'section-3', message: 'message-2', image: 'section-3 .image' },
        { button: 'scroll-btn-3', next: 'section-4', message: 'message-3', image: 'section-4 .image' },
        { button: 'scroll-btn-4', next: 'section-5', message: null, image: null }
    ];

    // Animate the first section immediately on load
    const firstSectionElements = document.querySelectorAll('#section-1 .animate');
    firstSectionElements.forEach((el) => showWithAnimation(el));

    sections.forEach((section, index) => {
        const btn = document.getElementById(section.button);

        btn.addEventListener('click', () => {
            const nextSection = document.getElementById(section.next);
            const messageElement = section.message
                ? document.getElementById(section.message)
                : null;
            const imageElement = section.image
                ? document.querySelector(section.image)
                : null;

            // Scroll to the next section immediately
            scrollToSection(section.next);

            // Show the next section and its elements
            setTimeout(() => {
                nextSection.classList.remove('hidden');
                nextSection.querySelectorAll('.animate').forEach((el) => {
                    showWithAnimation(el);
                });
            }, 300);

            // Show the message and move the image after 3 seconds
            setTimeout(() => {
                if (messageElement) {
                    showWithAnimation(messageElement);
                }
                if (imageElement) {
                    // Move the image to the opposite direction of the message
                    const isMessageRight = messageElement && messageElement.classList.contains('message-right');
                    imageElement.style.transform = isMessageRight
                        ? 'translateX(-30px) scale(1.2)'
                        : 'translateX(30px) scale(1.2)';
                }
            }, 3300);

            // Hide the previous message when clicking the next button
            if (index > 0) {
                const prevMessageElement = document.getElementById(sections[index - 1].message);
                const prevImageElement = document.querySelector(sections[index - 1].image);
                if (prevMessageElement) {
                    hideWithAnimation(prevMessageElement);
                }
                if (prevImageElement) {
                    prevImageElement.style.transform = 'translateX(0) scale(1)';
                }
            }

            // Reveal the next button with animation after 1.5 seconds
            if (index < sections.length - 1) {
                const nextBtn = document.getElementById(sections[index + 1].button);
                setTimeout(() => {
                    showWithAnimation(nextBtn);
                }, 1500);
            }
        });
    });
});
