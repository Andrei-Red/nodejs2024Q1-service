import { IsInt, IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'

export class CreateAlbumsDto {
  @ValidateIf((artist) => artist.artistId !== null)
  @IsUUID('4', { message: 'Artist ID must be a valid UUID v4 string.' })
  artistId: string | null

  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string

  @IsInt({ message: 'Year must be an integer.' })
  year: number
}

export class UpdateAlbumsDto extends PartialType(CreateAlbumsDto) {
  @ValidateIf((artist) => artist.artistId !== null)
  @IsUUID('4', { message: 'Artist ID must be a valid UUID v4 string.' })
  artistId: string | null

  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string

  @IsInt({ message: 'Year must be an integer.' })
  year: number
}