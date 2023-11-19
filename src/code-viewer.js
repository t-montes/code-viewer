class CodeViewer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.1/styles/atom-one-dark.min.css">
            <style>
                :host {
                    display: inline-block; /* Changed from block to inline-block */
                    min-width: 200px;
                    max-width: 90%;
                    margin: 20px auto;
                    border-radius: 10px;
                    border: 1px solid #ddd;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    font-family: 'Arial', sans-serif;
                }

                .language-bar {
                    background-color: #1a86d5;
                    color: white;
                    padding: 2px 10px;
                    font-size: 0.8em;
                    font-weight: bold;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 30px; /* Fixed height to prevent resizing */
                    line-height: 30px; /* Align text vertically */                
                }
                
                .language-name {
                    margin-right: auto;
                }
                
                pre {
                    box-sizing: border-box;
                    display: flex; /* Changed to flex to allow internal content to dictate size */
                    justify-content: left;
                    align-items: center;
                    margin: 0;
                    padding: 16px;
                    background-color: #1E1E1E;
                    color: #D4D4D4;
                    overflow: auto;
                    line-height: 1.45;
                }
                
                code.hljs {
                    display: inline; /* Adjust width to content */
                    white-space: pre; /* Wrap text */
                    word-break: break-all; /* Break the word */
                    font-size: var(--code-font-size, 1em); /* Default font size */
                    text-align: left; /* Ensures code text is aligned left */
                    overflow-x: auto; /* Maybe not necessary, but to show the horizontal scroll bar */
                    border-radius: 10px;
                }
                
                .copy-code {
                    text-decoration: none;
                    color: white;
                    padding: 5px;
                    cursor: pointer;
                    transition: color 0.3s;
                    display: inline-block; /* Allows us to set a fixed height */
                    height: 100%; /* Ensures the element fills the height of its container */
                    line-height: inherit; /* Inherits the line height from its parent */
                }
                
                .copy-code:hover {
                    color: #CCCCCC;
                }
            </style>
            <div class="code-container">
                <div class="language-bar">
                    <span class="language-name"><slot name="language">Language</slot></span>
                    <span class="copy-code">Copy code</span>
                </div>
                <pre><code class="hljs"></code></pre>
            </div>
            `;

        this.copyCode = this.copyCode.bind(this);
    }

    connectedCallback() {
        this.shadowRoot.querySelector('.copy-code').addEventListener('click', this.copyCode);
        this.renderCodeContent();
        this.updateTitle();
        this.updateFontSize();
    }

    renderCodeContent() {
        const codeBlock = this.shadowRoot.querySelector('code.hljs');
        let lines = this.textContent.split('\n');
        
        // Remove leading and trailing empty lines
        while (lines.length && lines[0].trim() === '') lines.shift();
        while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
    
        // Determine the smallest indentation
        const baseIndentation = lines.reduce((indent, line) => {
            if (line.trim() === '') return indent; // Skip empty lines
            const currentIndent = line.match(/^\s*/)[0].length;
            return indent === null ? currentIndent : Math.min(indent, currentIndent);
        }, null);
    
        // Check if all lines have at least this indentation. If so, remove it
        const hasCommonIndentation = lines.every(line => {
            return line.trim() === '' || line.startsWith(' '.repeat(baseIndentation));
        });
        if (hasCommonIndentation && baseIndentation !== null) {
            lines = lines.map(line => line.substring(baseIndentation));
        }
    
        codeBlock.textContent = lines.join('\n');
        hljs.highlightElement(codeBlock);
    }
    
    updateTitle() {
        const title = this.getAttribute('title') || 'Code';
        this.shadowRoot.querySelector('.language-name').textContent = title;
    }

    updateFontSize() {
        const fontSize = this.getAttribute('font-size') || '1em';
        this.style.setProperty('--code-font-size', fontSize);
    }

    copyCode() {
        const codeToCopy = this.shadowRoot.querySelector('code.hljs').textContent;
        navigator.clipboard.writeText(codeToCopy)
            .then(() => {
                const copyCode = this.shadowRoot.querySelector('.copy-code');
                copyCode.style.pointerEvents = 'none';
                const originalText = copyCode.textContent;
                copyCode.textContent = '✓ Copied!';
                setTimeout(() => {
                    copyCode.textContent = originalText;
                    copyCode.style.pointerEvents = '';
                }, 3000);
            })
            .catch(err => console.error('Error in copying text: ', err));
    }

    static get observedAttributes() {
        return ['title', 'font-size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this.updateTitle();
        } else if (name === 'font-size') {
            this.updateFontSize();
        }
    }
}

window.customElements.define('code-viewer', CodeViewer);

export default CodeViewer;
