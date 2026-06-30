const sectionsRoot = document.getElementById("sections");
const form = document.getElementById("questionnaireForm");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const submitButton = document.getElementById("submitButton");
const statusMessage = document.getElementById("statusMessage");
const progressText = document.getElementById("progressText");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const stepList = document.getElementById("stepList");

const appsScriptUrl = window.RESEARCH_FORM_CONFIG?.appsScriptUrl?.trim() || "";

const sectionSteps = [
  { id: "consent", short: "Consent", label: "Informed Consent" },
  { id: "part-i", short: "Part I", label: "Personal Data" },
  { id: "part-ii-a", short: "Part II-A", label: "TLX Comparison" },
  { id: "part-ii-b", short: "Part II-B", label: "TLX Rating" },
  { id: "part-iii", short: "Part III", label: "PSS-10" },
  { id: "part-iv", short: "Part IV", label: "Job Satisfaction" }
];

const consentParagraphs = [
  "We, the researchers, Jenz Nielsen V. Agujitas, Aivan Darik A. Almacen, Alexandra Nicole B. Balaoing, Franchezka Janelle P. Ballener, Janica Coreen L. Baltero, are undergraduate students of West Visayas State University - College of Nursing. Currently, we are conducting a descriptive correlational study entitled, “Task Load, Perceived Stress, and Job Satisfaction Among Nurses in Virtual Care Centers in a Highly Urbanized City” as part of our Nursing degree requirements.",
  "We would like to invite you to participate in this study. Your participation is completely voluntary. This means that you may choose to join or not join the study. You have the unconditional right to withdraw from the study and withhold your responses at any point before submitting your completed survey, without any penalty or consequence. Please note that because the survey data is collected anonymously using alphanumeric codes, it will not be possible to identify, retrieve, or delete your specific responses once they have been submitted.",
  "We will gladly answer your questions and assist you if there are words, terms, or parts of the study that are unclear to you. Before you participate, we will also explain the purpose of the study and its objectives so that you can fully understand why this research is being conducted.",
  "All information and procedures in this study will be used only for academic and research purposes. Additional details about the study are provided below:"
];

const consentSections = [
  {
    heading: "What is the purpose of the study?",
    paragraphs: [
      "      	The study aims to determine how you perceive your work tasks to be, how much stress you experience in relation to your work, and how satisfied you are with your job as a nurse working in a virtual care center."
    ]
  },
  {
    heading: "What is the significance of our study?",
    paragraphs: [
      "This study may benefit nurses in virtual care centers, healthcare institutions, government agencies, nursing organizations, academic institutions, future nurses, and researchers by providing information on the task load, stress, and job satisfaction of virtual nurses. The findings may help improve workplace policies, support programs, nursing education, and workforce planning for technology-based nursing roles. Overall, this study aims to support the recognition, protection, and advancement of virtual nurses by promoting better working conditions and strengthening their role in the changing healthcare system."
    ]
  },
  {
    heading: "Who can partake in this study?",
    paragraphs: [
      "You are selected to be a respondent of the study since you fit the inclusion criteria if:"
    ],
    list: [
      "You are a licensed registered nurse in the Philippines;",
      "You are currently working as a virtual nurse in a virtual care center in Iloilo City; and",
      "You are holding a regular employment status within the virtual care center; and",
      "You are willing to participate in this study."
    ]
  },
  {
    heading: "Am I really obligated to participate?",
    paragraphs: [
      "Participation in this study will be entirely voluntary, without any form of coercion, bribery, or compensation. Should unavoidable circumstances on your end prevent you from taking part, you have the right to decline participation or withdraw from the study at any time before submitting the form. No consequences will be imposed. However, because your responses are completely anonymous and cannot be linked back to your name, data cannot be singled out for deletion after the survey has been submitted. If you decide not to take part in the study before submission, you can simply inform the researchers or contact us using the details provided in this informed consent form."
    ]
  },
  {
    heading: "How will the survey be conducted?",
    paragraphs: [
      "To gather data, the researchers will first seek permission from the selected virtual care centers in Iloilo City to conduct the study. Company supervisors and managers will only facilitate administrative coordination and access to the research site. They will not directly recruit employees, distribute study invitations, or collect informed consent forms. To minimize any perceived institutional pressure or fear of workplace retaliation, recruitment invitations will be delivered directly by the researchers or through neutral digital flyers. Employees who are interested in participating may contact the researchers directly and will be included only if they voluntarily agree to participate and meet the study's inclusion criteria."
      "Before answering the survey, participants will be asked to sign an informed consent form. They will also be assigned an alphanumeric code (e.g., A1, B1, C1) that will be used instead of their names to maintain confidentiality. The researchers will then distribute the questionnaires, explain the instructions, and provide guidance while participants complete the survey. Participants may ask questions at any time if they need clarification or find any part of the questionnaire difficult to understand. If a participant is unavailable during the scheduled data collection, the researchers may return at another mutually convenient time. After all questionnaires have been collected, the data will be encoded and analyzed by the researchers."
    ]
  },
  {
    heading: "Are there any risks associated with this study?",
    paragraphs: [
      "During the conduct of the study, the respondents may experience mild emotional or psychological discomfort when answering questions related to their professional stress, job frustration, and work-related experiences. Reflecting on these past and present experiences may prompt feelings of unease. However, these risks are considered minimal and are not expected to exceed those encountered in everyday professional life."
      "To minimize this, both researchers and the respondents will be reminded that participation is entirely voluntary and that there are no right or wrong answers. Moreover, the researchers and the research advisers, who are registered nurses, will be available during the conduct of the study for immediate assistance if the respondents would feel uncomfortable or distressed when answering the survey. All respondents will be given the opportunity to express their concerns and will be permitted to refuse completion of the survey during any time if they decided to."
    ]
  },
  {
    heading: "What will happen to the information I share during the survey?",
    paragraphs: [
      "All printed questionnaires and forms will be kept in a locked and secure storage at the principal researcher’s residence. Electronic data will be stored in a password-protected and encrypted Google Drive account that only the research team can access using their secured devices. Only the researchers and authorized persons directly involved in the study will be allowed to view the data. The data will be kept only for the needed period. Electronic files will be permanently deleted within two years after the completion of the study, while printed forms and raw data will be shredded within two years after the final defense. These steps will help protect your privacy and prevent the release of confidential information. However, the results of the study may be presented to panelists for academic purposes, shared in scientific forums, published in medical or scientific journals, and stored in the local research archive of the college."
    ]
  }
];

const consentContacts = [
  ["Agujitas, Jenz Nielsen V.", "jenznielsen.agujitas@wvsu.edu.ph", "09081046109"],
  ["Almacen, Aivan Darik A.", "aivandarik.almacen@wvsu.edu.ph", "09272732419"],
  ["Balaoing, Alexandra Nicole B.", "alexandranicole.balaoing@wvsu.edu.ph", "09984825496"],
  ["Ballener, Franchezka Janelle P.", "franchezkajanelle.ballener@wvsu.edu.ph", "09300514234"],
  ["Baltero, Janica Coreen L.", "janicacoreen.baltero@wvsu.edu.ph", "09668635813"]
];

const dimensions = [
  { label: "Mental Demand", key: "mental_demand" },
  { label: "Physical Demand", key: "physical_demand" },
  { label: "Temporal Demand", key: "temporal_demand" },
  { label: "Performance", key: "performance" },
  { label: "Effort", key: "effort" },
  { label: "Frustration", key: "frustration" }
];

const tlxPairs = [
  ["Mental Demand", "Physical Demand"],
  ["Temporal Demand", "Mental Demand"],
  ["Mental Demand", "Performance"],
  ["Effort", "Mental Demand"],
  ["Mental Demand", "Frustration"],
  ["Physical Demand", "Temporal Demand"],
  ["Performance", "Physical Demand"],
  ["Physical Demand", "Effort"],
  ["Frustration", "Physical Demand"],
  ["Performance", "Temporal Demand"],
  ["Temporal Demand", "Frustration"],
  ["Effort", "Temporal Demand"],
  ["Performance", "Frustration"],
  ["Effort", "Performance"],
  ["Frustration", "Effort"]
];

const tlxRatings = [
  "How mentally demanding was the task as a virtual nurse?",
  "How physically demanding was the task as a virtual nurse?",
  "How hurried or rushed was the pace of your task as a virtual nurse?",
  "How successfully did you accomplish your tasks as a virtual nurse?",
  "How hard did you have to work to accomplish your level of performance as a virtual nurse?",
  "How insecure, discouraged, irritated, stressed, and annoyed were you during virtual patient interactions or while using telehealth systems?"
];

const pssOptions = [
  { label: "Never", value: 0, interpretation: "You did not experience this feeling or thought in the past month." },
  { label: "Almost Never", value: 1, interpretation: "You experienced this feeling or thought very rarely, only occasionally or in isolated instances." },
  { label: "Sometimes", value: 2, interpretation: "You experienced this thought or feeling occasionally, at times but not consistently." },
  { label: "Fairly Often", value: 3, interpretation: "You experienced this feeling or thought frequently, more than half of the time during the last month." },
  { label: "Very Often", value: 4, interpretation: "You experienced this feeling or thought almost always, consistently throughout the month." }
];

const pssItems = [
  "In the last month, how often have you been upset because of something that happened unexpectedly?",
  "In the last month, how often have you felt that you were unable to control the important things in your life?",
  "In the last month, how often have you felt nervous and “stressed”?",
  "In the last month, how often have you felt confident about your ability to handle your personal problems?",
  "In the last month, how often have you felt that things were going your way?",
  "In the last month, how often have you found that you could not cope with all the things that you had to do?",
  "In the last month, how often have you been able to control irritations in your life?",
  "In the last month, how often have you felt that you were on top of things?",
  "In the last month, how often have you been angered because of things that were outside your control?",
  "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
];

const jssOptions = [
  { label: "Disagree very much", value: 1, interpretation: "“Not true at all - I completely reject this statement”" },
  { label: "Disagree moderately", value: 2, interpretation: "“Mostly false - This doesn’t describe describes how I feel about my job experience”" },
  { label: "Disagree slightly", value: 3, interpretation: "“Somewhat untrue - This is generally not how I feel.”" },
  { label: "Agree slightly", value: 4, interpretation: "“Somewhat true - This somewhat describes describes how I feel about my job”" },
  { label: "Agree moderately", value: 5, interpretation: "“Mostly true - This accurately describes describes how I feel about my work”" },
  { label: "Agree very much", value: 6, interpretation: "“Completely true - This perfectly describes how I feel about my job”" }
];

const jssItems = [
  "I feel I am being paid a fair amount for the work I do.",
  "There is really too little chance for promotion on my job.",
  "My supervisor is quite competent in doing his/her job.",
  "I am not satisfied with the benefits I receive.",
  "When I do a good job, I receive the recognition for it that I should receive.",
  "Many of our rules and procedures make doing a good job difficult.",
  "I like the people I work with.",
  "I sometimes feel my job is meaningless.",
  "Communications seem good within this organization.",
  "Raises are too few and far between.",
  "Those who do well on the job stand a fair chance of being promoted.",
  "My supervisor is unfair to me.",
  "The benefits we receive are as good as most other organizations offer.",
  "I do not feel that the work I do is appreciated.",
  "My efforts to do a good job are seldom blocked by red tape.",
  "I find I have to work harder at my job because of the incompetence of people I work with.",
  "I like doing the things I do at work.",
  "The goals of this organization are not clear to me.",
  "I feel unappreciated by the organization when I think about what they pay me.",
  "People get ahead as fast here as they do in other places.",
  "My supervisor shows too little interest in the feelings of subordinates.",
  "The benefit package we have is equitable.",
  "There are few rewards for those who work here.",
  "I have too much to do at work.",
  "I enjoy my coworkers.",
  "I often feel that I do not know what is going on with the organization.",
  "I feel a sense of pride in doing my job.",
  "I feel satisfied with my chances for salary increases.",
  "There are benefits we do not have which we should have.",
  "I like my supervisor.",
  "I have too much paperwork.",
  "I don’t feel my efforts are rewarded the way they should be.",
  "I am satisfied with my chances for promotion.",
  "There is too much bickering and fighting at work.",
  "My job is enjoyable.",
  "Work assignments are not fully explained."
];

let currentSection = 0;

function el(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function numberToken(index) {
  return String(index + 1).padStart(2, "0");
}

function makeSection(stepIndex) {
  const section = el("section", "section-card");
  section.dataset.sectionIndex = stepIndex;
  section.id = sectionSteps[stepIndex].id;
  if (stepIndex !== 0) section.hidden = true;
  return section;
}

function appendRequiredMark(label) {
  const mark = el("span", "required-mark", " *");
  label.appendChild(mark);
}

function addError(container) {
  const error = el("div", "error-message", "Please answer this item.");
  container.appendChild(error);
  return error;
}

function makeField({ name, label, type = "text", required = true, full = false, suffix = "", min = "", pattern = "", title = "" }) {
  const wrapper = el("div", `field${full ? " full" : ""}`);
  const labelEl = el("label", "", label);
  labelEl.setAttribute("for", name);
  if (required) appendRequiredMark(labelEl);
  const input = document.createElement("input");
  input.type = type;
  input.id = name;
  input.name = name;
  input.dataset.required = required ? "true" : "false";
  if (min !== "") input.min = min;
  if (pattern) input.pattern = pattern;
  if (title) input.title = title;
  wrapper.append(labelEl, input);
  if (suffix) wrapper.appendChild(el("span", "suffix", suffix));
  addError(wrapper);
  return wrapper;
}

function makeRadioGroup(name, label, options) {
  const wrapper = el("div", "radio-group");
  wrapper.dataset.requiredRadio = name;
  const labelEl = el("div", "group-label", label);
  appendRequiredMark(labelEl);
  const optionsWrap = el("div", "radio-options");
  options.forEach((option) => {
    const optionLabel = el("label", "radio-option");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = name;
    input.value = option;
    optionLabel.append(input, document.createTextNode(option));
    optionsWrap.appendChild(optionLabel);
  });
  wrapper.append(labelEl, optionsWrap);
  addError(wrapper);
  return wrapper;
}

function renderConsent() {
  const section = makeSection(0);
  section.append(
    el("p", "section-kicker", "Appendix A"),
    el("h2", "", "APPENDIX A: RESPONDENTS’ INFORMATION SHEET AND CONSENT FORM"),
    el("p", "adopted", "Respondent Information Sheet & Informed Consent Form"),
    el("h3", "", "TASK LOAD, PERCEIVED STRESS, AND JOB SATISFACTION AMONG NURSES IN VIRTUAL CARE CENTERS IN A HIGHLY URBANIZED CITY")
  );

  const consentText = el("div", "consent-text");
  consentParagraphs.forEach((paragraph) => consentText.appendChild(el("p", "", paragraph)));
  consentSections.forEach((block) => {
    consentText.appendChild(el("h3", "", block.heading));
    block.paragraphs.forEach((paragraph) => consentText.appendChild(el("p", "", paragraph)));
    if (block.list) {
      const list = el("ul", "consent-list");
      block.list.forEach((item) => list.appendChild(el("li", "", item)));
      consentText.appendChild(list);
    }
  });

  consentText.appendChild(el("h3", "", "Who to contact?"));
  consentText.appendChild(el("p", "", "Should you have any concerns, questions, or assistance concerning the study, the following contact details are found below:"));
  consentText.appendChild(makeContactTable());
  consentText.appendChild(el("h3", "", "For inquiries about your rights as a respondent, please contact:"));
  [
    "Dr. Hilda C. Montaño",
    "REC Chair",
    "Socio-Behavioral Science Research Ethics Review Committee (SBSRERC)",
    "West Visayas State University",
    "Luna St., La Paz, Iloilo City",
    "Telephone No.: (033) 320-0870 loc 1303",
    "Email Address: sbsrerc@wvsu.edu.ph"
  ].forEach((line) => consentText.appendChild(el("p", "compact-line", line)));
  section.appendChild(consentText);

  const consentBox = el("div", "consent-check");
  consentBox.dataset.requiredCheckbox = "consent_agreed";
  const label = el("label", "radio-option");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "consent_agreed";
  checkbox.value = "Yes";
  label.append(checkbox, document.createTextNode("I have read and understand the provided Respondents Information Sheet and consent to participating in this study."));
  consentBox.appendChild(label);
  addError(consentBox);
  section.appendChild(consentBox);
  return section;
}

function makeContactTable() {
  const wrapper = el("div", "contact-table-wrapper");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Name", "Email", "Telephone Number"].forEach((heading) => headerRow.appendChild(el("th", "", heading)));
  thead.appendChild(headerRow);
  const tbody = document.createElement("tbody");
  consentContacts.forEach((contact) => {
    const row = document.createElement("tr");
    contact.forEach((value) => row.appendChild(el("td", "", value)));
    tbody.appendChild(row);
  });
  table.append(thead, tbody);
  wrapper.appendChild(table);
  return wrapper;
}

function renderPartI() {
  const section = makeSection(1);
  section.append(
    el("p", "section-kicker", "Part I"),
    el("h2", "", "Part I: Personal Data"),
    instruction("Instruction:", "Please enter the data needed or tick the box of what is applicable to you.")
  );

  const respondentCode = document.createElement("input");
  respondentCode.type = "hidden";
  respondentCode.id = "respondent_code";
  respondentCode.name = "respondent_code";
  respondentCode.value = getRespondentCode();
  section.appendChild(respondentCode);

  const grid = el("div", "field-grid");
  grid.append(
    makeField({ name: "name", label: "Name (optional):", required: false }),
    makeField({
      name: "alphanumeric_code",
      label: "Alphanumeric Code:",
      pattern: "[A-Za-z0-9]+",
      title: "Use letters and numbers only."
    }),
    makeField({ name: "date", label: "Date:", type: "date" }),
    el("h3", "field full", "Demographic Profile:"),
    makeField({ name: "age", label: "Age:", type: "number", suffix: "years old", min: 0 }),
    makeRadioGroup("sex", "Sex:", ["Female", "Male"]),
    makeRadioGroup("civil_status", "Civil Status:", ["Single", "Married"]),
    makeField({
      name: "virtual_care_years",
      label: "Years of Experience (count only years working in a virtual care setting, do not include years of general bedside or clinical nursing experience):",
      type: "number",
      suffix: "years",
      min: 0,
      full: true
    })
  );
  section.appendChild(grid);
  return section;
}

function renderTlxA() {
  const section = makeSection(2);
  section.append(
    el("p", "section-kicker", "Part II-A"),
    el("h2", "", "Part II: Task Load Index Questionnaire"),
    el("p", "adopted", "Adopted from Hart & Staveland"),
    el("h3", "", "Subpart A. SOURCES-OF-WORKLOAD COMPARISON"),
    instruction("Instruction:", "For each pair of workload dimensions listed below, circle the one that contributed more to your workload during virtual nursing tasks. There are 15 pairs in total."),
    el("p", "instruction", "Example: If you feel that Mental Demand affected your workload more than Physical Demand for that pair, circle “Mental Demand.”")
  );

  const list = el("div", "pair-list");
  tlxPairs.forEach(([left, right], index) => {
    const token = numberToken(index);
    const row = el("div", "pair-row");
    row.dataset.requiredRadio = `tlx_a_${token}`;
    row.appendChild(el("div", "question-text", `${index + 1}. ${left} or ${right}`));
    const choices = el("div", "pair-options");
    choices.append(
      makePairChoice(`tlx_a_${token}`, left),
      el("span", "or-label", "or"),
      makePairChoice(`tlx_a_${token}`, right)
    );
    row.appendChild(choices);
    addError(row);
    list.appendChild(row);
  });
  section.appendChild(list);
  return section;
}

function makePairChoice(name, value) {
  const label = el("label", "pair-choice");
  const input = document.createElement("input");
  input.type = "radio";
  input.name = name;
  input.value = value;
  label.append(input, document.createTextNode(value));
  return label;
}

function renderTlxB() {
  const section = makeSection(3);
  section.append(
    el("p", "section-kicker", "Part II-B"),
    el("h2", "", "Part II: Task Load Index Questionnaire"),
    el("p", "adopted", "Adopted from Hart & Staveland"),
    el("h3", "", "Subpart B. RATING SHEET"),
    instruction("Instruction:", "Please indicate your experience by placing an “X” above the scale line at the point that best represents your perceived workload while performing virtual nursing tasks. Each scale ranges from Very Low (left) to Very High (right).")
  );

  const list = el("div", "slider-list");
  tlxRatings.forEach((question, index) => {
    const token = numberToken(index);
    const wrapper = el("div", "slider-field");
    wrapper.dataset.requiredSlider = `tlx_b_${token}`;
    wrapper.appendChild(el("label", "question-text", `${index + 1}. ${question}`));
    const shell = el("div", "slider-shell");
    const range = document.createElement("input");
    range.type = "range";
    range.name = `tlx_b_${token}`;
    range.id = `tlx_b_${token}`;
    range.min = "0";
    range.max = "100";
    range.step = "5";
    range.value = "50";
    range.dataset.touched = "false";
    range.className = "untouched";
    range.setAttribute("aria-label", question);
    ["input", "change", "pointerdown", "keydown"].forEach((eventName) => {
      range.addEventListener(eventName, () => markSliderTouched(range));
    });
    shell.append(
      range,
      labelsRow("Very Low", "Very High")
    );
    wrapper.appendChild(shell);
    addError(wrapper);
    list.appendChild(wrapper);
  });
  section.appendChild(list);
  return section;
}

function labelsRow(left, right) {
  const labels = el("div", "slider-labels");
  labels.append(el("span", "", left), el("span", "", right));
  return labels;
}

function renderPss() {
  const section = makeSection(4);
  section.append(
    el("p", "section-kicker", "Part III"),
    el("h2", "", "Part III: Perceived Stress Scale (PSS-10) Questionnaire"),
    el("p", "adopted", "Adopted from Cohen & Williamson"),
    instruction("INSTRUCTION:", "The questions in this scale ask you about your feelings and thoughts during THE LAST MONTH. In each case, please indicate your response by placing an “X” over the circle representing HOW OFTEN you felt or thought a certain way."),
    instruction("NOTE:", "“The last month” refers to approximately the past 30 days of your work and personal life as a virtual nurse.", "note"),
    makeLegend(pssOptions, "(Harris et al., 2023)"),
    el("h3", "", "PERCEIVED STRESS SCALE (PSS-10) QUESTIONNAIRE"),
    instruction("INSTRUCTIONS:", "The questions in this scale ask you about your feelings and thoughts during THE LAST MONTH. In each case, please indicate your response by placing “X” over the box representing HOW OFTEN you felt or thought a certain way.")
  );
  section.appendChild(makeMatrix("pss", pssItems, pssOptions, false));
  return section;
}

function renderJss() {
  const section = makeSection(5);
  section.append(
    el("p", "section-kicker", "Part IV"),
    el("h2", "", "Part IV: Job Satisfaction Questionnaire"),
    el("p", "adopted", "Adopted from Spector"),
    instruction("INSTRUCTION:", "Please circle the one number for each question that comes closest to reflecting your opinion about it."),
    makeLegend(jssOptions, "(Pirino et al., 2023; Platania et al., 2021; Sapar & Oducado, 2021)"),
    el("h3", "", "JOB SATISFACTION SURVEY")
  );
  section.appendChild(makeMatrix("jss", jssItems, jssOptions, true));
  return section;
}

function instruction(prefix, text, className = "instruction") {
  const paragraph = el("p", className);
  const strong = el("strong", "", `${prefix} `);
  paragraph.append(strong, document.createTextNode(text));
  return paragraph;
}

function makeLegend(options, citation) {
  const wrapper = el("div", "legend-table");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Response", "Weight", "Verbal Interpretation"].forEach((heading) => {
    headerRow.appendChild(el("th", "", heading));
  });
  thead.appendChild(headerRow);
  const tbody = document.createElement("tbody");
  const citationRow = document.createElement("tr");
  citationRow.append(el("td", "", ""), el("td", "", ""), el("td", "", citation));
  tbody.appendChild(citationRow);
  options.forEach((option) => {
    const row = document.createElement("tr");
    row.append(el("td", "", option.label), el("td", "", String(option.value)), el("td", "", option.interpretation));
    tbody.appendChild(row);
  });
  table.append(thead, tbody);
  wrapper.appendChild(table);
  return wrapper;
}

function makeMatrix(prefix, items, options, showValues) {
  const matrix = el("div", "radio-matrix");
  matrix.style.setProperty("--option-count", options.length);

  const header = el("div", "matrix-header");
  header.appendChild(el("div", "", ""));
  options.forEach((option) => {
    header.appendChild(el("div", "", showValues ? `${option.label}\n${option.value}` : option.label));
  });
  matrix.appendChild(header);

  items.forEach((item, itemIndex) => {
    const token = numberToken(itemIndex);
    const row = el("div", "matrix-row");
    row.dataset.requiredRadio = `${prefix}_${token}`;
    row.appendChild(el("div", "matrix-question", `${itemIndex + 1}. ${item}`));
    options.forEach((option) => {
      const cell = el("div", "matrix-cell");
      const label = el("label", "matrix-choice");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `${prefix}_${token}`;
      input.value = String(option.value);
      label.append(input, document.createTextNode(showValues ? String(option.value) : ""));
      label.appendChild(el("span", "choice-label", showValues ? ` ${option.label}` : option.label));
      cell.appendChild(label);
      row.appendChild(cell);
    });
    addError(row);
    matrix.appendChild(row);
  });

  return matrix;
}

function getRespondentCode() {
  const params = new URLSearchParams(window.location.search);
  const provided = params.get("code") || params.get("respondent_code");
  if (provided) return provided.trim();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `VC-${Date.now()}-${random}`;
}

function renderSteps() {
  sectionSteps.forEach((step, index) => {
    const item = document.createElement("li");
    item.textContent = `${step.short}: ${step.label}`;
    item.dataset.stepIndex = index;
    stepList.appendChild(item);
  });
}

function render() {
  renderSteps();
  sectionsRoot.append(
    renderConsent(),
    renderPartI(),
    renderTlxA(),
    renderTlxB(),
    renderPss(),
    renderJss()
  );
  updateView();
}

function markSliderTouched(range) {
  range.dataset.touched = "true";
  range.classList.remove("untouched");
  const wrapper = range.closest("[data-required-slider]");
  if (wrapper) clearError(wrapper);
}

function updateView() {
  const sections = [...sectionsRoot.querySelectorAll(".section-card")];
  sections.forEach((section, index) => {
    section.hidden = index !== currentSection;
  });

  [...stepList.children].forEach((item, index) => {
    item.classList.toggle("active", index === currentSection);
  });

  const completed = Math.round(((currentSection + 1) / sectionSteps.length) * 100);
  progressText.textContent = `Step ${currentSection + 1} of ${sectionSteps.length}: ${sectionSteps[currentSection].short}`;
  progressPercent.textContent = `${completed}%`;
  progressFill.style.width = `${completed}%`;

  prevButton.disabled = currentSection === 0;
  nextButton.hidden = currentSection === sectionSteps.length - 1;
  submitButton.hidden = currentSection !== sectionSteps.length - 1;
  clearStatus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setError(container, message = "Please answer this item.") {
  container.classList.add("has-error");
  const error = container.querySelector(".error-message");
  if (error) error.textContent = message;
}

function clearError(container) {
  container.classList.remove("has-error");
}

function validateSection(index, focusFirst = true) {
  const section = sectionsRoot.querySelector(`[data-section-index="${index}"]`);
  let firstInvalid = null;

  section.querySelectorAll(".has-error").forEach(clearError);

  section.querySelectorAll("input[data-required='true']").forEach((input) => {
    if (!input.value) {
      const wrapper = input.closest(".field");
      setError(wrapper);
      firstInvalid ||= input;
    } else if (input.pattern && input.validity.patternMismatch) {
      const wrapper = input.closest(".field");
      setError(wrapper, input.title || "Please follow the required format.");
      firstInvalid ||= input;
    }
  });

  section.querySelectorAll("[data-required-radio]").forEach((group) => {
    const name = group.dataset.requiredRadio;
    if (!section.querySelector(`input[name="${name}"]:checked`)) {
      setError(group);
      firstInvalid ||= group.querySelector("input");
    }
  });

  section.querySelectorAll("[data-required-checkbox]").forEach((group) => {
    const name = group.dataset.requiredCheckbox;
    if (!section.querySelector(`input[name="${name}"]:checked`)) {
      setError(group, "Please confirm your consent before continuing.");
      firstInvalid ||= group.querySelector("input");
    }
  });

  section.querySelectorAll("[data-required-slider]").forEach((group) => {
    const range = group.querySelector("input[type='range']");
    if (range.dataset.touched !== "true") {
      setError(group, "Please select a point on the scale.");
      firstInvalid ||= range;
    }
  });

  if (firstInvalid && focusFirst) {
    firstInvalid.focus({ preventScroll: true });
    firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return !firstInvalid;
}

function validateAllSections() {
  for (let index = 0; index < sectionSteps.length; index += 1) {
    if (!validateSection(index, false)) {
      currentSection = index;
      updateView();
      validateSection(index, true);
      return false;
    }
  }
  return true;
}

function checkedValue(name) {
  return form.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

function collectPayload() {
  const fields = form.elements;
  const payload = {
    consent_agreed: fields.consent_agreed.checked ? "Yes" : "",
    respondent_code: fields.respondent_code.value,
    alphanumeric_code: fields.alphanumeric_code.value.trim(),
    name: fields.name.value.trim(),
    date: fields.date.value,
    age: Number(fields.age.value),
    sex: checkedValue("sex"),
    civil_status: checkedValue("civil_status"),
    virtual_care_years: Number(fields.virtual_care_years.value)
  };

  const weights = Object.fromEntries(dimensions.map((dimension) => [dimension.label, 0]));
  tlxPairs.forEach((pair, index) => {
    const token = numberToken(index);
    const selected = checkedValue(`tlx_a_${token}`);
    payload[`tlx_a_${token}_selected`] = selected;
    if (selected in weights) weights[selected] += 1;
  });

  dimensions.forEach((dimension) => {
    payload[`tlx_weight_${dimension.key}`] = weights[dimension.label];
  });

  tlxRatings.forEach((question, index) => {
    const token = numberToken(index);
    payload[`tlx_b_${token}_value`] = Number(fields[`tlx_b_${token}`].value);
  });

  pssItems.forEach((item, index) => {
    const token = numberToken(index);
    payload[`pss_${token}_value`] = Number(checkedValue(`pss_${token}`));
  });

  jssItems.forEach((item, index) => {
    const token = numberToken(index);
    payload[`jss_${token}_value`] = Number(checkedValue(`jss_${token}`));
  });

  payload.user_agent = navigator.userAgent;
  return payload;
}

function setStatus(type, message) {
  statusMessage.className = `status-message ${type}`;
  statusMessage.textContent = message;
}

function clearStatus() {
  statusMessage.className = "status-message";
  statusMessage.textContent = "";
}

async function submitPayload(payload) {
  if (!appsScriptUrl) {
    throw new Error("Google Apps Script Web App URL is missing. Add it to config.js before collecting responses.");
  }

  await fetch(appsScriptUrl, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload)
  });
}

prevButton.addEventListener("click", () => {
  if (currentSection > 0) {
    currentSection -= 1;
    updateView();
  }
});

nextButton.addEventListener("click", () => {
  if (validateSection(currentSection)) {
    currentSection += 1;
    updateView();
  }
});

form.addEventListener("change", (event) => {
  const group = event.target.closest(".has-error");
  if (group) clearError(group);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearStatus();
  if (!validateAllSections()) return;

  const payload = collectPayload();
  submitButton.disabled = true;
  submitButton.textContent = "Submitting...";

  try {
    await submitPayload(payload);
    form.reset();
    form.elements.respondent_code.value = getRespondentCode();
    form.querySelectorAll("input[type='range']").forEach((range) => {
      range.value = "50";
      range.dataset.touched = "false";
      range.classList.add("untouched");
    });
    currentSection = 0;
    updateView();
    setStatus("success", "Thank you. Your responses have been submitted successfully.");
  } catch (error) {
    setStatus("error", error.message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Submit Responses";
  }
});

render();
