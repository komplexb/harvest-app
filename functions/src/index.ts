import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp({
  databaseURL: 'https://harvest-app-433c9-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

const TABLE_NAME = 'familySizes';

interface FamilyData {
  guid: string;  // Can be either a guid or email address
  familySize: number;
}

export const jotformWebhook = functions.https.onRequest(async (request, response) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    console.log('Invalid method:', request.method);
    response.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // Log the raw request
    console.log('Headers:', request.headers);
    console.log('Raw body:', request.rawBody?.toString());

    // Get the raw data as a string and parse it
    const rawData = request.rawBody?.toString() || '';
    const formData = new URLSearchParams(rawData);

    // Extract email and familySize from the form data
    const email = formData.get('email') || '';
    const familySize = parseInt(formData.get('familySize') || '0', 10);

    console.log('Extracted data:', { email, familySize });

    // Validate the data
    if (!email || !familySize) {
      console.log('Missing required fields:', { email, familySize });
      response.status(400).json({
        error: 'Missing required fields',
        receivedData: Object.fromEntries(formData)
      });
      return;
    }

    // Create data object with email as both the guid and database key
    const data: FamilyData = {
      guid: email,  // Store email in the guid field
      familySize: familySize
    };

    console.log('Saving data:', data);

    // Update the Realtime Database using email as the key
    await admin.database().ref(TABLE_NAME).child(email).set(data);

    console.log('Data saved successfully');
    response.status(200).send('Data updated successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    response.status(500).json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
