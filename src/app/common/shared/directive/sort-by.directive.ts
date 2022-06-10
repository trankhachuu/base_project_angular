import { SortDirective } from './sort.directive';
import { Subject, takeUntil } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Directive, AfterContentInit, OnDestroy, Input, ContentChild, Host, HostListener } from '@angular/core';
import { faSort, faSortDown, faSortUp, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Directive({
  selector: '[appSortBy]'
})
export class SortByDirective<T> implements AfterContentInit, OnDestroy {
  @Input() sortBy?: T;

  @ContentChild(FaIconComponent, { static: true })
  iconComponent?: FaIconComponent;

  sortIcon = faSort;
  sortAscIcon = faSortUp;
  sortDescIcon = faSortDown;

  private readonly destroy$ = new Subject<void>();

  constructor(@Host() private sort: SortDirective<T>) {
    sort.predicateChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateIconDefinition());
    sort.ascendingChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.updateIconDefinition());
  }

  @HostListener('click')
  onClick(): void {
    this.sort.sort(this.sortBy);
  }

  ngAfterContentInit(): void {
    this.updateIconDefinition();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateIconDefinition(): void {
    if (this.iconComponent) {
      let icon: IconDefinition = this.sortIcon;
      if (this.sort.predicate === this.sortBy) {
        icon = this.sort.ascending ? this.sortAscIcon : this.sortDescIcon;
      }
      this.iconComponent.icon = icon.iconName;
      this.iconComponent.render();
    }
  }
}