import {
  Get,
  Controller,
  Post,
  Body,
  // Param,
  Put,
  Patch,
  Delete,
  UseGuards,
  // ParseIntPipe,
  // UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
// import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
// import { ThrottlerGuard } from '@nestjs/throttler';
// import { LogInterceptor } from 'src/interceptors/log.interceptor';

// @UseInterceptors(LogInterceptor)
@Roles(Role.Admin)
// @UseGuards(AuthGuard)
// @UseGuards(ThrottlerGuard, AuthGuard, RoleGuard)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LogInterceptor)
  // @Roles(Role.Admin)
  // @UseGuards(ThrottlerGuard)
  // @SkipThrottle()
  // @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post()
  async create(
    @Body() { email, name, password, birthAt, role }: CreateUserDTO,
  ) {
    // async create(@Body() data: CreateUserDTO) {
    // return { email, name, password };
    return await this.userService.create({
      email,
      name,
      password,
      birthAt,
      role,
    });
    // return await this.userService.create(data);
  }

  // @Roles(Role.Admin)
  @Get()
  async list() {
    return this.userService.list();
  }

  // @Roles(Role.Admin)
  @Get(':id')
  async show(@ParamId() id: number) {
    console.log({ id });
    return await this.userService.show(id);
  }

  // @Roles(Role.Admin)
  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDTO,
    @ParamId() id: number,
    // @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, data);
  }

  // @Roles(Role.Admin)
  @Patch(':id')
  async updatePartial(
    @Body() data: UpdatePatchUserDTO,
    @ParamId() id: number,
    // @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, data);
  }

  //   @Delete(':id')
  //   async delete(@Param('id') id) {
  //     return {
  //       id,
  //     };
  //   }
  // @Roles(Role.Admin)
  @Delete(':id')
  async delete(
    @ParamId() id: number,
    // @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      success: await this.userService.delete(id),
    };
  }
}
