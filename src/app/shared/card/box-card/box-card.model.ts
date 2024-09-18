import { SafeHtml } from "@angular/platform-browser";

export interface BoxCardType {
  image: string;
  imageStyleTop?: string;
  imageSize?: string;
  headerText: string;
  headerTextColor: string;
  paragraphText: string;
  paragraphTextColor: string;
  background: string;
  stroke?: string;
  class?: string;
  isSvg?: SafeHtml;
}
