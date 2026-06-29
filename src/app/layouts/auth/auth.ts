import { Component } from '@angular/core';
import { CardAuth } from './card-auth/card-auth';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [CardAuth, RouterOutlet],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {}
