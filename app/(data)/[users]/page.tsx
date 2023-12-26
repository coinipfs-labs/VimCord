// app/profile/[handle]/page.tsx
'use client'
import InteractCard from '@/app/components/postslist/InteractCard'
import {
  useProfile, usePublications, Profile, LimitType, PublicationType
} from '@lens-protocol/react-web'
import { Avatar } from '@nextui-org/react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'

export default function ProfileA({ params: { users } }) {
  const namespace = users.split('.')[1]
  users = users.split('.')[0]
  let { data: profile, loading } = useProfile({
    forHandle: `${namespace}/${users}`
  })
  if (loading) return <p className="p-14">Loading ...</p>

  return (
    <div className='max-w-4xl mx-auto'>
      <div className="flex items-center space-x-4">
        {profile?.metadata?.picture?.__typename === 'ImageSet' && (
          <img
            alt='posts data'
            width={100}
            height={100}
            className="rounded-xl w-[100px] h-[100px]"
            src={profile.metadata.picture.optimized?.uri}
          />
        )}
        <div>
          <p>name</p>
          <p className="text-xs caret-slate-500">{profile?.handle?.localName}.{profile?.handle?.namespace}
          </p>
          <p className="text-xl ">{profile?.metadata?.bio}</p>
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
        <div key={index} className="border border-b-0   sm:rounded-none hover:bg-[#54535325] pt-6 pb-2 px-6 sm:px-2">
          {/* users  */}
          <div className="space-y-3 mb-4">
            <div className="flex" >
              <Avatar src={pub.by?.metadata?.picture?.optimized?.uri} alt={pub.by.handle.localName} onClick={() => window.open(`/${pub.by.handle.localName}.lens`)} />

              <div className="sm:ml-3 ml-4">
                <h3 className="mb-1 font-medium leading-none caret-zinc-400" onClick={() => window.open(`/${pub.by.handle.localName}.lens`)}>{pub.by.handle.localName}.{pub.by.handle.namespace}</h3>
                <p className="text-xs text-muted-foreground" onClick={() => window.open(`/${pub.by.handle.localName}.lens`)}>{pub.by.metadata?.displayName}</p>
              </div>
            </div>
          </div>

          <div className='max-w-[100%] whitespace-normal overflow-hidden overflow-ellipsis'>
            <ReactMarkdown className=" mt-4 break-words">
              {pub.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
            </ReactMarkdown>
          </div>
          {pub.metadata?.asset?.image?.optimized?.uri && (
            <img

              alt="user posts img"
              className='rounded-xl mt-6 mb-2'
              src={pub.metadata?.asset?.image?.optimized?.uri}
            />
          )}
          <InteractCard dataname={pub} />

        </div>
      ))
      }
    </>
  )
}

