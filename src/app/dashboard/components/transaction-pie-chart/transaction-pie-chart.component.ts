import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartComponent} from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTheme,
  ApexDataLabels,
  ApexFill,
  ApexPlotOptions
} from 'ng-apexcharts';
import {TransactionService} from "../../../shared/services/transaction.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {TransactionTotalModel} from "../../../shared/models/transaction-total.model";
import {TranslocoService} from "@ngneat/transloco";
import {CurrencyFormatPipe} from "../../../shared/pipes/currency-format.pipe";

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
}

@Component({
  selector: 'app-transaction-pie-chart',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './transaction-pie-chart.component.html',
  styles: []
})
export class TransactionPieChartComponent implements OnInit,OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>()
  @Input() transactionTotals$: BehaviorSubject<TransactionTotalModel[]> = new BehaviorSubject<TransactionTotalModel[]>([])

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(
    private currencyFormatPipe: CurrencyFormatPipe,
    private transactionService: TransactionService,
    private translocoService: TranslocoService) {
    this.chartOptions = {
      series: [],
      chart: {
        width: '100%',
        type: 'donut'
      },
      labels: [],
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return `${name.slice(0,10)} -
          ${typeof val === "number" ? val.toFixed(1) : ''}%`;
        },
        style: {
          fontSize: '11px',
          fontWeight: 'bold',
          colors: ['rgb(82,13,13)']
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              total: {
                show: true,
                label: '',
                formatter: () => {
                  const total = this.chartOptions.series.reduce((a, b) => a + b, 0);
                  return this.currencyFormatPipe.transform(total,true)
                }
              }
            }
          }
        }
      },
      fill: {
        type: "gradient"
      },
      responsive: [
        {
          breakpoint: 800,
          options: {
            chart: {
              width: 400,
              height:350
            },
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.transactionTotals$.pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      const labels = value.map((item: { category_name: string }) => item.category_name);
      const series = value.map((item: { total: number }) => item.total);

      this.translocoService.selectTranslateObject(labels).subscribe(translations => {
        this.chartOptions = {
          ...this.chartOptions,
          labels: translations,
          series: series
        };
        if (this.chart) {
          this.chart.updateOptions(this.chartOptions);
        }
      });
    });
  }
  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
