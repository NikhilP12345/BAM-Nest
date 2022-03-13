
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

		if (data) {
			const value = user?.[data];
			return value ? value.toString() : value;
		}
    return user;
  },
);
