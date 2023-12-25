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

import { Loader2 } from "lucide-react"
import { Avatar } from '@nextui-org/react'



export default function page() {

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

  return (
    <>
      <div className="flex sm:p-0 max-w-[1536px] mx-auto">

        <div className='border-t border-b  border-r border-l sm:border-l-0 sm:border-r-0 flex  flex-wrap sm:flex-col'>
          {
            profiles?.map(profile => (
              <a
                key={profile.id}
                className=" p-4 cursor-pointer  border-t border-b min-w-[20%] md:min-w-[25%] lg:min-w-[25%] sm:min-w-[100vw]"
                rel="no-opener"
                target="_blank"
                href={`/${profile.handle.localName}.lens`}>
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
              </a>
            ))
          }
        </div>
        {
          loadingProfiles && (
            <div className=" flex flex-1 justify-center items-center ">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
          )
        }
      </div>
    </>
  )
}