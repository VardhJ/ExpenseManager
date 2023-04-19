import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { AddComponent } from './add/add.component';
import { ReportsComponent } from './reports/reports.component';
import { AdviceComponent } from './advice/advice.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SideNavComponent,
    HeaderComponent,
    FooterComponent,
    LoginPageComponent,
    AddComponent,
    ReportsComponent,
    AdviceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
