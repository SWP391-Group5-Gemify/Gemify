import { Component } from '@angular/core';
import { GoldModel } from '../../../../core/models/gold.model';
import { GoldService } from '../../../../core/services/gold/gold.service';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { map } from 'rxjs';
import { PaginationModel } from '../../../../core/models/pagination.model';


@Component({
  selector: 'app-gold-bid-ask',
  standalone: true,
  imports: [],
  templateUrl: './gold-bid-ask.component.html',
  styleUrl: './gold-bid-ask.component.scss',
})
export class GoldBidAskComponent {
  goldTypes: GoldModel[] = [];
  goldsDropdown!: DropdownModel[];
  

  constructor(private goldService: GoldService) {}


  /**
   * Load GoldTypes
   * - Map response with page field
   * - Return the Observable<GoldModel[]>
   */
  public loadGoldsDropdown() {
    this.goldService.getAllGolds().subscribe({
      next: (response: PaginationModel<GoldModel>) => {
        this.goldsDropdown = response.data.map((gold) => ({
          value: gold.id,
          name: gold.name,
        }));
      },

      error(err) {
        console.error(err);
      },
    });
  }
  
}
