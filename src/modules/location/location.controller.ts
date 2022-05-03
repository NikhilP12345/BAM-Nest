import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common"
import { User } from "core/decorators/user.decorator"
import { LocationDto } from "src/dto/location.dto";
import { LocationService } from "./location.service"

@Controller({
    path: 'bam'
})
export class LocationController{
    constructor(
        private readonly locationService: LocationService
    ){}


    @Post('update-user')
    async updateUserLocation(@User() user, @Body() locationDto: LocationDto){
        try{
            await await this.locationService.updateUserLocationById(user,locationDto)            
            return {message: 'successfully updated'}
        }
        catch(error){
            const message = error.message ||  `Error at Update User Location`
            throw new BadRequestException(message)
        }
    }
    

    
}