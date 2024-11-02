/**
 * 全局变量定义
 */
const API_BASE_URL = 'http://localhost:3000';
let allPosts = [];
let currentSort = 'date-desc';

/**
 * 获取文章列表
 * @returns {Promise} 返回文章列表数据
 */
async function fetchPosts() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/posts`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return [];
    }
}

/**
 * 初始化排序下拉菜单
 */
function initializeSortDropdown() {
    const button = document.querySelector('#sortDropdown button');
    const dropdown = document.querySelector('#sortDropdown .absolute');
    const options = document.querySelectorAll('.sort-option');

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        button.classList.toggle('border-gray-400');
        dropdown.classList.toggle('opacity-0');
        dropdown.classList.toggle('invisible');
        dropdown.classList.toggle('-translate-y-2');
        button.querySelector('svg').classList.toggle('rotate-180');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            currentSort = option.dataset.sort;
            filterAndSortPosts();
            updateSortButtonText(option.textContent);
            button.classList.remove('border-gray-400');
            dropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
            button.querySelector('svg').classList.remove('rotate-180');
        });
    });

    document.addEventListener('click', () => {
        button.classList.remove('border-gray-400');
        dropdown.classList.add('opacity-0', 'invisible', '-translate-y-2');
        button.querySelector('svg').classList.remove('rotate-180');
    });
}

/**
 * 更新排序按钮文本
 * @param {string} text - 显示的文本
 */
function updateSortButtonText(text) {
    const button = document.querySelector('#sortDropdown button span');
    button.textContent = text;
}

/**
 * 初始化搜索功能
 */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    let debounceTimeout;

    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            filterAndSortPosts();
        }, 300);
    });
}

/**
 * 过滤和排序文章
 */
function filterAndSortPosts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const currentLang = window.i18n.currentLang;
    
    let filteredPosts = allPosts.filter(post => {
        const title = post.title[currentLang].toLowerCase();
        const excerpt = post.excerpt[currentLang].toLowerCase();
        return title.includes(searchTerm) || excerpt.includes(searchTerm);
    });

    // 排序文章
    filteredPosts.sort((a, b) => {
        switch (currentSort) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'title':
                return a.title[currentLang].localeCompare(b.title[currentLang]);
            default:
                return 0;
        }
    });

    renderPosts(filteredPosts);
}

/**
 * 渲染文章列表
 * @param {Array} posts - 文章列表数据
 */
function renderPosts(posts) {
    const content = document.getElementById('content');
    const currentLang = window.i18n.currentLang;
    
    if (posts.length === 0) {
        content.innerHTML = `
            <div class="text-center py-16 text-gray-500">
                ${currentLang === 'zh' ? '没有找到相关文章' : 'No posts found'}
            </div>
        `;
        return;
    }

    const postsHTML = posts.map(post => `
        <a href="/post.html?id=${post.id}" class="block group">
            <article class="mb-16 p-8 bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
                <h2 class="text-2xl font-semibold tracking-tight mb-3 group-hover:text-gray-600 transition-colors">
                    ${post.title[currentLang]}
                </h2>
                <div class="text-sm text-gray-600 mb-4">
                    <span class="date">${new Date(post.date).toLocaleDateString()}</span>
                </div>
                <p class="text-gray-600 leading-relaxed">${post.excerpt[currentLang]}</p>
            </article>
        </a>
    `).join('');
    
    content.innerHTML = postsHTML;
}

// 监听语言变化事件
window.addEventListener('languageChanged', () => {
    filterAndSortPosts();
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    initializeSortDropdown();
    initializeSearch();
    
    // 加载文章列表
    allPosts = await fetchPosts();
    filterAndSortPosts();
});
