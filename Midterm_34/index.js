document.addEventListener('DOMContentLoaded', function displayTopics() {
    var blogTopicsContainer = document.getElementById('blogTopics');
    blogTopicsContainer.innerHTML = '';
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((data, index) => {
                var topicElement = document.createElement('div');
                topicElement.innerHTML = `
                    <h3 onclick="showDescription(${index})">${data.topic}</h3>
                    <img src="${data.image}" class="imagePreview" width="50%" height="50%" id="image${index}"> 
                    <p>${data.description}</p>
                `;
                blogTopicsContainer.appendChild(topicElement);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function showDescription(index) {
    var description = dummyData[index].description;
    var image = document.getElementById('image' + index);
    alert(description);
    image.style.display = 'block'; 
};

function search() {
    var searchTerm = document.getElementById('searchInput').value.toLowerCase();
    var blogTopicsContainer = document.getElementById('blogTopics');
    var topics = blogTopicsContainer.querySelectorAll('h3');
    topics.forEach(topic => {
        var topicText = topic.innerText.toLowerCase();
        if (topicText.includes(searchTerm)) {
            topic.style.display = 'block';
        } else {
            topic.style.display = 'none';
        }
    });
};

function showBlogForm() {
    document.getElementById('blogSubmission').style.display = 'block';
};

function submitBlog() {
    var topic = document.getElementById('blogTopic').value;
    var description = document.getElementById('blogDescription').value;
    var image = document.getElementById('blogImage').src; 
    data.unshift({ topic: topic, description: description, image: image }); 
    displayTopics();
    document.getElementById('blogSubmission').style.display = 'none';
    document.getElementById('blogTopic').value = '';
    document.getElementById('blogDescription').value = '';
    document.getElementById('imagePreview').src = ''; 
    scrollToBottom();
};

function previewImage() {
    var fileInput = document.getElementById('blogImage');
    var imagePreview = document.getElementById('imagePreview');
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
    }
    reader.readAsDataURL(file); 
};

window.onload = function() {
    displayTopics();
    previewImage();
};

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}
