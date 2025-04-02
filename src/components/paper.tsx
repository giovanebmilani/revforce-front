
function Paper({ title, children }: { title?: string, children?: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="shadow-md rounded-lg w-1/3 h-1/4 outline-1">
        <div className="h-1/5 outline-1 rounded-t-lg">
          <h2 className="font-semibold h-full grid items-center ml-2">{title || 'Charts'}</h2>
        </div>

        <div className="h-4/5 w-full flex flex-row justify-center">
          <div className=" h-full w-7/8">
            {children}
          </div>

          <div className="w-1/8 text-2xl flex align-middle justify-center items-center">
            <svg className="p-2.5 rounded-lg outline-1 h-1/2 w-1/2 cursor-pointer" width="16" height="29" viewBox="0 0 16 29" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 26.5L14 14.5L2 2.5" stroke="#D1D1D1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Paper }
