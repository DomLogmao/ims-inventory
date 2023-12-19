import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import PouchDB from 'pouchdb';
import { Products } from '../../model/products.model';
@Injectable({
  providedIn: 'root',
})
export class PouchDBService {
  dbName = environment.pouchdb;
  pouch: any;
  db = new PouchDB(this.dbName);
  constructor() {}

  createDB() {
    this.pouch = new PouchDB(this.dbName, {
      // PouchDB doesn't overwrite data - it creates revisions (like Git).
      // For the purposes of this app, however, we don't need those revisions
      // to stay around, taking up storage space. By enabling auto_compaction,
      // PouchDB will only keep the most current revision in storage.
      auto_compaction: true,
    });
  }

  async addDB(data: any, name?: string) {
    try {
      await this.db.put(data);
    } catch (err) {
      console.log(err);
    }
  }

   fetchDB(name: string) {
    return new Promise(resolve => {
      this.db.get(name).then(function (doc) {
        resolve(doc);
      })
    }).catch((error) => {
      console.log(error);
    });
  }

  async updateDB(name: string, data: any) {
    try {
      var doc = await this.db.get(name);
      if (doc) {
        var response = await this.db.put({
          _id: name,
          _rev: doc._rev,
          data
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteDB() {
    this.db
      .destroy()
      .then(function (response) {
        // success
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
