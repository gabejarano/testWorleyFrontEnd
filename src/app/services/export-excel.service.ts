import { Injectable } from '@angular/core';

// @ts-ignore
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const EXCEL_EXTENSION = ".xlsx"

@Injectable({
  providedIn: 'root'
})
export class ExportexcelService {

  constructor() { }

  public addSheet(
    reportHeading: string,
    reportSubHeading: string,
    footerData: any,
    sheetName: string,
    headersArray: any[],
    json: any[],
    workbook: Workbook
  ) {
    const header = headersArray;
    const data = json;
    const worksheet = workbook.addWorksheet(sheetName);
    //Añade el titulo
    worksheet.addRow([])
    worksheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
    worksheet.getCell('A1').value = reportHeading;
    worksheet.getCell('A1').alignment = { horizontal: 'center' };
    worksheet.getCell('A1').font = { size: 15, bold: true }
    if (reportSubHeading !== '') {
      worksheet.addRow([])
      worksheet.mergeCells('A2:' + this.numToAlpha(header.length - 1) + '2');
      worksheet.getCell('A2').value = reportSubHeading;
      worksheet.getCell('A2').alignment = { horizontal: 'center' };
      worksheet.getCell('A2').font = { size: 12, bold: false }
    }
    //Añade los titulos de las columnas
    worksheet.addRow([])
    const headerRow = worksheet.addRow(header);
    headerRow.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '1E334E' },
        bgColor: { argb: '1E334E' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      cell.font = { size: 12, color: { argb: 'FFFFFF' }, };
      cell.alignment = { vertical: 'distributed' }
      //worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
      worksheet.getColumn(index).width = 20;
    });
    //Obtiene las columnas de la data
    let columnsArray: any[];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        columnsArray = Object.keys(json[key])
      }
    }
    data.forEach((element: any) => {
      const eachRow: any[] = [];
      columnsArray.forEach((column) => {
        eachRow.push(element[column]);
      })
      if (element.isDeleted === 'Y') {
        const deletedRow = worksheet.addRow(eachRow);
        deletedRow.eachCell((cell) => {
          cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: false }
        })
      } else {
        const row = worksheet.addRow(eachRow);
      }
    })
    worksheet.addRow([]);
    if (footerData != null) {
      footerData.forEach((element: any) => {
        const eachRow: any = [];
        element.forEach((val: any) => {
          eachRow.push(val)
        })
        const footerRow = worksheet.addRow(eachRow);
        footerRow.eachCell((cell) => {
          cell.font = { bold: true }
        })
      })
    }
  }


  public createBookExcel(): Workbook {
    //Crea el archivo y la hoja de excel
    const workbook = new Workbook();
    workbook.creator = 'Innovacion Telematica',
      workbook.lastModifiedBy = 'Innovacion Telematica',
      workbook.created = new Date();
    workbook.modified = new Date();
    return workbook;
  }

  public exportExcel(workbook: Workbook, excelFileName: string) {
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      fs.saveAs(blob, excelFileName + EXCEL_EXTENSION)
    })
  }

  private numToAlpha(num: number) {
    let alpha = '';
    for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
      alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
    }
    return alpha;
  }

  public createBookExcel2(creator:string,lastModifiedBy:string): Workbook {
    //Crea el archivo y la hoja de excel
    const workbook = new Workbook();
    workbook.creator = creator,
    workbook.lastModifiedBy = lastModifiedBy,
    workbook.created = new Date();
    workbook.modified = new Date();
    return workbook;
  }


}
