import { useScrollProgress } from '../../hooks/useScrollProgress'
import { cn } from '../../utils/cn'

function ReadingProgress({ className }) {
  const progress = useScrollProgress()

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 z-[60]',
        className
      )}
    >
      <div
        className="h-full bg-champagne transition-all duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  )
}

export default ReadingProgress
