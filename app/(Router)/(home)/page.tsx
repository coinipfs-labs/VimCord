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

import {
  Loader2, ListMusic, Newspaper,
  PersonStanding, Shapes,
  MessageSquare, Repeat2, Heart, Grab, ArrowRight
} from "lucide-react"
import {Avatar} from "@nextui-org/react";
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
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
      <div className="flex flex-1 flex-wrap flex-col">
        {
          loadingPubs && (
            <div className=" flex flex-1 justify-center items-center ">
              <Loader2 className="h-12  animate-spin" />
            </div>
          )
        }
        {publications?.map(publication => (

          /* 帖子列表 */
          <Link
            className="sm:border-l-0 sm:border-r-0 border-r border-l border-t sm:px-[-0.5rem] sm:w-auto  px-[-0.0rem] hover:bg-[#54535325]"
            key={publication.id} 
            href={`/pos/${publication.id}`} >


            <div className=" space-y-3 mb-4 pt-6 pb-2 sm:px-0 px-6">

              {/* users  */}
              <div className="flex px-2 sm:px-0">
                <Avatar src={publication.by?.metadata?.picture?.optimized?.uri} alt="1" /* className="aspect-square h-full   rounded-full object-cover relative flex  w-10 shrink-0 overflow-hidden" */ />

                <div className="sm:ml-1 ml-4">
                  <h3 className="mb-1 font-medium leading-none">{publication.by.handle.localName}.{publication.by.handle.namespace}</h3>
                  <p className="text-xs text-muted-foreground">{publication.by.metadata?.displayName}</p>
                </div>
              </div>

              {/* users posts data  */}
              <div className='sm:px-0 px-2 sm:w-auto '>
                <img
                  className={(`h-auto w-80 sm:h-auto sm:w-[100vw] sm:rounded-none rounded-2xl sm:px-[-0.5rem] object-cover`)}
                  src={publication.__typename === 'Post' ? publication.metadata?.asset?.image?.optimized.uri : ''}
                />
                <ReactMarkdown className=" mt-4 break-words px-[-0.5rem] max-w-[1450px] ">
                  {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
                </ReactMarkdown>
              </div>

              {/* 互动数据显示区  */}
              <div className='px-2 sm:px-2'>
                <button className="rounded-full mr-1"    >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {publication.stats.comments}
                </button>
                <button className="rounded-full mr-1"  >
                  <Repeat2 className="mr-2 h-4 w-4" />
                  {publication.stats.mirrors}
                </button>
                <button className="rounded-full mr-1"  >
                  <Heart className="mr-2 h-4 w-4" />
                  {publication.stats.upvotes}
                </button>
                <button className="rounded-full mr-1"  >
                  <Grab className="mr-2 h-4 w-4" />
                  {publication.stats.collects}
                </button>
              </div>

            </div>



          </Link>
        ))}
      </div>
    </>
  )
}