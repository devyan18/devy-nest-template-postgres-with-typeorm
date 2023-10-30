import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { config } from "./settings/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB.HOST"),
        port: configService.get<number>("DB.PORT"),
        username: configService.get<string>("DB.USERNAME"),
        password: configService.get<string>("DB.PASSWORD"),
        database: configService.get<string>("DB.DATABASE_NAME"),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
