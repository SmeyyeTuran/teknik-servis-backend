import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

function getServiceAccount() {
  // Render/Prod: Base64 env
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64 && b64.trim()) {
    const jsonText = Buffer.from(b64, 'base64').toString('utf8');
    return JSON.parse(jsonText);
  }

  // Optional: plain JSON env
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (raw && raw.trim()) {
    return JSON.parse(raw);
  }

  // Local dev fallback: file
  const localPath = 'firebase-service-account.json';
  if (fs.existsSync(localPath)) {
    return JSON.parse(fs.readFileSync(localPath, 'utf8'));
  }

  throw new Error(
    'Firebase service account not found. Set FIREBASE_SERVICE_ACCOUNT_B64 or FIREBASE_SERVICE_ACCOUNT_JSON, or provide firebase-service-account.json locally.',
  );
}

const serviceAccount = getServiceAccount();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

@Injectable()
export class FirebaseService {
  public admin = admin;
}

export default admin;
