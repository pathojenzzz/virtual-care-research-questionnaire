# Research Questionnaire Website

This static website rebuilds the uploaded PDF instrument as a responsive multi-section web form. The PDF shows 36 Job Satisfaction Survey items, so this build uses the 36-item version.

## Files

- `index.html` - website shell
- `styles.css` - responsive academic styling
- `config.js` - paste your Google Apps Script Web App URL here
- `app.js` - questionnaire wording, form rendering, validation, scoring values, and submission
- `google-apps-script.js` - Google Sheets receiver code
- `sample-header-row.csv` - header row matching the submitted variables

## Google Sheets Setup

1. Create a new Google Sheet.
2. Rename the first sheet tab to `Responses`, or let the Apps Script create it.
3. Open Extensions > Apps Script.
4. Delete the starter code.
5. Paste the full contents of `google-apps-script.js`.
6. Save the project.
7. Click Deploy > New deployment.
8. Select type: Web app.
9. Execute as: Me.
10. Who has access: Anyone.
11. Click Deploy and authorize the project.
12. Copy the Web App URL.
13. Open `config.js` and paste it between the quotes:

```js
window.RESEARCH_FORM_CONFIG = {
  appsScriptUrl: "PASTE_YOUR_WEB_APP_URL_HERE"
};
```

Each submission appends one row with a timestamp, respondent details, all questionnaire item responses, Task Load Index source comparison counts, TLX slider values from 0 to 100 in steps of 5, PSS-10 values from 0 to 4, and Job Satisfaction Survey values from 1 to 6.

## Respondent Code

The respondent code is hidden from respondents. By default, the website generates a code automatically. If an admin needs to assign a specific code, open the form with a URL parameter:

```text
index.html?code=VC-001
```

## Free Deployment Options

### GitHub Pages

1. Create a GitHub repository.
2. Upload all files in this folder to the repository root.
3. In the repository, open Settings > Pages.
4. Choose Deploy from a branch.
5. Select the `main` branch and root folder.
6. Save, then use the Pages URL GitHub provides.

### Netlify

1. Go to Netlify and choose Add new site > Deploy manually.
2. Drag this folder into Netlify.
3. Netlify will publish the static site and provide a URL.

### Vercel

1. Create a Vercel project.
2. Import the repository containing these files.
3. Use the default static deployment settings.
4. Deploy and use the generated URL.

## Local Preview

Open `index.html` in a browser. Submission to Google Sheets will work only after `config.js` contains your deployed Apps Script Web App URL.
