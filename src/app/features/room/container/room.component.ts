import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRoom, RoomState } from '@app/core/room/reducers/room.reducer';
import { roomMock } from '@app/shared/mocks/room/room.mock';
import { Room } from '@app/shared/models/room/room.model';
import { select, Store } from '@ngrx/store';
import { first, Observable, of } from 'rxjs';

interface QuoteDisplay {
  completed: {
    inProgress: string;
    rest: string;
  };
  valid: {
    inProgress: string;
    rest: string;
  };
  invalid: {
    inProgress: string;
    rest: string;
  };
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  input: string = '';
  isInvalid: boolean = false;
  quoteDisplay: QuoteDisplay = {
    completed: { inProgress: '', rest: '' },
    valid: { inProgress: '', rest: '' },
    invalid: { inProgress: '', rest: '' },
  };
  readonly room$: Observable<Room>;
  private completedChars: string = '';
  private completedWords: string[] = [];
  private uncompletedWords: string[] = [];
  private wordIndex: number = 0;

  constructor(private route: ActivatedRoute, private store: Store<RoomState>) {
    this.room$ = this.store.pipe(select(getRoom));
    this.room$ = of(roomMock);
    this.room$.pipe(first()).subscribe(({ text: { quote } }) => {
      this.uncompletedWords = quote.split(' ');
      this.formatDisplay();
    });
  }

  onInput() {
    const correctInput = `${this.uncompletedWords[0]} `;

    if (this.input === correctInput) {
      this.wordIndex++;
      this.input = '';
      this.uncompletedWords.shift();
      this.completedWords.push(correctInput);
    }

    if (correctInput.startsWith(this.input)) {
      this.completedChars = this.input;
    }

    this.formatDisplay();
  }

  private formatDisplay() {
    this.isInvalid = !!(this.input && this.input !== this.completedChars);

    this.quoteDisplay = {
      completed: {
        inProgress: this.completedChars,
        rest: this.completedWords.join(' '),
      },
      valid: {
        inProgress: this.isInvalid
          ? this.uncompletedWords
              .join(' ')
              .slice(this.input.length, this.uncompletedWords[0].length)
          : this.uncompletedWords[0].slice(this.completedChars.length),
        rest: this.isInvalid
          ? this.uncompletedWords
              .join(' ')
              .slice(Math.max(this.uncompletedWords[0].length, this.input.length))
          : ` ${this.uncompletedWords.slice(1).join(' ')}`,
      },
      invalid: {
        inProgress: this.uncompletedWords
          .join(' ')
          .slice(
            this.completedChars.length,
            Math.min(this.uncompletedWords[0].length, this.input.length)
          ),
        rest: this.uncompletedWords
          .join(' ')
          .slice(this.uncompletedWords[0].length, this.input.length),
      },
    };
  }
}
