import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection, DataSource } from 'typeorm';


global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (error) {
    console.log(error);
  }
});

// global.afterEach(async () => {
//   const conn = getConnection();
//   await conn.close();
// });
