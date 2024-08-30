import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { PropertyInput } from '../../libs/dto/property/property.input';
import { PropertyService } from './property.service';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Property } from '../../libs/dto/property/property';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';

@Resolver()
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Roles(MemberType.AGENT)
  @UseGuards(RolesGuard)
  @Mutation(() => Property)
  public async createProperty(
    @Args('input') input: PropertyInput,
    @AuthMember('_id') memberId: ObjectId,
  ): Promise<Property> {
    console.log("Mutation: createProperty")
    input.memberId = memberId;
    return await this.propertyService.createProperty(input);
  }
}
