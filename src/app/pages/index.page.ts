import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { BoxCardComponent } from '../shared/card/box-card/box-card.component';
import { TitleCardComponent } from '../shared/card/title-card/title-card.component';
import { RectangleCardComponent } from '../shared/card/rectangle-card/rectangle-card.component';
import { CompanyDescriptionComponent } from '../shared/company-description/company-description.component';
import { CompanyServicesComponent } from '../shared/company-services/company-services.component';
import { CompanyTechnologyComponent } from '../shared/company-technology/company-technology.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { NavigationBarComponent } from '../shared/navigation-bar/navigation-bar.component';
import { CompanyPartnerComponent } from '../shared/company-partner/company-partner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <ds-navbar (scrollIntoView)="scroll($event)"></ds-navbar>
    <ds-header [scrollTo]="scrollInto"></ds-header>
    <ds-company-description  id="about"
      class="company-description mb-16"
    ></ds-company-description>
    <ds-company-services id="services" class="company-services mb-16"></ds-company-services>
    <ds-company-technology id="technologies" class="company-technology mb-16"></ds-company-technology>
    <ds-company-partner id="partner" class="company-partner mb-16"></ds-company-partner>
    <ds-footer></ds-footer>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `,
  imports: [
    BoxCardComponent,
    TitleCardComponent,
    RectangleCardComponent,
    CompanyDescriptionComponent,
    CompanyServicesComponent,
    CompanyTechnologyComponent,
    CompanyPartnerComponent,
    HeaderComponent,
    FooterComponent,
    NavigationBarComponent
  ],
})
export default class HomeComponent {
  scrollInto: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const companyDescription = this.el.nativeElement.querySelector(
      '.company-description'
    );
    const companyServices = this.el.nativeElement.querySelector(
      '.company-services'
    );
    const companyTechnology = this.el.nativeElement.querySelector(
      '.company-technology'
    );
    const companyPartner = this.el.nativeElement.querySelector(
      '.company-partner'
    );

    if (companyDescription) {
      const description = companyDescription.getBoundingClientRect();
      const services = companyServices.getBoundingClientRect();
      const technology = companyTechnology.getBoundingClientRect();
      const partner = companyPartner.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Cek jika elemen berada di setengah jendela
      if (description.top <= windowHeight / 2 && description.bottom >= windowHeight / 2) {
        // Ubah warna latar belakang window menjadi merah
        this.renderer.setStyle(document.body, 'backgroundColor', '#B7DBD1');
      } else if (services.top <= windowHeight && services.bottom >= windowHeight / 2) {
        // Kembalikan warna latar belakang ke default (misal: putih)
        this.renderer.setStyle(document.body, 'backgroundColor', '#EADAAD');
      } else if (technology.top <= windowHeight && technology.bottom >= windowHeight / 2) {
        // Kembalikan warna latar belakang ke default (misal: putih)
        this.renderer.setStyle(document.body, 'backgroundColor', '#7D6B58');
      } else if (partner.top <= windowHeight && partner.bottom >= windowHeight / 2) {
        // Kembalikan warna latar belakang ke default (misal: putih)
        this.renderer.setStyle(document.body, 'backgroundColor', '#0C3D48');
      } else {
        this.renderer.setStyle(document.body, 'backgroundColor', '#1A1A1A');
      }
    }
  }

  scroll(navigateTo: string) {
    this.scrollInto = navigateTo;
    setTimeout(() => {
      document.getElementById(navigateTo)?.scrollIntoView();
    }, 20);
  }
}
