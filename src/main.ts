import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// استيراد وظيفة التسجيل
import { register } from 'swiper/element/bundle';
// تسجيل العناصر المخصصة لـ Swiper
register();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
