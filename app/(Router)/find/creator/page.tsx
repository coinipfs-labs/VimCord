'use client'
import { useState } from 'react'
import {
  useExploreProfiles,
  useExplorePublications,
  ExploreProfilesOrderByType,
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType
} from '@lens-protocol/react-web'


import { Avatar } from '@nextui-org/react'
import { RiLoader4Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'



export default function Page() {

  let { data: profiles, error: profileError, loading: loadingProfiles } = useExploreProfiles({
    limit: LimitType.TwentyFive,
    orderBy: ExploreProfilesOrderByType.MostFollowers
  }) as any


  let { data: publications, loading: loadingPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.LensCurated,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
    }
  }) as any


  profiles = profiles?.filter(p => p.metadata?.picture?.optimized?.uri)

  publications = publications?.filter(p => {
    if (p.metadata && p.metadata.asset) {
      if (p.metadata.asset.image) return true
      return false
    }
    return true
  })
  const router = useRouter()
  return (
    <>
      <div className="flex sm:p-0 max-w-[1536px] mx-auto">

        <div className='w-[100vw]  flex  flex-wrap sm:flex-col'>
          {
            profiles?.map(profile => (
              <div
                key={profile.id}
                className=" p-4 cursor-pointer min-w-[25%] md:min-w-[50%] lg:min-w-[50%] sm:min-w-[100vw]"
                onClick={() => router.push(`/${profile.handle.localName}.lens`)}>
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-md flex-1 flex-grow">
                    <Avatar
                      /* className="h-auto w-auto object-cover transition-all hover:scale-105 aspect-square" */
                      src={profile.metadata?.picture?.optimized?.uri
                      } />

                    <h3 className="font-medium leading-none">{profile.handle.localName}.{profile.handle.namespace}</h3>
                    <p className="text-xs text-muted-foreground">{profile.metadata?.displayName}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        {
          loadingProfiles && (
            <div className=" flex flex-1 justify-center items-center ">
              <RiLoader4Line className="h-12 w-12 animate-spin" />
            </div>
          )
        }
      </div>
    </>
  )
}