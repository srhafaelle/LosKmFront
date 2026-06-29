import { ButtonComponent } from '@/shared/ui/button-component/button-component';
import { CardComponent } from '@/shared/ui/card-component/card-component';
import { InputComponent } from '@/shared/ui/input-component/input-component';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-login',
    imports: [InputComponent, CardComponent, ButtonComponent, NgOptimizedImage],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {}
