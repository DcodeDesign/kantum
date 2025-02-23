import { Component, ViewChild, AfterViewInit } from '@angular/core';
import * as Papa from 'papaparse';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-budget-manager',
  templateUrl: './budget-manager.component.html',
  styleUrls: ['./budget-manager.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BudgetManagerComponent implements AfterViewInit {
  csvData: any[] = [];
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>(); // Source de données pour la table

  resultsLength = 0;
  isLoadingResults = false;

  excludedAccounts: string[] = ["BE43 0836 3211 9701", "BE06 0836 7858 4822", "5545 0539 3070 7476"];

  startDate: string | null = null;
  endDate: string | null = null;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable) table: MatTable<any> | undefined;

  expandedElement: any | null;
  excludedColumns: string[] = [];
  columnsToDisplayWithExpand: string[] = [];
  totals: { totalEntrees: number; totalSorties: number; totalGeneral: number; } | undefined;
  selectedFilter: 'positif' | 'négatif' | 'reset' = 'reset'; // Valeur par défaut
  pageSize = 10;
  startIndex: number | undefined;
  endIndex: number | undefined;


  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.parseCSV(file);
    }
  }

  parseCSV(file: File): void {
    this.isLoadingResults = true;

    Papa.parse(file, {
      complete: (result) => {
        this.csvData = result.data.map((row: any) => {
          // Vérifier si "Montant" est défini et est une chaîne, puis remplacer la virgule par un point
          const montant = row["Montant"];
          if (montant != null) {
            row["Montant"] = typeof montant === 'string'
              ? parseFloat(montant.replace(',', '.'))
              : Number(montant);

            // Vérifier si la conversion a échoué, et si oui, définir la valeur sur NaN ou laisser la valeur initiale
            if (isNaN(row["Montant"])) {
              row["Montant"] = NaN; // ou 0, selon le comportement souhaité
            }
          }
          return row;
        });

        this.totals = this.getTotals();

        this.extractColumns(this.csvData);

        this.dataSource.data = this.csvData;
        this.resultsLength = this.csvData.length;

        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          this.paginator.length = this.resultsLength;
        }

        if (this.sort) {
          this.dataSource.sort = this.sort;
        }

        this.dataSource.sortingDataAccessor = (data, header) => data[header];

        // this.table?.renderRows();

        this.isLoadingResults = false;
      },
      header: true,
      skipEmptyLines: true,
      encoding: "ISO-8859-1",
      dynamicTyping: true
    });
  }

  extractColumns(data: any[]): void {
    /*
      "Compte",
      "Date de comptabilisation",
      "Numéro de transaction",
      "Compte contrepartie",
      "Nom contrepartie contient",
      "Rue et numéro",
      "Code postal et localité",
      "Transaction",
      "Date valeur",
      "Montant",
      "BIC",
      "Code pays",
      "Communications"
   */

    if (data && data.length > 0) {
     this.excludedColumns = [
        "Date de comptabilisation",
        "Numéro d'extrait",
        "Numéro de transaction",
        "Code postal et localité",
        "Transaction",
        "Devise",
        "BIC",
        "Code pays",
        "Communications"
      ];

      this.displayedColumns = Object.keys(data[0]).filter(col => !this.excludedColumns.includes(col));
      this.columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    }
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;

      this.dataSource.paginator = this.paginator;
      this.paginator.length = this.resultsLength;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    /*this.sort?.sortChange.subscribe(() => {
      console.log(this.pageSize)
      this.applySort();

      this.paginator!.pageIndex = 0;
      this.paginator!.pageSize = this.pageSize;
      this.paginator!.pageSize = this.pageSize;
      this.table?.renderRows();
    });*/
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    this.dataSource.data = this.csvData.slice(this.startIndex, this.endIndex);
  }

  applySort(): void {
    if (this.sort && this.sort.active && this.sort.direction !== '') {
      const sortedData = [...this.csvData].sort((a, b) => {
        const valueA = a[this.sort!.active];
        const valueB = b[this.sort!.active];

        if (valueA instanceof Date && valueB instanceof Date) {
          return this.sort!.direction === 'asc'
            ? valueA.getTime() - valueB.getTime()
            : valueB.getTime() - valueA.getTime();
        }

        // Si les valeurs sont des nombres, les comparer directement
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return this.sort!.direction === 'asc'
            ? valueA - valueB
            : valueB - valueA;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return this.sort!.direction === 'asc'
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        // Si les valeurs sont d'un autre type, on les convertit en chaînes avant de comparer
        return this.sort!.direction === 'asc'
          ? String(valueA).localeCompare(String(valueB))
          : String(valueB).localeCompare(String(valueA));
      });

      this.dataSource.data = sortedData;
    }
  }

  getTotals(): { totalEntrees: number; totalSorties: number; totalGeneral: number } {
    if (!this.csvData || this.csvData.length === 0) {
      return { totalEntrees: 0, totalSorties: 0, totalGeneral: 0 };
    }

    const excludedAccounts: string[] = this.excludedAccounts;
    let totalEntrees = 0;
    let totalSorties = 0;

    this.csvData.forEach(row => {
      const montantStr = row["Montant"];
      const compte = row["Compte"];
      const compteContrepartie = row["Compte contrepartie"];
      const montant = parseFloat(montantStr);

      if (isNaN(montant) || excludedAccounts.includes(compte) || excludedAccounts.includes(compteContrepartie)) {
        return; // 🔴 Ignore si montant invalide ou si compte exclu
      }

      if (montant > 0) {
        totalEntrees += montant;
      } else if (montant < 0) {
        totalSorties += Math.abs(montant);
      }
    });

    totalSorties = -totalSorties;

    return {
      totalEntrees,
      totalSorties,
      totalGeneral: totalEntrees + totalSorties
    };
  }

  filterByMontant(type: 'positif' | 'négatif'): void {
    if (!this.csvData || this.csvData.length === 0) {
      return;
    }

    this.dataSource.data = this.csvData.filter(row => {
      const montant = parseFloat(row["Montant"]);
      if (isNaN(montant)) {
        return false;
      }
      return type === 'positif' ? montant > 0 : montant < 0;
    });

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  resetFilter(): void {
    this.dataSource.data = this.csvData;  // Réinitialiser les données pour ne pas appliquer de filtre
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  onFilterChange(): void {
    if (this.selectedFilter === 'positif') {
      this.filterByMontant('positif');
    } else if (this.selectedFilter === 'négatif') {
      this.filterByMontant('négatif');
    } else {
      this.resetFilter();
    }
  }

  // Convertir une date au format 'DD-MM-YY' en objet Date
  convertToDateObject(dateStr: string | Date): Date {
    let day, month, year;

    if (dateStr instanceof Date) {

      return dateStr;
    } else if (typeof dateStr === 'string') {
      // Si c'est une chaîne, on la divise en jour, mois, année
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        [day, month, year] = parts;
      }
    }

    // Vérifier que la date est bien dans le format attendu
    if (!day || !month || !year) {
      console.error(`Invalid date format: ${dateStr}`);
      return new Date(dateStr);
    }

    const fullYear = `20${year}`;  // Ajouter le siècle pour obtenir l'année complète
    return new Date(`${fullYear}-${month}-${day}`);
  }


  filterByDateRange(): void {
    if (!this.startDate || !this.endDate) {
      this.dataSource.data = this.csvData;  // Si pas de date de début ou de fin, on montre toutes les données
      return;
    }

    const start = this.convertToDateObject(this.startDate);
    const end = this.convertToDateObject(this.endDate);

    this.dataSource.data = this.csvData.filter(row => {
      const dateValeur = row['Date Valeur'];  // Assurez-vous que la clé correspond à celle de votre colonne
      const rowDate = this.convertToDateObject(dateValeur);

      return rowDate >= start && rowDate <= end;
    });
    this.table?.renderRows();
  }

}
