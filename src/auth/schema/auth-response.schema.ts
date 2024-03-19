import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWY5Njc1MjZhZDQwOTgyYTU0OTU5NWIiLCJ1c2VybmFtZSI6IlRhdHVtNzVAZ21haWwuY29tIiwiaWF0IjoxNzEwODQ0NDY0LCJleHAiOjE3MTA5MzA4NjR9.pgwcw1IDyvWpT3ShZXfoVFDv_EHF4-9Wml8L-wyXKqo',
    description: 'Jwt access token',
  })
  accessToken: string;
}
