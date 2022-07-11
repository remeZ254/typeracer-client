import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {
  @Input() active!: boolean;
  @Input() uncompletedWords!: string[];
  @Output() correctWord: EventEmitter<number>;
  input: string = '';
  isInvalid: boolean = false;
  quoteDisplay: QuoteDisplay = {
    completed: { inProgress: '', rest: '' },
    valid: { inProgress: '', rest: '' },
    invalid: { inProgress: '', rest: '' },
  };
  private completedChars: string = '';
  private completedWords: string[] = [];
  private wordIndex: number = 0;

  constructor() {
    this.correctWord = new EventEmitter<number>();
  }

  ngOnInit() {
    this.formatDisplay();
  }

  onInput() {
    if(!this.active) return;

    const correctInput = this.uncompletedWords[0] + (this.uncompletedWords.length !== 1 ? ' ' : '');

    if (this.input === correctInput) {
      this.wordIndex++;
      this.input = '';
      this.uncompletedWords.shift();
      this.completedWords.push(correctInput);
      this.correctWord.emit(this.wordIndex);
    }

    if (!this.uncompletedWords.length) {
      //TODO: game over
      return;
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
