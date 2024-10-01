export default function LoadingPage() {
  return (
    <div className="flex justify-center  flex-col gap-3 items-center w-full h-screen">
      <div className="loading">
        <svg width="64px" height="48px">
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="back"
          />
          <polyline
            points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24"
            id="front"
          />
        </svg>
      </div>
      <div className="loadingtext text-lg font-bold">
        <p>Loading</p>
      </div>
    </div>
  );
}
