import { useAuth } from '@/app/hooks/useAuth'
import React, { useState } from 'react'
import { NameMessageInfo, NameMessageType } from '../lib/type.d'
import { validateNickname } from '../lib/util'
import clsx from 'clsx'
import { patchNickname } from '../lib/api'

const ModifyNickname = () => {
  const {
    userInfo: { nickname },
    refetch,
  } = useAuth()

  const [nicknameStatus, setNicknameStatus] = useState<NameMessageType>('initial')

  const handleSubmitModification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const nickname = formData.get('nickname') as string

    const currentStatus = validateNickname(nickname ?? '')
    if (currentStatus !== 'valid') {
      setNicknameStatus(currentStatus)
      return
    }

    const patchNicknameResult = await patchNickname(nickname)
    if (patchNicknameResult === 'valid') {
      setNicknameStatus('valid')
      refetch() // Todo: nicknameStatus state도 초기화 안되는지 확인 필요.
    } else {
      setNicknameStatus('duplicate')
    }
  }

  return (
    <form onSubmit={handleSubmitModification} className="flex flex-col justify-center gap-3">
      <input
        type="text"
        defaultValue={nickname}
        name="nickname"
        placeholder="수정할 닉네임을 입력해주세요."
        className="w-full px-10 py-3 text-2xl font-bold text-center text-black border-b-2 px- border-lightGray2 focus:outline-none"
      />
      <p
        className={clsx('font-medium', {
          'text-red-500': nicknameStatus !== 'valid',
          'text-green-500': nicknameStatus === 'valid',
        })}
      >
        {NameMessageInfo[nicknameStatus]}
      </p>
      <button type="submit" className={clsx(`py-4  text-white rounded bg-darkGray1 `, {})}>
        수정
      </button>
      <ul className="text-darkGray1">
        <li>* 10자 이상으로 작성해주세요.</li>
        <li>* 알파벳 소문자와 한글만 입력해주세요.</li>
        <li>* 특수문자로 _와 .만 입력해주세요.</li>
      </ul>
    </form>
  )
}

export default ModifyNickname
