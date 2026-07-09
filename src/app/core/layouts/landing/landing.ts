import { Component } from '@angular/core';
import { FooterComponent } from './footer-component/footer-component';
import { HeaderComponent } from './header-component/header-component';
import { HeroComponent } from './hero-component/hero-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [FooterComponent, HeaderComponent, HeroComponent, RouterOutlet],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {}
