import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {LocalStorageBackupService} from '../../services/local-storage-backup-service.service';

@Component({
  selector: 'app-local-storage-manager',
  templateUrl: './local-storage-manager.component.html',
  styleUrls: ['./local-storage-manager.component.scss']
})
export class LocalStorageManagerComponent {

  constructor(
    private localStorageBackupService: LocalStorageBackupService,
    private snackBar: MatSnackBar
  ) {}

  onBackup(): void {
    this.localStorageBackupService.backupLocalStorage();
    this.snackBar.open('Sauvegarde effectuée avec succès !', 'Fermer', { duration: 3000 });
  }

  onRestore(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.localStorageBackupService.restoreLocalStorage(file)
        .then(() => {
          const snackBarRef = this.snackBar.open('Restauration réussie !', 'Rafraîchir', { duration: 5000 });

          snackBarRef.onAction().subscribe(() => {
            window.location.reload();
          });
        })
        .catch(err => this.snackBar.open(`Erreur : ${err}`, 'Fermer', { duration: 4000 }));
    }
  }


  // Méthode pour simuler un clic sur l'input file
  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
}
