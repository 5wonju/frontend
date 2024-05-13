export type NameMessageType =
  | 'empty'
  | 'tooLong'
  | 'invalidChar'
  | 'duplicate'
  | 'valid'
  | 'initial'

export enum NameMessageInfo {
  'initial' = '',
  'empty' = '닉네임이 비어있습니다.',
  'tooLong' = '닉네임은 최대 10자를 넘을 수 없습니다.',
  'invalidChar' = '유효하지 않은 문자 입력 입니다.',
  'duplicate' = '이미 사용중인 닉네임 입니다.',
  'valid' = '프로필이 수정되었습니다.',
}
