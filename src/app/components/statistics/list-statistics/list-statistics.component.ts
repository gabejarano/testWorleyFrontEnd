import { Component, OnInit  } from '@angular/core';
import { StatiscisService } from 'src/app/services/statistics/statiscis.service';

@Component({
  selector: 'app-list-statistics',
  templateUrl: './list-statistics.component.html',
  styleUrls: ['./list-statistics.component.css']
})
export class ListStatisticsComponent implements OnInit {

  statistics: any[] = []; // Arreglo para almacenar las estadísticas
  filter1: string | undefined = undefined;
  filter2: string | undefined = undefined;
  filter3: string | undefined = undefined;
  filter4: number | undefined = undefined;

  constructor(private statisticsService: StatiscisService) { }

  ngOnInit(): void {
    this.getStatistics(); // Al iniciar, cargar las estadísticas
  }

  getStatistics(): void {
    let query = {
      filtro1:this.filter1,
      filtro2:this.filter2,
      filtro3:this.filter3,
      filtro4:this.filter4,
    }
    this.statisticsService.getStatistics(query)
      .subscribe((data: any[]) => {
        this.statistics = data;
      });
  }

  applyFilters(): void {
    this.getStatistics(); // Llamar de nuevo al servicio al aplicar los filtros
  }

}
