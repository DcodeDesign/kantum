import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageBackupService {

  constructor() {}

  /**
   * Sauvegarde tout le localStorage sous forme d'un fichier JSON téléchargeable.
   */
  backupLocalStorage(): void {
    const data = JSON.stringify(localStorage);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `localStorage-backup-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Restaure une sauvegarde du localStorage à partir d'un fichier JSON.
   * @param file Fichier contenant les données JSON du localStorage
   * @returns Promise<void>
   */
  restoreLocalStorage(file: File): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const result = event.target?.result as string;
          const parsedData = JSON.parse(result);

          if (typeof parsedData === 'object' && parsedData !== null) {
            localStorage.clear();
            Object.keys(parsedData).forEach(key => {
              localStorage.setItem(key, parsedData[key]);
            });
            resolve();
          } else {
            reject('Fichier JSON invalide.');
          }
        } catch (error) {
          reject('Erreur lors de la lecture du fichier.');
        }
      };

      reader.onerror = () => reject('Erreur de lecture du fichier.');
      reader.readAsText(file);
    });
  }
}
