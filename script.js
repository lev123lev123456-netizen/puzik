document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const gallery = document.getElementById('gallery');
    const mainImage = document.getElementById('mainImage');
    const fileName = document.getElementById('fileName');
    const blurBtn = document.getElementById('blurBtn');
    const randomBtn = document.getElementById('randomBtn');
    const slideshowBtn = document.getElementById('slideshowBtn');
    const helpDialog = document.getElementById('helpDialog');
    const imageCount = document.getElementById('imageCount');
    const body = document.body;

    // Конфигурация
    const TOTAL_IMAGES = 31; // от 0 до 30
    let isBlurred = false;
    let isSlideshow = false;
    let slideshowInterval;
    let currentImageIndex = 0;

    // Инициализация галереи
    function initGallery() {
        gallery.innerHTML = '';
        
        for (let i = 0; i <= TOTAL_IMAGES; i++) {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.index = i;
            
            const img = document.createElement('img');
            img.src = `meme/${i}.jpg`;
            img.alt = `Meme ${i}`;
            img.loading = 'lazy';
            
            img.onerror = function() {
                // Если изображение не загрузилось, показываем заглушку
                this.src = 'data:image/svg+xml;utf8,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="%23c0c0c0"/><text x="50" y="55" font-family="monospace" font-size="14" text-anchor="middle" fill="%23000">Image ' + i + '</text></svg>';
            };
            
            galleryItem.appendChild(img);
            
            // Обработчик клика
            galleryItem.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                setMainImage(index);
                stopSlideshow();
            });
            
            gallery.appendChild(galleryItem);
        }
        
        imageCount.textContent = `${TOTAL_IMAGES + 1} images loaded`;
    }

    // Установить основное изображение
    function setMainImage(index) {
        currentImageIndex = index;
        mainImage.src = `meme/${index}.jpg`;
        fileName.textContent = `meme_${index}.jpg`;
        
        // Показать выбранную миниатюру
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.backgroundColor = item.dataset.index == index ? '#000080' : '#fff';
            item.style.color = item.dataset.index == index ? '#fff' : '#000';
        });
    }

    // Случайное изображение
    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * (TOTAL_IMAGES + 1));
        setMainImage(randomIndex);
    }

    // Переключение режима слайдшоу
    function toggleSlideshow() {
        isSlideshow = !isSlideshow;
        
        if (isSlideshow) {
            slideshowBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Slideshow';
            slideshowBtn.style.backgroundColor = '#ff0000';
            
            slideshowInterval = setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % (TOTAL_IMAGES + 1);
                setMainImage(currentImageIndex);
            }, 3000);
        } else {
            stopSlideshow();
        }
    }

    // Остановить слайдшоу
    function stopSlideshow() {
        isSlideshow = false;
        slideshowBtn.innerHTML = '<i class="fas fa-play"></i> Slideshow';
        slideshowBtn.style.backgroundColor = '';
        
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
    }

    // Переключение режима размытия
    function toggleBlur() {
        isBlurred = !isBlurred;
        body.classList.toggle('blur-active', isBlurred);
        
        if (isBlurred) {
            blurBtn.innerHTML = '<i class="fas fa-eye"></i> Normal Mode';
            blurBtn.style.backgroundColor = '#00aa00';
        } else {
            blurBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Blur Mode';
            blurBtn.style.backgroundColor = '';
        }
    }

    // Показать диалоговое окно
    function showDialog() {
        helpDialog.style.display = 'block';
    }

    // Скрыть диалоговое окно
    function hideDialog() {
        helpDialog.style.display = 'none';
    }

    // Обработчики событий
    blurBtn.addEventListener('click', toggleBlur);
    randomBtn.addEventListener('click', getRandomImage);
    slideshowBtn.addEventListener('click', toggleSlideshow);

    // Закрытие диалога
    document.querySelector('.dialog-close').addEventListener('click', hideDialog);
    document.querySelector('.dialog-buttons .mac-btn').addEventListener('click', hideDialog);

    // Обработка нажатий клавиш
    document.addEventListener('keydown', function(e) {
        switch(e.key.toLowerCase()) {
            case 'b':
                toggleBlur();
                break;
            case 'r':
                getRandomImage();
                break;
            case 's':
                toggleSlideshow();
                break;
            case 'h':
                showDialog();
                break;
            case 'escape':
                hideDialog();
                stopSladeshow();
                break;
            case 'arrowleft':
                currentImageIndex = (currentImageIndex - 1 + TOTAL_IMAGES + 1) % (TOTAL_IMAGES + 1);
                setMainImage(currentImageIndex);
                stopSlideshow();
                break;
            case 'arrowright':
                currentImageIndex = (currentImageIndex + 1) % (TOTAL_IMAGES + 1);
                setMainImage(currentImageIndex);
                stopSlideshow();
                break;
        }
    });

    // Обновление времени
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).toUpperCase();
        document.querySelector('.time').textContent = timeString;
    }

    // Инициализация
    initGallery();
    setMainImage(0);
    updateTime();
    
    // Обновление времени каждую минуту
    setInterval(updateTime, 60000);
    
    // Случайный звук загрузки (имитация)
    setTimeout(() => {
        const sounds = ['bloop', 'boop', 'beep', 'click'];
        console.log('System: ' + sounds[Math.floor(Math.random() * sounds.length)] + '!');
    }, 1000);
});