import { CSSProperties } from 'react'

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

import { PlatformSlug } from '@fc/types'
import {
  platformLogos,
  platformLogosViewBox,
} from '@fc/ui/src/components/Caps/logos'

const paths = [
  'M50 337.5L0 0H50V337.5Z',
  'M50 337.5L0 675H50V337.5Z',
  'M0 337.5L50 0V675L0 337.5Z',
  'M45 675H55L55 8.74228e-07L45 0C15.021 168.507 0.0209643 252.819 2.18987e-05 337.135C-0.0209205 421.569 14.9791 506.007 45 675Z',
]

export const ogRouter = async (req: NextRequest) => {
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
  const platformSlug = (params.get('platform') ??
    'trend-rights') as PlatformSlug
  const platformLogoViewBox = platformLogosViewBox[platformSlug]
  const logoElements = platformLogos[platformSlug]

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
            viewBox={platformLogoViewBox}
          >
            {logoElements}
          </svg>

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
                textAlign: flip ? 'right' : 'left',
                flexGrow: 1,
                alignItems: 'center',
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
