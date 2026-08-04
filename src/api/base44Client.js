// Google Apps Script Client for Form Submissions
// Posts form data to Google Sheet via Apps Script webhook

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdNlU0oBw81n74sipnHKL_4iDtS0BZAU/usercontent';

export const googleSheetClient = {
        submitForm: async (formData) => {
                  try {
                              // Send as FormData which will be properly handled by Apps Script
                    const form = new FormData();
                              Object.keys(formData).forEach(key => {
                                            form.append(key, formData[key] || '');
                              });

                    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                                  method: 'POST',
                                  mode: 'no-cors',
                                  body: form
                    });

                    return { success: true, message: 'Form submitted successfully' };
                  } catch (error) {
                              console.error('Error submitting form:', error);
                              return { success: false, message: 'Error submitting form' };
                  }
        },
};

export default googleSheetClient;
