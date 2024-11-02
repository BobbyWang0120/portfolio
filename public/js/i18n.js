/**
 * 国际化（i18n）管理类
 * 处理多语言支持的核心功能
 */
class I18nManager {
    constructor() {
        this.currentLang = localStorage.getItem('preferred-language') || 'zh';
        this.translations = {};
        this.supportedLanguages = ['zh', 'en']; // 支持的语言列表
        this.init();
    }

    /**
     * 初始化国际化系统
     */
    async init() {
        // 加载所有支持的语言翻译
        await Promise.all(
            this.supportedLanguages.map(lang => this.loadTranslations(lang))
        );
        
        // 创建语言选择器
        this.createLanguageSelector();
        
        // 应用当前语言
        await this.setLanguage(this.currentLang);
    }

    /**
     * 加载指定语言的翻译文件
     * @param {string} lang - 语言代码
     */
    async loadTranslations(lang) {
        try {
            const response = await fetch(`/i18n/${lang}.json`);
            this.translations[lang] = await response.json();
        } catch (error) {
            console.error(`Failed to load ${lang} translations:`, error);
        }
    }

    /**
     * 创建语言选择器界面
     */
    createLanguageSelector() {
        const container = document.getElementById('languageSwitch');
        
        // 创建当前语言显示按钮
        const button = document.createElement('button');
        button.className = 'language-select-button';
        
        // 创建下拉菜单
        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        
        // 更新按钮和下拉菜单内容
        const updateContent = () => {
            button.innerHTML = `
                <span>${this.getLanguageDisplayName(this.currentLang)}</span>
                <svg class="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                </svg>
            `;
            
            dropdown.innerHTML = this.supportedLanguages
                .map(lang => `
                    <div class="language-option ${lang === this.currentLang ? 'active' : ''}" 
                         data-lang="${lang}">
                        ${this.getLanguageDisplayName(lang)}
                    </div>
                `).join('');
        };
        
        updateContent();

        // 添加点击事件处理
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            button.classList.toggle('active');
            dropdown.classList.toggle('show');
        });

        // 处理选项点击
        dropdown.addEventListener('click', (e) => {
            const option = e.target.closest('.language-option');
            if (option) {
                const lang = option.dataset.lang;
                this.setLanguage(lang);
                button.classList.remove('active');
                dropdown.classList.remove('show');
                updateContent();
            }
        });

        // 点击其他地方关闭下拉菜单
        document.addEventListener('click', () => {
            button.classList.remove('active');
            dropdown.classList.remove('show');
        });

        // 监听语言变化
        window.addEventListener('languageChanged', () => {
            updateContent();
        });

        // 添加到容器
        container.appendChild(button);
        container.appendChild(dropdown);
    }

    /**
     * 获取语言的显示名称
     * @param {string} lang - 语言代码
     * @returns {string} 语言显示名称
     */
    getLanguageDisplayName(lang) {
        const displayNames = {
            'zh': '中文',
            'en': 'English'
            // 可以轻松添加更多语言
        };
        return displayNames[lang] || lang;
    }

    /**
     * 设置当前语言
     * @param {string} lang - 语言代码
     */
    async setLanguage(lang) {
        if (!this.translations[lang]) {
            await this.loadTranslations(lang);
        }

        this.currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        document.documentElement.lang = lang;
        this.updateContent();
        
        // 触发语言改变事件
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }

    /**
     * 更新页面上的所有翻译内容
     */
    updateContent() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                if (element.tagName === 'TITLE' || !element.children.length) {
                    element.textContent = translation;
                }
                element.setAttribute('title', translation);
            }
        });
    }

    /**
     * 获取翻译文本
     * @param {string} key - 翻译键值
     * @returns {string} 翻译后的文本
     */
    getTranslation(key) {
        return key.split('.').reduce((obj, k) => obj && obj[k], this.translations[this.currentLang]) || key;
    }
}

// 创建全局i18n实例
window.i18n = new I18nManager();
