import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  standalone: true,
  styles: `

  @keyframes fadeInFromBottom {
    from {
      display: hidden;
      transform: translateY(1rem); /* Moves the element 1rem from the bottom */
    }
    to {
      display: flex;
      transform: translateY(0); /* Moves the element back to its original position */
    }
  }

  .first-session {
    animation: fadeInFromBottom 1s ease-out;
    animation-fill-mode: forwards;
  }

  .hide-y-axis {
    opacity: 0;
    transform: translateY(1rem);
  }

  .fade-in-from-bottom {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 300ms ease-out, transform 300ms ease-out;  /* Transition both opacity and position */
  }
  `,
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('firstChat') firstChat!: ElementRef;
  @ViewChild('secondSession') secondSession!: ElementRef;
  @ViewChild('thirdSession') thirdSession!: ElementRef;
  @ViewChild('thirdChat') thirdChat!: ElementRef;
  @ViewChild('fourthSession') fourthSession!: ElementRef;
  @ViewChild('fifthSession') fifthSession!: ElementRef;
  @ViewChild('fifthChat') fifthChat!: ElementRef;
  @ViewChild('sixthSession') sixthSession!: ElementRef;
  @ViewChild('seventhSession') seventhSession!: ElementRef;
  @ViewChild('seventhChat') seventhChat!: ElementRef;
  @ViewChild('eighthSession') eighthSession!: ElementRef;

  @Input('scrollTo') scrollTo: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isAlreadyAnimated: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const chatElement = document.querySelector('.chat-parent') as HTMLElement;

    if (chatElement) {
      const chatElementHeight = chatElement.scrollHeight;
      const chatElementVisibleHeight = chatElement.clientHeight;
      const chatElementScrollTop = chatElement.scrollTop;

      // Check if the chat element has been scrolled to the bottom
      const hasReachedBottom =
        chatElementScrollTop + chatElementVisibleHeight >= chatElementHeight;

      if ((!hasReachedBottom || !this.isAlreadyAnimated) && !this.scrollTo) {
        // Prevent window scroll if chatElement hasn't reached the bottom
        window.scrollTo(0, 0); // This line locks the window scroll
      }
    }
  }

  // Add a separate event listener for the chat element scroll
  @HostListener('wheel', ['$event'])
  onChatScroll(event: WheelEvent) {
    const chatElement = document.querySelector('.chat-parent') as HTMLElement;

    if (chatElement) {
      const chatElementHeight = chatElement.scrollHeight;
      const chatElementVisibleHeight = chatElement.clientHeight;
      const chatElementScrollTop = chatElement.scrollTop;

      // Check if the chat element has reached the top or the bottom
      const isAtTop = chatElementScrollTop === 0;
      const isAtBottom =
        chatElementScrollTop + chatElementVisibleHeight >= chatElementHeight;

      // Allow default behavior when reaching the top or bottom of chat element
      if ((isAtBottom && event.deltaY > 0) || (isAtTop && event.deltaY < 0)) {
        // Let the window scroll when the user reaches the top or bottom of the chat
        return;
      }

      // Prevent window scroll if still within chat content
      event.preventDefault();

      // Scroll the chat element based on user input
      chatElement.scrollTop += event.deltaY;
    }
  }

  ngAfterViewInit() {
    this.firstChat.nativeElement.innerHTML = '';
    let isAlreadyAnimated;
    if (isPlatformBrowser(this.platformId)) {
      isAlreadyAnimated = localStorage.getItem('isAnimated');
    }
    this.isAlreadyAnimated = isAlreadyAnimated ? JSON.parse(isAlreadyAnimated) : false;
    if (!this.isAlreadyAnimated) {
      this.firstChatAnimation(this.firstChat);
    } else {
      this.skipAnimation();
    }
  }

  skipAnimation() {
    const listOfChat = document.querySelectorAll('.hide-y-axis');
    listOfChat?.forEach((element) => {
      element?.classList?.remove('hide-y-axis');
    });
    this.firstChat.nativeElement.innerHTML =
      'Ready to take your business technology to the next level?';
    this.thirdChat.nativeElement.innerHTML =
      'Partner with us for cutting-edge IT solutions and limitless innovation!';
    this.fifthChat.nativeElement.innerHTML =
      'Expert guidance, seamless integration, and future-ready technology tailored to your needs!';
    this.seventhChat.nativeElement.innerHTML =
      'Absolutely! We specialize in AI integration to help your business stay ahead of the curve.';
  }

  firstChatAnimation(chat: ElementRef) {
    this.firstChat?.nativeElement?.classList?.add('first-session')
    const visible = new Promise<void>((resolve) => {
      setTimeout(() => {
        chat?.nativeElement?.classList?.remove('opacity-0');
        resolve();
      }, 300);
    });
    visible
      .then(() => {
        return this.typeWriter(
          chat,
          'Ready to take your business technology to the next level?',
          0
        );
      })
      .then(() => {
        this.secondChatAnimation(this.secondSession);
      });
  }

  typeWriter(chat: ElementRef, text: string, index: number): Promise<void> {
    return new Promise<void>((resolve) => {
      if (index < text.length) {
        chat.nativeElement.innerHTML += text.charAt(index);
        setTimeout(() => {
          this.typeWriter(chat, text, index + 1).then(resolve);
        }, 25);
      } else {
        resolve();
      }
    });
  }

  secondChatAnimation(chat: ElementRef) {
    if (chat) {
      chat?.nativeElement.classList.remove('hide-y-axis');
      chat.nativeElement.classList.add('fade-in-from-bottom');

      setTimeout(() => {
        this.thirdChatAnimation(this.thirdSession);
      }, 300);
    }
  }

  thirdChatAnimation(chat: ElementRef) {
    if (chat) {
      this.thirdChat.nativeElement.innerHTML = '';
      chat?.nativeElement.classList.remove('hide-y-axis');
      chat.nativeElement.classList.add('fade-in-from-bottom');

      setTimeout(() => {
        this.typeWriter(
          this.thirdChat,
          'Partner with us for cutting-edge IT solutions and limitless innovation!',
          0
        ).then(() => {
          this.fourthChatAnimation(this.fourthSession);
        });
      }, 300);
    }
  }

  fourthChatAnimation(chat: ElementRef) {
    if (chat) {
      chat?.nativeElement.classList.remove('hide-y-axis');
      chat.nativeElement.classList.add('fade-in-from-bottom');

      setTimeout(() => {
        this.fifthChatAnimation(this.fifthSession);
      }, 300);
    }
  }

  fifthChatAnimation(chat: ElementRef) {
    if (chat) {
      this.fifthChat.nativeElement.innerHTML = '';
      chat?.nativeElement.classList.remove('hide-y-axis');
      chat.nativeElement.classList.add('fade-in-from-bottom');

      setTimeout(() => {
        this.typeWriter(
          this.fifthChat,
          'Expert guidance, seamless integration, and future-ready technology tailored to your needs!',
          0
        ).then(() => {
          this.sixthChatAnimation(this.sixthSession);
        });
      }, 300);
    }
  }

  sixthChatAnimation(chat: ElementRef) {
    if (chat) {
      chat?.nativeElement.classList.remove('hide-y-axis');
      chat.nativeElement.classList.add('fade-in-from-bottom');

      setTimeout(() => {
        this.seventhChatAnimation(this.seventhSession);
      }, 300);
    }
  }

  seventhChatAnimation(chat: ElementRef) {
    if (chat) {
      this.seventhChat.nativeElement.innerHTML = '';
      chat?.nativeElement.classList.remove('hide-y-axis');
      chat.nativeElement.classList.add('fade-in-from-bottom');

      setTimeout(() => {
        this.typeWriter(
          this.seventhChat,
          'Absolutely! We specialize in AI integration to help your business stay ahead of the curve.',
          0
        ).then(() => {
          this.eighthChatAnimation(this.eighthSession);
        });
      }, 300);
    }
  }

  eighthChatAnimation(chat: ElementRef) {
    if (chat) {
      chat?.nativeElement.classList.remove('hide-y-axis');
      chat.nativeElement.classList.add('fade-in-from-bottom');
    }

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('isAnimated', 'true');
      this.isAlreadyAnimated = true;
    }
  }

  whatsapp() {
    window.open(
      'https://api.whatsapp.com/send?phone=62882003453869&text=Hi%20Daun%20Salam%20Teknologi%2C%20I%27m%20interested%20in%20your%20IT%20services.%20Let%27s%20do%20great%20things%20together!%F0%9F%98%81',
      '_blank'
    );
  }
}
