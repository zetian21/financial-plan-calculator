const STORAGE_KEY = "financial-plan-calculator-v1";
const COMMISSION_RATE = 0.3;

const plans = {
  u: {
    name: "U 每月财务预支计划",
    badge: "U",
    targetLabel: "首24个月 NSC",
    description: "新人较稳妥的现金流方案，先看18个月预支，再看第27个月发放的业绩花红。",
    tiers: [
      { id: "u-10000", label: "HK$10,000 / 月", mf: 10000, mfMonths: 18, mfTarget: 810000, pb: 60000, pbTarget: 1680000 },
      { id: "u-15000", label: "HK$15,000 / 月", mf: 15000, mfMonths: 18, mfTarget: 1215000, pb: 90000, pbTarget: 2520000 },
      { id: "u-20000", label: "HK$20,000 / 月", mf: 20000, mfMonths: 18, mfTarget: 1620000, pb: 120000, pbTarget: 3360000 },
      { id: "u-25000", label: "HK$25,000 / 月", mf: 25000, mfMonths: 18, mfTarget: 2025000, pb: 150000, pbTarget: 4200000 },
    ],
    risk: [
      "当月业绩达标比例低于60%，当月每月预支发放为0。",
      "连续2个月没有签发新生意，每月预支会停止发放。",
      "业绩花红需要首24个月达标，文件列明在第27个合约月份发放。",
      "如代理协议在指定期间内终止，U计划可能触发100%财务责任，正式金额以合约为准。",
    ],
  },
  pfs: {
    name: "PFS 专业高才财务预支计划",
    badge: "PFS",
    targetLabel: "首36个月 NSC",
    description: "适合高收入或硕士/专业人士，金额高，但业绩和留任压力也更高。",
    tiers: [
      { id: "pfs-30000", label: "HK$30,000 / 月", mf: 30000, mfMonths: 24, mfTarget: 2520000, pb: 900000, pbTarget: 6480000 },
      { id: "pfs-40000", label: "HK$40,000 / 月", mf: 40000, mfMonths: 24, mfTarget: 3360000, pb: 1200000, pbTarget: 8640000 },
      { id: "pfs-50000", label: "HK$50,000 / 月", mf: 50000, mfMonths: 24, mfTarget: 4200000, pb: 1500000, pbTarget: 10800000 },
      { id: "pfs-60000", label: "HK$60,000 / 月", mf: 60000, mfMonths: 24, mfTarget: 5040000, pb: 1800000, pbTarget: 12960000 },
      { id: "pfs-70000", label: "HK$70,000 / 月", mf: 70000, mfMonths: 24, mfTarget: 5880000, pb: 2100000, pbTarget: 15120000 },
      { id: "pfs-80000", label: "HK$80,000 / 月", mf: 80000, mfMonths: 24, mfTarget: 6720000, pb: 2400000, pbTarget: 17280000 },
    ],
    risk: [
      "PB1需24个月内达到最少24张单及H&P最少15%；PB2需36个月内达到最少36张单及H&P最少15%。",
      "未达到最少维持合约年期，1-24个月内需偿还100%，25-36个月60%，37-48个月40%。",
      "金额越高，对应过往收入证明和持续业绩要求越高。",
    ],
  },
  sof: {
    name: "SOF 行业招募财务预支计划",
    badge: "SOF",
    targetLabel: "首60个月 NSC",
    description: "适合已有保险销售经验的人，一次性预支、月预支和多年花红都较高。",
    tiers: [
      { id: "sof-500k", label: "过往年收入 HK$500,000", mf: 20800, mfMonths: 24, sof: 249600, mfTarget: 1622400, pb: 998400, pbTarget: 7488000 },
      { id: "sof-1000k", label: "过往年收入 HK$1,000,000", mf: 41600, mfMonths: 24, sof: 599040, mfTarget: 3244800, pb: 1996800, pbTarget: 14976000 },
      { id: "sof-1500k", label: "过往年收入 HK$1,500,000", mf: 62500, mfMonths: 24, sof: 1200000, mfTarget: 4875000, pb: 3000000, pbTarget: 22500000 },
      { id: "sof-2000k", label: "过往年收入 HK$2,000,000", mf: 83300, mfMonths: 24, sof: 1999200, mfTarget: 6497400, pb: 3998400, pbTarget: 29988000 },
    ],
    risk: [
      "申请者一般需3年人寿保险销售经验、前公司服务年资、续保率和信贷报告等条件。",
      "若24个月结束时每月预支达标率低于60%，公司会即时终止财务计划。",
      "未达到最少维持合约年期，1-36个月内需偿还100%，37-48个月60%，49-72个月40%。",
      "PB1、PB2、PB3会在后续月份分期发放；发放前终止合约则不会发放。",
    ],
  },
  t: {
    name: "T 业绩花红财务计划",
    badge: "T",
    targetLabel: "每年 NSC",
    description: "没有每月预支，主要靠佣金和年度业绩花红，现金流压力更大但预支偿还风险较低。",
    tiers: [
      { id: "t-650", label: "NSC HK$650,000 / 年", mf: 0, mfMonths: 0, mfTarget: 0, pb: 80000, pbTarget: 650000 },
      { id: "t-1300", label: "NSC HK$1,300,000 / 年", mf: 0, mfMonths: 0, mfTarget: 0, pb: 180000, pbTarget: 1300000 },
      { id: "t-1950", label: "NSC HK$1,950,000 / 年", mf: 0, mfMonths: 0, mfTarget: 0, pb: 270000, pbTarget: 1950000 },
      { id: "t-5000", label: "NSC HK$5,000,000 / 年", mf: 0, mfMonths: 0, mfTarget: 0, pb: 500000, pbTarget: 5000000 },
      { id: "t-10000", label: "NSC HK$10,000,000 / 年", mf: 0, mfMonths: 0, mfTarget: 0, pb: 1000000, pbTarget: 10000000 },
    ],
    risk: [
      "T计划没有月预支，前期收入主要取决于真实成交佣金。",
      "业绩花红会根据H&P、净保单数目和续保率等要求按比例发放。",
      "文件显示T计划在一般终止情形下财务偿还压力较低，但正式条款仍以合约为准。",
    ],
  },
};

const els = {
  planSelect: document.querySelector("#planSelect"),
  tierSelect: document.querySelector("#tierSelect"),
  costRate: document.querySelector("#costRate"),
  costRateText: document.querySelector("#costRateText"),
  actualRate: document.querySelector("#actualRate"),
  actualRateText: document.querySelector("#actualRateText"),
  heroPlan: document.querySelector("#heroPlan"),
  heroSaved: document.querySelector("#heroSaved"),
  planBadge: document.querySelector("#planBadge"),
  targetMetric: document.querySelector("#targetMetric"),
  targetLabel: document.querySelector("#targetLabel"),
  supportMetric: document.querySelector("#supportMetric"),
  grossMetric: document.querySelector("#grossMetric"),
  netMetric: document.querySelector("#netMetric"),
  netLabel: document.querySelector("#netLabel"),
  planSummary: document.querySelector("#planSummary"),
  scenarioList: document.querySelector("#scenarioList"),
  riskText: document.querySelector("#riskText"),
  riskLevel: document.querySelector("#riskLevel"),
};

const defaultState = {
  planId: "u",
  tierId: "u-10000",
  costRate: 15,
  actualRate: 100,
};

let state = loadState();

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  els.heroSaved.textContent = "已自动保存选择";
}

function money(value) {
  return new Intl.NumberFormat("zh-HK", {
    style: "currency",
    currency: "HKD",
    maximumFractionDigits: 0,
  }).format(Math.round(value || 0));
}

function percent(value) {
  return `${Math.round(value)}%`;
}

function currentPlan() {
  return plans[state.planId] || plans.u;
}

function currentTier() {
  const plan = currentPlan();
  return plan.tiers.find((tier) => tier.id === state.tierId) || plan.tiers[0];
}

function supportAmount(tier) {
  return (tier.mf || 0) * (tier.mfMonths || 0) + (tier.sof || 0) + (tier.pb || 0);
}

function targetAmount(tier) {
  return Math.max(tier.pbTarget || 0, tier.mfTarget || 0);
}

function grossAtRate(tier, rate) {
  const target = targetAmount(tier);
  const achieved = target * (rate / 100);
  const commission = achieved * COMMISSION_RATE;
  const support = supportAtRate(tier, rate);
  return { achieved, commission, support, gross: commission + support };
}

function supportAtRate(tier, rate) {
  const mfTotal = (tier.mf || 0) * (tier.mfMonths || 0);
  const sof = tier.sof || 0;
  const pb = tier.pb || 0;
  if (rate >= 100) return mfTotal + sof + pb;
  if (rate >= 80) return mfTotal * 0.75 + sof * 0.75;
  if (rate >= 60) return mfTotal * 0.5 + sof * 0.4;
  return 0;
}

function net(gross) {
  return gross * (1 - state.costRate / 100);
}

function populatePlans() {
  els.planSelect.innerHTML = "";
  Object.entries(plans).forEach(([id, plan]) => {
    els.planSelect.append(new Option(plan.name, id));
  });
  els.planSelect.value = state.planId;
  populateTiers();
}

function populateTiers() {
  const plan = currentPlan();
  els.tierSelect.innerHTML = "";
  plan.tiers.forEach((tier) => els.tierSelect.append(new Option(tier.label, tier.id)));
  if (!plan.tiers.some((tier) => tier.id === state.tierId)) {
    state.tierId = plan.tiers[0].id;
  }
  els.tierSelect.value = state.tierId;
}

function render() {
  const plan = currentPlan();
  const tier = currentTier();
  const target = targetAmount(tier);
  const support = supportAmount(tier);
  const full = grossAtRate(tier, 100);
  const projected = grossAtRate(tier, state.actualRate);

  els.heroPlan.textContent = `${plan.name} - ${tier.label}`;
  els.planBadge.textContent = `${plan.badge} ${tier.label}`;
  els.targetMetric.textContent = money(target);
  els.targetLabel.textContent = plan.targetLabel;
  els.supportMetric.textContent = money(support);
  els.grossMetric.textContent = money(full.gross);
  els.netMetric.textContent = money(net(projected.gross));
  els.netLabel.textContent = `按实际达成率${percent(state.actualRate)}、成本${percent(state.costRate)}`;
  els.costRate.value = state.costRate;
  els.actualRate.value = state.actualRate;
  els.costRateText.textContent = percent(state.costRate);
  els.actualRateText.textContent = percent(state.actualRate);

  renderSummary(plan, tier, full);
  renderScenarios(tier);
  renderRisk(plan, tier);
}

function renderSummary(plan, tier, full) {
  const rows = [
    ["计划说明", plan.description],
    ["每月预支", tier.mf ? `${money(tier.mf)} x ${tier.mfMonths}个月` : "无每月预支"],
    ["一次性预支", tier.sof ? money(tier.sof) : "无"],
    ["预支业绩要求", tier.mfTarget ? money(tier.mfTarget) : "不适用"],
    ["花红金额", tier.pb ? money(tier.pb) : "无"],
    ["花红/最终业绩要求", money(targetAmount(tier))],
    ["产品佣金估算", `${money(full.commission)}，按NSC的30%估算`],
    ["财务计划总额", money(supportAmount(tier))],
    ["保守毛收入", money(full.gross)],
  ];

  els.planSummary.innerHTML = rows
    .map(([label, value]) => `<div class="summary-item"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function renderScenarios(tier) {
  const scenarioData = [
    {
      cls: "good",
      name: "达标状态",
      rate: 100,
      note: "达到最低核心业绩，通常可拿满对应预支和花红。适合续签材料中的稳定收入叙事。",
    },
    {
      cls: "mid",
      name: "中等状态",
      rate: 80,
      note: "有业绩但未完全达标，预支可能按比例发放，花红大概率受影响。",
    },
    {
      cls: "bad",
      name: "最差状态",
      rate: 50,
      note: "低于60%达标线，预支可能为0，并可能触发停止发放或偿还风险。",
    },
  ];

  els.scenarioList.innerHTML = scenarioData
    .map((item) => {
      const result = grossAtRate(tier, item.rate);
      return `
        <article class="scenario ${item.cls}">
          <h3>${item.name}</h3>
          <strong>${money(net(result.gross))}</strong>
          <span>估算净收入，达成率${item.rate}%</span>
          <p>完成业绩：${money(result.achieved)}；财务计划收入：${money(result.support)}；产品佣金估算：${money(result.commission)}。</p>
          <p>${item.note}</p>
        </article>
      `;
    })
    .join("");
}

function renderRisk(plan, tier) {
  const target = targetAmount(tier);
  const achieved = target * (state.actualRate / 100);
  let level = "低风险";
  if (state.actualRate < 60) level = "高风险";
  else if (state.actualRate < 100) level = "中等风险";
  els.riskLevel.textContent = level;

  els.riskText.innerHTML = `
    <p>按你设置的实际达成率，预计完成业绩为 <strong>${money(achieved)}</strong>，距离最低核心业绩 <strong>${money(target)}</strong> ${
      achieved >= target ? "已经达标" : `还差 <span class="danger">${money(target - achieved)}</span>`
    }。</p>
    ${plan.risk.map((item) => `<p>${item}</p>`).join("")}
    <p>计算器保存的是选择和假设，不保存个人敏感资料；浏览器本地保存键名为 <strong>${STORAGE_KEY}</strong>。</p>
  `;
}

function bindEvents() {
  els.planSelect.addEventListener("change", () => {
    state.planId = els.planSelect.value;
    state.tierId = currentPlan().tiers[0].id;
    populateTiers();
    saveState();
    render();
  });

  els.tierSelect.addEventListener("change", () => {
    state.tierId = els.tierSelect.value;
    saveState();
    render();
  });

  els.costRate.addEventListener("input", () => {
    state.costRate = Number(els.costRate.value);
    saveState();
    render();
  });

  els.actualRate.addEventListener("input", () => {
    state.actualRate = Number(els.actualRate.value);
    saveState();
    render();
  });
}

populatePlans();
bindEvents();
render();
