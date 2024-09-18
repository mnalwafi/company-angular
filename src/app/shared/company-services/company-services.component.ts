import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { RectangleCardComponent } from '../card/rectangle-card/rectangle-card.component';
import { TitleCardComponent } from '../card/title-card/title-card.component';
import { BoxCardComponent } from '../card/box-card/box-card.component';

@Component({
  selector: 'ds-company-services',
  template: `
     <section class="flex flex-col gap-4">
      <ds-title-card [card]="titleCard" class="animate-up title-card"></ds-title-card>
      <section
        class="w-full flex justify-center items-center gap-4 sm:flex-row flex-col animate-up box-card-1"
      >
        <ds-box-card [card]="boxCard1" class="w-fit"></ds-box-card>
        <ds-box-card [card]="boxCard2" class="w-fit"></ds-box-card>
      </section>
      <section
        class="w-full flex justify-center items-center gap-4 sm:flex-row flex-col animate-up box-card-2"
      >
        <ds-box-card [card]="boxCard3" class="w-fit"></ds-box-card>
        <ds-box-card [card]="boxCard4" class="w-fit"></ds-box-card>
      </section>
    </section>
  `,
  standalone: true,
  imports: [RectangleCardComponent, TitleCardComponent, BoxCardComponent],
})
export class CompanyServicesComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const titleCard = this.el.nativeElement.querySelector('.title-card');
    const rectangleCard =
      this.el.nativeElement.querySelector('.rectangle-card');
    const boxCard1 = this.el.nativeElement.querySelector('.box-card-1');
    const boxCard2 = this.el.nativeElement.querySelector('.box-card-2');

    this.checkAndAnimate(titleCard);
    this.checkAndAnimate(rectangleCard);
    this.checkAndAnimate(boxCard1);
    this.checkAndAnimate(boxCard2);
  }

  boxCard1 = {
    // Foto yang akan digunakan, formatnya adalah image/<nama-file>
    image: 'image/software-development.avif',

    /**
     * Pada imageSize atur secara manual (Figma), lg adalah ukuran base dan untuk non lg gunakan rumus 3/4 x ukuran base
     * Contoh:
     * Jika lg:w-[160px] maka w-[3/4 x 160px] = w-[120px]
     */
    imageSize: 'lg:w-[240px] md:w-[200px] w-[120px]',

    // Untuk jarak dari Top atur secara manual, usahakan agar jarak antara atas dengan header bawah sama
    imageStyleTop: 'top-[48px] md:top-[56px]',

    // Header text, sudah otomatis diakhiri dengan .
    headerText: 'Software Development',
    headerTextColor: 'text-[#FFFFFF]',

    // Paragraf text
    paragraphText:
    'Our software development services are designed to create robust, scalable, and efficient applications that drive operational excellence using Test Driven Development (TDD).',
    paragraphTextColor: 'text-[#EAEAEA]',
    background: 'bg-[#000000]',
  };

  boxCard2 = {
    image: 'image/msp.avif',
    imageSize: 'lg:w-[240px] md:w-[160px] w-[120px]',
    imageStyleTop: 'top-[48px] lg:top-[56px]',
    headerText: 'Managed Service Provider',
    headerTextColor: 'text-[#FFFFFF]',
    paragraphText:
      'Transform your IT with Our Managed Service Provider (MSP) Solutions-Expert Care, Maximum Uptime, Zero Worries!',
    paragraphTextColor: 'text-[#EAEAEA]',
    background: 'bg-[#000000]',
  };

  boxCard3 = {
    image: 'image/ai-integration.avif',
    imageSize: 'lg:w-[240px] md:w-[160px] w-[120px]',
    imageStyleTop: 'top-1/2 -translate-y-[85%]',
    headerText: 'AI Integration',
    headerTextColor: 'text-[#FFFFFF]',
    paragraphText:
      "Unlock AI's potential with our integration services-automate, gain insights, and make smarter descisions.",
    paragraphTextColor: 'text-[#EAEAEA]',
    background: 'bg-[#000000]',
  };

  boxCard4 = {
    image: 'image/ui-design.avif',
    imageSize: 'lg:w-[240px] md:w-[160px] w-[120px]',
    imageStyleTop: 'top-1/2 -translate-y-[90%]',
    headerText: 'UI/UX Design',
    headerTextColor: 'text-[#FFFFFF]',
    paragraphText:
      'Transform your IT with Our Managed Service Provider (MSP) Solutions-Expert Care, Maximum Uptime, Zero Worries!',
    paragraphTextColor: 'text-[#EAEAEA]',
    background: 'bg-[#000000]',
  };

  titleCard = {
    // Warna background pada card
    background: 'bg-[#EADAAD]',

    /**
     * Semua title card memiliki styling yang relative sama
     * Cara pakai:
     * 1.  <h1 class="font-bold lg:text-7xl text-[54px]"> ... </h1>
     * 2. Masukkan text pada titik titik di atas
     * 3. Jika terdapat text yang memiliki warna berbeda dari text lain maka masukkan text tersebut pada titik titik di bawah, dan isi *** dengan warna text yang berbeda tersebut
     * 4. <span class="text-[***]">...</span>
     * 5. Sisipkan span ke dalam tag h1
     */
    text: '<h1 class="font-bold lg:text-9xl md:text-7xl text-[54px] text-[#1A1A1A]"><span class="text-[#DD5E3F]">Best services</span> in related field</h1>',
  };

  rectangleCard = {
    // Warna background pada card
    background: 'bg-[#1A1A1A]',

    // Foto preview pada card, image/<nama-file>
    image: 'image/OfficePreview.avif',

    // Judul pada card, sudah otomatis diberi . pada akhir kalimat
    title: 'Daun Salam Teknologi',
    titleColor: 'text-white',

    // Deskripsi pada card
    description:
      'Pariatur laborum id est voluptate do in ipsum dolor culpa aute. Ipsum duis veniam minim incididunt aliquip eu Lorem. Exercitation quis aute sint consequat anim pariatur veniam voluptate nulla.',
    descriptionColor: 'text-[#EAEAEA]',

    // Informasi tambahan pada card
    additionalInformation:
      'Daun Salam Teknologi adalah software house yang berbasis di Yogyakarta',
    additionalInformationColor: 'text-[#5A5A5A]',

    // Logo yang akan digunakan pada card, image/<nama-file>
    logo: 'image/DaunSalamLogo.avif',
  };

  checkAndAnimate(element: HTMLElement) {
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        this.renderer.addClass(element, 'show');
      }
    }
  }
}
