
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "core/interfaces/user.interface";
import { RequestContext } from "core/middlewares/requestContext";

@Injectable()
export class JwtAuth {
  constructor(private readonly jwtService: JwtService,
    private readonly configService : ConfigService ) {}
    async generateJwt() : Promise<string>{
      const user : IUser = RequestContext.getUser();

        const token = await this.jwtService.signAsync(
          user,
          {secret: await this.configService.get('jwtSecretKey'),
          expiresIn : await this.configService.get('jwtExpiresIn')
          },
          );
        return token;
  }

  async validateJwt(jwtToken : string) : Promise<boolean>{
    try{
        const user = await this.jwtService.verifyAsync(jwtToken,{secret: await this.configService.get('jwtSecretKey')});
        RequestContext.setUser(user);
        return true;
    }
    catch{
        return false;
    }
  }
}
