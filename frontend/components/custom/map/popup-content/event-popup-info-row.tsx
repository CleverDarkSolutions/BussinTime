import {ReactElement, ReactNode} from 'react';

type EventPopupInfoRowProps = {
  passedIcon: ReactElement,
  label: string | undefined
  textSize: string | undefined
}

const EventPopupInfoRow = ({passedIcon, label, textSize}: EventPopupInfoRowProps) => {
  return (
    <div className={`py-1 ${textSize}`}>
      <div className="grid max-h-[80px] grid-cols-5 overflow-hidden text-ellipsis break-words">
        <div className="col-span-1">{passedIcon}</div>
        <div className="col-span-4">{label}</div>
      </div>
    </div>
  )
}

export default EventPopupInfoRow
