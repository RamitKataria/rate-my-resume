import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {
  public currResNumber: number = 1;
  public resumesReviewed: number = 0;

  constructor() { }

  public getResumesReviewed(): number {
    return this.resumesReviewed
  }

  public incrementResumesReviewed(): void {
    this.resumesReviewed++;
  }

  public getNextResumeSrc(): string {
    var toreturn = `assets/pdfs/testpdf_${this.currResNumber}.pdf`

    if (this.currResNumber < 6) {
      this.currResNumber++;
    } else {
      this.currResNumber = 1;
    }
    return toreturn;
  }
}
