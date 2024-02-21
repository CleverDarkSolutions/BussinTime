import {SwapVerticalCircle, WifiOff} from '@mui/icons-material';

export type NetworkErrorMessageProps = {
  error: string
}
const NetworkErrorMessage = ({ error }: NetworkErrorMessageProps) => {
  const options = [
    {
      icon: <WifiOff/>,
      title: 'Connection issues',
      desc: 'You may have been disconnected from the server. Check your internet connection.',
      href: 'javascript:void(0)'
    },
    {
      icon: <SwapVerticalCircle/>,
      title: 'Server is down',
      desc: 'The server is temporarily unable to service your request due to maintenance downtime or capacity problems.',
      href: 'javascript:void(0)'
    }
  ]

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
        <div className="mx-auto max-w-lg text-gray-600">
          <div className="space-y-3 text-center">
            <p className="py-6 text-4xl font-semibold text-gray-800 sm:text-5xl">
              <div>Ooops!</div>
              <div>Something went wrong</div>
            </p>
            <h3 className="py-6 font-semibold text-indigo-600">
              {error}
            </h3>
            <p className="py-6 text-xl">
              Why it happened?
            </p>
          </div>
          <div className="mt-12">
            <ul className="divide-y">
              {
                options.map((item, idx) => (
                  <li key={idx}
                    className="flex gap-x-4 p-6">
                    <div className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-indigo-500 p-6 text-indigo-600">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p>
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkErrorMessage;
