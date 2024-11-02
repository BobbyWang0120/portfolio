/**
 * 计算年龄
 * @param {string} birthDate - 生日日期字符串 (YYYY-MM-DD格式)
 * @returns {number} 年龄
 */
function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

/**
 * 更新年龄显示
 */
function updateAge() {
    const birthDate = '2000-01-20';
    const age = calculateAge(birthDate);
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = age;
    }
}

/**
 * 添加滚动动画
 */
function addScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        if (section.classList.contains('hero-section')) return;
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
}

/**
 * 添加兴趣卡片交互效果
 */
function addInterestCardInteraction() {
    const cards = document.querySelectorAll('.interest-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => c.style.opacity = '0.6');
            card.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => c.style.opacity = '1');
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    updateAge();
    addScrollAnimation();
    addInterestCardInteraction();
});

// 监听语言变化事件
window.addEventListener('languageChanged', () => {
    updateAge();
});
