document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate On Scroll)
    // Ensure AOS library is loaded before this script or handle potential errors
    if (typeof AOS !== 'undefined') { 
        AOS.init({
            duration: 800, // values from 0 to 3000, with step 50ms
            once: true, // whether animation should happen only once - while scrolling down
        });
    } else {
        console.error('AOS library not found or not loaded yet. Animations might not work.');
    }

    // FAQ Accordion Script
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        if (question && answer) { // Make sure essential elements exist
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = otherItem.querySelector('.faq-question i');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                        if (otherIcon) { 
                           otherIcon.classList.remove('fa-minus');
                           otherIcon.classList.add('fa-plus');
                        }
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                
                if (icon) { 
                   icon.classList.toggle('fa-plus');
                   icon.classList.toggle('fa-minus');
                }

                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    // --- Add other JavaScript functionalities below --- 

});
