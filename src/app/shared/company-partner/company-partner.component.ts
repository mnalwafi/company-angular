import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { RectangleCardComponent } from '../card/rectangle-card/rectangle-card.component';
import { TitleCardComponent } from '../card/title-card/title-card.component';
import { BoxCardComponent } from '../card/box-card/box-card.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ds-company-partner',
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
      <article
        class="relative overflow-hidden h-fit glass-background sm:rounded-full rounded-[36px] flex sm:flex-row flex-col items-center gap-4 sm:gap-0 p-4 statistic-card"
      >
        <h1
          class="text-center md:text-xl text-base sm:w-full sm:border-r-2 sm:border-white"
        >
          <span class="number-to-count" data-number="4">0</span> Month since
          launch
        </h1>
        <h1
          class="text-center md:text-xl text-base sm:w-full sm:border-r-2 sm:border-white"
        >
          <span class="number-to-count" data-number="1500">0</span>+ Letter
          generated
        </h1>
        <h1 class="text-center md:text-xl text-base sm:w-full">
          <span class="number-to-count" data-number="500">0</span>+ Active user
        </h1>
      </article>
    </section>
  `,
  standalone: true,
  imports: [RectangleCardComponent, TitleCardComponent, BoxCardComponent],
})
export class CompanyPartnerComponent {
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
    const statisticCard = this.el.nativeElement.querySelector('.statistic-card');

    this.checkAndAnimate(titleCard);
    this.checkAndAnimate(rectangleCard);
    this.checkAndAnimate(boxCard);
    this.checkAndAnimate(statisticCard);
  }

  boxCard1 = {
    // Foto yang akan digunakan, formatnya adalah image/<nama-file>
    image: 'image/DaunSalamLogo.avif',
    isSvg: this.sanitizer
      .bypassSecurityTrustHtml(`<svg width="304" height="46" viewBox="0 0 304 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.4295 45.9314C14.1641 45.9314 11.238 45.4013 8.65114 44.3411C6.06428 43.2809 3.98631 41.7118 2.41723 39.6338C0.890559 37.5559 0.0848151 35.0538 0 32.1277H11.5773C11.7469 33.7816 12.3194 35.0538 13.2948 35.9444C14.2701 36.7925 15.5424 37.2166 17.1114 37.2166C18.7229 37.2166 19.9952 36.8561 20.9281 36.1352C21.8611 35.3719 22.3276 34.3329 22.3276 33.0183C22.3276 31.9157 21.9459 31.0039 21.1826 30.283C20.4616 29.562 19.5499 28.9683 18.4473 28.5019C17.3871 28.0354 15.8604 27.5053 13.8673 26.9116C10.9836 26.021 8.62994 25.1305 6.80641 24.2399C4.98289 23.3493 3.41381 22.0347 2.09917 20.296C0.78454 18.5573 0.127223 16.2885 0.127223 13.4896C0.127223 9.33365 1.63269 6.08947 4.64363 3.75706C7.65456 1.38224 11.5773 0.194824 16.4117 0.194824C21.331 0.194824 25.2961 1.38224 28.307 3.75706C31.318 6.08947 32.9295 9.35485 33.1415 13.5532H21.3734C21.2886 12.1113 20.7585 10.9875 19.7831 10.1818C18.8077 9.33365 17.5567 8.90957 16.0301 8.90957C14.7154 8.90957 13.6552 9.27004 12.8495 9.99097C12.0437 10.6695 11.6409 11.6661 11.6409 12.9807C11.6409 14.4226 12.3194 15.5464 13.6764 16.3521C15.0335 17.1578 17.1539 18.0272 20.0376 18.9602C22.9213 19.9355 25.2537 20.8685 27.0348 21.7591C28.8583 22.6496 30.4274 23.9431 31.7421 25.6394C33.0567 27.3357 33.714 29.5196 33.714 32.1913C33.714 34.7358 33.0567 37.047 31.7421 39.125C30.4698 41.2029 28.6039 42.8568 26.1443 44.0866C23.6846 45.3165 20.7797 45.9314 17.4295 45.9314Z" fill="#005BAB"/>
              <path d="M72.5318 0.830937V9.54569H60.7001V45.4861H49.8226V9.54569H37.9909V0.830937H72.5318Z" fill="#005BAB"/>
              <path d="M99.1099 45.9314C94.9116 45.9314 91.0525 44.956 87.5327 43.0052C84.0552 41.0545 81.2775 38.3404 79.1996 34.863C77.164 31.3432 76.1462 27.3993 76.1462 23.0313C76.1462 18.6633 77.164 14.7406 79.1996 11.2632C81.2775 7.78577 84.0552 5.07169 87.5327 3.12095C91.0525 1.1702 94.9116 0.194824 99.1099 0.194824C103.308 0.194824 107.146 1.1702 110.624 3.12095C114.143 5.07169 116.9 7.78577 118.893 11.2632C120.929 14.7406 121.946 18.6633 121.946 23.0313C121.946 27.3993 120.929 31.3432 118.893 34.863C116.857 38.3404 114.101 41.0545 110.624 43.0052C107.146 44.956 103.308 45.9314 99.1099 45.9314ZM99.1099 36.008C102.672 36.008 105.513 34.8206 107.634 32.4458C109.797 30.0709 110.878 26.9328 110.878 23.0313C110.878 19.0874 109.797 15.9492 107.634 13.6168C105.513 11.242 102.672 10.0546 99.1099 10.0546C95.5053 10.0546 92.6216 11.2208 90.4588 13.5532C88.3384 15.8856 87.2782 19.045 87.2782 23.0313C87.2782 26.9752 88.3384 30.1346 90.4588 32.5094C92.6216 34.8418 95.5053 36.008 99.1099 36.008Z" fill="#005BAB"/>
              <path d="M162.03 15.2071C162.03 17.794 161.436 20.1688 160.249 22.3316C159.061 24.4519 157.238 26.1694 154.778 27.4841C152.319 28.7987 149.265 29.456 145.618 29.456H138.875V45.4861H127.998V0.830937H145.618C149.18 0.830937 152.191 1.44585 154.651 2.67566C157.111 3.90548 158.955 5.60178 160.185 7.76457C161.415 9.92735 162.03 12.4082 162.03 15.2071ZM144.791 20.8049C146.869 20.8049 148.417 20.3172 149.435 19.3418C150.453 18.3665 150.962 16.9882 150.962 15.2071C150.962 13.426 150.453 12.0477 149.435 11.0724C148.417 10.097 146.869 9.6093 144.791 9.6093H138.875V20.8049H144.791Z" fill="#005BAB"/>
              <path d="M178.57 37.0894H192.819V45.4861H167.693V0.830937H178.57V37.0894Z" fill="#005BAB"/>
              <path d="M208.885 9.54569V18.5785H223.452V26.9752H208.885V36.7713H225.361V45.4861H198.008V0.830937H225.361V9.54569H208.885Z" fill="#005BAB"/>
              <path d="M248.58 45.9314C245.314 45.9314 242.388 45.4013 239.801 44.3411C237.214 43.2809 235.136 41.7118 233.567 39.6338C232.041 37.5559 231.235 35.0538 231.15 32.1277H242.727C242.897 33.7816 243.47 35.0538 244.445 35.9444C245.42 36.7925 246.692 37.2166 248.262 37.2166C249.873 37.2166 251.145 36.8561 252.078 36.1352C253.011 35.3719 253.478 34.3329 253.478 33.0183C253.478 31.9157 253.096 31.0039 252.333 30.283C251.612 29.562 250.7 28.9683 249.597 28.5019C248.537 28.0354 247.011 27.5053 245.017 26.9116C242.134 26.021 239.78 25.1305 237.957 24.2399C236.133 23.3493 234.564 22.0347 233.249 20.296C231.935 18.5573 231.277 16.2885 231.277 13.4896C231.277 9.33365 232.783 6.08947 235.794 3.75706C238.805 1.38224 242.727 0.194824 247.562 0.194824C252.481 0.194824 256.446 1.38224 259.457 3.75706C262.468 6.08947 264.08 9.35485 264.292 13.5532H252.524C252.439 12.1113 251.909 10.9875 250.933 10.1818C249.958 9.33365 248.707 8.90957 247.18 8.90957C245.866 8.90957 244.805 9.27004 244 9.99097C243.194 10.6695 242.791 11.6661 242.791 12.9807C242.791 14.4226 243.47 15.5464 244.827 16.3521C246.184 17.1578 248.304 18.0272 251.188 18.9602C254.071 19.9355 256.404 20.8685 258.185 21.7591C260.008 22.6496 261.578 23.9431 262.892 25.6394C264.207 27.3357 264.864 29.5196 264.864 32.1913C264.864 34.7358 264.207 37.047 262.892 39.125C261.62 41.2029 259.754 42.8568 257.294 44.0866C254.835 45.3165 251.93 45.9314 248.58 45.9314Z" fill="#005BAB"/>
              <path d="M287.716 45.9314C284.45 45.9314 281.524 45.4013 278.937 44.3411C276.35 43.2809 274.272 41.7118 272.703 39.6338C271.177 37.5559 270.371 35.0538 270.286 32.1277H281.863C282.033 33.7816 282.605 35.0538 283.581 35.9444C284.556 36.7925 285.828 37.2166 287.397 37.2166C289.009 37.2166 290.281 36.8561 291.214 36.1352C292.147 35.3719 292.614 34.3329 292.614 33.0183C292.614 31.9157 292.232 31.0039 291.469 30.283C290.748 29.562 289.836 28.9683 288.733 28.5019C287.673 28.0354 286.146 27.5053 284.153 26.9116C281.27 26.021 278.916 25.1305 277.092 24.2399C275.269 23.3493 273.7 22.0347 272.385 20.296C271.071 18.5573 270.413 16.2885 270.413 13.4896C270.413 9.33365 271.919 6.08947 274.93 3.75706C277.941 1.38224 281.863 0.194824 286.698 0.194824C291.617 0.194824 295.582 1.38224 298.593 3.75706C301.604 6.08947 303.215 9.35485 303.427 13.5532H291.659C291.575 12.1113 291.044 10.9875 290.069 10.1818C289.094 9.33365 287.843 8.90957 286.316 8.90957C285.001 8.90957 283.941 9.27004 283.135 9.99097C282.33 10.6695 281.927 11.6661 281.927 12.9807C281.927 14.4226 282.605 15.5464 283.962 16.3521C285.319 17.1578 287.44 18.0272 290.324 18.9602C293.207 19.9355 295.54 20.8685 297.321 21.7591C299.144 22.6496 300.713 23.9431 302.028 25.6394C303.343 27.3357 304 29.5196 304 32.1913C304 34.7358 303.343 37.047 302.028 39.125C300.756 41.2029 298.89 42.8568 296.43 44.0866C293.971 45.3165 291.066 45.9314 287.716 45.9314Z" fill="#005BAB"/>
            </svg>
            `),

    /**
     * Pada imageSize atur secara manual (Figma), lg adalah ukuran base dan untuk non lg gunakan rumus 3/4 x ukuran base
     * Contoh:
     * Jika lg:w-[160px] maka w-[3/4 x 160px] = w-[120px]
     */
    imageSize: 'w-fit md:scale-[1] scale-[.75]',

    // Untuk jarak dari Top atur secara manual, usahakan agar jarak antara atas dengan header bawah sama
    imageStyleTop: 'top-[50%] -translate-y-[175%]',

    // Header text, sudah otomatis diakhiri dengan .
    headerText: 'STOPLESS',
    headerTextColor: 'text-[#1A1A1A]',

    // Paragraf text
    paragraphText:
      'STOPLESS makes managing employee leave/work permissions a breeze. It generate leave/work permissions letter programmatically.',
    paragraphTextColor: 'text-[#010101]',

    // Warna background pada card
    background: 'bg-[#FFE066]',
  };

  boxCard2 = {
    image: 'image/doddy-indrawan.avif',
    imageSize: 'w-[60%] aspect-square rounded-full overflow-hidden',
    imageStyleTop: 'top-1/2 md:-translate-y-[75%] -translate-y-[90%]',
    headerText: 'Doddy Indrawan',
    headerTextColor: 'text-[#FFFFFF]',
    paragraphText:
      'STOPLESS sangat membantu PT Hasnur Riung Sinergi site EBL dalam pengajuan cuti secara online. Masih banyak potensi yang bisa dikembangkan lebih baik di hari mendatang.',
    paragraphTextColor: 'text-[#C4C4C4]',
    background: 'bg-[#4F4F4F]',
  };

  titleCard = {
    // Warna background pada card
    background: 'bg-[#0C3D48]',

    /**
     * Semua title card memiliki styling yang relative sama
     * Cara pakai:
     * 1.  <h1 class="font-bold lg:text-7xl text-[54px]"> ... </h1>
     * 2. Masukkan text pada titik titik di atas
     * 3. Jika terdapat text yang memiliki warna berbeda dari text lain maka masukkan text tersebut pada titik titik di bawah, dan isi *** dengan warna text yang berbeda tersebut
     * 4. <span class="text-[***]">...</span>
     * 5. Sisipkan span ke dalam tag h1
     */
    text: '<h1 class="font-bold lg:text-9xl md:text-7xl text-[54px] text-[#FFFFFF]"><span class="text-[#A4BF9D]">Reliable service</span> is ours.</h1>',
  };

  rectangleCard = {
    // Warna background pada card
    background: 'bg-[#FFFFFF]',

    // Foto preview pada card, image/<nama-file>
    image: 'image/HasnurRiungSinergiPreview.avif',
    imageClass: 'hidden sm:flex',

    // Judul pada card, sudah otomatis diberi . pada akhir kalimat
    title: 'Hasnur Riung Sinergi',
    titleColor: 'text-[#1A1A1A]',

    // Deskripsi pada card
    description:
      'PT Hasnur Riung Sinergi has collaborated with Daun Salam Teknologi in the development of an online leave request system called "STOPLESS," which stands for Surat Tugas Online Paperless.',
    descriptionColor: 'text-[#4C4C4C]',

    // Informasi tambahan pada card
    additionalInformation:
      'PT Hasnur Riung Sinergi (HRS) is a Coal Mining Contractor Service Company in Indonesia.',
    additionalInformationColor: 'text-[#ACACAC]',

    // Logo yang akan digunakan pada card, image/<nama-file>
    logo: 'image/HasnurRiungLogo.avif',
  };

  checkAndAnimate(element: HTMLElement) {
    if (element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        this.renderer.addClass(element, 'show');
        if (element?.classList?.contains('statistic-card')) this.countAnimation();
      }
    }
  }

  countAnimation() {
    const counters = document.querySelectorAll('.number-to-count');
    const speed = 200000;
    let number: number = 0;

    if (counters?.length) {
      counters.forEach((counter) => {
        if (counter) {
          const animate = () => {
            const value = parseInt(
              counter.getAttribute('data-number') ?? '0',
              10
            );
            const data = parseInt(counter.innerHTML ?? '0', 10);

            const time = value / speed;
            if (data < value) {
              number = Math.ceil(data + time);
              counter.innerHTML = JSON.stringify(number);
              setTimeout(animate, speed / value);
            } else {
              counter.innerHTML = JSON.stringify(value);
            }
          };

          animate();
        }
      });
    }
  }
}
