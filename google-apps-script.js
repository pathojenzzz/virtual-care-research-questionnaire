const SHEET_NAME = "Responses";

const HEADERS = [
  "timestamp",
  "respondent_code",
  "name",
  "date",
  "age",
  "sex",
  "civil_status",
  "virtual_care_years",
  "tlx_a_01_selected",
  "tlx_a_02_selected",
  "tlx_a_03_selected",
  "tlx_a_04_selected",
  "tlx_a_05_selected",
  "tlx_a_06_selected",
  "tlx_a_07_selected",
  "tlx_a_08_selected",
  "tlx_a_09_selected",
  "tlx_a_10_selected",
  "tlx_a_11_selected",
  "tlx_a_12_selected",
  "tlx_a_13_selected",
  "tlx_a_14_selected",
  "tlx_a_15_selected",
  "tlx_weight_mental_demand",
  "tlx_weight_physical_demand",
  "tlx_weight_temporal_demand",
  "tlx_weight_performance",
  "tlx_weight_effort",
  "tlx_weight_frustration",
  "tlx_b_01_value",
  "tlx_b_02_value",
  "tlx_b_03_value",
  "tlx_b_04_value",
  "tlx_b_05_value",
  "tlx_b_06_value",
  "pss_01_value",
  "pss_02_value",
  "pss_03_value",
  "pss_04_value",
  "pss_05_value",
  "pss_06_value",
  "pss_07_value",
  "pss_08_value",
  "pss_09_value",
  "pss_10_value",
  "jss_01_value",
  "jss_02_value",
  "jss_03_value",
  "jss_04_value",
  "jss_05_value",
  "jss_06_value",
  "jss_07_value",
  "jss_08_value",
  "jss_09_value",
  "jss_10_value",
  "jss_11_value",
  "jss_12_value",
  "jss_13_value",
  "jss_14_value",
  "jss_15_value",
  "jss_16_value",
  "jss_17_value",
  "jss_18_value",
  "jss_19_value",
  "jss_20_value",
  "jss_21_value",
  "jss_22_value",
  "jss_23_value",
  "jss_24_value",
  "jss_25_value",
  "jss_26_value",
  "jss_27_value",
  "jss_28_value",
  "jss_29_value",
  "jss_30_value",
  "jss_31_value",
  "jss_32_value",
  "jss_33_value",
  "jss_34_value",
  "jss_35_value",
  "jss_36_value",
  "user_agent"
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = parsePayload(e);
    const sheet = getSheet();
    ensureHeaderRow(sheet);

    const row = HEADERS.map((header) => {
      if (header === "timestamp") return new Date();
      return payload[header] === undefined ? "" : payload[header];
    });

    sheet.appendRow(row);
    return jsonResponse({ status: "ok" });
  } catch (error) {
    return jsonResponse({ status: "error", message: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse({ status: "ready" });
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    return;
  }

  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const needsHeader = existing.every((cell) => cell === "");
  if (needsHeader) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function parsePayload(e) {
  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  if (e && e.parameter) {
    return e.parameter;
  }

  return {};
}

function jsonResponse(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
