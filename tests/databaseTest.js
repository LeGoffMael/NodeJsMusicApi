import MongoMemoryServer from 'mongodb-memory-server';
import Database from '../src/database/database';

export default class DatabaseTest {
    constructor() {
      this.db = null;
      this.server = new MongoMemoryServer();
    }
  
    async start() {
      const url = await this.server.getConnectionString();
      this.db = new Database(url);
    }
  
    async stop() {
      await this.db.close();
    }
  }