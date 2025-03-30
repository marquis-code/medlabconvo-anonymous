const express = require("express");
const { google } = require("googleapis");
let router = express.Router();
require("dotenv").config();

router.post("/anonymous", async (req, res) => {
    const { whatDoYouWantUsToCallYou, askYourQuestion, anyOtherThingYouWishToTellTheMedLabConvoTeam } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: "joke.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const spreadsheetId = "1cIdXn1c2GnIrglyhCsdmsCQJVaf034brpgzdR_jmB8w";
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });
  
    //Get Metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
      auth, spreadsheetId
    })
  
    //Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth, spreadsheetId,
      range: "Sheet1!A:B",
    })
  
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[ whatDoYouWantUsToCallYou, askYourQuestion, anyOtherThingYouWishToTellTheMedLabConvoTeam ]],
      },
    });
  
    return res.status(200).json({
      successMessage: "Thanks for reaching out. We would revert shortly!",
    });
  });

  router.post("/news-letters", async (req, res) => {
    const { email } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: "joke.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
    const client = await auth.getClient();
    const spreadsheetId = "1cIdXn1c2GnIrglyhCsdmsCQJVaf034brpgzdR_jmB8w";
    const googleSheets = google.sheets({
      version: "v4",
      auth: client,
    });
  
    //Get Metadata about spreadsheet
    const metadata = await googleSheets.spreadsheets.get({
      auth, spreadsheetId
    })
  
    //Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
      auth, spreadsheetId,
      range: "Sheet1!A:B",
    })
  
    googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[ email ]],
      },
    });
  
    return res.status(200).json({
      successMessage: "Thanks for reaching out. We would revert shortly!",
    });
  });

  module.exports = router;