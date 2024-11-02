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
    try {
        const response = await fetch(`http://localhost:3000/api/posts/${id}`);
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
            <div class="error-message">
                <h2>${currentLang === 'zh' ? '文章未找到' : 'Post Not Found'}</h2>
                <a href="/">${currentLang === 'zh' ? '返回首页' : 'Back to Home'}</a>
            </div>
        `;
        return;
    }

    // 使用marked解析Markdown内容
    const parsedContent = marked.parse(post.content[currentLang], {
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false
    });

    content.innerHTML = `
        <article class="post-full">
            <h1>${post.title[currentLang]}</h1>
            <div class="post-meta">
                <span class="date">${new Date(post.date).toLocaleDateString()}</span>
            </div>
            <div class="post-content markdown-body">
                ${parsedContent}
            </div>
            <div class="post-navigation">
                <a href="/" class="back-link">
                    ${currentLang === 'zh' ? '← 返回首页' : '← Back to Home'}
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
    // 初始化marked
    marked.setOptions({
        highlight: function(code, lang) {
            return code;
        }
    });

    const postId = getPostId();
    const post = await fetchPost(postId);
    renderPost(post);
});
