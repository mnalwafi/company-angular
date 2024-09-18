import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { RectangleCardComponent } from '../card/rectangle-card/rectangle-card.component';
import { TitleCardComponent } from '../card/title-card/title-card.component';
import { BoxCardComponent } from '../card/box-card/box-card.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ds-company-description',
  template: `
    <section class="flex flex-col gap-4">
      <ds-title-card
        [card]="titleCard"
        class="animate-up title-card"
      ></ds-title-card>
      <ds-rectangle-card
        [card]="rectangleCard"
        class="animate-up rectangle-card"
      ></ds-rectangle-card>
      <section
        class="w-full flex justify-center items-center gap-4 sm:flex-row flex-col animate-up box-card"
      >
        <ds-box-card [card]="boxCard1" class="w-fit"></ds-box-card>
        <ds-box-card [card]="boxCard2" class="w-fit"></ds-box-card>
      </section>
    </section>
  `,
  standalone: true,
  imports: [RectangleCardComponent, TitleCardComponent, BoxCardComponent],
})
export class CompanyDescriptionComponent {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const titleCard = this.el.nativeElement.querySelector('.title-card');
    const rectangleCard =
      this.el.nativeElement.querySelector('.rectangle-card');
    const boxCard = this.el.nativeElement.querySelector('.box-card');

    this.checkAndAnimate(titleCard);
    this.checkAndAnimate(rectangleCard);
    this.checkAndAnimate(boxCard);
  }

  boxCard1 = {
    // Foto yang akan digunakan, formatnya adalah image/<nama-file>
    image: 'image/DaunSalamLogo.avif',

    /**
     * Pada imageSize atur secara manual (Figma), lg adalah ukuran base dan untuk non lg gunakan rumus 3/4 x ukuran base
     * Contoh:
     * Jika lg:w-[160px] maka w-[3/4 x 160px] = w-[120px]
     */
    imageSize: 'lg:w-[240px] md:w-[200px] w-[120px]',

    // Untuk jarak dari Top atur secara manual, usahakan agar jarak antara atas dengan header bawah sama
    imageStyleTop: 'top-[48px] md:top-[56px]',

    // Header text, sudah otomatis diakhiri dengan .
    headerText: 'Meet our logo',
    headerTextColor: 'text-[#FFFFFF]',

    // Paragraf text
    paragraphText:
      'Our logo radiates brilliance with its vibrant gold leaf representing our focus on quality and innovative solutions.',
    paragraphTextColor: 'text-[#EAEAEA]',

    // Warna background pada card
    background: 'bg-[#18624C]',
  };

  boxCard2 = {
    image: 'image/DaunSalamLogo.avif',
    isSvg: this.sanitizer
      .bypassSecurityTrustHtml(`<svg width="172" height="220" viewBox="0 0 172 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 33.1157L84.0165 209.843V63.9091L6 33.1157Z" fill="#ED3237"/>
              <path d="M6 33.1157L84.0165 5L166 33.1157L84.0165 209.843M6 33.1157L84.0165 209.843M6 33.1157L84.0165 63.9091V209.843" stroke="#ED3B40" stroke-width="8.03306"/>
            </svg>`),
    imageSize: 'lg:w-[240px] md:w-[160px] w-[120px]',
    imageStyleTop: 'top-1/2 -translate-y-[80%]',
    headerText: 'Our Partner',
    headerTextColor: 'text-[#1A1A1A]',
    paragraphText:
      'PT. Menara Merah Putih is a partner of Daun Salam Teknologi, providing mining services such as NEDA, Mining Service, Road Building, and more.',
    paragraphTextColor: 'text-[#2A2A2A]',
    background: 'bg-[#DFE8E5]',
  };

  titleCard = {
    // Warna background pada card
    background: 'bg-[#B7DBD1]',

    /**
     * Semua title card memiliki styling yang relative sama
     * Cara pakai:
     * 1.  <h1 class="font-bold lg:text-7xl text-[54px]"> ... </h1>
     * 2. Masukkan text pada titik titik di atas
     * 3. Jika terdapat text yang memiliki warna berbeda dari text lain maka masukkan text tersebut pada titik titik di bawah, dan isi *** dengan warna text yang berbeda tersebut
     * 4. <span class="text-[***]">...</span>
     * 5. Sisipkan span ke dalam tag h1
     */
    text: '<h1 class="font-bold lg:text-9xl md:text-7xl text-[54px] text-[#1A1A1A]">Meet The <span class="text-[#18624C]">Best</span> Software House</h1>',
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
      'Daun Salam Teknologi is a reliable technology partner ready to take your business further with innovative solutions tailored to your specific needs. With a professional, experienced team and cutting-edge technology, we are commited to helping your business achieve excellence in the digital era.',
    descriptionColor: 'text-[#EAEAEA]',

    // Informasi tambahan pada card
    additionalInformation:
      'Tingkatkan bisnis anda dengan digitalisasi bersama Daun Salam Teknologi!',
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
