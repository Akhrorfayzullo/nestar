import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
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
    return await this.memberService.getMember(memberId, targetId);
  }

  @UseGuards(WithoutGuard)
  @Query(() => Members)
  public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember("_id") memberId: ObjectId): Promise<Members>{
    console.log("query: getAgents")
    return await this.memberService.getAgents(memberId, input)
  }

/** ADMIN */
@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Query(() => Members)
public async getAllMembersByAdmin(@Args('input') input: MembersInquiry): Promise<Members> {
    return await this.memberService.getAllMembersByAdmin(input);
}

@Roles(MemberType.ADMIN)
@UseGuards(RolesGuard)
@Mutation(() => Member)
public async updateMemberByAdmin(@Args('input') input: MemberUpdate): Promise<Member> {
    console.log('Mutation: updateMemberByAdmin');
    return await this.memberService.updateMemberByAdmin(input);
}
}

