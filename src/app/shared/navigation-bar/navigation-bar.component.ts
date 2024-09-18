import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ds-navbar',
  templateUrl: './navigation-bar.component.html',
  styles: `
    .navigation-glass {
      border: 1px solid rgba(198, 80, 80, 0.40);
      background: linear-gradient(90deg, rgba(198, 80, 80, 0.30) 0%, rgba(198, 80, 80, 0.15) 100%);
      box-shadow: 0px 4px 32px -1px rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(20px);
    }

    .fade-in {
      opacity: 1;
    }

    .fade-up {
      opacity: 0;
    }

    .transform-custom {
      transition: transform .4s ease-out, opacity .4s ease-out, display .4s ease-out;
    }

    .fade-up-active {
      opacity: 1;
    }

    .parent {
      opacity: 0;
    }

    svg path {
      transition: all 0.5s ease-in-out;
    }

    .menu.open .line1 {
      transform: translate(6px, 0px) rotate(45deg);
    }

    .menu.open .line2 {
      transform: translate(-23px, 29.75px) rotate(-45deg);
    }

    .menu.open .line3 {
      opacity: 0;
    }
  `,
  standalone: true,
})
export class NavigationBarComponent {
  @Output() scrollIntoView: EventEmitter<string> = new EventEmitter();

  isOpen: boolean = false;
  isWaitingAnimation: boolean = false;

  scrollTo(navigate: string) {
    this.scrollIntoView.emit(navigate);
    this.animate();
  }

  whatsapp() {
    window.open(
      'https://api.whatsapp.com/send?phone=62882003453869&text=Hi%20Daun%20Salam%20Teknologi%2C%20I%27m%20interested%20in%20your%20IT%20services.%20Let%27s%20do%20great%20things%20together!%F0%9F%98%81',
      '_blank'
    );
  }

  animate() {
    if (this.isWaitingAnimation) return;
    this.isWaitingAnimation = true;

    const parentSection = document.querySelector('.parent-section');
    const article = document?.querySelector('.navigation-card');
    const menuIcon = document.querySelector('.menu-icon');

    if (!this.isOpen) {
      parentSection?.classList?.remove('parent');
      parentSection?.classList?.add('z-[99]');
      parentSection?.classList.add('fade-in');

      article?.classList.remove('fade-up');
      article?.classList.remove('translate-y-[40px]');
      article?.classList.add('fade-up-active');

      setTimeout(() => {
        this.isOpen = true;
        this.isWaitingAnimation = false;
      }, 500);
    } else if (this.isOpen) {
      parentSection?.classList?.add('parent');
      parentSection?.classList.remove('fade-in');

      article?.classList.remove('fade-up-active');
      article?.classList.remove('fade-up');
      article?.classList.add('translate-y-[40px]');

      setTimeout(() => {
        parentSection?.classList?.remove('z-[99]');
        this.isOpen = false;
        this.isWaitingAnimation = false;
      }, 500);
    }

    menuIcon?.classList.toggle('open');
  }
}
