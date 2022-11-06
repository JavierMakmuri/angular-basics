import { Component, OnInit, AfterContentInit, ContentChildren, QueryList, Input } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent implements OnInit, AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    const activeTabs = this.tabs?.filter(x => x.active)

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs!.first)
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs?.forEach(tab => tab.active = false)

    tab.active = true

    // returning false will make angular prevent the default behaviour
    return false
  }
}