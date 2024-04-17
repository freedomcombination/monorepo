import { CSSProperties } from 'react'

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

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
          >
            <rect width="1080" height="1080" rx="540" fill="#FF4F00" />
            <path
              d="M455.747 637.448C460.812 582.631 446.882 477.829 430.199 447.943C430.285 447.895 470.127 371.211 470.127 371.255C475.592 382.31 480.354 394.206 484.359 406.824C501.513 460.869 504.979 524.282 494.771 603.024L455.747 637.448Z"
              fill="white"
            />
            <path
              d="M558.546 523.925C561.31 452.313 553.629 386.557 535.677 333.136C528.182 310.832 518.854 290.206 507.951 271.836C499.685 257.907 490.497 245.227 480.613 234.108L519.155 165C627.848 265.985 611.156 455.314 611.156 455.314L558.548 523.925H558.546Z"
              fill="white"
            />
            <path
              d="M503.52 594.067C511.983 519.434 508.379 456.784 491.791 404.512C484.875 382.722 475.751 363.002 464.672 345.899C464.603 345.899 501.518 275.697 501.443 275.688C512.077 293.61 521.186 313.757 528.516 335.567C547.105 390.887 554.495 457.122 550.488 532.439L503.52 594.065V594.067Z"
              fill="white"
            />
            <path
              d="M559.528 533.979L716.938 558.488L508.139 598.935L559.528 533.979Z"
              fill="white"
            />
            <path
              d="M516.512 604.513L726.23 563.887L650.135 635.476L516.512 604.513Z"
              fill="white"
            />
            <path
              d="M506.055 609.342L641.534 640.735L548.951 693.196L506.055 609.342Z"
              fill="white"
            />
            <path
              d="M500.453 613.635L542.673 696.165L468.863 725.196L500.453 613.635Z"
              fill="white"
            />
            <path
              d="M493.074 614.299L461.028 727.476L360.123 727.511L493.074 614.299Z"
              fill="white"
            />
            <path
              d="M622.996 458.372L734.023 425.702V550.683L622.996 458.372Z"
              fill="white"
            />
            <path
              d="M667.09 318.855L750.77 318.125L740.637 379.907L740.689 379.892L735.4 412.27L667.09 318.855Z"
              fill="white"
            />
            <path
              d="M564.539 527.605L616.199 461.829L725.441 552.659L564.539 527.605Z"
              fill="white"
            />
            <path
              d="M760.646 319.411L852.5 355.503L749.664 386.591L760.646 319.411Z"
              fill="white"
            />
            <path
              d="M619.137 379.989L726.403 420.585L619.137 452.148V379.989Z"
              fill="white"
            />
            <path
              d="M621.271 373.257L660.201 321.236L727.698 413.537L621.271 373.257Z"
              fill="white"
            />
            <path
              d="M227.5 738.694L350.621 734.588H443.356L300.391 786.231L227.5 738.694Z"
              fill="white"
            />
            <path
              d="M354.754 846.659L457.921 741.811L433.556 861.304L364.539 915L354.754 846.659Z"
              fill="white"
            />
            <path
              d="M306.811 841.805L303.592 792.584L450.307 739.581L349.673 841.805H306.811Z"
              fill="white"
            />
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
                textAlign: 'center',
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
