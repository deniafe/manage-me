import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const GetEmployee = createParamDecorator(
  (
    data: string | undefined,
    context: ExecutionContext,
  ) => {
    const { user } = context.switchToHttp().getRequest();
    if (data) {
      return user[data];
    }
    return user;
  },
);