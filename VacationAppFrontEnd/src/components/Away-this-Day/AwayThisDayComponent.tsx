export default function AwayThisDayComponent() {
  return (
    <div className="flex flex-col gap-2 p-2 border rounded-md">
      <div className="flex justify-between items-center">
        <h3>Away This Day</h3>
        <span>4 People</span>
      </div>
      <div className="flex flex-col gap-2">
        <div
          id="list item"
          className="bg-blue-500 text-white p-2 rounded-md flex justify-between items-center"
        >
          <div className="flex gap-2 items-center">
            <div className="bg-yellow-200 text-gray-800 p-3 rounded-2xl text-md">
              JD
            </div>

            <div>
              <div className="font-semibold">John Doe</div>
              <div className="text-xs text-gray-300">
                Marketing · Back Mon, Aug 15
              </div>
            </div>
          </div>
          <div className="bg-blue-400 text-white px-3 py-1 rounded-md">
            vacation
          </div>
        </div>
        <div
          id="list item"
          className="bg-blue-500 text-white p-2 rounded-md flex justify-between items-center"
        >
          <div className="flex gap-2 items-center">
            <div className="bg-green-200 text-gray-800 p-3 rounded-2xl text-md">
              JD
            </div>

            <div>
              <div className="font-semibold">Jane Doe</div>
              <div className="text-xs text-gray-300">
                Marketing · Back Mon, Aug 15
              </div>
            </div>
          </div>
          <div className="bg-red-400 text-white px-3 py-1 rounded-md">sick</div>
        </div>
        <div
          id="list item"
          className="bg-blue-500 text-white p-2 rounded-md flex justify-between items-center"
        >
          <div className="flex gap-2 items-center">
            <div className="bg-indigo-200 text-gray-800 p-3 rounded-2xl text-md">
              GG
            </div>

            <div>
              <div className="font-semibold">Goga Gogeshvili</div>
              <div className="text-xs text-gray-300">
                Engineering · Back Tue, Feb 16
              </div>
            </div>
          </div>
          <div className="bg-violet-400 text-white px-3 py-1 rounded-md">
            personal
          </div>
        </div>
        <div
          id="list item"
          className="bg-blue-500 text-white p-2 rounded-md flex justify-between items-center"
        >
          <div className="flex gap-2 items-center">
            <div className="bg-rose-200 text-gray-800 p-3 rounded-2xl text-md">
              SC
            </div>

            <div>
              <div className="font-semibold">Sarah Connor</div>
              <div className="text-xs text-gray-300">
                DevOps Engineer · Back Fri, Jul 1
              </div>
            </div>
          </div>
          <div className="bg-red-400 text-white px-3 py-1 rounded-md">sick</div>
        </div>
      </div>
    </div>
  );
}
