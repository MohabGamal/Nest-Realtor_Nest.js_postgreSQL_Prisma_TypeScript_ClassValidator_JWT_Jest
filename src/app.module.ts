import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { HomeModule } from './home/home.module';
import { UserInterceptor } from './user/interceptors/user.interceptor';

@Module({
  imports: [UserModule, HomeModule],
providers: [{
    provide: 'APP_INTERCEPTOR',
    useClass: UserInterceptor,
  }],
})
export class AppModule {}
 