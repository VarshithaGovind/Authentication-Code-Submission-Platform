// DOM Elements
const tabs = document.querySelectorAll(".tab");
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const runButton = document.getElementById("runButton");
const saveButton = document.getElementById("saveProgress");
const toggleQuestionButton = document.getElementById("toggleQuestion");
const backToDashboardButton = document.getElementById("backToDashboard");
const questionPanel = document.getElementById("questionPanel");
const autoSaveIndicator = document.getElementById("autoSaveIndicator");
const editorLanguage = document.getElementById("editorLanguage");
const cursorPosition = document.getElementById("cursorPosition");

// State variables
let activeTab = "html";
let htmlCode = `<div class="container">
  <h1>Welcome to CodeCraft!</h1>
  <p>Start coding and see your changes live!</p>
  <button onclick="changeColor()">Click me!</button>
</div>`;

let cssCode = `body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 20px;
  min-height: 100vh;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

button {
  background: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: #3367d6;
  transform: translateY(-2px);
}`;

let jsCode = `function changeColor() {
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.querySelector('.container').style.background = randomColor;
  document.querySelector('.container').style.color = 'white';
}`;

// Editor configuration
const editorConfig = {
    html: {
        mode: 'htmlmixed',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: true
    },
    css: {
        mode: 'css',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: true
    },
    js: {
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: true
    }
};

// Initialize CodeMirror editors
let htmlEditor, cssEditor, jsEditor;

function initializeEditors() {
    // HTML Editor
    htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlEditor"), {
        ...editorConfig.html,
        value: htmlCode
    });

    // CSS Editor
    cssEditor = CodeMirror.fromTextArea(document.getElementById("cssEditor"), {
        ...editorConfig.css,
        value: cssCode
    });

    // JavaScript Editor
    jsEditor = CodeMirror.fromTextArea(document.getElementById("jsEditor"), {
        ...editorConfig.js,
        value: jsCode
    });

    // Add change event listeners
    htmlEditor.on("change", () => {
        htmlCode = htmlEditor.getValue();
        updatePreview();
    });

    cssEditor.on("change", () => {
        cssCode = cssEditor.getValue();
        updatePreview();
    });

    jsEditor.on("change", () => {
        jsCode = jsEditor.getValue();
        updatePreview();
    });

    // Add cursor activity listeners
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
        editor.on("cursorActivity", () => {
            updateCursorPosition(editor);
        });
    });
}

function updatePreview() {
    const srcDoc = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}<\/script>
        </body>
        </html>`;

    preview.classList.add("updating");
    preview.srcdoc = srcDoc;
    setTimeout(() => preview.classList.remove("updating"), 500);
}

function updateCursorPosition(editor) {
    const cursor = editor.getCursor();
    cursorPosition.textContent = `Ln ${cursor.line + 1}, Col ${cursor.ch + 1}`;
}

function switchTab(tab) {
    // Update active tab
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    activeTab = tab.getAttribute("data-tab");
    editorLanguage.textContent = activeTab.toUpperCase();

    // Show corresponding editor
    document.getElementById("htmlEditor").style.display = activeTab === "html" ? "block" : "none";
    document.getElementById("cssEditor").style.display = activeTab === "css" ? "block" : "none";
    document.getElementById("jsEditor").style.display = activeTab === "js" ? "block" : "none";

    // Update cursor position for active editor
    const activeEditor = activeTab === "html" ? htmlEditor : 
                        activeTab === "css" ? cssEditor : jsEditor;
    updateCursorPosition(activeEditor);
}

function saveProgress() {
    autoSaveIndicator.innerHTML = '<i class="fas fa-circle"></i><span>Saving...</span>';
    
    // Save code to localStorage
    const codeData = {
        html: htmlCode,
        css: cssCode,
        js: jsCode
    };
    localStorage.setItem('codeCraftProgress', JSON.stringify(codeData));
    
    setTimeout(() => {
        autoSaveIndicator.innerHTML = '<i class="fas fa-circle"></i><span>Saved</span>';
    }, 1000);
}

function loadProgress() {
    const savedCode = localStorage.getItem('codeCraftProgress');
    if (savedCode) {
        const codeData = JSON.parse(savedCode);
        htmlCode = codeData.html;
        cssCode = codeData.css;
        jsCode = codeData.js;
        
        htmlEditor.setValue(htmlCode);
        cssEditor.setValue(cssCode);
        jsEditor.setValue(jsCode);
    }
}

function toggleQuestionPanel() {
    questionPanel.classList.toggle("active");
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}

// Event Listeners
tabs.forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab));
});

runButton.addEventListener("click", () => {
    runButton.classList.add("running");
    updatePreview();
    setTimeout(() => runButton.classList.remove("running"), 500);
});

saveButton.addEventListener("click", saveProgress);
toggleQuestionButton.addEventListener("click", toggleQuestionPanel);
backToDashboardButton.addEventListener("click", goToDashboard);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeEditors();
    loadProgress();
    updatePreview();
});
