// Google Apps Script Client for Form Submissions
// Posts form data to Google Sheet via Apps Script webhook

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdNlU0oBw81n74sipnHKL_4iDtS0BZAU/usercontent';

export const googleSheetClient = {
      submitForm: async (formData) => {
              try {
                        // Convert formData object to URL-encoded format for Apps Script
                const formBody = Object.keys(formData)
                          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
                          .join('&');

                const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: {
                                          'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: formBody
                });

                return { success: true, message: 'Form submitted successfully' };
              } catch (error) {
                        console.error('Error submitting form:', error);
                        return { success: false, message: 'Error submitting form' };
              }
      },
};

export default googleSheetClient;
