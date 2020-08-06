import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats.service';
import { Stats } from 'src/app/models/stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {

  currentStats: Stats = { openOrders: 0, customers: 0, totalOrdersMade: 0, totalSlushiesMade: 0, customerSatisfaction: 0 };

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    // Initial stats
    this.statsService.getStats()
    .subscribe(stats => {
      this.currentStats = stats;
    });

    // Real time stats
    this.statsService.statsChanged$
    .subscribe((stats: Stats): void => {
      this.currentStats = stats;
    });
  }

}
