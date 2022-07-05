import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getRoom, RoomState } from '@app/core/room/reducers/room.reducer';
import { roomMock } from '@app/shared/mocks/room/room.mock';
import { Room } from '@app/shared/models/room/room.model';
import { select, Store } from '@ngrx/store';
import { first, Observable, of } from 'rxjs';

interface InvalidDisplay {
  invalidInProgress: string;
  inProgress: string;
  invalid: string;
  rest: string;
}

type ValidDisplay = Omit<InvalidDisplay, `invalid${string}`>;

interface CompletedDisplay {
  completed: string;
  completedInProgress: string;
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  input: string = '';
  valid: boolean = true;
  completedDisplay: CompletedDisplay = { completed: '', completedInProgress: '' };
  validDisplay: ValidDisplay = { inProgress: '', rest: '' };
  invalidDisplay: InvalidDisplay = { invalidInProgress: '', inProgress: '', invalid: '', rest: '' };
  readonly room$: Observable<Room>;
  private completedWords: string[] = [];
  private completedChars: string = '';
  private uncompletedWords: string[] = [];
  private wordIndex: number = 0;

  constructor(private route: ActivatedRoute, private store: Store<RoomState>) {
    this.room$ = this.store.pipe(select(getRoom));
    this.room$ = of(roomMock);
    this.room$.pipe(first()).subscribe(({ text: { quote } }) => {
      this.uncompletedWords = quote.split(' ');
      this.validDisplay = {
        inProgress: this.uncompletedWords[0],
        rest: this.uncompletedWords.slice(1).join(' '),
      };
    });
  }

  onInput() {
    const correctInput = `${this.uncompletedWords[0]} `;
    if (this.input === correctInput) {
      this.wordIndex++;
      this.input = '';
      this.uncompletedWords.shift();
      this.completedWords.push(correctInput);
      this.completedDisplay.completed = this.completedWords.join(' ');
    }

    if (!correctInput.startsWith(this.input)) {
      this.valid = false;
      const allWords = this.uncompletedWords.join(' ');
      const firstLength = this.uncompletedWords[0].length;
      const inputLength = this.input.length;
      const completedCharsLength = this.completedChars.length;

      this.invalidDisplay = {
        invalidInProgress: allWords.slice(completedCharsLength, Math.min(firstLength, inputLength)),
        inProgress: allWords.slice(inputLength, firstLength),
        invalid: allWords.slice(firstLength, inputLength),
        rest: allWords.slice(Math.max(firstLength, inputLength)),
      };
    } else if (correctInput.startsWith(this.input)) {
      this.valid = true;
      this.completedChars = this.input;
      this.completedDisplay.completedInProgress = this.completedChars;
    }

    this.validDisplay = {
      inProgress: this.uncompletedWords[0].slice(this.completedChars.length),
      rest: this.uncompletedWords.slice(1).join(' '),
    };
  }
}
