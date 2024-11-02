/**
 * 后端服务器入口文件
 * 支持多语言内容的处理
 */

const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

// 定义服务器配置
const PORT = 3000;
const POSTS_DIR = path.join(__dirname, '..', 'content', 'posts');

/**
 * 处理静态文件请求
 * @param {string} filePath - 文件路径
 * @param {http.ServerResponse} res - HTTP响应对象
 */
async function serveStaticFile(filePath, res) {
    try {
        const content = await fs.readFile(filePath);
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
        }[ext] || 'text/plain';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (error) {
        res.writeHead(404);
        res.end('File not found');
    }
}

/**
 * 解析markdown文件中的元数据和内容
 * @param {string} content - markdown文件内容
 * @returns {Object} 解析后的元数据和内容
 */
function parseMarkdown(content) {
    const sections = content.split('---').filter(Boolean);
    const metadata = {};
    const contentByLang = {};

    sections.forEach(section => {
        const lines = section.trim().split('\n');
        const langMatch = lines[0].match(/^lang:\s*(\w+)/);
        
        if (langMatch) {
            const lang = langMatch[1];
            const title = lines[1].replace('# ', '');
            const excerpt = lines[3] || '';
            const content = lines.slice(4).join('\n');

            metadata[lang] = {
                title,
                excerpt
            };
            contentByLang[lang] = content;
        }
    });

    return {
        title: Object.keys(metadata).reduce((acc, lang) => {
            acc[lang] = metadata[lang].title;
            return acc;
        }, {}),
        date: new Date().toISOString(),
        excerpt: Object.keys(metadata).reduce((acc, lang) => {
            acc[lang] = metadata[lang].excerpt;
            return acc;
        }, {}),
        content: contentByLang
    };
}

/**
 * 获取所有文章列表
 * @returns {Promise<Array>} 文章列表
 */
async function getPosts() {
    try {
        const files = await fs.readdir(POSTS_DIR);
        const posts = await Promise.all(
            files.map(async (file) => {
                const content = await fs.readFile(path.join(POSTS_DIR, file), 'utf-8');
                const parsed = parseMarkdown(content);
                return {
                    id: path.basename(file, '.md'),
                    ...parsed
                };
            })
        );
        return posts;
    } catch (error) {
        console.error('Error reading posts:', error);
        return [];
    }
}

/**
 * 获取单篇文章
 * @param {string} id - 文章ID
 * @returns {Promise<Object>} 文章数据
 */
async function getPost(id) {
    try {
        const content = await fs.readFile(path.join(POSTS_DIR, `${id}.md`), 'utf-8');
        const parsed = parseMarkdown(content);
        return {
            id,
            ...parsed
        };
    } catch (error) {
        console.error(`Error reading post ${id}:`, error);
        return null;
    }
}

/**
 * 判断是否是静态文件请求
 * @param {string} pathname - 请求路径
 * @returns {boolean} 是否是静态文件请求
 */
function isStaticFileRequest(pathname) {
    const ext = path.extname(pathname);
    return ext !== '' || pathname === '/' || pathname === '/post';
}

// 创建HTTP服务器
const server = http.createServer(async (req, res) => {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // API路由处理
    if (pathname === '/api/posts') {
        const posts = await getPosts();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(posts));
        return;
    }

    // 单篇文章API
    const postMatch = pathname.match(/^\/api\/posts\/([^/]+)$/);
    if (postMatch) {
        const postId = postMatch[1];
        const post = await getPost(postId);
        
        if (post) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(post));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Post not found' }));
        }
        return;
    }

    // 静态文件处理
    if (isStaticFileRequest(pathname)) {
        let filePath;
        if (pathname === '/') {
            filePath = path.join(__dirname, '..', 'public', 'index.html');
        } else {
            filePath = path.join(__dirname, '..', 'public', pathname);
        }
        await serveStaticFile(filePath, res);
        return;
    }

    // 404处理
    res.writeHead(404);
    res.end('Not Found');
});

// 启动服务器
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
