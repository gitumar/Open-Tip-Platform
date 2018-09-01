
import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';
import { User } from './interfaces/user';
import { TipChartData } from './interfaces/tip-chart-data';
import { TipInformation } from './interfaces/tip-information';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as socketIo from 'socket.io-client';
import { TipHistoryService } from './tip-history-service.service';
import * as tipHistoryGlobal from './globals';

@Component({
  selector: 'tc-clienttip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent implements OnInit, AfterViewInit {

  tipItems: TipInformation[] = [];
  tipInfoBody: string;
  socketIOstartCon: any;
  user: User;
  dialogRef: MatDialogRef<UserPopupComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'TIP POOL INFORMATION',
    }
  };

  private socketIoVar;


  // This is the overall list container
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // These are the items within the list
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(public dialog: MatDialog, private _tipHistoryService: TipHistoryService) {
    this.socketIoVar = socketIo('http://localhost:8080');
  }

  ngOnInit(): void {
    const avatarApiNum = Math.floor(Math.random() * (1000000)) + 1;
    this.user = {
      id: avatarApiNum,
      avatar: `${'https://api.adorable.io/avatars/142'}/${avatarApiNum}.png`,
    };
    setTimeout(() => {
      this.createTipPopup(this.defaultDialogUserParams);
    }, 0);
  }

  ngAfterViewInit(): void {
    // obtaining any items in the list, or subscribing
    this.matListItems.changes.subscribe(elements => {
      this.trackEndofList();
    });
  }

  private trackEndofList(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private createTipPopup(params): void {
    this.dialogRef = this.dialog.open(UserPopupComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      this.user.pool = paramsDialog.pool;
      this.startIOconn();
      this.sendUserJoined(paramsDialog);
    });
  }

  private startIOconn(): void {

    this.socketIOstartCon = this.onTipItem()
      .subscribe((tipItem: TipInformation) => {
        this.tipItems.push(tipItem);
      });

    this.checkConnected('disconnect')
      .subscribe(() => {
      });
    this.checkConnected('connected')
      .subscribe(() => {
      });
  }

  public sendTip(tipItem: string): void {
    if (!tipItem) {
      return;
    }
    // getting comprehensive chart tip data
    let tipChartData: TipChartData;
    tipChartData = {
      time: new Date(),
      tipAmount: tipItem
    };
    // console.log(tipChartData.tipAmount);
    // console.log(tipChartData.time.getDate());


    // variable to populate tip data for charts
    tipHistoryGlobal.tipHistory.push(tipChartData);

    // message object needed here for server jsonparse accuracy
    let shareTipInfo: TipInformation;
      shareTipInfo = {
      from: this.user,
      content: tipItem
    };

    // emit tip event to server
    this.socketIoVar.emit('tipItem', shareTipInfo);
    // clear tip content in html
    this.tipInfoBody = null;
  }

  public sendUserJoined(params: any): void {
    let tipItem: TipInformation;
    tipItem = {
        from: this.user,
        joinedPool: true
      };
    // emit tip event to server
    this.socketIoVar.emit('tipItem', tipItem);
  }

  // SocketIo methods **************************************************************************************
  public onTipItem(): Observable<TipInformation> {
    return new Observable<TipInformation>(observer => {
      this.socketIoVar.on('tipItem', (data: TipInformation) => observer.next(data));
    });
  }

  public checkConnected(isConnected: String): Observable<any> {
    return new Observable<Event>(observer => {
      this.socketIoVar.on(isConnected, () => observer.next());
    });
  }

}

