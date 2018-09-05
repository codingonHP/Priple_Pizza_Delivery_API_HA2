import fs from 'fs';

export class File {
  static readFileAsyc(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {

      fs.readFile(path, (err, buffer: Buffer) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            const fileContent = buffer.toString('utf-8');
            resolve(fileContent);
          } catch (e) {
            reject(e);
          }
        });
    });
  }
}
