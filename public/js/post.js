/**
 * 获取URL中的文章ID
 * @returns {string} 文章ID
 */
function getPostId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

/**
 * 获取单篇文章内容
 * @param {string} id - 文章ID
 * @returns {Promise} 返回文章内容
 */
async function fetchPost(id) {
    const API_BASE_URL = window.location.hostname === 'localhost' 
        ? 'http://localhost:3000/api'
        : 'https://portfolio-delta-six-56.vercel.app/api';

    try {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!response.ok) {
            throw new Error('Post not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch post:', error);
        return null;
    }
}

/**
 * 渲染文章内容
 * @param {Object} post - 文章数据
 */
function renderPost(post) {
    const content = document.getElementById('content');
    const currentLang = window.i18n.currentLang;
    
    if (!post) {
        content.innerHTML = `
            <div class="text-center py-16">
                <h2 class="text-2xl font-semibold mb-4 text-gray-900">
                    ${currentLang === 'zh' ? '文章未找到' : 'Post Not Found'}
                </h2>
                <a href="/posts" class="text-gray-600 hover:text-gray-900 transition-colors">
                    ${currentLang === 'zh' ? '返回文章列表' : 'Back to Posts'}
                </a>
            </div>
        `;
        return;
    }

    // 配置marked选项
    marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false,
        highlight: function(code, lang) {
            return code;
        }
    });

    const parsedContent = marked.parse(post.content[currentLang]);

    content.innerHTML = `
        <article>
            <h1 class="text-4xl font-bold tracking-tight mb-4">${post.title[currentLang]}</h1>
            <div class="text-sm text-gray-600 mb-8 pb-4 border-b border-gray-200">
                <span class="date">${new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div class="prose prose-lg max-w-none">
                ${parsedContent}
            </div>
            <div class="mt-16 pt-8 border-t border-gray-200">
                <a href="/posts" class="text-gray-600 hover:text-gray-900 transition-colors">
                    ${currentLang === 'zh' ? '← 返回文章列表' : '← Back to Posts'}
                </a>
            </div>
        </article>
    `;
}

// 监听语言变化事件
window.addEventListener('languageChanged', async () => {
    const postId = getPostId();
    const post = await fetchPost(postId);
    renderPost(post);
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    const postId = getPostId();
    const post = await fetchPost(postId);
    renderPost(post);
});
