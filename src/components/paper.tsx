
function Paper() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="shadow-md rounded-lg w-1/3 h-1/4 outline-1">
        <div className="h-1/5 outline-1 rounded-t-lg">
          <h2 className="text-xl font-semibold mb-2 text-l">Charts</h2>
        </div>

        <div className="h-4/5 w-full flex flex-row justify-center">
          <div className="bg-red-500 h-full w-7/8">
            graficos
          </div>

          <div className="bg-purple-400 w=1/8 text-2xl flex align-middle justify-center items-center">
            <h1 className="rounded-lg outline-1 h-1/2 w-full">{'>'}</h1>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export { Paper }
