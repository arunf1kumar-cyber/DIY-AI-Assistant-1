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

function sendMessage() {
    let input = document.getElementById("chatInput");
    let box = document.getElementById("chatBox");

    if (!input.value.trim()) return;

    let userMsg = input.value;
    let botMsg = aiReply(userMsg);

    box.innerHTML += `
        <div><b>You:</b> ${userMsg}</div>
        <div><b>AI:</b> ${botMsg}</div>
        <hr>
    `;

    input.value = "";
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
