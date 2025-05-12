import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { EarningsService, Earning } from '../../services/earnings.service';
import { map } from 'rxjs/operators';

// Import CoreUI components
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  CardFooterComponent,
  ProgressComponent,
  ProgressBarComponent,
  TextColorDirective,
  GutterDirective // Import GutterDirective
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';

// Import Custom Widget Components (Update paths if necessary)
import { WidgetsDropdownComponent } from '../widgets/widgets-dropdown/widgets-dropdown.component';
import { WidgetsBrandComponent } from '../widgets/widgets-brand/widgets-brand.component';

import { DashboardChartsData, IChartProps } from './dashboard-charts-data';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardFooterComponent,
    ProgressComponent,
    ProgressBarComponent,
    ChartjsComponent,
    WidgetsDropdownComponent,
    WidgetsBrandComponent,
    TextColorDirective,
    GutterDirective // Add GutterDirective here
  ]
})
export class DashboardComponent implements OnInit {
  private earningsService = inject(EarningsService);
  chartsData: DashboardChartsData;
  public uniqueUserCount: number = 0;

  public users: IUser[] = [
     { name: 'Yiorgos Avraamu', state: 'New', registered: 'Jan 1, 2023', country: 'Us', usage: 50, period: 'Jun 11, 2023 - Jul 10, 2023', payment: 'Mastercard', activity: '10 sec ago', avatar: './assets/images/avatars/1.jpg', status: 'success', color: 'success' },
     { name: 'Avram Tarasios', state: 'Recurring', registered: 'Jan 1, 2023', country: 'Br', usage: 10, period: 'Jun 11, 2023 - Jul 10, 2023', payment: 'Visa', activity: '5 minutes ago', avatar: './assets/images/avatars/2.jpg', status: 'danger', color: 'danger' },
     { name: 'Quintin Roup', state: 'New', registered: 'Jan 1, 2023', country: 'In', usage: 74, period: 'Jun 11, 2023 - Jul 10, 2023', payment: 'Stripe', activity: '1 hour ago', avatar: './assets/images/avatars/3.jpg', status: 'warning', color: 'warning' },
     { name: 'Enéas Kwadwo', state: 'Sleep', registered: 'Jan 1, 2023', country: 'Fr', usage: 98, period: 'Jun 11, 2023 - Jul 10, 2023', payment: 'Paypal', activity: 'Last month', avatar: './assets/images/avatars/4.jpg', status: 'secondary', color: 'secondary' },
     { name: 'Agapetus Tadeáš', state: 'New', registered: 'Jan 1, 2023', country: 'Es', usage: 22, period: 'Jun 11, 2023 - Jul 10, 2023', payment: 'ApplePay', activity: 'Last week', avatar: './assets/images/avatars/5.jpg', status: 'success', color: 'success' },
     { name: 'Friderik Dávid', state: 'New', registered: 'Jan 1, 2023', country: 'Pl', usage: 43, period: 'Jun 11, 2023 - Jul 10, 2023', payment: 'Amex', activity: 'Yesterday', avatar: './assets/images/avatars/6.jpg', status: 'info', color: 'info' }
  ];

  public mainChart!: IChartProps;
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  constructor(chartsData: DashboardChartsData) {
    this.chartsData = chartsData;
  }

  ngOnInit(): void {
    this.initCharts();
    this.fetchUniqueUserCount();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }

  fetchUniqueUserCount(): void {
    this.earningsService.getAllEarningsAcrossGuilds().pipe(
      map((allEarnings: Earning[]) => {
        if (!Array.isArray(allEarnings)) {
            console.error("Expected an array of all earnings, received:", allEarnings);
            return 0;
        }
        const userMentions = allEarnings
            .map(e => e.user_mention)
            .filter(mention => mention != null);

        const uniqueUserMentions = new Set(userMentions);
        return uniqueUserMentions.size;
      })
    ).subscribe({
        next: (count: number) => {
            this.uniqueUserCount = count;
            console.log('Unique user count across all guilds:', this.uniqueUserCount);
        },
        error: (err: any) => {
            console.error('Error fetching earnings across guilds for unique user count:', err);
            this.uniqueUserCount = 0;
        }
    });
  }

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      this.mainChart['chart'] = $chartRef;
    }
  }

  handleChartDatasetAtEvent(event: any) {
    console.log(event);
  }

  handleChartElementAtEvent(event: any) {
    console.log(event);
  }

  handleChartElementsAtEvent(event: any) {
    console.log(event);
  }

  get chartBarData() {
      return {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  label: 'Sample Data',
                  backgroundColor: '#f87979',
                  data: [40, 20, 12, 39, 10, 40, 39]
              }
          ]
      };
  }
}
