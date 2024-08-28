import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';
import { MemberAuthType, MemberType } from '../../enums/member.enum';
import { ObjectId } from 'mongoose';
import { ViewGroup } from '../../enums/view.enum';

@InputType()
export class ViewInput {
    @IsNotEmpty()
    @Field(() => String)
    memberId: ObjectId;

    @IsNotEmpty()
    @Field(() => String)
    viewRefId: ObjectId;

    @IsNotEmpty()
    @Field(() => String)
    viewGroup: ViewGroup;

}