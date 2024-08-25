import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@Resolver()
export class MemberResolver {
  constructor(private readonly memberService: MemberService) {}

  @Mutation(() => Member)

  public async signup(@Args("input") input: MemberInput): Promise<Member> {
    try{
      console.log("Mutation: signup")
      console.log("Input ", input)
      return this.memberService.signup(input);

      

    }catch(err){
      console.log("error, Signup",err)
      throw new InternalServerErrorException(err)
    }
  }

  @Mutation(() => Member)
  public async login(@Args("input") input: LoginInput): Promise<Member> {
    try{
      console.log("Mutation: signup")
      console.log("Input ", input)
      return this.memberService.login(input);
    }catch(err){
      console.log("error, Signup",err)
      throw new InternalServerErrorException(err)
    }
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  public async checkAuth(@AuthMember("memberNick") memberNick: string): Promise<string> {
    console.log('Mutation: checkAuth');
    console.log(memberNick)
    return `Hi${memberNick}`;
  }

  @UseGuards(AuthGuard)
  @Mutation(() => String)
  public async updateMember(@AuthMember("_id") memberId: ObjectId): Promise<string> {
    console.log('Mutation: updateMember');
    console.log(memberId)
    return this.memberService.updateMember();
  }

  


  @Roles(MemberType.USER, MemberType.AGENT)
  @UseGuards(RolesGuard)
  @Query(() => String)
  public async checkAuthRoles(@AuthMember() authmember: Member): Promise<string> {
    console.log('Mutation: checkAuthRoles');
    console.log(authmember)
    return `Hi${authmember.memberNick} you are ${authmember.memberType}`;
  }

  

  @Query(() => String)
  public async getMember(): Promise<string> {
    console.log('Query: getMember');
    return this.memberService.getMember();
  }

  /** ADMIN **/
@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Mutation(() => String)
public async getAllMembersByAdmin(@AuthMember() authMember: Member): Promise<string> {
  console.log(authMember.memberType )
    return this.memberService.getAllMembersByAdmin();
}

@Mutation(() => String)
public async updateMemberByAdmin(): Promise<string> {
  
    console.log('Mutation: updateMemberByAdmin');
    return this.memberService.updateMemberByAdmin();
}
}

