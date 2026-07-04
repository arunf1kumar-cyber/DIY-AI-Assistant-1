/* ===== DIY AI ASSISTANT - FINAL CORE SCRIPT ===== */

/* =========================
   STORAGE HELPERS
========================= */

function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/* =========================
   PROJECTS (GLOBAL)
========================= */

function addProjectGlobal(name, desc) {
    let projects = getData("projects");

    projects.push({
        id: Date.now(),
        name,
        desc
    });

    setData("projects", projects);
}

/* =========================
   COMPONENTS (GLOBAL)
========================= */

function addComponentGlobal(name, desc) {
    let components = getData("components");

    components.push({
        id: Date.now(),
        name,
        desc
    });

    setData("components", components);
}

/* =========================
   AI CHAT BOT (BASIC LOGIC)
========================= */

function aiReply(msg) {
    msg = msg.toLowerCase();

    if (msg.includes("hello")) return "Hello 👋 I am your DIY AI Assistant";
    if (msg.includes("project")) return "You can manage projects in Projects page.";
    if (msg.includes("component")) return "You can manage components in Components page.";
    if (msg.includes("help")) return "Ask me about projects, components, or system help.";

    return "I am still learning 🤖";
}

/* =========================
   CHAT FUNCTION
========================= */

async function sendMessage() {
    let input = document.getElementById("chatInput");
    let box = document.getElementById("chatBox");

    if (!input.value.trim()) return;

    let userMsg = input.value;

    // show user message
    box.innerHTML += `<div><b>You:</b> ${userMsg}</div>`;

    input.value = "";

    // placeholder while AI responds
    box.innerHTML += `<div><b>AI:</b> thinking...</div>`;

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "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"
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful DIY AI assistant." },
                    { role: "user", content: userMsg }
                ]
            })
        });

        const data = await response.json();
        const aiMsg = data.choices[0].message.content;

        box.innerHTML += `<div><b>AI:</b> ${aiMsg}</div><hr>`;

    } catch (err) {
        box.innerHTML += `<div><b>AI:</b> Error connecting to AI API</div>`;
    }
}

/* =========================
   DASHBOARD STATS
========================= */

function updateDashboard() {
    let projects = getData("projects").length;
    let components = getData("components").length;

    let p = document.getElementById("projectCount");
    let c = document.getElementById("componentCount");

    if (p) p.innerText = projects;
    if (c) c.innerText = components;
}

/* =========================
   AUTO RUN ON LOAD
========================= */

document.addEventListener("DOMContentLoaded", () => {
    updateDashboard();
});
