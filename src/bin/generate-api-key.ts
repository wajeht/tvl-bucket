#!/usr/bin/env node

import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import db from '../database/db';

(async () => {
  try {
    const APIKey = crypto.randomUUID();

    const hashedApiKey = await bcrypt.hash(APIKey, 10);
    if (!hashedApiKey) throw new Error('Something went wrong while hashing your API key!');

    const storeApiKey = await db
      .insert({ key: APIKey, hashed_key: hashedApiKey })
      .into('api_key')
      .returning('*');

    if (!storeApiKey.length) throw new Error('Something went wrong while storing your API key!');

    console.log({ 'X-API-KEY': APIKey });
    process.exit(1);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
