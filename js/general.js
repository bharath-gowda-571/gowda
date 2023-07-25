document.addEventListener("DOMContentLoaded", function (event) {
    var syntax_import = document.getElementById("syntax-css")
    var settings = JSON.parse(localStorage.getItem('settings'));
    if (settings != null) {
        var mode = settings['light_or_dark']
        if (mode === 'light') {
            var body = document.getElementsByTagName("body")
            var checkbox = document.getElementById('checkbox')
            checkbox.checked = false
            body[0].classList.toggle("light")
            if (syntax_import !== null) {
                syntax_import.innerHTML = "<link rel='stylesheet' href='/css/syntax-light.css'>"
            }
        }
    }
    else {
        settings = {}
    }

    document
        .querySelectorAll(".highlight")
        .forEach((highlightDiv) => createCopyButton(highlightDiv));
});

function changeAboutMeText(ele) {
    var texts = [
        "1",
        "2",
        "Welcome! I'm <span class='highlight'>Bharath</span>, a Full Stack Engineer at Fidelity Investments. With a Bachelor's degree in Information Science and Engineering, I possess a strong foundation in software development. I specialize in frontend development using React and Angular, backend engineering with Fast API, mobile development with Flutter, and Python automation and web scraping using Scrapy. In my previous roles as a Full Stack Engineering Intern at Fidelity Investments and a Summer Intern at Tally Solutions, I gained hands-on experience in various projects. Outside of work, I enjoy playing cricket, exploring books, and watching movies. I'm based in Bangalore, India, an exciting hub of technological innovation.",
        "4",
        "5",
        "6"];
    var para = document.querySelector(".about-me-content p")
    switch (ele.value) {
        case "1":
            para.innerHTML = texts[0];
            break;
        case "2":
            para.innerHTML = texts[1];
            break;
        case "3":
            para.innerHTML = texts[2];
            break;
        case "4":
            para.innerHTML = texts[3];
            break;
        case "5":
            para.innerHTML = texts[4];
            break;
        case "6":
            para.innerHTML = texts[5];
            break;
    }
}
function toggleDarkAndLightMode() {
    var syntax_import = document.getElementById("syntax-css")

    var body = document.getElementsByTagName("body")[0]
    var settings = JSON.parse(localStorage.getItem('settings'));
    if (settings === null) {
        settings = {};
    }
    if (body.classList.contains('light')) {
        settings['light_or_dark'] = 'dark'
        if (syntax_import !== null) {
            syntax_import.innerHTML = "<link rel='stylesheet' href='/css/syntax-dark.css'>"
        }
    }
    else {

        settings['light_or_dark'] = 'light'
        if (syntax_import !== null) {
            syntax_import.innerHTML = "<link rel='stylesheet' href='/css/syntax-light.css'>"

        }


    }
    localStorage.setItem('settings', JSON.stringify(settings));
    body.classList.toggle("light")
}
function createCopyButton(highlightDiv) {
    const button = document.createElement("button");
    button.className = "copy-code-button";
    button.type = "button";
    button.innerText = "Copy";
    button.addEventListener("click", () =>
        copyCodeToClipboard(button, highlightDiv)
    );
    addCopyButtonToDom(button, highlightDiv);
}

async function copyCodeToClipboard(button, highlightDiv) {
    const codeToCopy = highlightDiv.querySelector(" code")
        .innerText;
    try {
        result = await navigator.permissions.query({ name: "clipboard-write" });
        if (result.state == "granted" || result.state == "prompt") {
            await navigator.clipboard.writeText(codeToCopy);
        } else {
            copyCodeBlockExecCommand(codeToCopy, highlightDiv);
        }
    } catch (_) {
        copyCodeBlockExecCommand(codeToCopy, highlightDiv);
    } finally {
        codeWasCopied(button);
    }
}

function copyCodeBlockExecCommand(codeToCopy, highlightDiv) {
    const textArea = document.createElement("textArea");
    textArea.contentEditable = "true";
    textArea.readOnly = "false";
    textArea.className = "copyable-text-area";
    textArea.value = codeToCopy;
    highlightDiv.insertBefore(textArea, highlightDiv.firstChild);
    const range = document.createRange();
    range.selectNodeContents(textArea);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    textArea.setSelectionRange(0, 999999);
    document.execCommand("copy");
    highlightDiv.removeChild(textArea);
}

function codeWasCopied(button) {
    button.blur();
    button.innerText = "Copied!";
    setTimeout(function () {
        button.innerText = "Copy";
    }, 2000);
}

function addCopyButtonToDom(button, highlightDiv) {
    highlightDiv.insertBefore(button, highlightDiv.firstChild);
    const wrapper = document.createElement("div");
    wrapper.className = "highlight-wrapper";
    highlightDiv.parentNode.insertBefore(wrapper, highlightDiv);
    wrapper.appendChild(highlightDiv);
}

