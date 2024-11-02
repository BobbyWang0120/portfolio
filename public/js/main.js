/**
 * 全局变量定义
 */
const API_BASE_URL = 'http://localhost:3000';

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
 * 渲染文章列表
 * @param {Array} posts - 文章列表数据
 */
function renderPosts(posts) {
    const content = document.getElementById('content');
    const currentLang = window.i18n.currentLang;
    
    const postsHTML = posts.map(post => `
        <article class="post-preview">
            <h2>
                <a href="/post.html?id=${post.id}">${post.title[currentLang]}</a>
            </h2>
            <div class="post-meta">
                <span class="date">${new Date(post.date).toLocaleDateString()}</span>
            </div>
            <p>${post.excerpt[currentLang]}</p>
        </article>
    `).join('');
    
    content.innerHTML = postsHTML;
}

// 监听语言变化事件
window.addEventListener('languageChanged', async () => {
    const posts = await fetchPosts();
    renderPosts(posts);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    // 加载文章列表
    const posts = await fetchPosts();
    renderPosts(posts);
});
