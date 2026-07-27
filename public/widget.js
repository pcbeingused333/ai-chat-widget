/* Embeddable AI chat widget — drop into ANY website with one line. */
(function () {
  "use strict";
  if (window.__aiChatWidgetLoaded) return;
  window.__aiChatWidgetLoaded = true;

  var script = document.currentScript;
  var base = "";
  try { base = new URL(script.src).origin; } catch (e) { base = ""; }
  var d = (script && script.dataset) || {};

  var NAME = d.name || "Assistant";
  var TAGLINE = d.tagline || "Ask me anything";
  var GREETING = d.greeting || ("Hi! I'm the " + NAME + " assistant 👋 How can I help?");
  var ACCENT = d.accent || "#4f46e5";

  var messages = [{ role: "assistant", content: GREETING }];
  var loading = false;

  var css =
    ".acw-btn{position:fixed;bottom:20px;right:20px;width:56px;height:56px;border:none;border-radius:50%;" +
    "background:" + ACCENT + ";color:#fff;font-size:24px;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.25);" +
    "z-index:2147483000;display:flex;align-items:center;justify-content:center;transition:transform .15s}" +
    ".acw-btn:hover{transform:scale(1.06)}" +
    ".acw-panel{position:fixed;bottom:88px;right:20px;width:92vw;max-width:380px;height:70vh;max-height:560px;" +
    "background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,.22);" +
    "z-index:2147483000;display:none;flex-direction:column;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif}" +
    ".acw-panel.acw-open{display:flex}" +
    ".acw-head{background:" + ACCENT + ";color:#fff;padding:12px 16px}" +
    ".acw-head b{display:block;font-size:15px}" +
    ".acw-head span{font-size:12px;opacity:.85}" +
    ".acw-body{flex:1;overflow-y:auto;padding:12px;background:#f8fafc}" +
    ".acw-row{display:flex;margin-bottom:10px}" +
    ".acw-row.u{justify-content:flex-end}" +
    ".acw-msg{max-width:80%;padding:8px 12px;border-radius:14px;font-size:14px;line-height:1.45;white-space:pre-wrap}" +
    ".acw-row.u .acw-msg{background:" + ACCENT + ";color:#fff;border-bottom-right-radius:4px}" +
    ".acw-row.a .acw-msg{background:#fff;color:#1e293b;border:1px solid #e2e8f0;border-bottom-left-radius:4px}" +
    ".acw-form{display:flex;gap:8px;padding:8px;border-top:1px solid #e2e8f0;background:#fff}" +
    ".acw-input{flex:1;border:1px solid #cbd5e1;border-radius:20px;padding:9px 14px;font-size:14px;outline:none}" +
    ".acw-input:focus{border-color:" + ACCENT + "}" +
    ".acw-send{border:none;background:" + ACCENT + ";color:#fff;border-radius:20px;padding:9px 16px;font-size:14px;cursor:pointer}" +
    ".acw-send:disabled{opacity:.5;cursor:default}" +
    ".acw-foot{font-size:10px;color:#94a3b8;text-align:center;padding:6px;background:#fff}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var btn = document.createElement("button");
  btn.className = "acw-btn";
  btn.setAttribute("aria-label", "Open chat");
  btn.textContent = "💬";

  var panel = document.createElement("div");
  panel.className = "acw-panel";
  panel.innerHTML =
    '<div class="acw-head"><b></b><span></span></div>' +
    '<div class="acw-body"></div>' +
    '<form class="acw-form"><input class="acw-input" placeholder="Type your question..." />' +
    '<button class="acw-send" type="submit">Send</button></form>' +
    '<div class="acw-foot">AI assistant</div>';

  panel.querySelector(".acw-head b").textContent = NAME;
  panel.querySelector(".acw-head span").textContent = TAGLINE;

  var body = panel.querySelector(".acw-body");
  var form = panel.querySelector(".acw-form");
  var input = panel.querySelector(".acw-input");
  var sendBtn = panel.querySelector(".acw-send");

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  function render() {
    body.innerHTML = "";
    messages.forEach(function (m) {
      var row = document.createElement("div");
      row.className = "acw-row " + (m.role === "user" ? "u" : "a");
      var bubble = document.createElement("div");
      bubble.className = "acw-msg";
      bubble.textContent = m.content;
      row.appendChild(bubble);
      body.appendChild(row);
    });
    if (loading) {
      var row2 = document.createElement("div");
      row2.className = "acw-row a";
      row2.innerHTML = '<div class="acw-msg" style="color:#94a3b8">typing...</div>';
      body.appendChild(row2);
    }
    body.scrollTop = body.scrollHeight;
  }

  btn.addEventListener("click", function () {
    panel.classList.toggle("acw-open");
    btn.textContent = panel.classList.contains("acw-open") ? "✕" : "💬";
    if (panel.classList.contains("acw-open")) { render(); input.focus(); }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text || loading) return;
    messages.push({ role: "user", content: text });
    input.value = "";
    loading = true; sendBtn.disabled = true; render();

    fetch(base + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messages.map(function (m) { return { role: m.role, content: m.content }; }) })
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        messages.push({ role: "assistant", content: data.reply || data.error || "Sorry, please try again." });
      })
      .catch(function () {
        messages.push({ role: "assistant", content: "Sorry, something went wrong. Please try again." });
      })
      .then(function () { loading = false; sendBtn.disabled = false; render(); });
  });

  render();
})();
