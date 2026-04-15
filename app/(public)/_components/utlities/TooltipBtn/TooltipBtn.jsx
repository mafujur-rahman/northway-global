export default function TooltipBtn ({
  className,
  text = 'Tooltip text',
  icon: Icon
}) {
  return (
    <button
      className={`flex items-center gap-x-2 bg-gray-100 rounded-full py-2 px-4 mb-2.5 ${className}`}
      data-tooltip={text}
    >
      {Icon && <Icon className='text-base text-[#FF9100] ' />}{' '}
      <span className='text-base font-semibold text-black/70'>{text}</span>
    </button>
  )
}
