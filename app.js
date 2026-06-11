(() => {
  const STORAGE_KEY = "jumping-note-performer-crm-v1";

  const statuses = [
    { id: "inquiry", label: "詢價", accent: "#5d91c8" },
    { id: "quote", label: "報價", accent: "#f6b740" },
    { id: "contract", label: "合約", accent: "#df6045" },
    { id: "rehearsal", label: "排練", accent: "#42b6a8" },
    { id: "followup", label: "演後", accent: "#9bbb58" }
  ];

  const baseDeals = [
    {
      id: "deal-riverside",
      client: "河岸咖啡",
      contact: "林店長",
      title: "週五民謠夜",
      venue: "台北・河岸咖啡",
      date: "2026-07-03",
      time: "20:00",
      budget: 18000,
      status: "quote",
      quote: "NT$18,000 / 70 分鐘",
      contract: "等待簽回",
      paymentDue: "06/18",
      paymentLabel: "訂金 30%",
      paymentPaid: false,
      vibe: "Acoustic",
      heat: "hot",
      songs: ["流動的光", "雨後藍調", "給第一次登台的你"],
      equipment: ["DI Box x1", "監聽喇叭", "高腳椅", "暖白追光"],
      note: "客戶偏好輕鬆互動，第二段加入點歌。",
      customerTone: "溫暖、願意讓新人試場",
      feedback: [
        { score: 5, text: "前次演出互動很好，希望保留安可段落。" }
      ]
    },
    {
      id: "deal-bookstore",
      client: "山城書店",
      contact: "許企劃",
      title: "詩集上市小演出",
      venue: "新竹・山城書店",
      date: "2026-06-27",
      time: "15:30",
      budget: 12000,
      status: "contract",
      quote: "NT$12,000 / 45 分鐘",
      contract: "電子合約已寄出",
      paymentDue: "06/20",
      paymentLabel: "尾款",
      paymentPaid: false,
      vibe: "Poetry set",
      heat: "hot",
      songs: ["紙頁之間", "午後三點半", "留白"],
      equipment: ["小型 PA", "電容麥 x1", "譜架", "無線麥克風"],
      note: "音量需控制，書店二樓同時有讀書會。",
      customerTone: "重視文字與細節",
      feedback: [
        { score: 4, text: "希望開場能先介紹創作背景。" }
      ]
    },
    {
      id: "deal-wedding",
      client: "晴日婚顧",
      contact: "Mina",
      title: "戶外證婚暖場",
      venue: "宜蘭・穗光莊園",
      date: "2026-08-09",
      time: "16:40",
      budget: 26000,
      status: "inquiry",
      quote: "待確認交通與雨備",
      contract: "尚未建立",
      paymentDue: "07/10",
      paymentLabel: "訂金 40%",
      paymentPaid: false,
      vibe: "Wedding",
      heat: "money",
      songs: ["今天妳要嫁給我", "Can't Help Falling in Love", "小幸運"],
      equipment: ["戶外電源", "防風麥套", "雨備帳", "藍牙播放備援"],
      note: "需準備新人進場 cue，婚顧想看兩版曲序。",
      customerTone: "節奏快、偏好清楚表格",
      feedback: []
    },
    {
      id: "deal-campus",
      client: "文化大學吉他社",
      contact: "陳社長",
      title: "新生茶會 guest set",
      venue: "台北・大恩館前廣場",
      date: "2026-09-18",
      time: "18:30",
      budget: 9000,
      status: "rehearsal",
      quote: "NT$9,000 / 35 分鐘",
      contract: "校方核章中",
      paymentDue: "09/25",
      paymentLabel: "全額",
      paymentPaid: false,
      vibe: "Campus",
      heat: "money",
      songs: ["沒有名字的練習曲", "夏末社辦", "一起唱的副歌"],
      equipment: ["舞台監聽 x2", "Line in x2", "延長線", "備用導線"],
      note: "可帶 10 分鐘 Q&A，適合介紹接案心法。",
      customerTone: "活潑、預算有限但宣傳積極",
      feedback: [
        { score: 5, text: "社群貼文曝光佳，適合長期合作。" }
      ]
    },
    {
      id: "deal-gallery",
      client: "灰牆藝廊",
      contact: "周策展",
      title: "夜間開幕聲響",
      venue: "台中・灰牆藝廊",
      date: "2026-07-24",
      time: "19:10",
      budget: 22000,
      status: "followup",
      quote: "NT$22,000 / 55 分鐘",
      contract: "已歸檔",
      paymentDue: "07/31",
      paymentLabel: "尾款",
      paymentPaid: true,
      vibe: "Ambient",
      heat: "all",
      songs: ["牆面呼吸", "慢速顆粒", "出口前的回音"],
      equipment: ["Looper", "小型混音器", "投影機音源", "黑色膠帶"],
      note: "演後可詢問是否加入秋季展覽名單。",
      customerTone: "安靜、重視現場氛圍",
      feedback: [
        { score: 5, text: "策展人稱讚聲音與作品距離拿捏剛好。" },
        { score: 4, text: "下次需要更早確認投影音源位置。" }
      ]
    }
  ];

  const templates = [
    {
      id: "reply",
      label: "初次詢價回覆",
      body: ({ deal }) =>
        `${deal.contact}您好，我是音躍後台的表演者窗口。\n\n收到「${deal.title}」詢問，初步可配合 ${formatDate(deal.date)} ${deal.time} 於 ${deal.venue} 演出。想再確認演出長度、現場音響與曲風期待，我會整理一版清楚報價給您。\n\n謝謝您想到我們，期待把這場做得舒服又有記憶點。`
    },
    {
      id: "quote",
      label: "報價與曲目確認",
      body: ({ deal }) =>
        `${deal.contact}您好，\n\n「${deal.title}」建議報價為 ${deal.quote}，目前規劃曲目包含：${deal.songs.join("、")}。\n\n設備需求：${deal.equipment.join("、")}。\n若內容方向沒問題，我會接著補上合約與付款資訊。`
    },
    {
      id: "payment",
      label: "收款提醒",
      body: ({ deal }) =>
        `${deal.contact}您好，提醒「${deal.title}」的 ${deal.paymentLabel} 預計於 ${deal.paymentDue} 前處理。\n\n款項確認後，我會把演出資料夾更新為已收款，並同步最後版流程。謝謝您。`
    },
    {
      id: "thanks",
      label: "演後感謝",
      body: ({ deal }) =>
        `${deal.contact}您好，謝謝您邀請我們完成「${deal.title}」。\n\n如果現場有任何回饋，歡迎直接告訴我；我們也會把曲目、設備與流程備註整理起來，方便下次合作更順。`
    }
  ];

  const state = {
    deals: mergeSavedDeals(baseDeals),
    selectedDealId: "deal-riverside",
    filter: "all",
    templateId: "reply"
  };

  const nodes = {
    metricGrid: document.getElementById("metricGrid"),
    clientList: document.getElementById("clientList"),
    pipelineBoard: document.getElementById("pipelineBoard"),
    dealDetail: document.getElementById("dealDetail"),
    calendarList: document.getElementById("calendarList"),
    paymentList: document.getElementById("paymentList"),
    templateSelect: document.getElementById("templateSelect"),
    templateText: document.getElementById("templateText"),
    copyTemplate: document.getElementById("copyTemplate"),
    toast: document.getElementById("toast"),
    feedbackForm: document.getElementById("feedbackForm"),
    feedbackScore: document.getElementById("feedbackScore"),
    feedbackText: document.getElementById("feedbackText"),
    feedbackList: document.getElementById("feedbackList")
  };

  function mergeSavedDeals(deals) {
    const saved = loadSavedDeals();
    if (!saved.length) {
      return structuredCloneSafe(deals);
    }

    return deals.map((deal) => {
      const savedDeal = saved.find((item) => item.id === deal.id);
      return savedDeal ? { ...deal, ...savedDeal } : { ...deal };
    });
  }

  function structuredCloneSafe(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadSavedDeals() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveDeals() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.deals));
    } catch (error) {
      showToast("本機暫存未啟用");
    }
  }

  function selectedDeal() {
    return state.deals.find((deal) => deal.id === state.selectedDealId) || state.deals[0];
  }

  function statusMeta(statusId) {
    return statuses.find((status) => status.id === statusId) || statuses[0];
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatMoney(value) {
    return `NT$${Number(value).toLocaleString("zh-TW")}`;
  }

  function formatDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    return new Intl.DateTimeFormat("zh-TW", {
      month: "2-digit",
      day: "2-digit",
      weekday: "short"
    }).format(date);
  }

  function renderMetrics() {
    const unsigned = state.deals.filter((deal) => ["inquiry", "quote", "contract"].includes(deal.status)).length;
    const unpaid = state.deals.filter((deal) => !deal.paymentPaid).length;
    const total = state.deals.reduce((sum, deal) => sum + deal.budget, 0);
    const feedback = state.deals.flatMap((deal) => deal.feedback);
    const avgScore = feedback.length
      ? (feedback.reduce((sum, item) => sum + Number(item.score), 0) / feedback.length).toFixed(1)
      : "0.0";

    const metrics = [
      { value: state.deals.length, label: "演出案件" },
      { value: unsigned, label: "待推進" },
      { value: formatMoney(total), label: "預估收入" },
      { value: `${avgScore}/5`, label: "回饋均分" },
      { value: unpaid, label: "收款提醒" }
    ];

    nodes.metricGrid.innerHTML = metrics.map((metric) => `
      <div class="metric">
        <strong>${escapeHtml(metric.value)}</strong>
        <span>${escapeHtml(metric.label)}</span>
      </div>
    `).join("");
  }

  function dealMatchesFilter(deal) {
    if (state.filter === "all") {
      return true;
    }
    if (state.filter === "hot") {
      return deal.heat === "hot";
    }
    if (state.filter === "money") {
      return !deal.paymentPaid;
    }
    return true;
  }

  function renderPipeline() {
    nodes.pipelineBoard.innerHTML = statuses.map((status) => {
      const deals = state.deals.filter((deal) => deal.status === status.id && dealMatchesFilter(deal));
      const cards = deals.length
        ? deals.map((deal) => dealCardTemplate(deal, status)).join("")
        : `<p class="empty-column">目前沒有案件</p>`;

      return `
        <section class="pipeline-column" aria-label="${escapeHtml(status.label)}">
          <div class="column-title">
            <span>${escapeHtml(status.label)}</span>
            <span class="column-count">${deals.length}</span>
          </div>
          <div class="column-stack">${cards}</div>
        </section>
      `;
    }).join("");
  }

  function dealCardTemplate(deal, status) {
    const activeClass = deal.id === state.selectedDealId ? " is-active" : "";
    return `
      <button class="deal-card${activeClass}" type="button" data-select-deal="${escapeHtml(deal.id)}" style="--accent: ${status.accent}">
        <strong>${escapeHtml(deal.title)}</strong>
        <p class="deal-meta">${escapeHtml(deal.client)}・${escapeHtml(formatDate(deal.date))} ${escapeHtml(deal.time)}</p>
        <div class="tag-row">
          <span class="tag">${escapeHtml(deal.vibe)}</span>
          <span class="status-tag">${escapeHtml(formatMoney(deal.budget))}</span>
        </div>
      </button>
    `;
  }

  function renderClients() {
    nodes.clientList.innerHTML = state.deals.map((deal) => {
      const activeClass = deal.id === state.selectedDealId ? " is-active" : "";
      return `
        <button class="client-card${activeClass}" type="button" data-select-deal="${escapeHtml(deal.id)}">
          <strong>${escapeHtml(deal.client)}</strong>
          <p class="card-meta">${escapeHtml(deal.contact)}・${escapeHtml(deal.customerTone)}</p>
          <div class="tag-row">
            <span class="tag">${escapeHtml(statusMeta(deal.status).label)}</span>
            <span class="tag">${escapeHtml(deal.vibe)}</span>
          </div>
        </button>
      `;
    }).join("");
  }

  function renderDetail() {
    const deal = selectedDeal();
    const statusButtons = statuses.map((status) => `
      <button class="status-button${deal.status === status.id ? " is-current" : ""}" type="button" data-status="${escapeHtml(status.id)}">
        ${escapeHtml(status.label)}
      </button>
    `).join("");

    nodes.dealDetail.innerHTML = `
      <article class="detail-panel">
        <span class="status-tag">${escapeHtml(statusMeta(deal.status).label)}</span>
        <h3>${escapeHtml(deal.title)}</h3>
        <p class="muted-line">${escapeHtml(deal.client)} / ${escapeHtml(deal.contact)}</p>
        <div class="control-row" role="group" aria-label="案件階段">
          ${statusButtons}
        </div>
        <div class="fact-grid">
          <div class="fact">
            <span>演出時間</span>
            <strong>${escapeHtml(formatDate(deal.date))} ${escapeHtml(deal.time)}</strong>
          </div>
          <div class="fact">
            <span>演出地點</span>
            <strong>${escapeHtml(deal.venue)}</strong>
          </div>
          <div class="fact">
            <span>報價</span>
            <strong>${escapeHtml(deal.quote)}</strong>
          </div>
          <div class="fact">
            <span>合約狀態</span>
            <strong>${escapeHtml(deal.contract)}</strong>
          </div>
        </div>
        <div class="note-box">${escapeHtml(deal.note)}</div>
      </article>
      <article class="prep-panel">
        <h3>曲目與設備需求</h3>
        <p class="muted-line">${escapeHtml(deal.customerTone)}</p>
        <div class="prep-list">
          <div class="prep-box">
            <h4>曲目</h4>
            <ul>${deal.songs.map((song) => `<li>${escapeHtml(song)}</li>`).join("")}</ul>
          </div>
          <div class="prep-box">
            <h4>設備</h4>
            <ul>${deal.equipment.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
        </div>
      </article>
    `;
  }

  function renderCalendar() {
    const sorted = [...state.deals].sort((a, b) => a.date.localeCompare(b.date));
    nodes.calendarList.innerHTML = sorted.map((deal) => {
      const activeClass = deal.id === state.selectedDealId ? " is-active" : "";
      const day = deal.date.slice(8, 10);
      return `
        <button class="event-card${activeClass}" type="button" data-select-deal="${escapeHtml(deal.id)}">
          <span class="date-badge">${escapeHtml(day)}</span>
          <span>
            <strong>${escapeHtml(deal.title)}</strong>
            <span class="card-meta">${escapeHtml(deal.venue)}・${escapeHtml(deal.time)}</span>
          </span>
        </button>
      `;
    }).join("");
  }

  function renderPayments() {
    nodes.paymentList.innerHTML = state.deals.map((deal) => `
      <div class="payment-card${deal.paymentPaid ? " is-paid" : ""}">
        <div>
          <strong>${escapeHtml(deal.client)}</strong>
          <p class="card-meta">${escapeHtml(deal.paymentLabel)}・${escapeHtml(deal.paymentDue)}・${escapeHtml(formatMoney(deal.budget))}</p>
        </div>
        <button class="payment-toggle" type="button" data-toggle-payment="${escapeHtml(deal.id)}">
          ${deal.paymentPaid ? "已收" : "待收"}
        </button>
      </div>
    `).join("");
  }

  function renderTemplates() {
    if (!nodes.templateSelect.options.length) {
      nodes.templateSelect.innerHTML = templates.map((template) => `
        <option value="${escapeHtml(template.id)}">${escapeHtml(template.label)}</option>
      `).join("");
    }

    nodes.templateSelect.value = state.templateId;
    const template = templates.find((item) => item.id === state.templateId) || templates[0];
    nodes.templateText.value = template.body({ deal: selectedDeal() });
  }

  function renderFeedback() {
    const deal = selectedDeal();
    const list = deal.feedback.length
      ? deal.feedback.map((item) => `
        <article class="feedback-card">
          <span class="feedback-score">${escapeHtml(item.score)} / 5</span>
          <strong>${escapeHtml(deal.client)}</strong>
          <p class="card-meta">${escapeHtml(item.text)}</p>
        </article>
      `).join("")
      : `<article class="feedback-card"><strong>${escapeHtml(deal.client)}</strong><p class="card-meta">尚無回饋紀錄</p></article>`;

    nodes.feedbackList.innerHTML = list;
  }

  function renderAll() {
    renderMetrics();
    renderClients();
    renderPipeline();
    renderDetail();
    renderCalendar();
    renderPayments();
    renderTemplates();
    renderFeedback();
  }

  function selectDeal(id) {
    if (!state.deals.some((deal) => deal.id === id)) {
      return;
    }
    state.selectedDealId = id;
    renderAll();
  }

  function updateStatus(statusId) {
    const deal = selectedDeal();
    deal.status = statusId;
    saveDeals();
    renderAll();
  }

  function togglePayment(id) {
    const deal = state.deals.find((item) => item.id === id);
    if (!deal) {
      return;
    }
    deal.paymentPaid = !deal.paymentPaid;
    saveDeals();
    renderAll();
  }

  function addFeedback(event) {
    event.preventDefault();
    const deal = selectedDeal();
    const text = nodes.feedbackText.value.trim();
    if (!text) {
      showToast("請輸入回饋備註");
      return;
    }
    deal.feedback.unshift({
      score: Number(nodes.feedbackScore.value),
      text
    });
    nodes.feedbackText.value = "";
    saveDeals();
    renderAll();
    showToast("已加入演後回饋");
  }

  async function copyTemplate() {
    const text = nodes.templateText.value;
    try {
      await navigator.clipboard.writeText(text);
      showToast("訊息已複製");
    } catch (error) {
      nodes.templateText.focus();
      nodes.templateText.select();
      document.execCommand("copy");
      showToast("訊息已選取");
    }
  }

  function showToast(message) {
    nodes.toast.textContent = message;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      nodes.toast.textContent = "";
    }, 2200);
  }

  document.addEventListener("click", (event) => {
    const dealButton = event.target.closest("[data-select-deal]");
    if (dealButton) {
      selectDeal(dealButton.dataset.selectDeal);
      return;
    }

    const statusButton = event.target.closest("[data-status]");
    if (statusButton) {
      updateStatus(statusButton.dataset.status);
      return;
    }

    const paymentButton = event.target.closest("[data-toggle-payment]");
    if (paymentButton) {
      togglePayment(paymentButton.dataset.togglePayment);
      return;
    }

    const filterButton = event.target.closest("[data-filter]");
    if (filterButton) {
      state.filter = filterButton.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((button) => {
        button.classList.toggle("is-active", button.dataset.filter === state.filter);
      });
      renderPipeline();
    }
  });

  nodes.templateSelect.addEventListener("change", (event) => {
    state.templateId = event.target.value;
    renderTemplates();
  });

  nodes.copyTemplate.addEventListener("click", copyTemplate);
  nodes.feedbackForm.addEventListener("submit", addFeedback);

  renderAll();
})();
