document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    const pageLimit = 6;  // Number of resources per page
    const resources = [
        { id: 1, title: 'Power Drill', category: 'tools', image: 'images/Power_drill.jpg', description: 'DIY tool for your projects.' },
        { id: 2, title: 'Ladder', category: 'tools', image: 'images/Ladder.jpg', description: 'Get access to those hard-to-reach places.' },
        { id: 3, title: 'Gardening Tools', category: 'equipment', image: 'images/Gardening_Tools2.jpg', description: 'Perfect for gardening needs.' },
        { id: 4, title: 'Car', category: 'vehicles', image: 'images/car1.jpg', description: 'Need a ride? Borrow a car.' },
        { id: 5, title: 'Wheelbarrow', category: 'equipment', image: 'images/wheelbarrow.jpg', description: 'Transport heavy loads easily.' },
        { id: 6, title: 'Chair', category: 'furniture', image: 'images/chair.jpg', description: 'Comfortable seating for any occasion.' },
        { id: 7, title: 'Bicycle', category: 'vehicles', image: 'images/bicycle.jpg', description: 'Enjoy a ride around town.' },
        { id: 8, title: 'Workbench', category: 'tools', image: 'images/workbench.jpg', description: 'Work on your projects easily.' },
        { id: 9, title: 'Shovel', category: 'equipment', image: 'images/shovel.jpg', description: 'Dig in and get the job done.' }
    ];

    let filteredResources = [...resources];  // Clone the resources array to apply filters
    const resourceGrid = document.getElementById('resource-grid');
    const pageNumberElement = document.getElementById('page-number');
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');

    // Load resources based on the current page and filters
    const loadResources = (page = 1, limit = pageLimit) => {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedResources = filteredResources.slice(startIndex, endIndex);

        resourceGrid.innerHTML = '';  // Clear previous resources
        paginatedResources.forEach(resource => {
            const resourceCard = `
                <div class="resource-card">
                    <img src="${resource.image}" alt="${resource.title}">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <a href="resource_details.html?id=${resource.id}" class="primary-btn">View Details</a>
                </div>
            `;
            resourceGrid.innerHTML += resourceCard;
        });

        updatePagination(page);
    };

    // Update pagination buttons visibility and page number
    const updatePagination = (page) => {
        const totalPages = Math.ceil(filteredResources.length / pageLimit);
        pageNumberElement.textContent = page;
        prevButton.style.visibility = page === 1 ? 'hidden' : 'visible';
        nextButton.style.visibility = page === totalPages ? 'hidden' : 'visible';
    };

    // Handle pagination when 'Prev' or 'Next' is clicked
    window.handlePagination = (direction) => {
        const totalPages = Math.ceil(filteredResources.length / pageLimit);
        if (direction === 'next' && currentPage < totalPages) {
            currentPage++;
        } else if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        }
        loadResources(currentPage);
    };

    // Function to filter resources by category
    window.filterResources = () => {
        const selectedCategory = document.getElementById('category').value;
        if (selectedCategory === 'all') {
            filteredResources = [...resources];
        } else {
            filteredResources = resources.filter(resource => resource.category === selectedCategory);
        }
        currentPage = 1;
        loadResources(currentPage);
    };

    // Function to sort resources by selected option
    window.sortResources = () => {
        const selectedSort = document.getElementById('sort').value;
        if (selectedSort === 'popularity') {
            filteredResources.sort((a, b) => b.popularity - a.popularity);
        } else if (selectedSort === 'availability') {
            filteredResources.sort((a, b) => b.available - a.available);
        } else if (selectedSort === 'recent') {
            filteredResources.sort((a, b) => b.id - a.id);  // Assuming recent means higher ID
        }
        currentPage = 1;
        loadResources(currentPage);
    };

    // Initial load
    loadResources(currentPage);
});

document.addEventListener('DOMContentLoaded', () => {
    // List of resources (replace with API in production)
    const resources = [
        { id: 1, title: 'Power Drill', category: 'Tools', image: 'images/Power_drill.jpg', description: 'Perfect for DIY projects.', location: 'Gwale', availability: 'Available' },
        { id: 2, title: 'Ladder', category: 'Tools', image: 'images/Ladder.jpg', description: 'Reach high places with this sturdy ladder.', location: 'Dala', availability: 'Unavailable' },
        { id: 3, title: 'Gardening Tools', category: 'Equipment', image: 'images/Gardening_Tools2.jpg', description: 'Start your garden with these tools.', location: 'Municipal', availability: 'Available' },
        { id: 4, title: 'Car', category: 'Vehicles', image: 'images/car1.jpg', description: 'Need a ride? Borrow this car.', location: 'Ungoggo', availability: 'Available' },
        { id: 5, title: 'Wheelbarrow', category: 'Equipment', image: 'images/wheelbarrow.jpg', description: 'Move heavy loads easily with this wheelbarrow.', location: 'Tarauni', availability: 'Unavailable' },
        { id: 6, title: 'Chair', category: 'Furniture', image: 'images/chair.jpg', description: 'Comfortable seating for your home or events.', location: 'Kumbotso', availability: 'Available' },
        { id: 7, title: 'Bicycle', category: 'Vehicles', image: 'images/bicycle.jpg', description: 'Enjoy a bike ride around the neighborhood.', location: 'Nasarawa', availability: 'Available' },
        { id: 8, title: 'Workbench', category: 'Tools', image: 'images/workbench.jpg', description: 'Work on your projects with this sturdy bench.', location: 'Gwale', availability: 'Available' }
    ];

    // Get the resource ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const resourceId = parseInt(urlParams.get('id'));

    // Find the resource by ID
    const resource = resources.find(res => res.id === resourceId);

    if (resource) {
        // Populate the page with resource details
        document.getElementById('resource-title').textContent = resource.title;
        document.getElementById('resource-description').textContent = resource.description;
        document.getElementById('resource-category').textContent = resource.category;
        document.getElementById('resource-location').textContent = resource.location;
        document.getElementById('resource-availability').textContent = resource.availability;
        document.getElementById('resource-image').src = resource.image;
    } else {
        
    }

    // Handle request form submission
    document.getElementById('request-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const requestData = {
            resourceId: resourceId,
            date: document.getElementById('request-date').value,
            message: document.getElementById('message').value
        };

        // Simulate API request submission
        console.log('Submitting request:', requestData);

        // Success feedback (replace with real API response)
        alert('Request submitted successfully!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Example data: In a real application, this will be fetched from the backend
    const conversations = [
        { id: 1, user: 'John Doe', lastMessage: 'Can I borrow the ladder?' },
        { id: 2, user: 'Jane Smith', lastMessage: 'Thanks for the drill!' },
    ];

    const messages = {
        1: [
            { from: 'You', content: 'Yes, it’s available.', time: '12:00 PM' },
            { from: 'John Doe', content: 'Can I borrow the ladder?', time: '11:58 AM' },
        ],
        2: [
            { from: 'Jane Smith', content: 'Thanks for the drill!', time: '2:30 PM' },
            { from: 'You', content: 'No problem!', time: '2:28 PM' },
        ],
    };

    // Load messages in the inbox (messages.html)
    const messageList = document.getElementById('message-list');
    if (messageList) {
        conversations.forEach(convo => {
            const messageItem = `
                <div class="message-item">
                    <span>${convo.user}</span>
                    <span>${convo.lastMessage}</span>
                    <a href="message-thread.html?id=${convo.id}" class="primary-btn">View</a>
                </div>
            `;
            messageList.innerHTML += messageItem;
        });
    }

    // Load message thread (message-thread.html)
    const messageHistory = document.getElementById('message-history');
    if (messageHistory) {
        const urlParams = new URLSearchParams(window.location.search);
        const conversationId = urlParams.get('id');

        if (messages[conversationId]) {
            messages[conversationId].forEach(msg => {
                const messageItem = `
                    <div class="message-item">
                        <span><strong>${msg.from}:</strong> ${msg.content}</span>
                        <span>${msg.time}</span>
                    </div>
                `;
                messageHistory.innerHTML += messageItem;
            });
        }
    }

    // Handle sending a new message (message-thread.html)
    const sendMessageBtn = document.getElementById('send-message-btn');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', () => {
            const messageText = document.getElementById('message-text').value;
            if (messageText) {
                const newMessage = {
                    from: 'You',
                    content: messageText,
                    time: new Date().toLocaleTimeString(),
                };

                // Append message to history (simulation)
                const newMessageItem = `
                    <div class="message-item">
                        <span><strong>${newMessage.from}:</strong> ${newMessage.content}</span>
                        <span>${newMessage.time}</span>
                    </div>
                `;
                messageHistory.innerHTML += newMessageItem;
                document.getElementById('message-text').value = '';

                // In a real application, send the message to the backend here
                console.log('Message sent:', newMessage);
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // Sample Data: In a real-world app, this will come from the backend
    const forumCategories = [
        { id: 1, title: 'General Discussions', description: 'Discuss anything related to the community.' },
        { id: 2, title: 'Help & Support', description: 'Ask for help or offer support to others.' },
        { id: 3, title: 'Ideas & Suggestions', description: 'Share your ideas and suggestions for improvement.' },
    ];

    const threads = {
        1: [
            { id: 1, title: 'Welcome to the Community!', content: 'Feel free to introduce yourself here.', author: 'Admin', replies: 3 },
            { id: 2, title: 'Best DIY Tools?', content: 'What tools do you recommend for home projects?', author: 'John Doe', replies: 5 },
        ],
        2: [
            { id: 3, title: 'How to Borrow a Tool?', content: 'Can someone explain the process of borrowing a tool?', author: 'Jane Smith', replies: 2 },
        ]
    };

    const posts = {
        1: [
            { from: 'Admin', content: 'Welcome everyone!', time: '1 day ago' },
            { from: 'John Doe', content: 'Hi everyone, happy to be here!', time: '2 hours ago' },
        ],
        2: [
            { from: 'John Doe', content: 'I recommend the Bosch drill for home projects.', time: '1 hour ago' },
        ]
    };

    // Load categories on forum.html
    const categoryList = document.getElementById('category-list');
    if (categoryList) {
        forumCategories.forEach(category => {
            const categoryItem = `
                <div class="category-item">
                    <h3>${category.title}</h3>
                    <p>${category.description}</p>
                    <a href="threads.html?id=${category.id}" class="primary-btn">View Threads</a>
                </div>
            `;
            categoryList.innerHTML += categoryItem;
        });
    }

    // Load threads on threads.html
    const threadList = document.getElementById('thread-list');
    if (threadList) {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryId = urlParams.get('id');

        if (threads[categoryId]) {
            threads[categoryId].forEach(thread => {
                const threadItem = `
                    <div class="thread-item">
                        <h3>${thread.title}</h3>
                        <p>${thread.content}</p>
                        <p>By ${thread.author}, Replies: ${thread.replies}</p>
                        <a href="thread-detail.html?id=${thread.id}" class="primary-btn">View Thread</a>
                    </div>
                `;
                threadList.innerHTML += threadItem;
            });
        }
    }

    // Load posts in thread-detail.html
    const postList = document.getElementById('post-list');
    if (postList) {
        const urlParams = new URLSearchParams(window.location.search);
        const threadId = urlParams.get('id');

        if (posts[threadId]) {
            posts[threadId].forEach(post => {
                const postItem = `
                    <div class="post-item">
                        <p><strong>${post.from}:</strong> ${post.content}</p>
                        <p>${post.time}</p>
                    </div>
                `;
                postList.innerHTML += postItem;
            });
        }
    }

    // Handle new thread creation
    const newThreadForm = document.getElementById('new-thread-form');
    if (newThreadForm) {
        newThreadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newThreadTitle = document.getElementById('thread-title').value;
            const newThreadContent = document.getElementById('thread-content').value;

            console.log('Creating new thread:', newThreadTitle, newThreadContent);

            // In a real-world app, submit the thread to the backend here

            alert('Thread created successfully!');
        });
    }

    // Handle posting a reply
    const sendReplyBtn = document.getElementById('send-reply-btn');
    if (sendReplyBtn) {
        sendReplyBtn.addEventListener('click', () => {
            const replyText = document.getElementById('reply-text').value;
            if (replyText) {
                const newReply = {
                    from: 'You',
                    content: replyText,
                    time: 'Just now'
                };

                const newReplyItem = `
                    <div class="post-item">
                        <p><strong>${newReply.from}:</strong> ${newReply.content}</p>
                        <p>${newReply.time}</p>
                    </div>
                `;
                postList.innerHTML += newReplyItem;

                document.getElementById('reply-text').value = '';

                console.log('Reply sent:', newReply);
            }
        });
    }
});
// Search Functionality
const searchResources = () => {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    
    filteredResources = resources.filter(resource => {
        return resource.title.toLowerCase().includes(searchTerm) || 
               resource.description.toLowerCase().includes(searchTerm);
    });

    renderResources(filteredResources);  // Display the filtered resources
};

// Add Event Listener to Search Input
document.getElementById('search-bar').addEventListener('input', searchResources);
