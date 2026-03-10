document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // ส่วนที่ 1: ระบบเปิด-ปิดเมนู Hamburger
    // ==========================================
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconMenu = document.getElementById('icon-menu');
    const iconClose = document.getElementById('icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    let isMenuOpen = false;

    mobileBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;

        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');

            iconMenu.classList.add('hidden');
            iconClose.classList.remove('hidden', 'rotate-90');
            iconClose.classList.add('rotate-0');

            mobileLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.classList.remove('translate-y-10', 'opacity-0');
                    link.classList.add('translate-y-0', 'opacity-100');
                }, 100 * (index + 1));
            });

            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');

            iconClose.classList.add('hidden', 'rotate-90');
            iconMenu.classList.remove('hidden');

            mobileLinks.forEach((link) => {
                link.classList.remove('translate-y-0', 'opacity-100');
                link.classList.add('translate-y-10', 'opacity-0');
            });

            document.body.style.overflow = '';
        }
    });

    // ==========================================
    // ส่วนที่ 2: ระบบ Scroll Animation (แบบ Premium)
    // ==========================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 1. เมื่อเลื่อนจอลงมาจนเห็นกล่อง -> สั่งให้ลอยขึ้นมา (แสดงตัว)
                entry.target.classList.remove('opacity-0', 'translate-y-12');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            } else {
                // 2. เมื่อกล่องหลุดออกจากหน้าจอไปแล้ว
                // เช็คตำแหน่งว่ากล่องหลุดลงไป "ด้านล่าง" ของจอใช่ไหม? (แปลว่าลูกค้าเลื่อนจอขึ้น)
                if (entry.boundingClientRect.top > 0) {
                    // สั่งให้กลับไปซ่อนตัว เพื่อรอเด้งใหม่ในรอบหน้า
                    entry.target.classList.remove('opacity-100', 'translate-y-0');
                    entry.target.classList.add('opacity-0', 'translate-y-12');
                }
            }
        });
    }, {
        threshold: 0.15 
    });

    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => {
        observer.observe(el);
    });

}); 

// ==========================================
// ACTIVE STATE (Scroll Spy) - ไฮไลต์เมนูตามการเลื่อนหน้าจอ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function onScroll() {
        let currentSectionId = '';

        //แก้จุดที่ 1: เติม footer[id] เข้าไปในวงเล็บ เพื่อให้ตากล้องมองเห็น Footer ด้วย
        document.querySelectorAll('section[id], div[id], header[id], footer[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            // ลบระยะความสูงของ Navbar ออก 150px
            if (scrollY >= (sectionTop - 150)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // แก้จุดที่ 2: ท่าไม้ตายดักจับ "ก้นขอบเว็บ" (Bottom of page)
        // ถ้าเลื่อนลงมาจนสุดขอบหน้าจอแล้วจริงๆ ให้บังคับไฮไลต์เมนู contact เลย!
        if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight - 20) {
            currentSectionId = 'contact';
        }

        // 3. วนลูปเช็คเมนูทีละตัว
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');

            // ล้างสีทองออกให้หมดก่อน
            link.classList.remove('text-[#cba472]');
            link.classList.add('text-white');

            // ถ้าชื่อลิงก์ ตรงกับ Section ที่กำลังโชว์อยู่บนจอ 
            if (linkHref === `#${currentSectionId}`) {
                // เปลี่ยนให้เมนูนั้นกลายเป็นสีทอง
                link.classList.remove('text-white');
                link.classList.add('text-[#cba472]');
            }
        });
    }

    // สั่งให้ฟังก์ชันนี้ทำงานทุกครั้งที่ไถหน้าจอ
    window.addEventListener('scroll', onScroll);
});