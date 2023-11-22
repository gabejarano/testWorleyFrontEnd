import { Component, OnInit  } from '@angular/core';
import { ExportexcelService } from 'src/app/services/export-excel.service';
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

  /*name of the excel-file which will be downloaded. */
  fileName = 'statistics.xlsx';

  constructor(private statisticsService: StatiscisService, private excelservice: ExportexcelService) { }

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


  exportexcel(): void {
    var workbook = this.excelservice.createBookExcel();
    var header = [
      'id',
      'Filtro1',
      'Filtro2',
      'Filtro3',
      'Filtro4',
    ]
    let statiscisExcel: any[] =  [];
    this.statistics.forEach((statistic)=>{
      let statiticJSON = {
        'id': statistic.id,
        'Filtro1': statistic.filtro1,
        'Filtro2': statistic.filtro2,
        'Filtro3': statistic.filtro3,
        'Filtro4': statistic.filtro4,
      }
      statiscisExcel.push(statiticJSON)
    })
    this.excelservice.addSheet('Statiscits', 'Exportar Statiscits', null, 'registros', header, statiscisExcel, workbook);
    this.excelservice.exportExcel(workbook, `Statistics`)
  }

}
