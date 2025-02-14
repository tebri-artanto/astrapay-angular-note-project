import Aura from '@primeng/themes/aura';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { providePrimeNG } from 'primeng/config';
import { LayoutComponent } from './components/layout/layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { ConfirmationService, MessageService } from 'primeng/api';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { NotesModule } from './components/Notes/notes.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    NotesModule,
    BrowserModule,
    AppRoutingModule,

  ],
  providers: [
    MessageService,
    ConfirmationService,
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
