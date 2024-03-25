import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private indexedDB: IDBFactory = window.indexedDB;
  private dbName: string = 'MyDatabase';
  private dbVersion: number = 1;
  private storeName: string = 'Users';

  constructor() {}

  // Open or create the IndexedDB database
  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = this.indexedDB.open(this.dbName, this.dbVersion);
      request.onerror = (event) => {
        reject('Error opening IndexedDB database');
      };
      request.onsuccess = (event) => {
        resolve(request.result as IDBDatabase);
      };
      request.onupgradeneeded = (event) => {
        const db: IDBDatabase = (event.target as any).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, {
            keyPath: 'id',
            autoIncrement: true,
          });
        }
      };
    });
  }

  // Add a user to the IndexedDB store
  addUser(user: any): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDatabase();
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);
        const request = store.add(user);
        request.onsuccess = (event) => {
          resolve();
        };
        request.onerror = (event) => {
          reject('Error adding user to IndexedDB');
        };
      } catch (error) {
        reject('Error adding user to IndexedDB');
      }
    });
  }

  // Get all users from the IndexedDB store
  getAllUsers(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await this.openDatabase();
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);
        const request = store.getAll();
        request.onsuccess = (event) => {
          resolve(request.result);
        };
        request.onerror = (event) => {
          reject('Error getting users from IndexedDB');
        };
      } catch (error) {
        reject('Error getting users from IndexedDB');
      }
    });
  }

  // Other methods for updating, deleting users, etc.
}
