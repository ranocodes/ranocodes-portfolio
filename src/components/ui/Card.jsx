import { cn } from '../../utils/cn'

function Card({ children, className, hover = false, ...props }) {
  return (
    <div
      className={cn(
        'card-base p-8 md:p-10 transition-all duration-500',
        hover && 'hover:border-champagne/30 hover:shadow-champagne/5 hover:shadow-2xl hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
