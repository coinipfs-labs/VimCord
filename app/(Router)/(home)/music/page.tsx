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
  Loader2,
  MessageSquare, Repeat2, Heart, Grab,
} from "lucide-react"

import ReactMarkdown from 'react-markdown'
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
          loadingMusicPubs && (
            <div className=" flex flex-1 justify-center items-center ">
              <Loader2 className="h-12 w-12 animate-spin" />
            </div>
          )
        }
        {
          musicPubs?.map(publication => (
            <div
              className="border-l-0 border-r-0 sm:border-r sm:border-l border-t border-gray-200"
              key={publication.id}
              onClick={() => window.open(`https://share.lens.xyz/p/${publication.id}`, '_blank')}
            >
              <div className="space-y-3 mb-4 p-4">


                <div className="flex">
                  <div className="ml-4">
                    <h3 className="mb-1 font-medium leading-none">{publication.by.handle.localName}.{publication.by.handle.namespace}</h3>
                    <p className="text-xs text-muted-foreground">{publication.by.handle.fullName}</p>
                  </div>
                </div>


                <div>
                  <img
                    className={` max-w-full sm:max-w-[500px] mb-3 rounded-2xl h-auto object-cover `}
                    src={publication.__typename === 'Post' ?
                      publication.metadata?.asset?.cover?.optimized?.uri ?
                        publication.metadata?.asset?.cover?.optimized?.uri :
                        publication.metadata?.asset?.cover?.optimized?.raw?.uri : ''}
                  />
                  <audio controls>
                    <source
                      type={publication.metadata?.asset?.audio?.optimized?.mimeType}
                      src={publication.metadata?.asset?.audio?.optimized?.uri}
                    />
                  </audio>
                  <ReactMarkdown className=" mt-4 break-words ">
                    {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
                  </ReactMarkdown>
                </div>

                <div>
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

            </div>
          ))
        }
      </div>
    </>
  )
}