import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public client: PrismaClient

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  async onModuleInit() {
    return await this.$connect()
  }

  async onModuleDestroy() {
    return await this.$disconnect()
  }
}
