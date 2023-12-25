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
import InteractCard from '@/components/postslist/InteractCard';

import { RiLoader4Line} from "react-icons/ri";
import Posimg from '@/app/components/postslist/Posimg';
import Avatarimg from '@/app/components/postslist/Avatarimg';
import AvatarName from '@/app/components/postslist/AvatarName';
import PosText from '@/app/components/postslist/PosText';


enum PublicationMetadataMainFocusType {
  Article = "ARTICLE",
  Audio = "AUDIO",
  CheckingIn = "CHECKING_IN",
  Embed = "EMBED",
  Event = "EVENT",
  Image = "IMAGE",
  Link = "LINK",
  Livestream = "LIVESTREAM",
  Mint = "MINT",
  ShortVideo = "SHORT_VIDEO",
  Space = "SPACE",
  Story = "STORY",
  TextOnly = "TEXT_ONLY",
  ThreeD = "THREE_D",
  Transaction = "TRANSACTION",
  Video = "VIDEO"
}

export default function page() {

  let { data: profiles, error: profileError, loading: loadingProfiles } = useExploreProfiles({
    limit: LimitType.TwentyFive,
    orderBy: ExploreProfilesOrderByType.MostFollowers
  }) as any

  let { data: musicPubs, loading: loadingMusicPubs } = useExplorePublications({
    limit: LimitType.TwentyFive,
    orderBy: ExplorePublicationsOrderByType.TopCommented,
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      metadata: {
        mainContentFocus: [PublicationMetadataMainFocusType.Audio]
      }
    }
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
      <div className="flex flex-1 flex-wrap flex-col max-w-4xl mx-auto border-t">
        {
          loadingPubs && (
            <div className=" flex flex-1 justify-center items-center ">
              <RiLoader4Line className="h-12 w-12 animate-spin" />
            </div>
          )
        }


        {publications?.map((publication: any) => (
          <div key={publication.id} className="border-b border-l border-r  sm:border-r-0 sm:border-l-0 hover:bg-[#6463631a]" >


            <div className=" p-6 sm:p-2  sm:w-screen"  >

              {/* users  */}
              <div className="space-y-3 flex">
                <div className="flex" >
                  <Avatarimg dataname={publication} />
                  <AvatarName dataname={publication} />
                </div>
              </div>


              {/* users posts data  */}
              <div className='max-w-full justify-start sm:max-w-[100%]'
                onClick={() => window.open(`/${publication.by.handle.localName}.lens/posts/${publication.id}`)}>

                {/* text */}
                <PosText content={publication.metadata.content} />

                {/* img */}
                <Posimg src={publication.__typename === 'Post' ? publication.metadata?.asset?.image?.optimized.uri : ''} />
              </div>



              {/* InteractCard */}
              <InteractCard dataname={publication} />


            </div>
          </div>
        ))}
      </div>
    </>
  )
}

