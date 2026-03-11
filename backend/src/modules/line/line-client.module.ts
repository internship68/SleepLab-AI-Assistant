import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LineClient } from './line.client';

@Module({
    imports: [ConfigModule],
    providers: [LineClient],
    exports: [LineClient],
})
export class LineClientModule { }
