"use client"

// Spotify 재즈 플레이리스트 임베드
// 재즈 플레이리스트 URI를 사용 (예: Classic Jazz, Smooth Jazz, Lo-Fi Jazz 등)
// Spotify에서 원하는 재즈 플레이리스트를 찾아서 URI를 변경할 수 있습니다
const SPOTIFY_PLAYLIST_ID = '37i9dQZF1DXbITWG1ZJKYt' // Jazz Classics

export function MusicPlayer() {
  return (
    <div className="w-full rounded-lg overflow-hidden bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-white/20 dark:border-white/10 relative">
      <iframe
        src={`https://open.spotify.com/embed/playlist/${SPOTIFY_PLAYLIST_ID}?utm_source=generator&theme=0&t=0&utm_content=WzAfADyXdJk4hP5e%2F%2B&compact=true`}
        width="100%"
        height="80"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="w-full rounded-lg"
      />
      {/* 미리듣기 글자 숨기기 - 상단 오버레이 */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-white/50 dark:bg-black/30 backdrop-blur-sm pointer-events-none z-10 rounded-t-lg" />
    </div>
  )
}

