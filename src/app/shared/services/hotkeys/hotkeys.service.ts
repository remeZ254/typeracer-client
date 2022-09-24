import { Injectable, OnDestroy } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

export interface Hotkey {
  name: string;
  action: () => void;
  key: string;
  altKey?: boolean;
  ctrlKey?: boolean;
}

@Injectable()
export class HotkeysService implements OnDestroy {
  private readonly hotkeys: Hotkey[] = [];
  private readonly onDestroy$: Subject<void>;

  constructor() {
    this.onDestroy$ = new Subject<void>();
    this.listenToKeyEvents();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }

  addHotkey(hotkey: Hotkey) {
    this.hotkeys.push(hotkey);
  }

  private listenToKeyEvents() {
    merge(this.keyDowns$(), this.keyUps$())
      .pipe(
        distinctUntilChanged(
          (prev: KeyboardEvent, curr: KeyboardEvent) =>
            prev.code === curr.code && prev.type === curr.type
        ),
        map((event: KeyboardEvent) =>
          this.hotkeys.find((hotkey: Hotkey) => {
            const sameKey = hotkey.key.toUpperCase() === event.key.toUpperCase();
            const alt = hotkey.altKey ? event.altKey : true;
            const ctrl = hotkey.ctrlKey ? event.ctrlKey : true;

            return sameKey && alt && ctrl;
          })
        ),
        filter((hotkey: Hotkey) => !!hotkey),
        takeUntil(this.onDestroy$)
      )
      .subscribe((hotkey: Hotkey) => {
        hotkey.action();
      });
  }

  private keyUps$(): Observable<KeyboardEvent> {
    return fromEvent<KeyboardEvent>(document, 'keyup');
  }

  private keyDowns$(): Observable<KeyboardEvent> {
    return fromEvent<KeyboardEvent>(document, 'keydown');
  }
}
