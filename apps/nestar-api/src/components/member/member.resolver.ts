import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AgentsInquiry, LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MemberUpdate } from '../../libs/dto/member.update';
import { shapeIntoMongoObjectId } from '../../libs/config';
import { WithoutGuard } from '../auth/guards/without.guard';

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
  @Mutation(() => Member)
  public async updateMember(@Args("input") input: MemberUpdate,@AuthMember("_id") memberId: ObjectId): Promise<Member> {
    console.log('Mutation: updateMember');
    delete input._id;
    return this.memberService.updateMember(memberId, input);
  }

  


  @Roles(MemberType.USER, MemberType.AGENT)
  @UseGuards(RolesGuard)
  @Query(() => String)
  public async checkAuthRoles(@AuthMember() authmember: Member): Promise<string> {
    console.log('Mutation: checkAuthRoles');
    console.log(authmember)
    return `Hi${authmember.memberNick} you are ${authmember.memberType}`;
  }

  
  @UseGuards(WithoutGuard)
  @Query(() => Member)
  public async getMember(@Args('memberId') input: string, @AuthMember("_id") memberId: ObjectId): Promise<Member> {
    console.log('Query: getMember');
    const targetId = shapeIntoMongoObjectId(input);
    return this.memberService.getMember(memberId, targetId);
  }

  @UseGuards(WithoutGuard)
  @Query(() => Members)
  public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember("_id") memberId: ObjectId): Promise<Members>{
    console.log("query: getAgents")
    return this.memberService.getAgents(memberId, input)
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

