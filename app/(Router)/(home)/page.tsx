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
import { Avatar } from "@nextui-org/react";
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
      <div className="flex flex-1 flex-wrap flex-col max-w-4xl">
        {
          loadingPubs && (
            <div className=" flex flex-1 justify-center items-center ">
              <Loader2 className="h-12  animate-spin" />
            </div>
          )
        }
        {publications?.map(publication => (


          <div className="sm:border-l-0 sm:border-r-0 border-r border-l border-t  hover:bg-[#54535325]" >


            <div className="space-y-3 mb-4 pt-6 pb-2 sm:px-4 px-6"
              key={publication.id}
             /*  onClick={() => window.open(`/posts/${publication.id}`)} */>

              {/* users  */}
              <div className="flex-1" >
                <Avatar src={publication.by?.metadata?.picture?.optimized?.uri} alt={publication.by.handle.localName} onClick={() => window.open(`/${publication.by.handle.localName}.lens`)} />

                <div className="sm:ml-1 ml-4">
                  <h3 className="mb-1 font-medium leading-none" onClick={() => window.open(`/${publication.by.handle.localName}.lens`)}>{publication.by.handle.localName}.{publication.by.handle.namespace}</h3>
                  <p className="text-xs text-muted-foreground" onClick={() => window.open(`/${publication.by.handle.localName}.lens`)}>{publication.by.metadata?.displayName}</p>
                </div>
              </div>

              {/* users posts data  */}
              <Link className='max-w-[100vw]' href={`/${publication.by.handle.localName}.lens/posts/${publication.id}`}>
                {/*                   <ReactMarkdown className=" mt-4 break-words">
                    {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
                  </ReactMarkdown>
 */}
                <PublicationContent content={publication.metadata.content} />

                <img
                  className={(` h-auto max-w-[80%] sm:max-w-[80vw] mb-3  sm:rounded-none  rounded-2xl object-cover`)}
                  src={publication.__typename === 'Post' ? publication.metadata?.asset?.image?.optimized.uri : ''}
                />

              </Link>


              <div className='px-2 sm:px-2'>
                <button className="rounded-full mr-1" onClick={() => window.open(`/${publication.by.handle.localName}.lens/posts/${publication.id}`)} >
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
        ))}
      </div>
    </>
  )
}






const MAX_LINES = 10;

const PublicationContent = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  // 将文本按行分割
  const lines = content.split('\n');

  // 取前 MAX_LINES 行，或全部行，根据 expanded 状态决定
  const displayedLines = expanded ? lines : lines.slice(0, MAX_LINES);

  return (
    <div className=''>
      <ReactMarkdown className="mt-4 break-words h-auto max-w-[90%]">
        {displayedLines.join('\n')}
      </ReactMarkdown>
      {lines.length > MAX_LINES && (
        <button
          className="text-blue-500 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '收起' : '更多'}
        </button>
      )}
    </div>
  );
};
