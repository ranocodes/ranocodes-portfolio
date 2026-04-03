import { cn } from '../../utils/cn'

function Skeleton({ className, variant = 'rect', ...props }) {
  const variants = {
    rect: 'rounded-2xl',
    circle: 'rounded-full',
    text: 'rounded-lg h-4',
  }

  return (
    <div
      className={cn(
        'bg-slate/30 animate-pulse',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

function CardSkeleton() {
  return (
    <div className="card-base p-8 space-y-4">
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-2/3 h-4" />
      <div className="flex gap-2 pt-4">
        <Skeleton className="w-20 h-8 rounded-full" />
        <Skeleton className="w-20 h-8 rounded-full" />
      </div>
    </div>
  )
}

function ImageSkeleton({ aspectRatio = '16/9' }) {
  return (
    <div
      className="bg-slate/30 animate-pulse rounded-2xl w-full"
      style={{ aspectRatio }}
    />
  )
}

export { Skeleton, CardSkeleton, ImageSkeleton }
