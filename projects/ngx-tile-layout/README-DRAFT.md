# Angular Tile Layout Component

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.0.

`NgxTileLayoutComponent` est une bibliothèque Angular légère qui fournit un **layout type "masonry"** (grille avec colonnes ajustables) pour afficher des éléments avec un espacement flexible et un rendu dynamique.

## Fonctionnalités

- Organisation automatique des éléments en colonnes avec gestion de la hauteur.
- Ajustement dynamique en fonction du redimensionnement de la fenêtre.
- Prise en charge des **gabarits personnalisés** via Angular `TemplateRef`.
- Paramètres configurables : nombre de colonnes, espacement entre les colonnes (gutter).

---

## Installation

```bash
npm install ngx-tile-layout
```

---

## Utilisation

Ajoutez le composant à votre module Angular :

```typescript
import { TileLayoutModule } from 'ngx-tile-layout';

@NgModule({
  declarations: [],
  imports: [TileLayoutModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Exemple de Base

Dans le fichier **HTML** :

```html
<ngx-tile-layout
  [columnCount]="3" 
  [gutter]="15" 
  [items]="items" 
  [itemTemplate]="itemTemplate">
  <ng-template #itemTemplate let-item let-index="index">
    <div class="tile-item">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </ng-template>
</ngx-tile-layout>
```

Dans le fichier **TypeScript** du composant parent :

```typescript
export class AppComponent {
  items = [
    { id: '1', title: 'Tile 1', description: 'Description for tile 1' },
    { id: '2', title: 'Tile 2', description: 'Description for tile 2' },
    { id: '3', title: 'Tile 3', description: 'Description for tile 3' },
    // Ajoutez d'autres éléments ici
  ];
}
```

Ajoutez un peu de **CSS** pour le style :

```css
.tile-item  {
  background-color: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.9s ease;
}
```

---

## API

### Input Properties

| Propriété         | Type                 | Par défaut | Description                                   |
|--------------------|----------------------|------------|-----------------------------------------------|
| `columnCount`      | `number`            | `3`        | Nombre de colonnes dans la grille.            |
| `gutter`           | `number`            | `10`       | Espacement entre les colonnes, en pixels.     |
| `items`            | `any[]`             | `[]`       | Liste des éléments à afficher dans la grille. |
| `itemTemplate`     | `TemplateRef<any>`  | `null`     | Gabarit personnalisé pour les éléments.       |

### Méthodes

| Méthode                     | Description                                                   |
|-----------------------------|---------------------------------------------------------------|
| `debounceRecalculateLayout` | Recalcule la disposition avec un délai configuré (300 ms).    |

### Events

Ce composant n'émet pas d'événements. Le contrôle passe via les entrées et le modèle parent.

---

## Personnalisation

- **Espacement entre les colonnes :** Ajustez le paramètre `gutter` pour augmenter ou diminuer l'espacement.
- **Nombre de colonnes :** Modifiez `columnCount` pour adapter la disposition à différentes résolutions d'écran.
- **Gabarit :** Utilisez `itemTemplate` pour définir un rendu personnalisé des éléments.
---
