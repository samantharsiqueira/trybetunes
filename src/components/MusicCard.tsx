interface MusicCardProps {
  trackName: string,
  previewUrl: string
}

function MusicCard({ trackName, previewUrl }:MusicCardProps) {
  return (
    <>
      <h3>
        { trackName }
      </h3>
      <audio data-testid="audio-component" controls>
        <track kind="captions" />
        <source src={ previewUrl } type="audio/mpeg" />
        Seu navegador não suporta o elemento de áudio.
      </audio>
    </>
  );
}

export default MusicCard;
