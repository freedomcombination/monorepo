import dynamic from 'next/dynamic'

const TimeLeft = dynamic(() => import('./TimeLeft'), { ssr: false })

export { TimeLeft }
