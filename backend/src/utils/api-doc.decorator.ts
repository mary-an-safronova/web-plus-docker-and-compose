import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export class LoginResponse {
  // Создаем класс для определения формата ответа
  @ApiProperty({ example: 'random-string', description: 'JWT Access Token' })
  access_token: string;
}

export const ApiDocs = {
  Tags: (name: string) => ApiTags(name),
  OkResponse: (type?: any, description?: string) =>
    ApiOkResponse({ type, description }),
  CreatedResponse: (type: any) => ApiCreatedResponse({ type }),
  UnauthorizedResponse: (options?: { description: string }) =>
    ApiUnauthorizedResponse(options),
  ConflictResponse: (options?: { description: string }) =>
    ApiConflictResponse(options),
  NotFoundResponse: (options?: { description: string }) =>
    ApiNotFoundResponse(options),
  BadRequestResponse: (options?: { description: string }) =>
    ApiBadRequestResponse(options),
  Body: (schema: Record<string, any>) => ApiBody({ schema }),
};
