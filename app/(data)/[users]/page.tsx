// app/profile/[handle]/page.tsx
'use client'
import {
  useProfile, usePublications, Profile, LimitType, PublicationType
} from '@lens-protocol/react-web'
import { Grab, Heart, MessageSquare, Repeat2 } from 'lucide-react'

export default function ProfileA({ params: { users } }) {
  const namespace = users.split('.')[1]
  users = users.split('.')[0]
  let { data: profile, loading } = useProfile({
    forHandle: `${namespace}/${users}`
  })
  if (loading) return <p className="p-14">Loading ...</p>

  return (
    <div >
      <div className="flex items-center space-x-4">
        {profile?.metadata?.picture?.__typename === 'ImageSet' && (
          <img
            alt={profile.handle?.fullHandle}
            className="rounded-xl w-[100px] h-[100px]"
            src={profile.metadata.picture.optimized?.uri}
          />
        )}
        <div>
          <p className="text-xl mb-4">{profile?.metadata?.bio}</p>
          <p className="text-xs caret-slate-500 my-3">
            @{profile?.handle?.localName}.{profile?.handle?.namespace}
          </p>
        </div>
      </div>
      {profile && <Publications profile={profile} />}
    </div>
  )
}

function Publications({
  profile
}: {
  profile: Profile
}) {
  let { data: publications } = usePublications({
    where: {
      publicationTypes: [PublicationType.Post],
      from: [profile.id],
    },
    limit: LimitType.TwentyFive
  })
  return (
    <>
      {publications?.map((pub: any, index: number) => (
        <div key={index} className="border  rounded mb-3  sm:rounded-none hover:bg-[#54535325] p-2">
          <div className='max-w-[100%] whitespace-normal overflow-hidden overflow-ellipsis'>{parseTextWithLinks(pub.metadata.content)}</div>
          {pub.metadata?.asset?.image?.optimized?.uri && (
            <img
              width="400"
              height="400"
              alt={profile.handle?.fullHandle}
              className='rounded-xl mt-6 mb-2'
              src={pub.metadata?.asset?.image?.optimized?.uri}
            />
          )}

        </div>
      ))
      }
    </>
  )
}

function parseTextWithLinks(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (index % 2 === 1) {
      // 链接部分，将其转换为 <a> 标签
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline  caret-primary"
        >
          {part}
        </a>
      );
    } else {
      // 文本部分
      return part;
    }
  });
}
