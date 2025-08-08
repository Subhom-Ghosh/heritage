document.addEventListener('DOMContentLoaded', () => {

    // --- Data Mockup (remains the same) ---
    const heritagePlaces = [
        { id: 1, name: 'Bishnupur Terracotta Temples', description: 'Ancient temples known for their intricate terracotta artwork.', image:'https://www.sahapedia.org/sites/default/files/styles/sp_inline_images/public/Madanmohan%20temple-%20httpswww.flickr.comphotostathagata_sikdar6815791008-min.jpg?itok=MOQxvIfu' },
        { id: 2, name: 'Gour and Pandua', description: 'Ruins of a medieval Islamic capital city, rich in history.', image: 'https://im.whatshot.in/img/2020/Sep/6226-b-1599499659.jpg' },
        { id: 3, name: 'Cooch Behar Palace', description: 'A magnificent palace built in the style of the a classical European design.', image: 'https://assets-news.housing.com/news/wp-content/uploads/2021/02/23162052/Cooch-Behar-Palace-in-West-Bengal-Elegance-spanning-51309-sq-ft-FB-1200x700-compressed.jpg' }
    ];

    const kutirShilpo = [
        { id: 1, name: 'Dokra Art', description: 'Ancient non-ferrous metal casting art.', image: 'https://shuchiheritage.com/cdn/shop/collections/Mahishasur_mardini_1.png?v=1742703924&width=750' },
        { id: 2, name: 'Kantha Embroidery', description: 'A traditional form of hand embroidery.', image: 'https://i.pinimg.com/736x/b2/47/21/b24721be4da0945c73b57c1ac57c08c0.jpg' },
        {id: 3, name: 'Madur Kathi Mats',description:'These mats are woven from Madur kathi reeds, typically grown in the Midnapore region',image:'https://lh3.googleusercontent.com/ci/AL18g_SrL2GyxtTRB2JuDbda4TblfwVCzhMtrvuABw1OR8H95rFSkYcLFiBSHpb8HYA8FVIJqECdzeg=s1200'}
    ];

    const giProducts = [
        { id: 1, name: 'Darjeeling Tea', description: 'The "Champagne of Teas," famous worldwide.', image: 'https://cdn11.bigcommerce.com/s-nbc124/images/stencil/original/uploaded_images/health-benefits-to-drinking-darjeeling-tea-pumphreys-coffee.jpg?t=1657015475' },
        { id: 2, name: 'Nakshi Kantha', description: 'Embroidered quilt with traditional motifs.', image: 'https://heritage.info.bd/wp-content/uploads/2024/02/DSC4660-e1371127635923.jpg' },
        {id: 3, name: 'Nolen Gurer Sandesh',description:'A sweet made from date palm jaggery, a seasonal delicacy',image:'https://calcuttachronicle.co.in/wp-content/uploads/2024/07/Untitled-design-56-1-1024x1024-1.jpg'}
    ];

    // --- Dynamic Content Generation ---
    function createCard(item, containerId) {
        const container = document.querySelector(containerId);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
        `;
        container.appendChild(card);
    }

    heritagePlaces.forEach(place => createCard(place, '.card-grid'));
    kutirShilpo.forEach(item => createCard(item, '.kutir-grid'));
    giProducts.forEach(item => createCard(item, '.gi-grid'));

    // --- Festive Mode Toggle ---
    const festiveToggleBtn = document.getElementById('festive-mode-toggle');
    festiveToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('festive-mode');
    });

    // --- Smart Travel Planner Form ---
    const plannerForm = document.getElementById('travel-planner-form');
    const planOutput = document.getElementById('plan-output');
    plannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const budget = plannerForm.budget.value;
        const place = plannerForm.place.value;
        const time = plannerForm.time.value;

        let suggestedPlan;
        if (budget >= 10000 && time >= 4) {
            suggestedPlan = `**Your Deluxe Plan for ${place}**
            <p>With a generous budget and ample time, you can truly immerse yourself. We suggest staying at a heritage property, hiring a local guide, and exploring multiple sites at a relaxed pace. Don't forget to visit the local markets for authentic handicrafts!</p>`;
        } else if (budget >= 5000 && time >= 2) {
            suggestedPlan = `**Your Standard Plan for ${place}**
            <p>A balanced plan for a memorable trip. Focus on the main attractions and enjoy a mix of local restaurants and popular cafes. Travel between locations via public transport to save on costs.</p>`;
        } else {
            suggestedPlan = `**Your Budget-Friendly Plan for ${place}**
            <p>For a tighter budget and less time, we recommend focusing on 2-3 key sites that are close together. Enjoy the delicious and affordable street food and use local transport like cycle rickshaws for a unique experience!</p>`;
        }
        planOutput.innerHTML = `<h3>Plan Suggested!</h3>${suggestedPlan}`;
    });

    // --- Chatbot Widget ---
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggleBtn.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
    });

    chatbotCloseBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    chatbotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = chatbotInput.value;
        if (userMessage.trim() === '') return;

        const userMsgDiv = document.createElement('div');
        userMsgDiv.classList.add('message', 'user-message');
        userMsgDiv.textContent = userMessage;
        chatbotMessages.appendChild(userMsgDiv);

        let botResponse = "I'm sorry, I don't understand that yet. You can ask me about 'travel plans' or 'heritage places'.";
        if (userMessage.toLowerCase().includes('travel plan')) {
            botResponse = "To get a detailed plan, please use the 'Smart Travel Planner' form above. It's our best feature!";
        } else if (userMessage.toLowerCase().includes('heritage')) {
            botResponse = "West Bengal has many stunning heritage sites. Scroll down to the 'Explore Hidden Heritage Places' section to see some of them.";
        }

        setTimeout(() => {
            const botMsgDiv = document.createElement('div');
            botMsgDiv.classList.add('message', 'bot-message');
            botMsgDiv.innerHTML = botResponse;
            chatbotMessages.appendChild(botMsgDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);

        chatbotInput.value = '';
    });
});