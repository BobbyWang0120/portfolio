# Minimal Bilingual Blog

A minimalist, bilingual (Chinese/English) personal blog template built with vanilla JavaScript and Node.js. Perfect for personal blogs, thought collections, or portfolio sites.

![Blog Preview](preview.png)

## Features

- 🌐 Bilingual support (Chinese/English) with easy language switching
- 📱 Responsive design inspired by Apple's design principles
- 🔍 Real-time search functionality
- 🔄 Dynamic content sorting
- ✨ Elegant animations and transitions
- 📝 Markdown support for blog posts
- 🚀 Easy deployment to Vercel

## Why This Template?

- **Minimalist**: Built with vanilla JavaScript, HTML, and CSS (Tailwind) - no complex frameworks or build processes
- **Fast**: Lightweight and performant with minimal dependencies
- **Easy to Customize**: Simple structure makes it easy to modify and extend
- **Modern Design**: Clean, elegant interface with smooth animations
- **SEO Friendly**: Semantic HTML and clean URLs
- **Instant Setup**: Fork, configure, and deploy in minutes

## Quick Start

1. Fork this repository
2. Clone your forked repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

3. Install dependencies:
```bash
npm install
```

4. Start development server:
```bash
npm run dev
```

Visit `http://localhost:8080` to see your blog.

## Writing Posts

Posts are stored in `content/posts` directory as Markdown files. Each post should follow this format:

```markdown
lang: zh
# 中文标题
中文描述
中文内容...

---
lang: en
# English Title
English Description
English content...
```

## Configuration

### 1. Site Information

Update site title and navigation in `public/i18n/` directory:

- `zh.json` for Chinese
- `en.json` for English

### 2. API URLs

When deploying, update API URLs in:

- `public/js/main.js`
- `public/js/post.js`
- `public/js/posts.js`

The URLs are automatically configured based on the environment:
```javascript
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';
```

## Deployment

### Deploying to Vercel

1. Push your repository to GitHub
2. Import your repository in Vercel
3. Deploy

No additional configuration needed - Vercel will automatically detect and configure everything.

## Customization

### Styling

- Styles are built with Tailwind CSS
- Main configuration in `tailwind.config.js`
- Custom styles can be added in `public/css/tailwind.css`

### Adding New Features

The project structure is simple and modular:

```
├── content/
│   └── posts/          # Markdown blog posts
├── public/
│   ├── css/           # Styles
│   ├── js/            # JavaScript files
│   └── i18n/          # Language files
└── server/            # Node.js server
```

## Dependencies

Minimal dependencies to keep things simple:

- `marked` for Markdown parsing
- `tailwindcss` for styling
- Basic Node.js server

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

## License

MIT License - feel free to use this template for your personal blog or any other purpose.

## Support

If you like this project, please give it a ⭐️!

For issues or questions, please [open an issue](https://github.com/yourusername/your-repo-name/issues).
