// --- 1. Intro Typewriter & Reveal ---
const text = "Hạnh phúc không phải là điểm đến, mà là hành trình...";
const typingElement = document.getElementById('typingText');
const openBtn = document.getElementById('openBtn');
const introScreen = document.getElementById('introScreen');
const mainContent = document.getElementById('mainContent');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const typingSound = new Audio('./audio/typing.mp3');
typingSound.volume = 0.4;
typingSound.preload = 'auto';
typingSound.loop = true;
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    } else {
        // ✅ Dừng tiếng gõ phím
        typingSound.pause();
        typingSound.currentTime = 0;
        
        // ✅ Dừng con trỏ nhấp nháy
        typingElement.classList.remove('typewriter');
        typingElement.style.borderRight = 'none';
        
        // ✅ Chờ 1 giây rồi chuyển sang Part 2
        setTimeout(() => {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.style.display = 'none';
                mainContent.style.opacity = '1';
                playMusic();
            }, 1000);
        }, 800);
    }
}

// ============ CHẾ ĐỘ TEST - Bật/Tắt Part 1 ============
const SKIP_INTRO = false; // 🔧 Đổi thành false để bật lại Part 1
// ======================================================

window.onload = () => {
    if (SKIP_INTRO) {
        // Ẩn intro, hiện main content ngay
        introScreen.style.display = 'none';
        mainContent.style.opacity = '1';
        musicToggle.classList.remove('hidden');
        // bgMusic.play(); // Bỏ comment nếu muốn tự phát nhạc
    } else {
        // Chạy bình thường - hiện nút "Mở thiệp hồng"
        openBtn.classList.remove('opacity-0', 'translate-y-4');
    }
};

// ✅ Khi click nút "Mở thiệp hồng"
openBtn.addEventListener('click', () => {
    // Ẩn nút sau khi click
    openBtn.style.display = 'none';
    
    // Phát tiếng gõ bàn phím
    typingSound.play();
    
    // Bắt đầu hiệu ứng typewriter
    typeWriter();
});

// --- 2. Music Control ---
let isPlaying = false;

function playMusic() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.classList.remove('hidden');
    }).catch(e => {
        console.log("Autoplay blocked, waiting for interaction");
        musicToggle.classList.remove('hidden'); // Show button anyway
    });
}

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        document.getElementById('musicIcon').innerText = 'music_off';
        document.getElementById('musicIcon').classList.remove('animate-spin-slow');
    } else {
        bgMusic.play();
        document.getElementById('musicIcon').innerText = 'music_note';
        document.getElementById('musicIcon').classList.add('animate-spin-slow');
    }
    isPlaying = !isPlaying;
});

// --- 3. Countdown Timer ---
const weddingDate = new Date('December 27, 2025 11:00:00').getTime();

const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "We are Married!";
    }
}, 1000);

// --- 4. Lightbox ---
function openLightbox(element) {
    const imgSrc = element.querySelector('img').src;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    lightboxImg.src = imgSrc;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');

    // Small delay for animation
    setTimeout(() => {
        lightboxImg.style.transform = 'scale(1)';
    }, 10);
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    lightboxImg.style.transform = 'scale(0.95)';
    setTimeout(() => {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
    }, 300);
}

// --- 5. Gift Tabs ---
function switchTab(person) {
    const tabGroom = document.getElementById('tabGroom');
    const tabBride = document.getElementById('tabBride');
    const contentGroom = document.getElementById('contentGroom');
    const contentBride = document.getElementById('contentBride');

    if (person === 'groom') {
        tabGroom.classList.add('text-burgundy', 'border-b-2', 'border-burgundy', 'font-bold', 'bg-gray-50');
        tabGroom.classList.remove('text-gray-500');

        tabBride.classList.remove('text-burgundy', 'border-b-2', 'border-burgundy', 'font-bold', 'bg-gray-50');
        tabBride.classList.add('text-gray-500');

        contentGroom.classList.remove('hidden');
        contentBride.classList.add('hidden');
    } else {
        tabBride.classList.add('text-burgundy', 'border-b-2', 'border-burgundy', 'font-bold', 'bg-gray-50');
        tabBride.classList.remove('text-gray-500');

        tabGroom.classList.remove('text-burgundy', 'border-b-2', 'border-burgundy', 'font-bold', 'bg-gray-50');
        tabGroom.classList.add('text-gray-500');

        contentBride.classList.remove('hidden');
        contentGroom.classList.add('hidden');
    }
}

// --- 6. Guestbook Logic (Simulated) ---
function addWish(e) {
    e.preventDefault();
    const name = document.getElementById('guestName').value;
    const msg = document.getElementById('guestMsg').value;
    const container = document.getElementById('wishesContainer');

    const newWish = document.createElement('div');
    newWish.className = "p-3 bg-white rounded shadow-sm border-l-4 border-burgundy animate-fade-in-up";
    newWish.innerHTML = `
        <p class="font-bold text-burgundy text-sm">${name}</p>
        <p class="text-gray-600 italic">"${msg}"</p>
    `;

    container.prepend(newWish);

    // Reset form
    document.getElementById('wishForm').reset();
    alert("Cảm ơn lời chúc của bạn!");
}

// --- 7. Download Source Code Function ---
function downloadSource() {
    // Get the current HTML
    let htmlContent = document.documentElement.outerHTML;

    // Create a Blob
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'thiep-cuoi-hoang-lan-anh.html';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
function getQueryParam(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
}

const guest = getQueryParam('name');
if (guest) {
    document.getElementById('guestName').innerText = guest;
}
const invitation = document.getElementById('invitation');

function revealInvitation() {
    const rect = invitation.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
        invitation.classList.remove('opacity-0', 'translate-y-10');
        window.removeEventListener('scroll', revealInvitation);
    }
}

window.addEventListener('scroll', revealInvitation);
