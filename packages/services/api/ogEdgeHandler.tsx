import { CSSProperties } from 'react'

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import type { PlatformSlug } from '@fc/types'
// import { platformLogos } from '@fc/ui/components/Caps/logos'

const paths = [
  'M50 337.5L0 0H50V337.5Z',
  'M50 337.5L0 675H50V337.5Z',
  'M0 337.5L50 0V675L0 337.5Z',
  'M45 675H55L55 8.74228e-07L45 0C15.021 168.507 0.0209643 252.819 2.18987e-05 337.135C-0.0209205 421.569 14.9791 506.007 45 675Z',
]

export const ogEdgeHandler = async (req: NextRequest) => {
  const params = new URLSearchParams(req.nextUrl.search)
  const title = params.get('title')
  const text = params.get('text')
  const image = params.get('image') || null
  const shape = params.get('shape') || 0
  const bg = params.get('bg') || 'white'
  const color = params.get('color') || '#FF4F00'
  const scale = Number(params.get('scale')) || 1
  const flip = params.get('flip') ? params.get('flip') === 'true' : false
  const hasLine =
    title && params.get('hasLine') ? params.get('hasLine') === 'true' : false
  const platform = params.get('platform') as PlatformSlug | null

  const absoluteStyle: CSSProperties = {
    position: 'absolute',
    top: '0',
    height: '100%',
  }

  const transform = flip ? 'scale(1)' : 'scaleX(-1)'

  const path = paths[shape as number]

  const dimensions = {
    width: 1200 * scale,
    height: 675 * scale,
    image: 400 * scale,
    shape: 50 * scale,
    logo: 120 * scale,
    padding: 40 * scale,
    font: 36 * scale,
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          display: 'flex',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: bg,
            position: 'relative',
          }}
        >
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              style={{
                ...absoluteStyle,
                width: `${dimensions.image}px`,
                objectFit: 'cover',
                left: flip ? '0px' : `${dimensions.width - dimensions.image}px`,
              }}
              src={image}
              alt={''}
            />
          )}
          <svg
            width={dimensions.shape}
            height={dimensions.height}
            style={{
              ...absoluteStyle,
              left: flip
                ? `${dimensions.image - dimensions.shape}px`
                : `${dimensions.width - dimensions.image}px`,
              transform,
            }}
            viewBox="0 0 50 675"
            fill="0px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path key={path} d={path} fill={bg} />
          </svg>

          {/* Logo */}
          {platform && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={dimensions.logo}
              height={dimensions.logo}
              style={{
                position: 'absolute',
                left: flip
                  ? `${dimensions.image / 2 - dimensions.shape}px`
                  : `${
                      dimensions.width - dimensions.image / 2 - dimensions.shape
                    }px`,
                bottom: `${dimensions.padding}px`,
              }}
              viewBox={'0 0 500 500'}
            >
              <rect width="500" height="500" rx="250" fill="#FF4F00" />
              <path
                d="M210.996 295.115C213.341 269.736 206.892 221.217 199.168 207.381C199.208 207.359 217.653 171.857 217.653 171.877C220.183 176.995 222.388 182.502 224.242 188.344C232.183 213.365 233.788 242.723 229.062 279.177L210.996 295.115Z"
                fill="white"
              />
              <path
                d="M258.592 242.557C259.871 209.404 256.315 178.962 248.004 154.23C244.534 143.903 240.216 134.354 235.168 125.85C231.341 119.401 227.088 113.531 222.512 108.383L240.355 76.3887C290.676 123.141 282.948 210.793 282.948 210.793L258.593 242.557H258.592Z"
                fill="white"
              />
              <path
                d="M233.114 275.031C237.032 240.478 235.364 211.473 227.684 187.273C224.482 177.185 220.258 168.056 215.129 160.138C215.097 160.138 232.187 127.637 232.152 127.633C237.076 135.93 241.293 145.257 244.686 155.354C253.293 180.966 256.714 211.63 254.859 246.499L233.114 275.03V275.031Z"
                fill="white"
              />
              <path
                d="M259.041 247.213L331.916 258.56L235.25 277.286L259.041 247.213Z"
                fill="white"
              />
              <path
                d="M239.125 279.868L336.217 261.06L300.987 294.203L239.125 279.868Z"
                fill="white"
              />
              <path
                d="M234.285 282.103L297.007 296.637L254.144 320.924L234.285 282.103Z"
                fill="white"
              />
              <path
                d="M231.691 284.09L251.237 322.299L217.066 335.739L231.691 284.09Z"
                fill="white"
              />
              <path
                d="M228.274 284.398L213.438 336.795L166.723 336.811L228.274 284.398Z"
                fill="white"
              />
              <path
                d="M288.422 212.21L339.823 197.085V254.947L288.422 212.21Z"
                fill="white"
              />
              <path
                d="M308.836 147.619L347.577 147.281L342.886 175.884L342.91 175.876L340.461 190.866L308.836 147.619Z"
                fill="white"
              />
              <path
                d="M261.363 244.262L285.28 213.811L335.855 255.862L261.363 244.262Z"
                fill="white"
              />
              <path
                d="M352.15 147.876L394.675 164.585L347.066 178.978L352.15 147.876Z"
                fill="white"
              />
              <path
                d="M286.637 175.922L336.297 194.716L286.637 209.329V175.922Z"
                fill="white"
              />
              <path
                d="M287.621 172.804L305.644 148.721L336.893 191.452L287.621 172.804Z"
                fill="white"
              />
              <path
                d="M105.328 341.988L162.329 340.087H205.262L139.074 363.996L105.328 341.988Z"
                fill="white"
              />
              <path
                d="M164.242 391.972L212.005 343.431L200.724 398.752L168.772 423.611L164.242 391.972Z"
                fill="white"
              />
              <path
                d="M142.045 389.725L140.555 366.938L208.478 342.399L161.889 389.725H142.045Z"
                fill="white"
              />
            </svg>
          )}

          {/* Content */}
          <div
            style={{
              position: 'absolute',
              top: dimensions.padding,
              bottom: dimensions.padding,
              left: flip
                ? dimensions.image + dimensions.shape
                : dimensions.padding,
              right: flip
                ? dimensions.padding
                : dimensions.image + dimensions.shape,
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: `${dimensions.font / 2}px`,
            }}
          >
            {title && (
              <div
                style={{
                  fontSize: `${dimensions.font * 1.5}px`,
                  fontWeight: 'bold',
                  color,
                  // Truncate text
                  width: `${
                    dimensions.width - dimensions.image - dimensions.padding * 2
                  }px`,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flexShrink: 0,
                }}
              >
                {title}
              </div>
            )}

            {hasLine && (
              <div
                style={{
                  backgroundColor: color,
                  height: hasLine ? `${dimensions.font / 6}px` : '0',
                  width: '100%',
                  borderRadius: `${dimensions.font / 6}px`,
                }}
              />
            )}

            <div
              style={{
                fontSize: `${dimensions.font}px`,
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: dimensions.width,
      height: dimensions.height,
    },
  )
}
