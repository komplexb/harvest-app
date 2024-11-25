import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { encodeEmail } from './utils';

// Initialize Firebase Admin
admin.initializeApp({
  databaseURL: 'https://harvest-app-433c9-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

const TABLE_NAME = 'familySizes';

interface FamilyData {
  guid: string;  // Can be either a guid or email address
  familySize: number;
}

function parseFormData(data: string): { email: string; familySize: number } {
  // Parse data in format "Email:email@example.com, Family size:2"
  const emailMatch = data.match(/Email:([^,]+)/);
  const familySizeMatch = data.match(/Family size:(\d+)/);

  return {
    email: emailMatch ? emailMatch[1].trim() : '',
    familySize: familySizeMatch ? parseInt(familySizeMatch[1], 10) : 0
  };
}

export const jotformWebhook = functions.https.onRequest(async (request, response) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    console.log('Invalid method:', request.method);
    response.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // Get the raw data as a string
    const rawData = request.rawBody?.toString() || '';
    console.log('Raw data:', rawData);

    // Parse the form data
    const { email, familySize } = parseFormData(rawData);
    console.log('Extracted data:', { email, familySize });

    // Validate the data
    if (!email || !familySize) {
      console.log('Missing required fields:', { email, familySize });
      response.status(400).json({
        error: 'Missing required fields',
        receivedData: rawData
      });
      return;
    }

    // Create data object with email as both the guid and database key
    const data: FamilyData = {
      guid: email,  // Store email in the guid field
      familySize: familySize
    };

    console.log('Saving data:', data);

    // the set() method will create a new record if the email key doesn't exist,
    // or update the existing record if the email key already exists in the database
    await admin.database().ref(TABLE_NAME).child(encodeEmail(email)).set(data);

    response.status(200).send('Data updated successfully');
  } catch (error) {
    console.error('Error processing webhook:', error);
    response.status(500).json({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});
