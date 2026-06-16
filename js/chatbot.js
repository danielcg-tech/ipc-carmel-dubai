/* chatbot.js – IPC Carmel Dubai
   ─────────────────────────────────────────────────────────────────────────
   TO UPDATE ANSWERS: edit the FAQ object below.
   Each key matches a question button label exactly.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Edit answers here ───────────────────────────────────────────────── */
  const FAQ = {
    'Church prayer & worship timings': `
      🕊️ <strong>Sunday Worship Service</strong><br>
      Every Sunday · 9:00 AM – 12:00 PM<br><br>
      🙏 <strong>Wednesday Prayer Meeting</strong><br>
      Every Wednesday · 7:00 PM – 8:30 PM<br><br>
      📖 <strong>Friday Bible Study</strong><br>
      Every Friday · 7:00 PM – 8:30 PM<br><br>
      <em>Venue: IPC Carmel Dubai, Al Qusais, Dubai</em>
    `,
    'Sunday School': `
      📚 <strong>Sunday School</strong><br>
      Classes for children (ages 4–16) are held every Sunday during the main worship service.<br><br>
      • Nursery (ages 4–6): Room A<br>
      • Primary (ages 7–10): Room B<br>
      • Junior (ages 11–16): Room C<br><br>
      For enrolment, please contact the Sunday School coordinator after the service.
    `,
    'Church location': `
      📍 <strong>IPC Carmel Dubai</strong><br>
      Al Qusais Industrial Area 2,<br>
      Dubai, United Arab Emirates<br><br>
      🚇 Nearest Metro: Al Qusais Metro Station (Red Line)<br><br>
      <em>Google Maps link and detailed directions will be updated soon.</em>
    `,
    'How to contact us': `
      📧 <strong>Email</strong><br>
      <a href="mailto:info@ipccarmeldubai.com" style="color:#C9A227">info@ipccarmeldubai.com</a><br><br>
      📘 <strong>Facebook</strong><br>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style="color:#C9A227">facebook.com/IPCCarmelDubai</a><br><br>
      <em>We typically respond within 24 hours.</em>
    `,
    'Our ministries': `
      ✝️ <strong>Our Ministries</strong><br><br>
      • <strong>Worship Ministry</strong> – Praise &amp; worship team<br>
      • <strong>Youth Ministry (YPF)</strong> – Young people's fellowship<br>
      • <strong>Women's Ministry</strong> – Ladies' fellowship &amp; Bible study<br>
      • <strong>Children's Ministry</strong> – Sunday School &amp; VBS<br>
      • <strong>Prayer Ministry</strong> – Intercession &amp; prayer chain<br>
      • <strong>Outreach Ministry</strong> – Evangelism &amp; community service<br><br>
      <em>To join a ministry, speak to Pastor Thomas after any service.</em>
    `
  };

  const GREETING = 'Praise the Lord! 🙏 How can I help you today? Please choose a topic below.';

  /* ── Build DOM ───────────────────────────────────────────────────────── */
  function buildWidget() {
    /* Toggle button */
    const btn = document.createElement('button');
    btn.className = 'chat-toggle-btn';
    btn.setAttribute('aria-label', 'Open church help chat');
    btn.innerHTML = `
      <svg class="chat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4l4 4 4-4h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 10H6v-2h12v2zm0-4H6V6h12v2z"/>
      </svg>
      <svg class="close-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
      <span class="chat-badge" aria-hidden="true"></span>
    `;

    /* Chat window */
    const win = document.createElement('div');
    win.className = 'chat-window';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Church help chatbot');
    win.innerHTML = `
      <div class="chat-header">
        <div class="chat-avatar" aria-hidden="true">✝</div>
        <div class="chat-header-text">
          <h6>IPC Carmel Help</h6>
          <span>Typically replies instantly</span>
        </div>
      </div>
      <div class="chat-messages" id="chatMessages" aria-live="polite"></div>
      <div class="chat-questions" id="chatQuestions"></div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(win);
    return { btn, win };
  }

  function addBubble(container, html, type) {
    const div = document.createElement('div');
    div.className = 'chat-bubble ' + type;
    div.innerHTML = html;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function renderQuestions(container, msgContainer) {
    container.innerHTML = '';
    Object.keys(FAQ).forEach((q) => {
      const b = document.createElement('button');
      b.className = 'chat-q-btn';
      b.textContent = q;
      b.addEventListener('click', () => {
        addBubble(msgContainer, q, 'user');
        addBubble(msgContainer, FAQ[q], 'bot');
        /* Keep questions visible so user can ask another */
      });
      container.appendChild(b);
    });
  }

  /* ── Init ────────────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const { btn, win } = buildWidget();
    const msgContainer = win.querySelector('#chatMessages');
    const qContainer   = win.querySelector('#chatQuestions');

    /* Seed greeting */
    addBubble(msgContainer, GREETING, 'bot');
    renderQuestions(qContainer, msgContainer);

    /* Toggle open/close */
    btn.addEventListener('click', () => {
      const isOpen = win.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
      if (isOpen) msgContainer.scrollTop = msgContainer.scrollHeight;
    });
  });
})();
