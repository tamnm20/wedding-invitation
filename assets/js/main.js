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
const SKIP_INTRO = true; // 🔧 Đổi thành false để bật lại Part 1
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

document.addEventListener("DOMContentLoaded", () => {
  const couples = document.querySelectorAll(".couple-reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.3
  });

  couples.forEach(el => observer.observe(el));
});

// ========== RSVP FORM ==========
const rsvpForm = document.getElementById('rsvpForm');
const successMessage = document.getElementById('successMessage');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6tRKC6IvwSuBWY9hypsM7-x0bZ1bBoWppLV4_B9MMbQvyM-fSnCl2Qe0juPgUDHf5Iw/exec';

const wishListEl = document.getElementById('wishList');

function renderWishes(wishes) {
    if (!wishListEl) return;

    if (!wishes || wishes.length === 0) {
        wishListEl.innerHTML = '<p class="text-gray-400 text-sm">Chưa có lời chúc nào, hãy là người đầu tiên nhé 🥰</p>';
        return;
    }

    wishListEl.innerHTML = '';

    wishes.forEach(function(wish) {
        const item = document.createElement('div');
        item.className = 'bg-pink-50/60 rounded-lg px-3 py-2 sm:px-4 sm:py-3';
        item.innerHTML = `
            <p class="font-semibold text-gray-800 text-sm sm:text-base">${wish.name || 'Ẩn danh'}</p>
            <p class="text-gray-700 text-sm sm:text-base mt-1 whitespace-pre-line">${wish.message || ''}</p>
        `;
        wishListEl.appendChild(item);
    });
}

function loadWishes() {
    fetch(GOOGLE_SCRIPT_URL)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            renderWishes(data);
        })
        .catch(function(err) {
            console.error('Không tải được lời chúc:', err);
        });
}

// Form submit
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
                
        const formData = new FormData(rsvpForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            guestType: formData.get('guestType'),
            attendance: formData.get('attendance'),
            message: formData.get('message')
        };

        console.log('RSVP Data:', data);

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(error => {
            console.error('Error sending to Google Script:', error);
        });

        // Hiệu ứng cảm ơn
        rsvpForm.style.opacity = '0';
        rsvpForm.style.transform = 'translateY(-20px)';
                
        setTimeout(() => {
            rsvpForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
                    
            setTimeout(() => {
                successMessage.style.transition = 'all 0.5s ease';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 50);
        }, 300);

        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Load lại lời chúc sau khi gửi (delay nhẹ cho chắc chắn đã ghi sheet)
        setTimeout(loadWishes, 1500);
    });
}

function syncWishHeight() {
    const wishCard = document.getElementById('wishCard');
    const wishList = document.getElementById('wishList');
    const rsvpForm = document.getElementById('rsvpForm');
    const successMessage = document.getElementById('successMessage');

    if (!wishCard || !wishList || !rsvpForm) return;

    let leftCard = rsvpForm;

    // Chỉ áp dụng trên desktop (md: 768px trở lên)
    if (window.innerWidth < 768) {
        // Mobile: để tự nhiên
        wishCard.style.height = 'auto';
        wishList.style.maxHeight = 'none';
        return;
    }

    // Reset trước khi tính lại
    wishCard.style.height = 'auto';
    wishList.style.maxHeight = 'none';

    // Lấy chiều cao card bên trái (form hoặc success)
    const targetHeight = leftCard.offsetHeight;
    if (!targetHeight) return;

    // Đặt chiều cao card "Lời chúc" = chiều cao card bên trái
    wishCard.style.height = targetHeight + 'px';

    // Tính khoảng trống còn lại cho vùng danh sách (#wishList)
    const styles = getComputedStyle(wishCard);
    const paddingTop = parseFloat(styles.paddingTop);
    const paddingBottom = parseFloat(styles.paddingBottom);

    const title = wishCard.querySelector('h3');
    const titleHeight = title ? title.offsetHeight : 0;
    const gap = 16; // khoảng cách nhỏ giữa tiêu đề và list

    const available = targetHeight - paddingTop - paddingBottom - titleHeight - gap;
    if (available > 0) {
        wishList.style.maxHeight = available + 'px';
    }
}

window.addEventListener('load', syncWishHeight);

// Lần đầu mở trang: tải lời chúc + refresh mỗi 1 giây
loadWishes();
setInterval(loadWishes, 2000);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

