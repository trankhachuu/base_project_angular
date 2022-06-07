import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * This base class provides functionality to derived component class to allow for automatically
 * unsubscribe from subscribed observable with the following pipe:`.pipe(takeUntil(this.destroy$))`
 */
// TODO: Add Angular decorator.
@Directive()
export abstract class BaseDestroyableDirective implements OnDestroy {
  private destroySource = new Subject();
  protected destroy$ = this.destroySource.asObservable();
  
  public ngOnDestroy(): void {
    this.destroySource.next('');
    this.destroySource.complete();
  }
}
