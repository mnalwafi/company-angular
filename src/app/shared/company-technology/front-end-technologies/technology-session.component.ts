import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  Input,
} from '@angular/core';
import { BoxCardComponent } from '../../card/box-card/box-card.component';
import { BoxCardType } from '../../card/box-card/box-card.model';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'ds-technology-session',
  template: `
    <section class="mb-32">
      <h1
        class="font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl w-full text-center mb-16 sm:mb-24 lg:mb-32"
      >
        {{ technology }}
      </h1>
      <section
        class="w-full flex justify-center items-center gap-4 sm:flex-row flex-col box-card-session relative lg:h-[560px] md:h-[480px] sm:h-[360px] h-fit"
      >
        <ds-box-card
          *ngFor="let boxCard of card; let i = index"
          [card]="boxCard"
          [ngClass]="
            i === 0
              ? 'z-10 box-card top-0 w-fit sm:absolute static flex left-1/2 sm:-translate-x-1/2 transition duration-[1000ms] ' +
                boxCard?.class
              : 'box-card top-0 w-fit sm:absolute static flex left-1/2 sm:-translate-x-1/2 transition duration-[1000ms] cursor-pointer ' +
                boxCard?.class
          "
          (click)="animateCard(i)"
        ></ds-box-card>
      </section>
    </section>
  `,
  styles: `
  .box-card {
    transition: transform 1s ease, opacity 1s ease;
  }
`,
  standalone: true,
  imports: [BoxCardComponent, NgFor, NgClass],
})
export class TechnologySessionComponent {
  @Input() card!: BoxCardType[];
  @Input() technology!: string;

  zIndex: number = 10;
  isWaitingForAnimation: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const titleCard = this.el.nativeElement.querySelector('.title-card');
    const boxCardSession =
      this.el.nativeElement.querySelector('.box-card-session');

    this.checkAndAnimate(titleCard);
    this.checkAndAnimate(boxCardSession, true);
  }

  checkAndAnimate(element: HTMLElement, isBoxCard?: boolean) {
    if (element && !isBoxCard) {
      const rect = element?.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        this.renderer.addClass(element, 'show');
      }
    } else if (element && isBoxCard) {
      const rect = element?.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight / 2 && rect.bottom >= 0) {
        const boxCard = this.el.nativeElement.querySelectorAll(
          '.' + this.card?.[0]?.class
        );

        if (this.card?.length === 5) {
          boxCard?.forEach((box: HTMLElement, index: number) => {
            if (index >= 1 && box) {
              box.classList?.remove('sm:-translate-x-1/2');
              if (index >= 3 && index <= 4) {
                box.classList?.add('sm:translate-y-4');
                box.classList?.add('z-[2]');
              } else {
                box.classList?.add('z-[5]');
              }
              const translateX =
                index === 1
                  ? 'sm:-translate-x-[30%]'
                  : index === 2
                  ? 'sm:-translate-x-[70%]'
                  : index === 3
                  ? 'sm:-translate-x-[10%]'
                  : index === 4
                  ? 'sm:-translate-x-[90%]'
                  : '-';
              const rotate =
                index === 1
                  ? 'sm:rotate-[10deg]'
                  : index === 2
                  ? 'sm:-rotate-[10deg]'
                  : index === 3
                  ? 'sm:rotate-[20deg]'
                  : index === 4
                  ? 'sm:-rotate-[20deg]'
                  : '-';

              if (translateX) box.classList?.add(translateX);
              if (rotate) box.classList?.add(rotate);
            }
          });
        } else {
          boxCard?.forEach((box: HTMLElement, index: number) => {
            if (index >= 1 && box) {
              box.classList?.remove('sm:-translate-x-1/2');
              box.classList?.add('sm:translate-y-4');
              const translateX =
                index === 1
                  ? 'sm:-translate-x-[7.5%]'
                  : index === 2
                  ? 'sm:-translate-x-[92.5%]'
                  : '-';
              const rotate =
                index === 1
                  ? 'sm:rotate-12'
                  : index === 2
                  ? 'sm:-rotate-12'
                  : '';
              if (translateX) box.classList?.add(translateX);
              if (rotate) box.classList?.add(rotate);
            }
          });
        }
      }
    }
  }

  animateCard(index: number) {
    if (this.isWaitingForAnimation) return;
    const cardElement = this.el.nativeElement.querySelectorAll(
      '.' + this.card?.[0]?.class
    )?.[index];

    let rotate: string = '';
    let translationX: string = '';

    if (cardElement?.classList?.contains('sm:translate-y-[21rem]')) {
      this.isWaitingForAnimation = true;
      this.renderer.removeStyle(cardElement, 'transform');

      setTimeout(() => {
        this.zIndex--;
        this.zIndex -= 10;
        this.renderer.removeStyle(cardElement, 'z-index');

        if (cardElement.classList.contains('sm:rotate-12')) {
          cardElement?.classList?.add('sm:-translate-x-[7.5%]');
          translationX = 'sm:translate-x-[50%]';
          rotate = 'sm:rotate-[35deg]';
        } else if (cardElement.classList.contains('sm:-rotate-12')) {
          cardElement?.classList?.add('sm:-translate-x-[92.5%]');
          translationX = 'sm:-translate-x-[150%]';
          rotate = 'sm:-rotate-[35deg]';
        } else if (cardElement?.classList?.contains('sm:rotate-[10deg]')) {
          cardElement?.classList?.add('sm:-translate-x-[30%]');
          translationX = 'sm:translate-x-[50%]';
          rotate = 'sm:rotate-[35deg]';
        } else if (cardElement.classList.contains('sm:-rotate-[10deg]')) {
          cardElement?.classList?.add('sm:-translate-x-[70%]');
          translationX = 'sm:-translate-x-[150%]';
          rotate = 'sm:-rotate-[35deg]';
        } else if (cardElement?.classList?.contains('sm:rotate-[20deg]')) {
          cardElement?.classList?.add('sm:-translate-x-[10%]');
          translationX = 'sm:translate-x-[60%]';
          rotate = 'sm:rotate-[35deg]';
        } else if (cardElement.classList.contains('sm:-rotate-[20deg]')) {
          cardElement?.classList?.add('sm:-translate-x-[90%]');
          translationX = 'sm:-translate-x-[160%]';
          rotate = 'sm:-rotate-[35deg]';
        }

        this.renderer.removeClass(cardElement, 'transform');
        if (translationX) this.renderer.removeClass(cardElement, translationX);
        this.renderer.removeClass(cardElement, `sm:translate-y-[21rem]`);
        if (rotate) this.renderer.removeClass(cardElement, rotate);
        this.isWaitingForAnimation = false;
      }, 800);
    } else if (!cardElement.classList?.contains('z-10')) {
      this.isWaitingForAnimation = true;
      if (cardElement.classList.contains('sm:rotate-12')) {
        cardElement?.classList?.remove('sm:-translate-x-[7.5%]');
        translationX = 'sm:translate-x-[50%]';
        rotate = 'sm:rotate-[35deg]';
      } else if (cardElement.classList.contains('sm:-rotate-12')) {
        cardElement?.classList?.remove('sm:-translate-x-[92.5%]');
        translationX = 'sm:-translate-x-[150%]';
        rotate = 'sm:-rotate-[35deg]';
      } else if (cardElement?.classList?.contains('sm:rotate-[10deg]')) {
        cardElement?.classList?.remove('sm:-translate-x-[30%]');
        translationX = 'sm:translate-x-[50%]';
        rotate = 'sm:rotate-[35deg]';
      } else if (cardElement?.classList?.contains('sm:-rotate-[10deg]')) {
        cardElement?.classList?.remove('sm:-translate-x-[70%]');
        translationX = 'sm:-translate-x-[150%]';
        rotate = 'sm:-rotate-[35deg]';
      } else if (cardElement?.classList?.contains('sm:rotate-[20deg]')) {
        cardElement?.classList?.remove('sm:-translate-x-[10%]');
        translationX = 'sm:translate-x-[60%]';
        rotate = 'sm:rotate-[35deg]';
      } else if (cardElement?.classList?.contains('sm:-rotate-[20deg]')) {
        cardElement?.classList?.remove('sm:-translate-x-[90%]');
        translationX = 'sm:-translate-x-[160%]';
        rotate = 'sm:-rotate-[35deg]';
      }

      this.renderer.addClass(cardElement, 'transform');
      if (translationX) this.renderer.addClass(cardElement, translationX);
      this.renderer.addClass(cardElement, `sm:translate-y-[21rem]`);
      if (rotate) this.renderer.addClass(cardElement, rotate);

      setTimeout(() => {
        if (window.innerWidth >= 640) {
          this.renderer.setStyle(
            cardElement,
            'transform',
            'translateX(-50%) translateY(0) rotate(0)'
          );
        }
        this.zIndex++;
        this.zIndex += 10;
        this.renderer.setStyle(cardElement, 'z-index', this.zIndex);
        this.isWaitingForAnimation = false;
      }, 800);
    }
  }
}
