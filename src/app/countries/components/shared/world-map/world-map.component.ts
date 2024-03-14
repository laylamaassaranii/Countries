import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.scss',
})
export class WorldMapComponent {
  @ViewChildren('bg') headerBackgrounds!: QueryList<ElementRef>;

  imageIndex = 0;

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    console.log(this.headerBackgrounds);
    this.changeBackground();
    console.log('hello');
    setInterval(() => this.changeBackground(), 3000);
  }

  changeBackground(): void {
    const backgrounds = this.headerBackgrounds?.toArray();
    if (backgrounds) {
      const totalImages = backgrounds.length;
      console.log(totalImages)

      // Remove .showing class from current background
      backgrounds[this.imageIndex].nativeElement.classList.remove('showing');

      // Increment the image index by one
      this.imageIndex++;

      // If the image index reaches the total number of images, reset it to 0
      if (this.imageIndex >= totalImages) {
        this.imageIndex = 0;
      }

      // Add the .showing class to the next background
      backgrounds[this.imageIndex].nativeElement.classList.add('showing');
    }
  }
}
